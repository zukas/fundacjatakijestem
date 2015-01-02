function galleryRowHeight ()
{
	return App.isIE() ? 200 : 250;
}

function predicate(index, list, items, done) {
	if (index < list.length) {
		var item = document.createElement('div'),
			image = document.createElement('img');
		item.setAttribute("id", list[index].id);
		item.setAttribute('class', 'galleryItem');
		image.setAttribute('src', list[index].src);
		image.setAttribute('class', 'previewImage');
		item.appendChild(image);

		$(image).load(function(){
			item.setAttribute("data-w", Math.round((this.width / this.height) * galleryRowHeight()));
			item.setAttribute("data-h", galleryRowHeight());
	     	items.push(item);
	     	App.updateLoder(index + 1);
		    predicate(index + 1, list, items, done);
		});
	} else {
		done(items);
	}
};

function populate (id) {
	var callback = function (data) {
		if(!data.error && data.result) {
			App.showLoader((data.result.images || []).length);
			predicate(0, data.result.images, [], function (items) {
				if(!$("#brickGallery").length) {
					var list = document.createElement('div');
					list.setAttribute("id", "brickGallery");
					$("#" + id + "View").append($(list))
				}

				$("#brickGallery").html(items);
				$("#brickGallery").flexImages({rowHeight: galleryRowHeight(), container : ".galleryItem"});	

				$("img.previewImage").click(function () {
					App.imagePopup($(this).attr("src").replace("_s.jpg", ".jpg"));
				});

				var maxHeaight = 0,
					gli = $("#brickGallery").find(".galleryItem"),
					gla = [];
				gli.each(function (i) {
					gla.push($(gli[i]));
					if($(gli[i]).position().top + $(gli[i]).height() > maxHeaight)
					{
						maxHeaight = $(gli[i]).position().top + $(gli[i]).height();
					}

				});
				$("#brickGallery").height(maxHeaight + 50);	
				$("#contentWrapper").scrollTo("#brickGallery", 600);
				gla.forEach(function (item) { item.fadeOut(0); });
				var animate = function (items) {
					if(items.length > 0) {
						items[0].fadeIn(400, function () {
							animate(items.splice(1));
							items = null;
						});
					}
				}

				animate(gla);
			});
		}
	};
	App.showLoader();
	$.ajax({
		type: "POST",
		url: "/resource",
		data: { resource : id },
		success: callback,
		dataType: "json"
	});
	
};



$( window ).bind("load", function () {

	if(App.isIE())
	{
		$(".card .back").hide();
		$(".eventWrapper").mouseenter(function () {
			$("#" + this.id + " .card .front").fadeOut();
			$("#" + this.id + " .card .back").fadeIn();
		});
		$(".eventWrapper").mouseleave(function () {
			$("#" + this.id + " .card .back").fadeOut();
			$("#" + this.id + " .card .front").fadeIn();
		});
	}

	$(".eventTitle, .card").click(function () {
		var _id = $(this).closest(".eventWrapper").attr("id");
		if($("#brickGallery").length)
		{
			if($("#" + _id).hasClass("selected"))
			{
				$("#contentWrapper").scrollTo("#brickGallery", 600);
				return;
			}
			if($(".eventWrapper.selected").position().top > $("#" + _id).position().top)
			{
				$("#brickGallery").remove();
				$(".eventWrapper").removeClass("selected");
				$("#" + _id).addClass("selected");
				populate(_id);
			} else {
				$("#contentWrapper").scrollTo("#brickGallery", 600, function () {
					$("#brickGallery").slideUp({ duration : 600, complete : function () {
						$("#brickGallery").remove();
						$(".eventWrapper").removeClass("selected");
						$("#" + _id).addClass("selected");
						populate(_id);
					}});
				});
			}
		} else {
			$(".eventWrapper").removeClass("selected");
			$("#" + _id).addClass("selected");
			populate(_id);
		}	
	});
	$(".eventLogo").each(function() {
		var img = $(this);
		var back = img.siblings(".back");
		var card = img.closest(".card");
		$("<img/>")
	    .attr("src", $(this).attr("src"))
	    .load(function() {

	    	var tmp_width = this.width;
	    	var tmp_height = this.height;

	    	while(tmp_width * tmp_height > 100000)
	    	{
	    		tmp_width *= 0.75;
	    		tmp_height *= 0.75;
	    	}
	    	if(tmp_height > tmp_width)
	    	{
	    		tmp_height += 1; 
	    	} 
	    	else {
	    		tmp_width +=1;
	    	}

	    	img.width(tmp_width);
			img.height(tmp_height);
			back.width(tmp_width);
			back.height(tmp_height);
	    	card.width(tmp_width);
			card.height(tmp_height);
	    });		
	});
});
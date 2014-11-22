function predicate(index, list, items, done) {
	if (index < list.length) {
		var item = document.createElement('li'),
			image = document.createElement('img');
		item.setAttribute("id", list[index].id);
		item.setAttribute('class', 'galleryItem ' + (index % 2 == 0 ? 'tiltEven' : 'tiltOdd'));
		image.setAttribute('src', list[index].src);
		image.setAttribute('class', 'previewImage');
		item.appendChild(image);

		$(image).load(function(){
	     	image.setAttribute("width", (this.width / this.height) * 250);
			image.setAttribute("height", 250);
	    	image.setAttribute('originalWidth', this.width);
	     	image.setAttribute('originalHeight', this.height);
	     	items.push(item);
		    predicate(index + 1, list, items, done);
		});
	} else {
		done(items);
	}
};

function populate (id) {
	var callback = function (data) {
		if(!data.error && data.result) {
			predicate(0, data.result.images, [], function (items) {
				if(!$("#brickGallery").length) {
					var list = document.createElement('ul');
					list.setAttribute("id", "brickGallery");
					$("#" + id + "View").append($(list))
				}

				$("#brickGallery").html(items);
				$("#brickGallery").brickwall();	

				$("img.previewImage").click(function () {
					$.magnificPopup.open({
						items : {
							src : $(this).attr("src").replace(".png", ".jpg")
						},
						type : "image"
					});
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
				$("#brickGallery").ScrollTo({ duration : 600 });
				gla.forEach(function (item) { item.fadeOut(0); });
				var animate = function (items) {
					if(items.length > 0) {
						items[0].fadeIn(function () {
							animate(items.splice(1));
							items = null;
						});
					}
				}

				animate(gla);
			});
		}
	};

	$.ajax({
		type: "POST",
		url: "/resource",
		data: { resource : id },
		success: callback,
		dataType: "json"
	});
	
};



$( window ).bind("load", function () {
	$(".eventWrapper .eventTitle").click(function () {
		var _id = $(this).parent().attr("id");
		if($("#brickGallery").length)
		{
			if($("#" + _id).hasClass("selected"))
			{
				$("#brickGallery").ScrollTo({duration : 600});
				return;
			}
			if($(".eventWrapper.selected").position().top > $("#" + _id).position().top)
			{
				$("#brickGallery").remove();
				$(".eventWrapper").removeClass("selected");
				$("#" + _id).addClass("selected");
				populate(_id);
			} else {
				$("#brickGallery").ScrollTo({ duration : 200, callback : function () {
					$("#brickGallery").slideUp({ duration : 600, complete : function () {
						$("#brickGallery").remove();
						$(".eventWrapper").removeClass("selected");
						$("#" + _id).addClass("selected");
						populate(_id);
					}});
				}});
			}
		} else {
			$(".eventWrapper").removeClass("selected");
			$("#" + _id).addClass("selected");
			populate(_id);
		}	
	});
});
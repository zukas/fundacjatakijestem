
function predicate(index, list, items, done) {
	if (index < list.length) {
		var item = document.createElement('li'),
			image = document.createElement('img');
		item.setAttribute("id", list[index].id);
		item.setAttribute('class', 'galleryItem ' + (index % 2 == 0 ? 'tiltEven' : 'tiltOdd'));
		image.setAttribute('src', list[index].src);
		item.appendChild(image);
		var tmp = new Image();
	    tmp.src = list[index].src;
	    $(tmp).load(function () {
	    	image.setAttribute('originalWidth', this.width);
	    	image.setAttribute('originalHeight', this.height);
	    	image.setAttribute("height", 250);
	    	image.setAttribute("width", (this.width / this.height) * 250);
	    	tmp = null;
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
					$("#galleryContent").append($(list))
				}

				$("#brickGallery").html(items);
				$("#brickGallery").brickwall();	
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
				$("#brickGallery").height(maxHeaight + 30);
				$("#brickGallery").ScrollTo();
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

function generateCategories (data) {
	var categories = [];
	if(!data.error && data.result) {
		data = data.result.images;
		for(var i = 0; i < data.length; i++) {
			var category = document.createElement('div'),
				item = document.createElement('div'),
				image = document.createElement('img'),
				text = document.createElement('div');

			category.setAttribute("class", "categoryWrapper " + (i % 2 == 0 ? 'tiltEven' : 'tiltOdd'));
			item.setAttribute("id", data[i].id);
			item.setAttribute('class', 'category');
			image.setAttribute('src', data[i].src);
			item.appendChild(image);
			category.appendChild(item);

			text.setAttribute('class', "caption textinv strong");
			text.innerHTML = data[i].text;
			category.appendChild(text);

			categories.push(category);
		}
	}
	$("#galleryContent").html($(categories));

	$("#galleryContent .category").click(function () {
		populate(this.id);
		$("#brickGallery").brickwall("update"); 
	});
};


$( document ).ready(function () {
	$.ajax({
		type: "POST",
		url: "/resource",
		data: { resource : "categories" },
		success: generateCategories,
		dataType: "json"
	});
});
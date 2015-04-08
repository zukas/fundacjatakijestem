$( window ).bind("load", function () {

	$(".post .img").each(function() {
		var img = $(this);
		var content = img.siblings(".postContent");
		var post = img.closest(".post");
		content.css("left", img.width() + 10);
		content.css("width", content.width() - img.width() - 20);
		content.css("top", -img.height());
		post.css("height", (content.height() > img.height() ? content.height() : img.height()) + 20 );	
	});

});
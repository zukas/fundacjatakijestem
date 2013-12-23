$( document ).ready(function() {

	var _calcHeight = function (){
			$("body div.content").css("height", $("body").height() - 220);	
		},
		_loader = function (data) {
			$("body div.content .data").html(data);
			_calcHeight()
		};

	$.ajax({
		type: "GET",
		url: "public/html/__home.html"
	}).done(_loader);

	$(".navigation .nav.home").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__home.html"
		}).done(_loader);
	});

	$(".navigation .nav.about").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__about.html"
		}).done(_loader);
	});

	$(".navigation .nav.gallery").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__gallery.html"
		}).done(_loader);
	});

	$(".navigation .nav.events").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__events.html"
		}).done(_loader);
	});

	$(".navigation .nav.contact").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__contact.html"
		}).done(_loader);
	});

	$( window ).resize(_calcHeight);
});


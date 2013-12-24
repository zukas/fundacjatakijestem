$( document ).ready(function() {

	var _calcHeight = function (){
		var _calc  = $("body").height() - 220;
		_calc = _calc<500?500:_calc;
		$("body div.content").css("height", _calc);	
	};

	$(".content .data .homePage").load("public/html/__home.html");
	$(".content .data .aboutPage").load("public/html/__about.html");
	$(".content .data .galleryPage").load("public/html/__gallery.html", function () {
		$('#myGallery').galleryView({
			panel_width : 650,
			panel_height: 430,
			transition_speed: 500,
			panel_animation: 'none',
			easing: 'linear',
			filmstrip_position: 'bottom',
			pan_smoothness: 0,
			frame_width: 100,
			frame_height: 50
		});
	});
	$(".content .data .eventsPage").load("public/html/__events.html");
	$(".content .data .contactPage").load("public/html/__contact.html");


	$(".navigation .nav.home").click(function(){
		$(".content .data .page").hide();
		$(".content .data .homePage").show();
	});

	$(".navigation .nav.about").click(function(){
		$(".content .data .page").hide();
		$(".content .data .aboutPage").show();
	});

	$(".navigation .nav.gallery").click(function(){
		$(".content .data .page").hide();
		$(".content .data .galleryPage").show();
	});

	$(".navigation .nav.events").click(function(){
		$(".content .data .page").hide();
		$(".content .data .eventsPage").show();
	});

	$(".navigation .nav.contact").click(function(){
		$(".content .data .page").hide();
		$(".content .data .contactPage").show();
	});

	$( window ).resize(_calcHeight);
});


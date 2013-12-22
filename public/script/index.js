$( document ).ready(function() {
	$.ajax({
		type: "GET",
		url: "public/html/__home.html"
	}).done(function( data ) {
		$("body div.content").html(data);
	});

	$(".navigation .nav.home").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__home.html"
		}).done(function( data ) {
			$("body div.content").html(data);
		});
	});

	$(".navigation .nav.about").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__about.html"
		}).done(function( data ) {
			$("body div.content").html(data);
		});
	});

	$(".navigation .nav.gallery").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__gallery.html"
		}).done(function( data ) {
			$("body div.content").html(data);
		});
	});

	$(".navigation .nav.events").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__events.html"
		}).done(function( data ) {
			$("body div.content").html(data);
		});
	});

	$(".navigation .nav.contact").click(function(){
		$.ajax({
			type: "GET",
			url: "public/html/__contact.html"
		}).done(function( data ) {
			$("body div.content").html(data);
		});
	});


});
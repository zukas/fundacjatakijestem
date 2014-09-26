function updatePage()
{
	var _height  = $("body").height() - 220;
	console.log(_height);
	$("#contentWrapper").height(_height);
}

$( document ).ready(function () {

	$("input#home").click(function () {
		$("#content").load("/", { page : "home" });
	});
	$("input#about").click(function () {
		$("#content").load("/", { page : "about" });
	});
	$("input#gallery").click(function () {
		$("#content").load("/", { page : "gallery" });
	});
	$("input#events").click(function () {
		$("#content").load("/", { page : "events" });
	});
	$("input#contact").click(function () {
		$("#content").load("/", { page : "contact" });
	});

	updatePage();
});
$( window ).resize(updatePage);


function updatePage()
{
	var _height  = $("body").height() - $("#header").height() - $("#headerSeparator").height() - $("#footer").height() - 15;
	$("#contentWrapper").height(_height);
}

$( document ).ready(function () {

	$("input.nav").click(function () {
		window.location.href = '/' + this.id;
	});
	updatePage();
});
$( window ).resize(updatePage);


function updatePage()
{
	var _height  = $("body").height() - 220;
	console.log(_height);
	$("#contentWrapper").height(_height);
	$("#contentWrapper").perfectScrollbar('update');
}

$( document ).ready(function () {

	$("input.nav").click(function () {
		window.location.href = '/' + this.id;
	});
	updatePage();
	$("#contentWrapper").perfectScrollbar({
		suppressScrollX: true,
		maxScrollbarLength : 50
	});
});
$( window ).resize(updatePage);


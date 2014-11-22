function updatePage()
{
	var _height  = $("body").height() - $("#header").height() - $("#headerSeparator").height() - $("#footer").height() - 15;
	$("#contentWrapper").height(_height);
	if($("body").height() > 900 && $("body").width() > 1850)
	{
		$(".backdrop").show();
	} else {
		$(".backdrop").hide();
	}
}

$( document ).ready(function () {

	$("input.nav").click(function () {
		window.location.href = '/' + this.id;
	});
	$("img.previewImage").click(function () {
		console.log("click on: " + $(this).attr("src"));
		$.magnificPopup.open({
			items : {
				src : $(this).attr("src").replace(".png", ".jpg")
			},
			type : "image"
		});
	});
	updatePage();
});
$( window ).resize(updatePage);


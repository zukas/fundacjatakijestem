window.App = {};
App.isIE = function () {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    // if (msie > 0) {
    //     // IE 10 or older => return version number
    //     return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    // }

    // if (trident > 0) {
    //     // IE 11 (or newer) => return version number
    //     var rv = ua.indexOf('rv:');
    //     return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    // }

    // other browser
    return msie > 0 || trident > 0;
}


App.showLoader = function (count)
{
	if(!document.getElementById("tt-global-loader"))
	{
		var loader = document.createElement('div');
		loader.total =  (!count || count < 0) ? 0 : count;
		loader.setAttribute("id", "tt-global-loader");
		loader.setAttribute("style", "position : absolute; top: 0px; left: 0px; background : rgba(0,0,0,0.25); z-index: 100; width : 100%; height : 100%; text-align: center;");
		var text = document.createElement("div");
		text.setAttribute("style", "position: relative; display: inline-block; font-size: 2.5em; text-align: center; top : 50%; transform: translateY(-50%);");
		text.setAttribute("class", "text strong noselect");
		text.innerHTML = "Loading";
		var bar = document.createElement('div');
		bar.setAttribute("style", "width : 0%; height: 6px; bottom: 0px; background: #343433; border-radius: 4px; box-shadow: 1px 1px 0px #fff;");
		
		text.appendChild(bar);
		loader.appendChild(text);

		loader.updateValue = function (value) {
			loader.value = value;
			$(bar).width(((value / loader.total) * 100) + "%");
			return value >= loader.total;
		};
		$(loader).hide();
		document.body.appendChild(loader);
		$(loader).fadeIn();
	} else {
		var loader = document.getElementById("tt-global-loader");
		loader.total = count;
		loader.updateValue(loader.value);
	}
}

App.updateLoder = function (value)
{
	var loader = document.getElementById("tt-global-loader");
	if(loader)
	{
		if(loader.updateValue(value))
		{
			App.hideLoader()
		}
	}
}

App.hideLoader = function () 
{
	var loader = document.getElementById("tt-global-loader");
	if(loader)
	{
		$(loader).fadeOut(function() {
			document.body.removeChild(loader);
			loader = null;
		});
	}
}

App.imagePopup = function (img) 
{
	$.magnificPopup.open({
		type : "image",
		items : {
			src : img
		}
	});
}

App.notify = function (item, duration) 
{
	var notify = document.getElementById("tt-global-notify");
	if(notify) 
	{
		notify.destroy();
	}

	notify = document.createElement('div');
	notify.setAttribute("id", "tt-global-notify");
	notify.setAttribute("style", "background : rgba(240,240,240,0.80); border-bottom : 1px #f7941e solid; width: 100%; height: 25px; position: absolute; top : -50px; left: 0px; z-index: 99");

	var txt = document.createElement("div");
	txt.setAttribute("style", "position: relative; color: #343433; text-shadow: 1px 1px 0px #fff; text-align: center; height: 25px; vertical-align: middle; line-height: 25px;");
	txt.innerHTML = item;
	notify.appendChild(txt);
	
	notify.close = function () 
	{
		var tmp = this;
		$(tmp).animate({ top : "-=50px" }, 600, function () { tmp.destroy(); });
	};

	notify.destroy = function ()
	{
		document.body.removeChild(this);
	}

	// $(notify).hide();
	document.body.appendChild(notify);
	$(notify).animate({ top : "+=50px" }, 600, function () {
		var tmp = notify;
		setTimeout(function() {
			tmp.close();
			tmp = null;
		}, duration);
	});
}

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

$( window ).bind("load", function () {

	$("input.nav").click(function () {
		window.location.href = '/' + this.id;
	});
	$("img.previewImage").click(function () {
		App.imagePopup($(this).attr("src").replace(".png", ".jpg"))
	});
	updatePage();
	if(App.isIE()) 
	{

		var items = "Ta strona wymaga nowoczesnej przeglądarki. Skorzystaj z" +
					"<a href='https://www.mozilla.org/en-US/firefox/all/?q=Polish,%20Polski' ><img style='cursor: pointer; height: 25px; display: inline; vertical-align: middle; margin-left: 10px; margin-right: 5px;' src='./images/firefox.png'></a>" +
					" lub " +
					"<a href='https://www.google.pl/intl/en/chrome/browser/' ><img style='cursor: pointer; height: 25px; display: inline; vertical-align: middle; margin-left: 5px;' src='./images/chrome.png'></a>";
		App.notify(items, 60000);
	}
});
$( window ).resize(updatePage);


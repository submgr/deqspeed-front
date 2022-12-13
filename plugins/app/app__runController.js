//lets say that we are here
console.log("Hello there! Im here. - from [app/app_runController] module.");

if (location.protocol === 'https:') {
    // page is secure
}else{
	alert("Sorry, this application created for HTTPs connections, that why you may except problem when working via unsecured connection. ")
}

//init things on startup of this module (and, also, - page, where it were requested)
test.style.display = 'none';

console.log("RunController is available now and able to perfom. Detected source: " + localStorage.getItem('data__instanceSource'));

function startTest(){
	console.log("Yay! Let's do this! Starting the test... starting the magic!");
	test.style.display = 'block';
	initUI();
	startStop();
}
function app__button_changeState() {
	//window.location.hash='awaiting';
	console.log("Registered new event: app__button_changeState click.");
	if(localStorage.getItem('data__instanceSource') == "yandexgames"){
		ysdk.adv.showFullscreenAdv({
			  callbacks: {
			  onClose: function(wasShown) {
			    console.log('FullscreenAdv was shown.');
			    startTest()
			},
			  onError: function(error) {
			    console.log('FullscreenAdv was NOT shown. An ERROR, details:' + error);
			    startTest()
			}
		    }
		})
	    }else{
		    startTest();
	    }
};

tryto_getback.onclick = function() {
	window.location = document.referrer;
}

function event_getback_handler(initiated_by){
	if(initiated_by == "special_button"){
		window.location=document.referrer;
	}else{
		if(!window.location.hash){
			if(localStorage.getItem('data__instanceSource') == "vkapps"){
				window.parent.postMessage({type:"VKWebAppClose", "status": "success", "payload": {"name": "test"} }, '*');
			}
		}else{
			window.location = document.referrer;
		}
	}
}

bajb_backdetect.OnBack = function()
{
window.location = document.referrer;
}

if(localStorage.getItem('data__instanceSource') != "vkapps"){
	document.getElementById('app__button_shareOnStory').style.display = 'none';
	document.getElementById('app__button_shareOnPage').style.display = 'none';
}


if(localStorage.getItem('data__instanceSource') == "yandexgames"){
	app__shareThisMiniApp.style.display = 'none';
}

function app__shareThisMiniApp() {
	console.log("got click for: share this app");
	const shareData = {
		title: 'DeqSpeed',
		text: get_translation("yagames_share_aboutapp"),
		url: 'https://yandex.com/games/app/188540'
	}
	if (localStorage.getItem('data__instanceSource') == "vkapps") {
		window.parent.postMessage({
			type: "vk_appshare",
			url: "https://vk.com/app8045693"
		}, '*');
	} else {

		try {
			navigator.share(shareData)
			console.log("[app_/shareinfo] Shared successfully!");
		} catch (err) {
			console.log("[app_/shareinfo] Error on share, details: " + err);
		}
	}
};
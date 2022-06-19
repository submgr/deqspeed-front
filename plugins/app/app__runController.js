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
app__button_changeState.onclick = function() {
	//window.location.hash='awaiting';
	console.log("Registered new event: app__button_changeState click.");
	if(localStorage.getItem('data__instanceSource') == "yandexgames"){
		    ysdk.adv.showFullscreenAdv({
			  callbacks: {
			  onOpen: () => {
			    console.log('Video ad open.');
				  startTest();
			},
			  onRewarded: () => {
			    console.log('Rewarded!');
				  startTest();
			},
			  onClose: () => {
			    console.log('Video ad closed.');
				  startTest();
			}, 
			  onError: (e) => {
			    console.log('Error while open video ad:', e);
				  startTest();
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

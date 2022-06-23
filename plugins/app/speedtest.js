console.log("Hello there! Im here. - from [app/speedtest] module.");

function I(i) {
	return document.getElementById(i);
}

//LIST OF TEST SERVERS. See documentation for details if needed
var SPEEDTEST_SERVERS = [{
		name: "Global Server", //user friendly name for the server
		server: "https://", //URL to the server. // at the beginning will be replaced with http:// or https:// automatically
		dlURL: "deqspeed.pages.dev/bins/test-5mb.bin", //path to download test on this server (garbage.php or replacement)
		ulURL: "deqspeed.pages.dev/bins/empty.dat", //path to upload test on this server (empty.php or replacement)
		pingURL: "deqspeed.pages.dev/bins/empty.dat", //path to ping/jitter test on this server (empty.php or replacement)
		getIpURL: "https://deqspeed.herokuapp.com/utils/getip" //path to getIP on this server (getIP.php or replacement)
	},
	{
		name: "Local Server — DEV", //user friendly name for the server
		server: "http://", //URL to the server. // at the beginning will be replaced with http:// or https:// automatically
		dlURL: "192.168.1.38:5500/deqspeed-front/bins/test-5mb.bin", //path to download test on this server (garbage.php or replacement)
		ulURL: "192.168.1.38:5500/deqspeed-front/bins/empty.dat", //path to upload test on this server (empty.php or replacement)
		pingURL: "192.168.1.38:5500/deqspeed-front/bins/empty.dat", //path to ping/jitter test on this server (empty.php or replacement)
		getIpURL: "https://deqspeed.herokuapp.com/utils/getip" //path to getIP on this server (getIP.php or replacement)
	}
];

//INITIALIZE SPEEDTEST
var s = new Speedtest(); //create speedtest object
s.setParameter("telemetry_level", "basic"); //enable telemetry

//SERVER AUTO SELECTION
function initServers() {
	var noServersAvailable = function () {
		I("message").innerHTML = "No servers available";
	}
	var runServerSelect = function () {
		s.selectServer(function (server) {
			if (1) { //at least 1 server is available
				I("loading").className = "hidden"; //hide loading message
				//populate server list for manual selection
				for (var i = 0; i < SPEEDTEST_SERVERS.length; i++) {
					if (SPEEDTEST_SERVERS[i].pingT == -1) continue;
					var option = document.createElement("option");
					option.value = i;
					option.textContent = SPEEDTEST_SERVERS[i].name;
					if (SPEEDTEST_SERVERS[i] === server) option.selected = true;
					I("server").appendChild(option);
				}
				//show test UI
				I("testWrapper").className = "visible";
				//initUI();
			} else { //no servers are available, the test cannot proceed
				noServersAvailable();
			}
		});
	}
	if (typeof SPEEDTEST_SERVERS === "string") {
		//need to fetch list of servers from specified URL
		s.loadServerList(SPEEDTEST_SERVERS, function (servers) {
			if (servers == null) { //failed to load server list
				noServersAvailable();
			} else { //server list loaded
				SPEEDTEST_SERVERS = servers;
				runServerSelect();
			}
		});
	} else {
		//hardcoded server list
		s.addTestPoints(SPEEDTEST_SERVERS);
		runServerSelect();
	}
}

var meterBk = /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent) ? "#EAEAEA" : "#80808040";
var dlColor = "#6060AA",
	ulColor = "#616161";
var progColor = meterBk;

//CODE FOR GAUGES
function drawMeter(c, amount, bk, fg, progress, prog) {
	var ctx = c.getContext("2d");
	var dp = window.devicePixelRatio || 1;
	var cw = c.clientWidth * dp,
		ch = c.clientHeight * dp;
	var sizScale = ch * 0.0055;
	if (c.width == cw && c.height == ch) {
		ctx.clearRect(0, 0, cw, ch);
	} else {
		c.width = cw;
		c.height = ch;
	}
	ctx.beginPath();
	ctx.strokeStyle = bk;
	ctx.lineWidth = 12 * sizScale;
	//console.log({"c.width": c.width, "c.height": c.height, "ctx.lineWidth;": ctx.lineWidth});
	ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, Math.PI * 0.1);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = fg;
	ctx.lineWidth = 12 * sizScale;
	ctx.arc(c.width / 2, c.height - 58 * sizScale, c.height / 1.8 - ctx.lineWidth, -Math.PI * 1.1, amount * Math.PI * 1.2 - Math.PI * 1.1);
	ctx.stroke();
	if (typeof progress !== "undefined") {
		ctx.fillStyle = prog;
		ctx.fillRect(c.width * 0.3, c.height - 16 * sizScale, c.width * 0.4 * progress, 4 * sizScale);
	}
}

function mbpsToAmount(s) {
	return 1 - (1 / (Math.pow(1.3, Math.sqrt(s))));
}

function format(d) {
	d = Number(d);
	if (d < 10) return d.toFixed(2);
	if (d < 100) return d.toFixed(1);
	return d.toFixed(0);
}

//UI CODE
var uiData = null;

function startStop() {
	var test_loadingNotification = document.getElementById("test_loadingNotification");
	var test_loadingNotification = new bootstrap.Toast(test_loadingNotification);
	test_loadingNotification.show();

	if (s.getState() == 3) {
		//speedtest is running, abort
		s.abort();
		data = null;
		//I("startStopBtn").className="";
		I("server").disabled = false;
		initUI();
	} else {
		//test is not running, begin
		I("startTestCard").style.display = "none";
		//I("startStopBtn").className="running";
		I("shareArea").style.display = "none";
		I("test_shareBlock").style.display = "none";

		//I("test").style.display="block";
		I("server").disabled = true;
		s.onupdate = function (data) {
			uiData = data;
		};
		s.onend = function (aborted) {
			I("server").disabled = false;
			updateUI(true);

			if (localStorage.getItem('data__instanceSource') == "vkapps") {
				window.parent.postMessage({
					type: "show_Interstitial"
				}, '*');
			} else if (localStorage.getItem('data__instanceSource') == "yandexgames") {
				ysdk.adv.showFullscreenAdv({
					callbacks: {
						onClose: function (wasShown) {
							console.log('FullscreenAdv was shown.');
							startTest()
						},
						onError: function (error) {
							console.log('FullscreenAdv was NOT shown. An ERROR, details:' + error);
							startTest()
						}
					}
				})
			} else {
				startTest();
			}
		}

		I("test_shareBlock").style.display = "block";

		test_loadingNotification.hide();

		if (!aborted) {
			//if testId is present, show sharing panel, otherwise do nothing
			try {
				var testId = uiData.testId;
				if (testId != null) {
					window.location.hash = testId;
				}
			} catch (e) {}
		}
	};
	test.style.visibility = 'visible';
	s.start();
}

status_passed = 1;
//this function reads the data sent back by the test and updates the UI
function updateUI(forced) {
	if (!forced && s.getState() != 3) return;
	if (uiData == null) return;
	var status = uiData.testState;
	I("data_ip").textContent = uiData.client_ip;
	I("data_provider").textContent = uiData.client_org_cutted;

	if (uiData.client_city == uiData.client_region) {
		I("data_networkAddress").textContent = uiData.client_region + ", " + uiData.client_country;
	} else {
		I("data_networkAddress").textContent = uiData.client_city + ", " + uiData.client_region + ", " + uiData.client_country;
	}

	if (uiData.client_networkType != "") {
		I("data_networkType").textContent = uiData.client_networkType;
	} else {
		I("data_networkType").textContent = "--";
	}

	if (status_passed == 1 && uiData.jitterStatus > 0) {
		//ping
		better_than_ping = Math.round(120 - uiData.pingStatus / 2);
		if (better_than_ping < 1) {
			better_than_ping = 1;
		} else if (better_than_ping > 99) {
			better_than_ping = 99;
		}
		document.getElementById("betterThan_activeMetric_Ping").textContent = better_than_ping;
		status_passed += 1;
		I("test_loadingNotification_text").textContent = get_translation("perfoming_jitter");;
	} else if (status_passed == 2 && uiData.dlStatus > 0) {
		//jitter
		better_than_jitter = Math.round(130 - uiData.jitterStatus * 2);
		if (better_than_jitter < 1) {
			better_than_jitter = 1;
		} else if (better_than_jitter > 99) {
			better_than_jitter = 99;
		}
		document.getElementById("betterThan_activeMetric_Jitter").textContent = better_than_jitter;
		status_passed += 1;
		I("test_loadingNotification_text").textContent = get_translation("perfoming_downloadspeed");
	} else if (status_passed == 3 && uiData.ulStatus > 0) {
		//download
		better_than_dl = Math.round(100 - (102 - uiData.dlStatus));
		if (better_than_dl < 1) {
			better_than_dl = 1;
		} else if (better_than_dl > 99) {
			better_than_dl = 99;
		}
		document.getElementById("betterThan_activeMetric_dl").textContent = better_than_dl;
		status_passed += 1;
		I("test_loadingNotification_text").textContent = get_translation("perfoming_uploadspeed");
	} else if (status_passed == 4 && s.getState() == 4) {
		//upload
		better_than_ul = Math.round(100 - (82 - uiData.ulStatus));
		if (better_than_ul < 1) {
			better_than_ul = 1;
		} else if (better_than_ul > 99) {
			better_than_ul = 99;
		}
		document.getElementById("betterThan_activeMetric_ul").textContent = better_than_ul;
		I("test_loadingNotification_text").textContent = get_translation("perfoming_latest_tests");
	}

	I("dlText").textContent = (status == 1 && uiData.dlStatus == 0) ? "..." : format(uiData.dlStatus);
	drawMeter(I("dlMeter"), mbpsToAmount(Number(uiData.dlStatus * (status == 1 ? oscillate() : 1))), meterBk, dlColor, Number(uiData.dlProgress), progColor);
	I("ulText").textContent = (status == 3 && uiData.ulStatus == 0) ? "..." : format(uiData.ulStatus);
	drawMeter(I("ulMeter"), mbpsToAmount(Number(uiData.ulStatus * (status == 3 ? oscillate() : 1))), meterBk, ulColor, Number(uiData.ulProgress), progColor);
	I("pingText").textContent = format(uiData.pingStatus);
	I("jitText").textContent = format(uiData.jitterStatus);
}

function oscillate() {
	return 1 + 0.02 * Math.sin(Date.now() / 100);
}
//update the UI every frame
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || (function (callback, element) {
	setTimeout(callback, 1000 / 60);
});

function frame() {
	requestAnimationFrame(frame);
	updateUI();
}
frame(); //start frame loop
//function to (re)initialize UI
function initUI() {
	drawMeter(I("dlMeter"), 0, meterBk, dlColor, 0);
	drawMeter(I("ulMeter"), 0, meterBk, ulColor, 0);
	I("dlText").textContent = "";
	I("ulText").textContent = "";
	I("pingText").textContent = "";
	I("jitText").textContent = "";
	I("ip").textContent = "";
}

app_moreAboutMethods.onclick = function () {
	window.location.href = "article-about-methods.html";
};

app__button_shareOnStory.onclick = function () {
	console.log("got click for: share in story");
	window.parent.postMessage({
		type: "vk_story_share",
		imagesrc: "https://deqspeed.herokuapp.com/telemetry/requestimage?id=" + location.hash.substr(1)
	}, '*');
};
app__button_shareOnPage.onclick = function () {
	console.log("got click for: share OnPage");
	averageBetterThan = (better_than_ping + better_than_jitter + better_than_dl + better_than_ul) / 4;
	window.parent.postMessage({
		type: "vk_post_share",
		message: "" + get_translation("vk_posttext_firstpart") + averageBetterThan + "% " + get_translation("vk_posttext_secondpart") + " \n#" + uiData.client_org_cutted.replace(/\s/g, "") + "\n#deqspeed #speedtest #internet",
		url: "https://vk.com/app8045693"
	}, '*');
};

const shareData = {
	title: 'DeqSpeed',
	text: get_translation("yagames_share_aboutapp"),
	url: 'https://yandex.com/games/app/188540'
}

app__shareThisMiniApp.onclick = function () {
	console.log("got click for: share this app");
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
app__button_reloadTest.onclick = function () {
	window.location.reload();
};
console.log("Hello there! Im here. - from [app/main] module.");

var preloader = document.getElementById("preloader-processing");
var page_content = document.getElementById("page-content");
preloader.style.display = "block"
page_content.style.display = "none";

if(window.location.hash == "vk_app") {
    vkBridge.send("VKWebAppStorageGet", {"keys": ["alreadyUsed"]})
        .then(function(data){
            if(data.keys[0].value == "true"){
                //okY
            }else{
                vkBridge.send("VKWebAppStorageSet", {
                    key: "alreadyUsed",
                    value: "true"
                });
            }
            location.replace("run.html")
            
        }).catch(error => console.log(error));
} else {
    if(localStorage.getItem('alreadyUsed') == null){
        //lets show this welcome screen
        preloader.style.display = "none"
        page_content.style.display = "block";
    }else{
        //this user already used this app, so lets take him to app itself
        location.replace("run.html")
    }
}

button_firstUse_letsgo.onclick = function() {
    console.log("Registered on [app/main]: click(button_firstUse_letsgo)");
    if(localStorage.getItem('alreadyUsed') == null){
    	localStorage.setItem('alreadyUsed', 'true');
    	location.replace("run.html")
    }else{
    	location.replace("run.html")
    }
  };
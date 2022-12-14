var lang_data_storage;
var LngObject;

console.log("init of translate.js")

function Translate() { 
    //initialization
    this.init =  function(attribute, lng){
        this.attribute = attribute;
        this.lng = lng;    
    }
    //translate 
    this.process = function(){
                _self = this;
                var xrhFile = new XMLHttpRequest();
                //load content data 
                xrhFile.open("GET", "./resources/lang/"+this.lng+".json", false);
                xrhFile.onreadystatechange = function ()
                {
                    if(xrhFile.readyState === 4)
                    {
                        if(xrhFile.status === 200 || xrhFile.status == 0)
                        {
                            lang_data_storage = xrhFile.responseText;
                            LngObject = JSON.parse(lang_data_storage);
                            perfom_load(_self.attribute);
                     
                        }
                    }
                }
                xrhFile.send();
    }    
}

function perfom_load(attribute){
    //console.log(LngObject["name1"]);
    var allDom = document.getElementsByTagName("*");
    for(var i =0; i < allDom.length; i++){
        var elem = allDom[i];
        var key = elem.getAttribute(attribute);
         
        if(key != null) {
             elem.innerHTML = LngObject[key];
        }
    }
}

function get_translation(key){
    if(key != null) {
        return LngObject[key];
    }
}
var newLocation =  "https://me.captnemo.in:"+document.location.pathname+document.location.search+document.location.hash;
//Only redirect if we are on 80
if(document.location.port===""){
	window.location.replace(newLocation);
}
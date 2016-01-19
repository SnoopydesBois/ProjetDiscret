if(typeof(Worker) !== "undefined") {
	alert("workers are enabled");
	if(typeof(w) == "undefined") {
		w = new Worker("workers.js");
	}
	w.onmessage = function(event){
		document.getElementById("result").innerHTML = event.data;
	}; 
}


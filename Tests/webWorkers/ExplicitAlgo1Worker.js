ExplicitAlgo1Worker.prototype.constructor = ExplicitAlgo1Worker;

function ExplicitAlgo1Worker(explicit_curve, implicit_curve, dimension){
	this.worker = [];
	for (var i = 0; i< 21; i++){
		try{
			this.worker[i] = new Worker ("BAWorker.js");
			this.worker[i].postMessage(i);
		}
		catch(e){
			console.log(i);
			console.log(e);
		}
	}
	console.log("done");
	this.worker[0].terminate();
	//this.worker.onmessage = function(e){
	//};
	//this.worker.postMessage([explicit_curve.getEquation().toString(), implicit_curve, dimension]);
	//console.log(explicit_curve.getEquation().compute([2]));
		//console.log("blah1");
}


// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


ExplicitAlgo2Worker.prototype = new AlgoWorker;
ExplicitAlgo2Worker.prototype.constructor = ExplicitAlgo2Worker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A ExplicitAlgo2Worker contains a nomber of workers that will
 * compute the surface with the Explicit algo with no optimization.
 * 
 * @param {Equation} explicitCurve - The equation for the meridian.
 * @param {Equation} implicitCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function ExplicitAlgo2Worker (explicitCurve, implicitCurve, dimension, surface){
	AlgoWorker.call(this, explicitCurve, implicitCurve, dimension, surface);
	this.worker[0] = new Worker ("Js/Threads/EA2Worker.js");
	this.activeWorkers++;
	var that = this;
	this.worker[0].onmessage = function (e) {
		that.readBuffer(e.data[0], e.data[1]);
		if (e.data.length == 3 && e.data[2] == "Abort") {
			appli.alertMessage("Aborted");
		}
		else if (e.data.length == 3 && e.data[2] == "Terminate") {
			that.worker[0].terminate();
			that.worker[0] = undefined;
			that.activeWorkers--;
			that.finished = true;
		}
	}
	this.worker[0].postMessage (["init", this.meridianCurve,
		this.revolutionCurve, this.dim]);
};




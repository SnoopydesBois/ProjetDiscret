// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


ParametricAlgo2Worker.prototype = AlgoWorker;
ParametricAlgo2Worker.prototype.constructor = ParametricAlgo1Worker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A ParametricAlgo2Worker contains a nomber of workers that will
 * compute the surface with the Parametric algo with no optimization.
 * 
 * @param {DrawnCurve} parametricCurve - The equation for the meridian.
 * @param {Equation} implicitCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function ParametricAlgo2Worker (parametricCurve, implicitCurve, dimension, surface){
	AlgoWorker.call(this, parametricCurve, implicitCurve, dimension, surface);
	this.worker[0] = new Worker ("Js/Threads/PA2Worker.js");
	this.activeWorkers++;
	var that = this;
	this.worker[0].onmessage = function (e) {
		that.readBuffer(e.data[0], e.data[1]);
		if (e.data.length == 3 && e.data[2] == "Terminate") {
			that.worker[0].terminate();
			that.worker[0] = undefined;
			that.activeWorkers--;
			that.finished = true;
		}
	}
	this.worker[0].postMessage (["init", this.meridianCurve,
		this.revolutionCurve, this.dim]);
}


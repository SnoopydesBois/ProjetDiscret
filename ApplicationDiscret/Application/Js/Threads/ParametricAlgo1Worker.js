// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc 
 * A ParametricAlgo1Worker contains a nomber of workers that will
 * compute the surface with the Parametric algo with no optimization.
 */


ParametricAlgo1Worker.prototype = new AlgoWorker;
ParametricAlgo1Worker.prototype.constructor = ParametricAlgo1Worker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A ParametricAlgo1Worker contains a nomber of workers that will
 * compute the surface with the Parametric algo with no optimization.
 * 
 * @param {DrawnCurve} parametricCurve - The equation for the meridian.
 * @param {Equation} implicitCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function ParametricAlgo1Worker (parametricCurve, implicitCurve, dimension, surface){
	AlgoWorker.call(this, parametricCurve, implicitCurve, dimension, surface);
	for (var i = 0; i < 8; ++i){
		this.worker[i] = new Worker ("Js/Threads/PA1Worker.js");
		this.activeWorkers++;
		var that = this
		this.worker[i].onmessage = function(e){
			if (e.data[0] === "Abort") {
				appli.alertMessage("Aborted");
				that.finished = "error";
			}
			else if (e.data[0] === "Terminate") {
				that.worker[e.data[1]].terminate();
				that.worker[e.data[1]] = undefined;
				--that.activeWorkers;
				if (that.activeWorkers == 0 && that.finished != "error"){
					that.finished = true;
				}
			} else {
				that.readBuffer(e.data[0], e.data[1]);
			}
		};
		this.worker[i].postMessage([i, this.meridianCurve,
			this.revolutionCurve, this.dim,
			i * Math.floor ((parametricCurve.getMaxT() + 7) / 8),
			(i + 1) * Math.floor ((parametricCurve.getMaxT() + 7) / 8)
		]);
	}
};







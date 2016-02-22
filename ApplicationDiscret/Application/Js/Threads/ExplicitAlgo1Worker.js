// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


ExplicitAlgo1Worker.prototype = new AlgoWorker;
ExplicitAlgo1Worker.prototype.constructor = ExplicitAlgo1Worker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A ExplicitAlgo1Worker contains a nomber of workers that will
 * compute the surface with the Explicit algo with no optimization.
 * 
 * @param {Equation} explicitCurve - The equation for the meridian.
 * @param {Equation} implicitCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function ExplicitAlgo1Worker (explicitCurve, implicitCurve, dimension, surface){
	AlgoWorker.call(this, explicitCurve, implicitCurve, dimension, surface);
	for (var i = 0; i < 8; ++i){
		this.worker[i] = new Worker ("Js/Threads/EA1Worker.js");
		this.activeWorkers++;
		var that = this
		this.worker[i].onmessage = function(e){
			if (e.data[0] === "Abort") {
				that.finished = "error"
				appli.alertMessage("Aborted");
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
			i * Math.floor ((this.dim[2] + 7) / 8),
			(i + 1) * Math.floor ((this.dim[2] + 7) / 8)
		]);
	}
}







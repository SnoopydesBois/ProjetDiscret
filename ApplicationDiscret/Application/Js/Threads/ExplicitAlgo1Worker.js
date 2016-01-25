// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


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
	/**
	 * {Surface} TODO
	 */
	this.surface = surface;
	
	/**
	 * {boolean} TODO
	 */
	this.finished = false;
	
	/**
	 * {int} TODO
	 */
	this.activeWorkers = 0;
	
	/**
	 * {Array} TODO FIXME transformer type en "type[]"
	 */
	this.worker = [];
	
	/**
	 * {boolean} TODO
	 */
	this.newVoxels = true;
	
	
	var eq1 = explicitCurve.toStringNoParam();
	var eq2 = implicitCurve.toStringNoParam();
	var dim = dimension.m;
	for (var i = 0; i < 8; ++i){
		this.worker[i] = new Worker ("Js/Threads/EA1Worker.js");
		this.activeWorkers++;
		var that = this
		this.worker[i].onmessage = function(e){
			if (e.data[0] === "Terminate") {
				that.worker[e.data[1]].terminate();
				that.worker[e.data[1]] = undefined;
				--that.activeWorkers;
				if (that.activeWorkers == 0){
					that.finished = true;
				}
			} else {
				that.readBuffer(e.data[0], e.data[1]);
			}
		};
		this.worker[i].postMessage([i, eq1, eq2, dim, 
			i * Math.floor ((dim[2] + 7) / 8), 
			(i + 1) * Math.floor ((dim[2] + 7) / 8)
		]);
	}
}



//##############################################################################
//	Other methods
//##############################################################################



/**
 * This method add the voxels contained in a buffer every time a new message
 * is received from a worker.
 * 
 * @param {Array[]} buffer - A buffer containing voxel. Each voxel is an array:
 * [x, y, z, connexity]
 * @param {int} size - Size of the buffer.
 * 
 * @return {void}
 */
ExplicitAlgo1Worker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i){
		var voxel = buffer[i];
		this.surface.addVoxel(new Vector(voxel[0],voxel[1],voxel[2]), voxel[3]);
	}
	this.newVoxels = true;
};



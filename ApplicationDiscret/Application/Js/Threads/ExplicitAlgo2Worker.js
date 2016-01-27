// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


ExplicitAlgo2Worker.prototype.constructor = ExplicitAlgo1Worker;



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
	
	/**
	 * {Surface} The surface to draw.
	 */
	this.surface = surface;
	
	/**
	 * {boolean} whether the algorithm has finished
	 */
	this.finished = false;
	
	/**
	 * {Array} TODO FIXME transformer type en "type[]"
	 */
	this.worker = [];
	
	/**
	 * {boolean} whether there are new voxels for the application to draw
	 */
	this.newVoxels = true;
	
	
	var eq1 = explicitCurve.toStringNoParam();
	var eq2 = implicitCurve.toStringNoParam();
	var dim = dimension.m;
	this.worker = new Worker ("Js/Threads/EA2Worker.js");
	var that = this;
	this.worker.onmessage = function (e) {
		that.readBuffer(e.data[0], e.data[1]);
		if (e.data.length == 3 && e.data[2] == "Terminate") {
			that.worker.terminate();
			that.worker[e.data[1]] = undefined;
			that.finished = true;
		}
	}
	this.worker.postMessage ([eq1, eq2, dim]);
}



//##############################################################################
//	Other methods
//##############################################################################



/**
 * This method add the voxels contained in a buffer every time a new message
 * is received from a worker.
 * 
 * @param {Array[]} buffer - A buffer containing voxel. Each voxel is an array:
 * [x, y, z, connexity].
 * @param {int} size - Size of the buffer.
 * 
 * @return {void}
 */
ExplicitAlgo2Worker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i) {
		var voxel = buffer[i];
		this.surface.addVoxel(new Vector(voxel[0],voxel[1],voxel[2]), voxel[3]);
	}
	this.newVoxels = true;
};



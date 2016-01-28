AlgoWorker.prototype.constructor = AlgoWorker;

/**
 * @constructor 
 * A ExplicitAlgo1Worker contains a nomber of workers that will
 * compute the surface with the Explicit algo with no optimization.
 * 
 * @param {Equation} meridianCurve - The equation for the meridian.
 * @param {Equation} revolutionCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function AlgoWorker (meridianCurve, revolutionCurve, dimension, surface){
	/**
	 * {Surface} The surface to draw.
	 */
	this.surface = surface;
	
	/**
	 * {boolean} whether the algorithm has finished
	 */
	this.finished = false;
	
	/**
	 * {int} nb of workers that are still active
	 */
	this.activeWorkers = 0;
	
	/**
	 * {Array} TODO FIXME transformer type en "type[]"
	 */
	this.worker = [];
	
	/**
	 * {boolean} whether there are new voxels for the application to draw
	 */
	this.newVoxels = true;
	
	
	this.meridianCurve = meridianCurve.toStringNoParam();
	this.revolutionCurve = revolutionCurve.toStringNoParam();
	this.dim = dimension.m;
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
AlgoWorker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i){
		var voxel = buffer[i];
		this.surface.addVoxel(new Vector(voxel[0],voxel[1],voxel[2]), voxel[3]);
	}
	this.newVoxels = true;
};


/**
 * This method tells whether the algorithm finished computing.
 * 
 * @return {boolean} true if the algorithm finished.
 */
AlgoWorker.prototype.readBuffer = function (buffer, size) {
	return this.finished;
};

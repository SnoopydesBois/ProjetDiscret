/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @abstract
 * @classdesc An AlgoWorker contains a number of workers that will compute the surface.
 * This class is abstract and the algorithm used shall be defined in the
 * subclasses.
 */
AlgoWorker.prototype.constructor = AlgoWorker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A AlgoWorker contains a number of workers that will compute the surface.
 * This class is abstract and the algorithm used shall be defined in the
 * subclass.
 * 
 * @param {(Equation | DrawnCurve)} meridianCurve - The equation for the
 * meridian.
 * @param {Equation} revolutionCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function AlgoWorker (meridianCurve, revolutionCurve, dimension, surface) {
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
	 * {(Stirng | Number[][2])} TODO
	 */
	this.meridianCurve = null;
	if (meridianCurve instanceof Equation) {
		this.meridianCurve = meridianCurve.toStringNoParam ();
	}
	else if (meridianCurve instanceof DrawnCurve) {
		this.meridianCurve = [meridianCurve.xList, meridianCurve.yList];
	}
	
	this.revolutionCurve = 
		(revolutionCurve ? revolutionCurve.toStringNoParam() : "");
	
	/**
	 * {float[3]} The dimension of the 3D space.
	 */
	this.dim = (dimension ? dimension.m : null);
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * This method add the voxels contained in a buffer every time a new message
 * is received from a worker.
 * 
 * @param {Number[4][]} buffer - A buffer containing voxel. Each voxel is an
 * array: [x, y, z, connexity]
 * @param {int} size - Size of the buffer.
 * 
 * @return {void}
 */
AlgoWorker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i){
		var voxel = buffer[i];
		try {
			this.surface.addVoxel (new Vector (voxel[0], voxel[1], voxel[2]),
				voxel[3]);
		}
		catch (e) {
			appli.alertMessage ("Somevoxels were out of the bounds and will "
				+ "not be dispalyed");
			console.log ("Some voxels are out of the bounds");
		}
	}
};



ExplicitAlgo2Worker.prototype.constructor = ExplicitAlgo1Worker;

/**
 * @Constructor A ExplicitAlgoWorker contains a nomber of workers that will
 * compute the surface with the Explicit algo with no optimization.
 * @param {Equation} explicitCurve - the equation for the meridian.
 * @param {Equation} implicitCurve - the equation for the revolution curve.
 * @param {Vector} dimension - the space dimensions
 * @param {Surface} surface - the surface to draw
 */
function ExplicitAlgo2Worker(explicitCurve, implicitCurve, dimension, surface ){
	this.surface = surface;
	this.finished = false;
	this.worker = [];
	var eq1 = explicitCurve.toStringNoParam();
	var eq2 = implicitCurve.toStringNoParam();
	var dim = dimension.m;
	this.worker = new Worker ("Js/Threads/EA2Worker.js");
	var that = this;
	this.worker.onmessage = function(e){
		that.readBuffer(e.data[0], e.data[1]);
		if (e.data.length == 3 && e.data[2] == "Terminate") {
			that.worker.terminate();
			that.worker[e.data[1]] = undefined;
			that.finished = true;
		}
	}
	this.worker.postMessage([eq1, eq2, dim]);
}

/**
 * This method add the voxels contained in a buffer every time a new message
 * is received from a worker
 * @param {Array[]} buffer - a buffer containing voxel. Each voxel is an array :
 * [x, y, z, connexity]
 * @param {Integer} size - size of the buffer
 */
ExplicitAlgo2Worker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i){
		var voxel = buffer[i];
		this.surface.addVoxel(new Vector(voxel[0],voxel[1],voxel[2]), voxel[3]);
	}
}

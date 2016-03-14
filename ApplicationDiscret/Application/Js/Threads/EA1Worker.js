// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



//##############################################################################
//	Script import
//##############################################################################



importScripts("WorkersUtil.js");



//##############################################################################
//	Global variables
//##############################################################################



/*
 * Impossible de faire une classe pour un worker donc toutes les variables 
 * suivantes sont globales
 */
 
/**
 * {int} id - The id of the worker.
 */ 
var id;
/**
 * {Vector} dimension - The dimensions of the 3D space.
 */
var dimension;
/**
 * {Equation} implicit_curve - The equation for the directrix.
 */
var implicit_curve;
/**
 * {Equation} explicit_curve - The curve for the generatrix.
 */
var explicit_curve;
/**
 * {Int} zMin - The minimum value of z this worker has to work with.
 */
var zMin;
/**
 * {Int} zMax - The maximum value of z this worker has to work with.
 */
var zMax;


//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions whith no optimisation.
 * 
 * @return {void}
 */
function algo () {
	var dimx = dimension.x;
	var dimy = dimension.y;
	var dimz = dimension.z;
	var maxx = Math.trunc(dimx / 2);
	var maxy = Math.trunc(dimy / 2);
	zMax = Math.min(zMax, dimz);
	for (var z = zMin; z < zMax; ++z) {
		var rz = explicit_curve.compute([z]);
		if (rz == 0) rz+=0.01;
		var rz1 = explicit_curve.compute([z - 0.5]);
		if (rz1 == 0) rz1+=0.01;
		var rz2 = explicit_curve.compute([z + 0.5]);
		if (rz2 == 0) rz2+=0.01;
		var buffer = [];
		var bufferSize = 0;
		for (var y = 0; y < dimy; y++){
			for (var x = 0; x < dimx; x++){
				connexity = checkVoxel(implicit_curve, x - maxx, y - maxy, [rz, rz1, rz2]);
				if(connexity != 0){
					buffer.push([x,y,z,connexity]);
					bufferSize ++;
				}
			} // end for x
		} // end for y
		if(bufferSize !=0)
			postMessage([buffer, bufferSize]);
	} // end for z
};


//==============================================================================
/**
 * Receive the meridian, revolution curve and dimension, then launch algorithm
 * and ask for termination.
 * 
 * @param {Event} e - e.data contains the message received.
 * 
 * @return {void}
 */
onmessage = function (e) {
	id = e.data[0];
	explicit_curve = new Equation (e.data[1]);
	implicit_curve = new Equation (e.data[2]);
	dimension = new Vector(e.data[3]);
	zMin = e.data[4];
	zMax = e.data[5];
	try{
		algo();
	}
	catch(e){
		postMessage(["Abort"]);
	}
	postMessage(["Terminate", id]);
};



// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



//##############################################################################
//	Script import
//##############################################################################



importScripts("../Libraries/math.js");
importScripts("../Objects/Equation.js");
importScripts("../Objects/Vector.js");
importScripts("../Enum/ConnexityEnum.js");



//##############################################################################
//	Global variables
//##############################################################################



/* TODO c'est quoi ces variables, pourquoi elles sont globales ?
 */
var id;
var dimension;
var implicit_curve;
var explicit_curve;
var zMin;
var zMax;



//##############################################################################
//	Functions
//##############################################################################



/**
 * Return true if the array has positives AND negative values else return false.
 * 
 * @param {float[]} tab - The array to be tested.
 * 
 * @return {boolean} True if one of values is negative and one of other values
 * is positive, false otherwise. If all values in the array are 0, the function
 * return true.
 */
function arrayPosNeg (tab) {
	var length = tab.length;
	var neg = false;
	var pos = false;
	for (var i = 0; i < length; ++i){
		neg = neg || tab[i] <= 0;
		pos = pos || tab[i] >= 0;
	}
	return neg && pos;
}


//==============================================================================
/**
 * Check whether a voxel is part of the 26 connexe revolution surface.
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} z - z array containing f(z), f(z-0.5), f(z+0.5), f being
 * the equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 26 connexe, false otherwise.
 */
function check26Connex (implicit_curve, x, y, z) {
	var values = [];
	
	values[0] = implicit_curve.compute ([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[1] = implicit_curve.compute ([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[2] = implicit_curve.compute ([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[3] = implicit_curve.compute ([(x-0.5)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute ([(x+0.5)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute ([(x-0.5)/z[1], (y)/z[1]]);
	values[6] = implicit_curve.compute ([(x)/z[1], (y+0.5)/z[1]]);
	values[7] = implicit_curve.compute ([(x)/z[1], (y-0.5)/z[1]]);
	values[8] = implicit_curve.compute ([(x+0.5)/z[2], (y)/z[2]]);
	values[9] = implicit_curve.compute ([(x-0.5)/z[2], (y)/z[2]]);
	values[10] = implicit_curve.compute ([(x)/z[2], (y+0.5)/z[2]]);
	values[11] = implicit_curve.compute ([(x)/z[2], (y-0.5)/z[2]]);

	return arrayPosNeg (values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 18 connexe revolution surface.
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} - z array containing f(z), f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 18 connexe, false otherwise.
 */
function check18Connex (implicit_curve, x, y, z) {
	var values = [];
	
	values[0] = implicit_curve.compute ([(x+0.5)/z[0], (y)/z[0]]);
	values[1] = implicit_curve.compute ([(x-0.5)/z[0], (y)/z[0]]);
	values[2] = implicit_curve.compute ([(x)/z[0], (y+0.5)/z[0]]);
	values[3] = implicit_curve.compute ([(x)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute ([(x)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute ([(x)/z[2], (y)/z[2]]);

	return arrayPosNeg(values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 6 connexe revolution surface.
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[2]} - z array containing f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 6 connexe, false otherwise.
 */
function check6Connex (implicit_curve, x, y, z) {
	var values = [];
	
	values[0] = implicit_curve.compute ([(x+0.5)/z[1], (y+0.5)/z[1]]);
	values[1] = implicit_curve.compute ([(x-0.5)/z[1], (y+0.5)/z[1]]);
	values[2] = implicit_curve.compute ([(x+0.5)/z[1], (y-0.5)/z[1]]);
	values[3] = implicit_curve.compute ([(x-0.5)/z[1], (y-0.5)/z[1]]);
	values[4] = implicit_curve.compute ([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[5] = implicit_curve.compute ([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[6] = implicit_curve.compute ([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[7] = implicit_curve.compute ([(x-0.5)/z[0], (y-0.5)/z[0]]);
	
	return arrayPosNeg (values);
}


//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions.
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
				if (check26Connex(implicit_curve, x - maxx, y - maxy, [rz, rz1, rz2])){
					buffer.push([x, y, z, ConnexityEnum.C26]);
					bufferSize++;
				} else if (check18Connex(implicit_curve, x - maxx, y - maxy, [rz, rz1, rz2])) {
					buffer.push([x, y, z, ConnexityEnum.C18]);
					bufferSize++;
				} else if (check6Connex(implicit_curve, x - maxx, y - maxy, [rz1, rz2])){
					buffer.push([x, y, z, ConnexityEnum.C6]);
					bufferSize++;
				}
			} // end for x
		} // end for y
		if(bufferSize !=0)
			postMessage([buffer, bufferSize]);
	} // end for z
}


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
	algo();
	postMessage(["Terminate", id]);
}



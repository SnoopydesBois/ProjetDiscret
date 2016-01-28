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
importScripts("WorkersUtil.js");



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



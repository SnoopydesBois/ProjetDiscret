// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



//##############################################################################
//	Script import
//##############################################################################



importScripts("WorkersUtil.js");
importScripts("../Objects/Curve.js");
importScripts("../Objects/DrawnCurve.js");



//##############################################################################
//	Global variables
//##############################################################################



/* TODO c'est quoi ces variables, pourquoi elles sont globales ?
 */
var id;
var dimension;
var implicit_curve;
var parametric_curve;
var tMin;
var tMax;


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
	var dimt = parametric_curve.getMaxT();
	var maxx = Math.trunc(dimx / 2);
	var maxy = Math.trunc(dimy / 2);
	tMax = Math.min(tMax, dimt);
	for (var t = 0; t < tMax; ++t) {
		var z =  Math.floor(parametric_curve.getY(t) + 0.5);
		var rz = parametric_curve.getX(t);
		if (rz == 0) rz+=0.01;
		var rz1 = parametric_curve.getX(t - 0.5);
		if (rz1 == 0) rz1+=0.01;
		var rz2 = parametric_curve.getX(t + 0.5);
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
	parametric_curve = new DrawnCurve ();
	parametric_curve.xList = e.data[1][0];
	parametric_curve.yList = e.data[1][1];
	implicit_curve = new Equation (e.data[2]);
	dimension = new Vector(e.data[3]);
	tMin = e.data[4];
	tMax = e.data[5];
	try{
		algo();
	}
	catch(e){
		postMessage(["Abort"]);
	}
	algo();
	postMessage(["Terminate", id]);
};



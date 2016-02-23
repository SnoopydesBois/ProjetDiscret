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
var dimension;
var implicit_curve;
var parametric_curve;
var checked = [];
var dimx;
var dimy;
var dimt;
var values;
var pile = [];





//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions.
 * 
 * @return {void}
 */
function algo () {
	var maxx = Math.trunc(dimx / 2);
	var maxy = Math.trunc(dimy / 2);
	var buffer = [];
	var bufferSize = 0;
	var tValues = [];
	var connexity = "";
	var x, y, t, z;
	//find first voxel
	for (t = 0; t < dimt && bufferSize === 0; ++z) {
		tValues[t] = [];
		tValues[t][0] = parametric_curve.getX(t);
		if (tValues[t][0] === 0) tValues[t][0]=0.001;
		tValues[t][1] = parametric_curve.getX(t - 0.5);
		if (tValues[t][1] === 0) tValues[t][1]=0.001;
		tValues[t][2] = parametric_curve.getX(t + 0.5);
		if (tValues[t][2] === 0) tValues[t][2]=0.001;
		z = Math.floor(parametric_curve.getY(t));
		for (y = 0; y < dimy && bufferSize === 0; ++y){
			for (x = 0; x < dimx && bufferSize === 0; ++x){
				connexity = checkVoxel(implicit_curve, x - maxx, y - maxy, tValues[t]);
				if(connexity !== 0){
					buffer.push([x, y, z, connexity]);
					bufferSize++;
					addNeighboursToPile(x,y,t,pile, checked, dimx, dimy, dimt);
				}
				checked[x][y][t] = true;
			} // end for x
		} // end for y
	} // end for z
	//Incrementation
	var voxel;
	while(pile.length > 0){
		if(bufferSize >= 1000){
			postMessage([buffer, bufferSize]);
			buffer = [];
			bufferSize = 0;
		}
		voxel = pile.pop();
		checked[voxel[0]][voxel[1]][voxel[2]] = true;
		//postMessage(["checkedVoxels"], checked);
		if(tValues[voxel[2]] == undefined){
			tValues[voxel[2]] = [];
			tValues[voxel[2]][0] = parametric_curve.getX([voxel[2]]);
			if (tValues[voxel[2]][0] == 0) tValues[voxel[2]][0]=0.01;
			tValues[voxel[2]][1] = parametric_curve.getX([voxel[2] - 0.5]);
			if (tValues[voxel[2]][1] == 0) tValues[voxel[2]][1]=0.01;
			tValues[voxel[2]][2] = parametric_curve.getX([voxel[2] + 0.5]);
			if (tValues[voxel[2]][2] == 0) tValues[voxel[2]][2]=0.01;
		}
		connexity = checkVoxel(implicit_curve, voxel[0] - maxx, voxel[1] - maxy, tValues[voxel[2]]);
		if(connexity !== 0){
			buffer.push([voxel[0], voxel[1], Math.floor(parametric_curve.getY(voxel[2])), connexity]);
			bufferSize++;
			addNeighboursToPile(voxel[0],voxel[1],voxel[2],pile, checked, dimx, dimy, dimt);
		}
	}
	//post last buffer
	postMessage([buffer, bufferSize,"Terminate"]);
}


function init(e) {
	parametric_curve = new DrawnCurve ();
	parametric_curve.xList = e.data[0][0];
	parametric_curve.yList = e.data[0][1];
	implicit_curve = new Equation (e.data[1]);
	dimension = new Vector(e.data[2]);
	dimx = dimension.x;
	dimy = dimension.y;
	dimt = parametric_curve.getMaxT();
	var x, y, t;
	for (x = 0; x < dimx; ++x) {
		checked[x] = [];
		for (y = 0; y < dimy; ++y) {
			checked[x][y] = [];
			for (t = 0; t < dimt; ++t) {
				checked[x][y][t] = false;
			}
		}
	}
	try{
		algo();
	}
	catch(e){
		console.log(e);
		postMessage([[], 0,"Abort"]);
		postMessage([[], 0,"Terminate"]);
	}
}

//==============================================================================
/**
 * Receive the meridian, revolution curve and dimension, then launch algorithm
 * and ask for termination
 * 
 * @param {Event} e - e.data contains the message received.
 * 
 * @return {void}
 */
onmessage = function (e) {
	if(e.data[0] === "init"){
		e.data.splice(0,1);
		init(e);
	}
	else if(e.data[0] === "checkedVoxels"){
		checkedVoxels = e.data[1];
	}
	else if(e.data[0] === "pile"){
		pile = e.data[1];
	}
}



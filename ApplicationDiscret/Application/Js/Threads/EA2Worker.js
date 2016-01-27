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
var dimension;
var implicit_curve;
var explicit_curve;
var checked = [];
var dimx;
var dimy;
var dimz;
var values;



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
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} z - z array containing f(z), f(z-0.5), f(z+0.5), f being
 * the equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 26 connexe, false otherwise.
 */
function check26Connex (implicit_curve, x, y, z){
	values = [];
	
	values[0] = implicit_curve.compute([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[2] = implicit_curve.compute([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[3] = implicit_curve.compute([(x-0.5)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute([(x+0.5)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute([(x-0.5)/z[1], (y)/z[1]]);
	values[6] = implicit_curve.compute([(x)/z[1], (y+0.5)/z[1]]);
	values[7] = implicit_curve.compute([(x)/z[1], (y-0.5)/z[1]]);
	values[8] = implicit_curve.compute([(x+0.5)/z[2], (y)/z[2]]);
	values[9] = implicit_curve.compute([(x-0.5)/z[2], (y)/z[2]]);
	values[10] = implicit_curve.compute([(x)/z[2], (y+0.5)/z[2]]);
	values[11] = implicit_curve.compute([(x)/z[2], (y-0.5)/z[2]]);

	return arrayPosNeg (values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 18 connexe revolution surface.
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel.
 * @param {int} y - y coordinate of the voxel.
 * @param {float[3]} - z array containing f(z), f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 18 connexe, false otherwise.
 */
function check18Connex (implicit_curve, x, y, z){
	values = [];
	
	values[0] = implicit_curve.compute([(x+0.5)/z[0], (y)/z[0]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[0], (y)/z[0]]);
	values[2] = implicit_curve.compute([(x)/z[0], (y+0.5)/z[0]]);
	values[3] = implicit_curve.compute([(x)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute([(x)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute([(x)/z[2], (y)/z[2]]);

	return arrayPosNeg (values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 6 connexe revolution surface.
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel.
 * @param {int} y - y coordinate of the voxel.
 * @param {float[2]} - z array containing f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 *
 * @return {boolean} True if the voxel is 6 connexe, false otherwise.
 */
function check6Connex (implicit_curve, x, y, z){
	values = [];
	
	values[0] = implicit_curve.compute([(x+0.5)/z[1], (y+0.5)/z[1]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[1], (y+0.5)/z[1]]);
	values[2] = implicit_curve.compute([(x+0.5)/z[1], (y-0.5)/z[1]]);
	values[3] = implicit_curve.compute([(x-0.5)/z[1], (y-0.5)/z[1]]);
	values[4] = implicit_curve.compute([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[5] = implicit_curve.compute([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[6] = implicit_curve.compute([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[7] = implicit_curve.compute([(x-0.5)/z[0], (y-0.5)/z[0]]);
	
	return arrayPosNeg (values);
}


//==============================================================================
/**
 * check every connexity for the voxel
 * 
 * @param {int} x - The x coordinate of the voxel
 * @param {int} y - The y coordinate of the voxel
 * @param {int} z - The z coordinate of the voxel
 * @return {(ConnexityEnum | boolean)} returns false if the voxel doesnt belong
 * to the surface, else the corresponding connexity
 */
function checkVoxel (x, y, z) {
	var res;
	if (check26Connex(implicit_curve, x, y, z)){
		return ConnexityEnum.C26;
	} else if (check18Connex(implicit_curve, x, y, z)) {
		return ConnexityEnum.C18;
	} else if (check6Connex(implicit_curve,  x, y, [z[1],z[2]])){
		return ConnexityEnum.C6;
	} else return false;
}


//==============================================================================
/**
 * Add every neighbours of the voxel (x,y,z) to the pile.
 * @param {int} x - The x coordinate of the voxel
 * @param {int} y - The y coordinate of the voxel
 * @param {int} z - The z coordinate of the voxel
 * @param {array} pile - The pile coordinate where the new voxels are added.
 * 
 * @return {void}
 */
function addNeighboursToPile (x, y, z, pile) {
	if(x-1 >= 0 && !checked[x-1][y][z])
		pile.push([x-1, y, z]);
	if(x+1 < dimx && !checked[x+1][y][z])
		pile.push([x+1, y, z]);
	if(y-1 >= 0 && !checked[x][y-1][z])
		pile.push([x, y-1, z]);
	if(y+1 < dimy && !checked[x][y+1][z])
		pile.push([x, y+1, z]);
	if(z-1 >= 0 && !checked[x][y][z-1])
		pile.push([x, y, z-1]);
	if(z+1 < dimz && !checked[x][y][z+1])
		pile.push([x, y, z+1]);
}


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
	var pile = [];
	var zValues = [];
	var connexity = "";
	var x, y, z;
	//find first voxel
	for (z = 0; z < dimz && bufferSize === 0; ++z) {
		zValues[z] = [];
		zValues[z][0] = explicit_curve.compute([z]);
		if (zValues[z][0] === 0) zValues[z][0]=0.001;
		zValues[z][1] = explicit_curve.compute([z - 0.5]);
		if (zValues[z][1] === 0) zValues[z][1]=0.001;
		zValues[z][2] = explicit_curve.compute([z + 0.5]);
		if (zValues[z][2] === 0) zValues[z][2]=0.001;
		for (y = 0; y < dimy && bufferSize === 0; ++y){
			for (x = 0; x < dimx && bufferSize === 0; ++x){
				connexity = checkVoxel(x - maxx, y - maxy, zValues[z]);
				if(connexity !== false){
					buffer.push([x, y, z, connexity]);
					bufferSize++;
					addNeighboursToPile(x,y,z,pile);
				}
				checked[x][y][z] = true;
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
		if(zValues[voxel[2]] == undefined){
			zValues[voxel[2]] = [];
			zValues[voxel[2]][0] = explicit_curve.compute([voxel[2]]);
			if (zValues[voxel[2]][0] == 0) zValues[voxel[2]][0]=0.01;
			zValues[voxel[2]][1] = explicit_curve.compute([voxel[2] - 0.5]);
			if (zValues[voxel[2]][1] == 0) zValues[voxel[2]][1]=0.01;
			zValues[voxel[2]][2] = explicit_curve.compute([voxel[2] + 0.5]);
			if (zValues[voxel[2]][2] == 0) zValues[voxel[2]][2]=0.01;
		}
		connexity = checkVoxel(voxel[0] - maxx, voxel[1] - maxy, zValues[voxel[2]]);
		if(connexity !== false){
			buffer.push([voxel[0], voxel[1], voxel[2], connexity]);
			bufferSize++;
			addNeighboursToPile(voxel[0],voxel[1],voxel[2],pile);
		}
	}
	//post last buffer
	postMessage([buffer, bufferSize,"Terminate"]);
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
	explicit_curve = new Equation (e.data[0]);
	implicit_curve = new Equation (e.data[1]);
	dimension = new Vector(e.data[2]);
	dimx = dimension.x;
	dimy = dimension.y;
	dimz = dimension.z;
	var x, y, z;
	for (x = 0; x < dimx; ++x) {
		checked[x] = [];
		for (y = 0; y < dimy; ++y) {
			checked[x][y] = [];
			for (z = 0; z < dimz; ++z) {
				checked[x][y][z] = null;
			}
		}
	}
	algo();
}



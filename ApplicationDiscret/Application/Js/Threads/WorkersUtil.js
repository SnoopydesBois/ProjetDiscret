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
//	Functions
//##############################################################################



/**
 * Returns true if the array has positives AND negative values else return false.
 * 
 * @param {float[]} tab - The array to be tested.
 * 
 * @return {boolean} True if one of values is negative and one of other values
 * is positive, false otherwise. If at least one value in the array is 0, the function
 * returns true.
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
};


//==============================================================================
/**
 * Checks whether a voxel is part of the 18 connexe revolution surface.
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} z - z array containing f(z), f(z-0.5), f(z+0.5), f being
 * the equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 18 connexe, false otherwise.
 */
function check18Connex (implicit_curve, x, y, z){
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
};


//==============================================================================
/**
 * Checks whether a voxel is part of the 26 connexe revolution surface.
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel.
 * @param {int} y - y coordinate of the voxel.
 * @param {float[3]} - z array containing f(z), f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is 26 connexe, false otherwise.
 */
function check26Connex (implicit_curve, x, y, z){
	values = [];
	
	values[0] = implicit_curve.compute([(x+0.5)/z[0], (y)/z[0]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[0], (y)/z[0]]);
	values[2] = implicit_curve.compute([(x)/z[0], (y+0.5)/z[0]]);
	values[3] = implicit_curve.compute([(x)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute([(x)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute([(x)/z[2], (y)/z[2]]);

	return arrayPosNeg (values);
};


//==============================================================================
/**
 * Checks whether a voxel is part of the 6 connexe revolution surface.
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
};


//==============================================================================
/**
 * Checks every connexity for the voxel
 * 
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - The x coordinate of the voxel
 * @param {int} y - The y coordinate of the voxel
 * @param {int} z - The z coordinate of the voxel
 * @return {(ConnexityEnum | boolean)} returns false if the voxel does not belong
 * to the surface, else the corresponding connexity
 */
function checkVoxel (implicit_curve, x, y, z) {
	var res = 0;
	if (check26Connex(implicit_curve, x, y, z)){
		res |= ConnexityEnum.C26;
	} 
	if (check18Connex(implicit_curve, x, y, z)) {
		res |= ConnexityEnum.C18;
	} 
	if (check6Connex(implicit_curve,  x, y, [z[1],z[2]])){
		res |= ConnexityEnum.C6;
	}
	return res;
};


//==============================================================================
/**
 * Adds every neighbours of the voxel (x,y,z) to the pile.
 * @param {int} x - The x coordinate of the voxel
 * @param {int} y - The y coordinate of the voxel
 * @param {int} z - The z coordinate of the voxel
 * @param {float[][3]} pile - The pile coordinate where the new voxels are added.
 * @param {boolean[dimx][dimy][dimz]} checked - The array recording whether a voxel has already been checked.
 * @param {int} dimx - The max+1 value for the x coordinate
 * @param {int} dimy - The max+1 value for the y coordinate
 * @param {int} dimz - The max+1 value for the z coordinate
 * 
 * @return {void}
 */
function addNeighboursToPile (x, y, z, pile, checked, dimx, dimy, dimz) {
	if(x-1 >= 0 && !checked[x-1][y][z]){
		checked[x-1][y][z] = true;
		pile.push([x-1, y, z]);
	}
	if(x+1 < dimx && !checked[x+1][y][z]){
		checked[x+1][y][z] = true;
		pile.push([x+1, y, z]);
	}
	if(y-1 >= 0 && !checked[x][y-1][z]){
		checked[x][y-1][z] = true;
		pile.push([x, y-1, z]);
	}
	if(y+1 < dimy && !checked[x][y+1][z]){
		checked[x][y+1][z] = true;
		pile.push([x, y+1, z]);
	}
	if(z-1 >= 0 && !checked[x][y][z-1]){
		checked[x][y][z-1] = true;
		pile.push([x, y, z-1]);
	}
	if(z+1 < dimz && !checked[x][y][z+1]){
		checked[x][y][z+1] = true;
		pile.push([x, y, z+1]);
	}
};

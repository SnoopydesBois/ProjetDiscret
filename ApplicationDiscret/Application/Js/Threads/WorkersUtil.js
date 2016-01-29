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
 * Check whether a voxel is part of the 18 connexe revolution surface.
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
}


//==============================================================================
/**
 * Check whether a voxel is part of the 26 connexe revolution surface.
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
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - The x coordinate of the voxel
 * @param {int} y - The y coordinate of the voxel
 * @param {int} z - The z coordinate of the voxel
 * @return {(ConnexityEnum | boolean)} returns false if the voxel doesnt belong
 * to the surface, else the corresponding connexity
 */
function checkVoxel (implicit_curve, x, y, z) {
	var res = 0;
	if (check26Connex(implicit_curve, x, y, z)){
		res |= ConnexityEnum.C26;
	} if (check18Connex(implicit_curve, x, y, z)) {
		res |= ConnexityEnum.C18;
	} if (check6Connex(implicit_curve,  x, y, [z[1],z[2]])){
		res |= ConnexityEnum.C6;
	}
	return res;
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
function addNeighboursToPile (x, y, z, pile, checked) {
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
}
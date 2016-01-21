importScripts("../Libraries/math.js");
importScripts("../Objects/Equation.js");
importScripts("../Objects/Vector.js");
importScripts("../Enum/ConnexityEnum.js");

var dimension;
var implicit_curve;
var explicit_curve;
var checked = [];
var dimx;
var dimy;
var dimz;

//==============================================================================
/**
 * Return true if the array has positives AND negative values else return false.
 * @param {float[]} tab - The array to be tested.
 */
function arrayPosNeg (tab){
	var length = tab.length;
	var neg = false;
	var pos = false;
	for (var i = 0; i < length; i++){
		neg = neg || tab[i] <= 0;
		pos = pos || tab[i] >= 0;
	}
	return neg && pos;
};


//==============================================================================
/**
 * Check whether a voxel is part of the 26 connexe revolution surface.
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} z - z array containing f(z), f(z-0.5), f(z+0.5), f being
 * the equation of the meridian and z the coordinate of the voxel.
 */
function check26Connex (implicit_curve, x, y, z){
	var values = [];
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
 * @param {Equation} implicit_curve - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} - z array containing f(z), f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 */
function check18Connex(implicit_curve, x, y, z){
	var values = [];
	values[0] = implicit_curve.compute([(x+0.5)/z[0], (y)/z[0]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[0], (y)/z[0]]);
	values[2] = implicit_curve.compute([(x)/z[0], (y+0.5)/z[0]]);
	values[3] = implicit_curve.compute([(x)/z[0], (y-0.5)/z[0]]);
	values[4] = implicit_curve.compute([(x)/z[1], (y)/z[1]]);
	values[5] = implicit_curve.compute([(x)/z[2], (y)/z[2]]);

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
 */
function check6Connex(implicit_curve, x, y, z){
	var values = [];
	values[0] = implicit_curve.compute([(x+0.5)/z[1], (y+0.5)/z[1]]);
	values[1] = implicit_curve.compute([(x-0.5)/z[1], (y+0.5)/z[1]]);
	values[2] = implicit_curve.compute([(x+0.5)/z[1], (y-0.5)/z[1]]);
	values[3] = implicit_curve.compute([(x-0.5)/z[1], (y-0.5)/z[1]]);
	values[4] = implicit_curve.compute([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[5] = implicit_curve.compute([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[6] = implicit_curve.compute([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[7] = implicit_curve.compute([(x-0.5)/z[0], (y-0.5)/z[0]]);
	return arrayPosNeg(values);
}


function checkVoxel(x, y, z){
	var res;
	if (check26Connex(implicit_curve, x, y, z)){
		res = ConnexityEnum.C26;
	} else if (check18Connex(implicit_curve, x, y, z)) {
		res = ConnexityEnum.C18;
	} else if (check6Connex(implicit_curve,  x, y, [z[1],z[2]])){
		res = ConnexityEnum.C6;
	} else res = "No";
	return res;
}

function addNeighboursToPile(x,y,z,pile){
	if(x-1 >= 0 && !checked[x-1][y][z])
		pile.push(new Vector(x-1, y, z));
	if(x+1 < dimx && !checked[x+1][y][z])
		pile.push(new Vector(x+1, y, z));
	if(y-1 >= 0 && !checked[x][y-1][z])
		pile.push(new Vector(x, y-1, z));
	if(y+1 < dimy && !checked[x][y+1][z])
		pile.push(new Vector(x, y+1, z));
	if(z-1 >= 0 && !checked[x][y][z-1])
		pile.push(new Vector(x, y, z-1));
	if(z+1 < dimz && !checked[x][y][z+1])
		pile.push(new Vector(x, y, z+1));
}

//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions
 */
function algo(){
	var maxx = Math.trunc(dimx / 2);
	var maxy = Math.trunc(dimy / 2);
	var buffer = [];
	var bufferSize = 0;
	var pile = [];
	var zValues = [];
	//find first voxel
	for (var z = 0; z < dimz && bufferSize == 0; ++z) {
		var rz = explicit_curve.compute([z]);
		if (rz == 0) rz+=0.01;
		var rz1 = explicit_curve.compute([z - 0.5]);
		if (rz1 == 0) rz1+=0.01;
		var rz2 = explicit_curve.compute([z + 0.5]);
		if (rz2 == 0) rz2+=0.01;
		zValues[z] = [rz, rz1, rz2];
		for (var y = 0; y < dimy && bufferSize == 0; y++){
			for (var x = 0; x < dimx && bufferSize == 0; x++){
				var connexity = checkVoxel(x - maxx, y - maxy, [rz, rz1, rz2]);
				if(connexity !== "No"){
					buffer.push([x, y, z, connexity]);
					bufferSize++;
					addNeighboursToPile(x,y,z,pile);
				}
				checked[x][y][z] = true;
			} // end for x
		} // end for y
	} // end for z

	//Incrementation
	while(pile.length > 0){
		if(bufferSize >= 1000){
			postMessage([buffer, bufferSize]);
			buffer = [];
			bufferSize = 0;
		}
		var voxel = pile.pop();
		checked[voxel.x][voxel.y][voxel.z] = true;
		if(zValues[voxel.z] == undefined){
			var rz = explicit_curve.compute([voxel.z]);
			if (rz == 0) rz+=0.01;
			var rz1 = explicit_curve.compute([voxel.z - 0.5]);
			if (rz1 == 0) rz1+=0.01;
			var rz2 = explicit_curve.compute([voxel.z + 0.5]);
			if (rz2 == 0) rz2+=0.01;
			zValues[voxel.z] = [rz, rz1, rz2];
		}
		var connexity = checkVoxel(voxel.x - maxx, voxel.y - maxy, zValues[voxel.z]);
		if(connexity !== "No"){
			buffer.push([voxel.x, voxel.y, voxel.z, connexity]);
			bufferSize++;
			addNeighboursToPile(voxel.x,voxel.y,voxel.z,pile);
		}
	}
	//post last buffer
	postMessage([buffer, bufferSize,"Terminate"]);
}

//==============================================================================
/**
 * Receive the meridian, revolution curve and dimension, then launch algorithm
 * and ask for termination
 * @param {Event} e - e.data contains the message received
 */
onmessage = function(e){
	explicit_curve = new Equation (e.data[0]);
	implicit_curve = new Equation (e.data[1]);
	dimension = new Vector(e.data[2]);
	dimx = dimension.x;
	dimy = dimension.y;
	dimz = dimension.z;
	for (var x = 0; x < dimx; ++x) {
		checked[x] = [];
		for (var y = 0; y < dimy; ++y) {
			checked[x][y] = [];
			for (var z = 0; z < dimz; ++z) {
				checked[x][y][z] = null;
			}
		}
	}
	algo();
}

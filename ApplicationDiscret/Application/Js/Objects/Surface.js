/// LICENCE ////////////////////////////////////////////////////////////////////

/* Copyright (juin 2015)
 * Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
 * 
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * tanguy.desplebain@gmail.com
 * lauret.karl@hotmail.fr
 * 
 * Ce logiciel est un programme informatique servant à modéliser des
 * structures 3D voxellisées.
 * 
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 * 
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 * 
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à 
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 * 
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 */

/// INDEX //////////////////////////////////////////////////////////////////////


/* matCube : Voxel[][][]
 * size : Vector
 * nbCube : int
 *
 * Surface(size : Vector)
 * getCube(x : int, y : int, z : int) : Voxel
 * addCube(x : int, y : int, z : int) : bool
 * removeCube(x : int, y : int, z : int) : bool
 * isIn(x : int, y : int, z : int) : bool
 * getSize() : Vector
 * andModel(other : Surface) : void
 * orModel(other : Surface) : void
 * xorModel(other : Surface) : void
 * clear() : void
 * copy() : Surface
 * getNbNeighbor(x : int, y : int, z : int) : int
 * getNbCube() : int
 */

/// CODE ///////////////////////////////////////////////////////////////////////



Surface.prototype.constructor = Surface;

/**
 * @constructor
 * @param {Vector} size - vector to define the size of the model.
 */
function Surface (size) {
	/*console.log ("Surface.constructor"
			+ " size = [" + size.m[0] + ", " + size.m[1] + ", "
			+ size.m[2] + "]");*/
	if (typeof size != "object") {
		console.error ("ERROR - Surface.constructor : bad type of parameter");
	}
	// --------------------------------------
	this.size = size;
	this.matCube = new Array();
	for (var x = 0; x < this.size.m[0]; ++x) {
		this.matCube[x] = new Array();
		for (var y = 0; y < this.size.m[1]; ++y) {
			this.matCube[x][y] = new Array();
			for (var z = 0; z < this.size.m[2]; ++z) {
				this.matCube[x][y][z] = null;
			}
		}
	}
	this.nbCube = 0;
}


//==============================================================================
/**
 * @param {int} x - x-coordinates of the cube in the matrix.
 * @param {int} y - y-coordinates of the cube in the matrix.
 * @param {int} z - z-coordinates of the cube in the matrix.
 * @return {Voxel} cube at the specified coordinates.
 */
Surface.prototype.getCube = function (x, y, z) {
	//console.log ("Surface.getCube x= "+x+" y= "+y+" z= "+z);
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number") {
		console.error ("ERROR - Voxel.getCube : bad type of parameter");
	}
	// --------------------------------------
	return (this.isIn(x,y,z))? this.matCube[x][y][z] : null;
};


//==============================================================================
/**
 * Add a cube to the model.
 * @param {int} x - x-coordinates of the cube in the matrix.
 * @param {int} y - y-coordinates of the cube in the matrix.
 * @param {int} z - z-coordinates of the cube in the matrix.
 * @return {boolean} true if there is no error, false otherwise.
 */
Surface.prototype.addCube = function (x, y, z) {
	//console.log ("Surface.getCube x= "+x+" y= "+y+" z= "+z);
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number") {
		console.error ("ERROR - Voxel.addCube : bad type of parameter");
	}
	// --------------------------------------
	if (this.isIn (x, y, z)) {
		if (this.matCube[x][y][z] == null) {
			this.matCube[x][y][z] = new Voxel(new Vector(x,y,z));
			for (var i=0; i<DirectionEnum.size; ++i) {
				if (this.isIn(x+DirectionEnum.properties[i].x,
								y+DirectionEnum.properties[i].y,
								z+DirectionEnum.properties[i].z)) {
					if (this.matCube[x+DirectionEnum.properties[i].x]
									[y+DirectionEnum.properties[i].y]
									[z+DirectionEnum.properties[i].z] != null) {
						this.matCube[x][y][z].removeFacet(i);
						this.matCube[x+DirectionEnum.properties[i].x]
									[y+DirectionEnum.properties[i].y]
									[z+DirectionEnum.properties[i].z]
							.removeFacet(DirectionEnum.properties[i].oppose);
					}
				}
			}
			this.nbCube++;
		}
		return true;
	} 
	else {
		console.log ("hors limite : " + x + " " + y + " " + z);
		return false;
	}
};


//==============================================================================
/**
 * Remove a cube from the model.
 * @param {int} x - x-coordinates of the cube in the matrix.
 * @param {int} y - y-coordinates of the cube in the matrix.
 * @param {int} z - z-coordinates of the cube in the matrix.
 * @return {boolean} true if there is no error, false otherwise.
 */
Surface.prototype.removeCube = function (x, y, z) {
	//console.log ("Surface.getCube x= "+x+" y= "+y+" z= "+z);
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number") {
		console.error ("ERROR - Voxel.removeCube : bad type of parameter");
	}
	// --------------------------------------
	if (this.isIn(x,y,z)) {
		if (this.matCube[x][y][z] != null) {
			this.matCube[x][y][z] = null;
			for (var i=0; i<DirectionEnum.size; ++i) {
				if (this.isIn(x+DirectionEnum.properties[i].x,
								y+DirectionEnum.properties[i].y,
								z+DirectionEnum.properties[i].z)) {
					if (this.matCube[x+DirectionEnum.properties[i].x]
									[y+DirectionEnum.properties[i].y]
									[z+DirectionEnum.properties[i].z] != null) {
						this.matCube[x+DirectionEnum.properties[i].x]
									[y+DirectionEnum.properties[i].y]
									[z+DirectionEnum.properties[i].z]
								.addFacet(DirectionEnum.properties[i].oppose);
					}
				}
			}
			this.nbCube--;
		}
		return true;
	} 
	else {
//		console.log ("hors limite : " + x + " " + y + " " + z);
		return false;
	}
	
};


//==============================================================================
/**
 * @param {int} x - x-coordinates.
 * @param {int} y - y-coordinates.
 * @param {int} z - z-coordinates.
 * @return {boolean} true if the coordinates are in the matrix, false otherwise.
 */
Surface.prototype.isIn = function (x, y, z) {
	//console.log ("Surface.isIn");
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number")
	{
		console.error ("ERROR - Voxel.isIn : bad type of parameter");
	}
	// --------------------------------------
	return (x >= 0 && x < this.size.m[0] && y >= 0 && y < this.size.m[1]
			&& z >= 0 && z < this.size.m[2]);
};


//==============================================================================
/**
 * @return {Vector} the size of the matrix.
 */
Surface.prototype.getSize = function () {
	//console.log ("Surface.getSize");
	// --------------------------------------
	return this.size;
};


//==============================================================================
/**
 * Boolean operation "AND" (interseciton) on the matrix.
 * @param {Surface} other - another matrix.
 * @return {void}
 */
Surface.prototype.andModel = function (other) {
	//console.log ("Surface.andModel");
	if (typeof other != "object") {
		console.error ("ERROR - Voxel.andModel : bad type of parameter");
	}
	// --------------------------------------
	var tmpX = Math.min(this.size.m[0], other.size.m[0]);
	var tmpY = Math.min(this.size.m[1], other.size.m[1]);
	var tmpZ = Math.min(this.size.m[2], other.size.m[2]);
	for (var x = 0; x<tmpX; ++x) {
		for (var y = 0; y<tmpY; ++y) {
			for (var z = 0; z<tmpZ; ++z) {
				if (!(other.matCube[x][y][z] != null
						&& this.matCube[x][y][z] != null)) {
					this.removeCube(x,y,z);
				}
			}
		}
	}
};


//==============================================================================
/**
 * Boolean operation "OR" (union) on the matrix.
 * @param {Surface} other - another matrix.
 * @return {void}
 */
Surface.prototype.orModel = function (other) {
	//console.log ("Surface.orModel");
	if (typeof other != "object") {
		console.error ("ERROR - Voxel.orModel : bad type of parameter");
	}
	// --------------------------------------
	var tmpX = Math.min(this.size.m[0], other.size.m[0]);
	var tmpY = Math.min(this.size.m[1], other.size.m[1]);
	var tmpZ = Math.min(this.size.m[2], other.size.m[2]);
	for (var x = 0; x < tmpX; ++x) {
		for (var y = 0; y < tmpY; ++y) {
			for (var z = 0; z < tmpZ; ++z) {
				if (other.matCube[x][y][z] != null) {
					this.addCube (x, y, z);
				}
			}
		}
	}
};


//==============================================================================
/**
 * Boolean operation "ANDNOT" (exclusion) on the matrix.
 * @param {Surface} other - another matrix.
 * @return {void}
 */
Surface.prototype.andNotModel = function (other) {
	//console.log ("Surface.andNotModel");
	if (typeof other != "object") {
		console.error ("ERROR - Voxel.andNotModel : bad type of parameter");
	}
	// --------------------------------------
	var tmpX = Math.min(this.size.m[0], other.size.m[0]);
	var tmpY = Math.min(this.size.m[1], other.size.m[1]);
	var tmpZ = Math.min(this.size.m[2], other.size.m[2]);
	for (var x=0; x<tmpX; ++x) {
		for (var y=0; y<tmpY; ++y) {
			for (var z=0; z<tmpZ; ++z) {
				if (other.matCube[x][y][z] != null) {
					this.removeCube(x,y,z);
				}
			}
		}
	}
};


//==============================================================================
/**
 * Boolean operation "XOR" on the matrix.
 * @param {Surface} other - another matrix.
 * @return {void}
 */
Surface.prototype.xorModel = function (other) {
	//console.log ("Surface.xorModel");
	if (typeof other != "object") {
		console.error ("ERROR - Voxel.xorModel : bad type of parameter");
	}
	// --------------------------------------
	var tmpX = Math.min(this.size.m[0], other.size.m[0]);
	var tmpY = Math.min(this.size.m[1], other.size.m[1]);
	var tmpZ = Math.min(this.size.m[2], other.size.m[2]);
	for (var x = 0; x < tmpX; ++x) {
		for (var y = 0; y < tmpY; ++y) {
			for (var z = 0; z < tmpZ; ++z) {
				if (other.matCube[x][y][z] != null) {
					if (this.matCube[x][y][z] != null) {
						this.removeCube (x, y, z);
					} else {
						this.addCube (x, y, z);
					}
				}
			}
		}
	}
};


//==============================================================================
/**
 * Empty the matrix.
 * @return {void}
 */
Surface.prototype.clear = function () {
	//console.log ("Surface.clear");
	// --------------------------------------
	for (var x = 0; x < this.size.m[0]; ++x) {
		for (var y = 0; y < this.size.m[1]; ++y) {
			for (var z = 0; z < this.size.m[2]; ++z) {
				this.matCube[x][y][z] = null;
			}
		}
	}
	this.nbCube = 0;
};


//==============================================================================
/**
 * @return {Surface} a copy of the model.
 */
Surface.prototype.copy = function () {
	//console.log ("Surface.copy");
	// --------------------------------------
	var result = new Surface (this.size);
	for (var x = 0; x < result.size.m[0]; ++x) {
		for (var y = 0; y < result.size.m[1]; ++y) {
			for (var z = 0; z < result.size.m[2]; ++z) {
				result.matCube[x][y][z] = this.matCube[x][y][z];
			}
		}
	}
	result.nbCube = this.nbCube;
	return result;
};


//==============================================================================
/**
 * @param {int} x - x-coordinates of the cube in the matrix.
 * @param {int} y - y-coordinates of the cube in the matrix.
 * @param {int} z - z-coordinates of the cube in the matrix.
 * @return {int} number of neighboring cubes.
 */
Surface.prototype.getNbNeighbor = function (x, y, z) {
	//console.log ("Surface.getNbNeighbor x= " + x + " y= " + y + " z= " + z);
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number") {
		console.error ("ERROR - Voxel.getNbNeighbor : bad type of parameter");
	}
	// --------------------------------------
	var nb = 0;
	for (var i = 0; i < DirectionEnum.size; ++i) {
		if (this.isIn (x+DirectionEnum.properties[i].x,
						y+DirectionEnum.properties[i].y,
						z+DirectionEnum.properties[i].z)) {
			if (this.matCube[x+DirectionEnum.properties[i].x]
							[y+DirectionEnum.properties[i].y]
							[z+DirectionEnum.properties[i].z] != null) {
				nb++;
			}
		}
	}
	return nb;
};


//==============================================================================
/**
 * @return {int} the number of cubes of the model.
 */
Surface.prototype.getNbCube = function () {
	//console.log ("Surface.getNbCube");
	// --------------------------------------
	return this.nbCube;
};



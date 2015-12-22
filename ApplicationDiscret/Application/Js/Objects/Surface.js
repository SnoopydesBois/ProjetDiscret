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


/* matVoxel : Voxel[][][]
 * dimension : Vector
 * nbVoxel : int
 *
 * Surface(size : Vector)
 * getVoxel(position : Vector) : Voxel
 * addVoxel(position : Vector) : bool
 * removeVoxel(position : Vector) : bool
 * isIn(x : int, y : int, z : int) : bool
 * getDimension() : Vector
 * clear() : void
 * getNbNeighbor(x : int, y : int, z : int) : int
 * getNbCube() : int
 * setVoxelVisibility(position : Vector, visiblity : bool) : void
 * isVoxelVisible(position : Vector) : bool
 * printOnly(range : Range, axis : AxisEnum) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////

Surface.prototype.constructor = Surface;

/**
 * @constructor
 * @param {Vector} size - vector to define the size of the model.
 */
function Surface (size) {
	if (!( size instanceof Vector) {
		console.error ("ERROR - Surface.constructor : bad type of parameter");
	}
	// --------------------------------------
	/**
	 * {Vector} the dimensions of the surface
	 */
	this.dimension = new Vector(size);
	
	/**
	 * {Array} 3 dimensionnal array containing the surface data
	 */
	this.matVoxel = [];
	for (var x = 0; x < this.dimension.m[0]; ++x) {
		this.matVoxel[x] = [];
		for (var y = 0; y < this.dimension.m[1]; ++y) {
			this.matVoxel[x][y] = [];
			for (var z = 0; z < this.dimension.m[2]; ++z) {
				this.matVoxel[x][y][z] = null;
			}
		}
	}
	
	/**
	 * {int} Number of voxels the surface contains
	 */
	this.nbVoxel = 0;
}


//==============================================================================
/**
 * @param {Vector} position - the voxel's coordinates
 * @return {Voxel} voxel at the specified coordinates.
 * @throws {String} "Surface.getVoxel.ErrorNotAVector"
 * - position should be of type Vector
 */
Surface.prototype.getVoxel = function (position) {
	if (!(position instanceof Vector)) {
		throw "Surface.getVoxel.ErrorNotAVector";
	}
	// --------------------------------------
	return this.matVoxel[x][y][z];
};


//==============================================================================
/**
 * Add a voxel to the model.
 * @param {Vector} position - the coordinates of the voxel to add.
 * @return {boolean} true if the voxel has been added.
 * @throws {String} "Surface.addVoxel.ErrorNotAVector"
 * - position should be of type Vector
 * @throws {String} "Surface.addVoxel.OutOfBounds"
 * - the voxel is out of bounds
 */
Surface.prototype.addVoxel = function (position, connexity) {
	if (!(position instanceof Vector)) {
		throw "Surface.addVoxel.ErrorNotAVector";
	}
	var x = position.m[0];
	var y = position.m[1];
	var z = position.m[2];
	// --------------------------------------
	if (this.isIn (x, y, z)) {
		if (this.matVoxel[x][y][z] === null) {
			this.matVoxel[x][y][z] = new Voxel(position);
			this.matVoxel[x][y][z].setConnexity(connexity);

			var size = DirectionEnum.size;
			for (var i = 0; i < size; ++i) {
				var newX = x + DirectionEnum.properties[i].x;
				var newY = y + DirectionEnum.properties[i].y;
				var newZ = z + DirectionEnum.properties[i].z;
				
				if (this.isIn(newX, newY, newZ)) {
					if (this.matVoxel[newX][newY][newZ] !== null) {
						this.matVoxel[x][y][z].removeFacet(i);
						this.matVoxel[newX][newY][newZ]
							.removeFacet(DirectionEnum.properties[i].oppose);
					}
				}
			}
			this.nbVoxel++;
		}
		return true;
	} 
	else {
		throw "Surface.addVoxel.OutOfBounds";
	}
};


//==============================================================================
/**
 * Remove a voxel from the model.
 * @param {Vector} position - the coordinates of the voxel to remove
 * @return {boolean} true if there is no error, false otherwise.
 * @throws {String} "Surface.removeVoxel.ErrorNotAVector"
 * - the position should be of type Vector
 * @throws {String} "Surface.removeVoxel.OutOfBounds"
 * - the voxel is out of bounds
 */
Surface.prototype.removeVoxel = function (position) {
	if (!(position instanceof Vector) {
		throw "Surface.removeVoxel.ErrorNotAVector";
	}
	// --------------------------------------
	var x = position.m[0];
	var y = position.m[1];
	var z = position.m[2];
	if (this.isIn(x,y,z)) {
		if (this.matVoxel[x][y][z] != null) {
			this.matVoxel[x][y][z] = null;
			
			var size = DirectionEnum.size;
			for (var i = 0; i < size; ++i) {
				var newX = x + DirectionEnum.properties[i].x;
				var newY = y + DirectionEnum.properties[i].y;
				var newZ = z + DirectionEnum.properties[i].z;
				
				if (this.isIn(newX,	newY, newZ)) {
					if (this.matVoxel[newX][newY][newZ] !== null) {
						this.matVoxel[newX][newY][newZ]
								.addFacet(DirectionEnum.properties[i].oppose);
					}
				}
			}
			this.nbVoxel--;
		}
		return true;
	} 
	else {
		throw  "Surface.removeVoxel.OutOfBounds";
	}
	
};


//==============================================================================
/**
 * @param {int} x - x-coordinates.
 * @param {int} y - y-coordinates.
 * @param {int} z - z-coordinates.
 * @return {boolean} true if the coordinates are in the matrix, false otherwise.
 * @throws {String} "Surface.isIn.ErrorNotANumber"
 * - the coordinates should be numbers
 */
Surface.prototype.isIn = function (x, y, z) {
	//console.log ("Surface.isIn");
	if (typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number")
	{
		throw "Surface.isIn.ErrorNotANumber";
	}
	// --------------------------------------
	return (x >= 0 && x < this.dimension.m[0] && y >= 0 && y < this.dimension.m[1]
			&& z >= 0 && z < this.dimension.m[2]);
};


//==============================================================================
/**
 * @return {Vector} the size of the matrix.
 */
Surface.prototype.getDimension = function () {
	//console.log ("Surface.getDimension");
	// --------------------------------------
	return this.dimension;
};


//==============================================================================
/**
 * Empty the matrix.
 * @return {void}
 */
Surface.prototype.clear = function () {
	//console.log ("Surface.clear");
	// --------------------------------------
	for (var x = 0; x < this.dimension.m[0]; ++x) {
		for (var y = 0; y < this.dimension.m[1]; ++y) {
			for (var z = 0; z < this.dimension.m[2]; ++z) {
				this.matVoxel[x][y][z] = null;
			}
		}
	}
	this.nbVoxel = 0;
};


//==============================================================================
/**
 * @parma {Vector} position - the coordinates of the voxel of which 
 * we want to know how much neighbors it has
 * @return {int} number of neighboring voxels.
 * @throws {String} "Surface.getNbNeighbor.ErrorNotAVector"
 * - the position should be of type Vector
 */
Surface.prototype.getNbNeighbor = function (position) {
	//console.log ("Surface.getNbNeighbor x= " + x + " y= " + y + " z= " + z);
	if (!(position instanceof Vector) {
		throw "Surface.getNbNeighbor.ErrorNotAVector";
	}
	// --------------------------------------
	
	var nb = 0; // number of neighbors
	var size = DirectionEnum.size;
	for (var i = 0; i < size; ++i) {
		var x = position.m[0] + DirectionEnum.properties[i].x;
		var y = position.m[1] + DirectionEnum.properties[i].y;
		var z = position.m[2] + DirectionEnum.properties[i].z;

		if (this.isIn (x, y, z)  && this.matVoxel[x][y][z] !== null){
			nb++;
		}
	}
	return nb;
};


//==============================================================================
/**
 * @return {int} the number of voxels of the model.
 */
Surface.prototype.getNbCube = function () {
	//console.log ("Surface.getNbCube");
	// --------------------------------------
	return this.nbVoxel;
};


//==============================================================================
/**
 * @param {Vector} position - the coordinates of the voxel to set the visibility 
 * @param {boolean} visibility - the visibility to set to the voxel 
 * @throws {String} "Surface.setVoxelVisibility.ErrorNotAVector"
 * - the position should be of type Vector
 * @throws {String} "Surface.setVoxelVisibility.ErrorNotABoolean"
 * - the visibility should be a boolean
 * @throws {String} "Surface.setVoxelVisibility.OutOfBounds"
 * - the voxel is out of bounds
 */
Surface.prototype.setVoxelVisibility = function (position, visibility) {
	//console.log ("Surface.getNbCube");
	if(!(position instanceof Vector){
		throw "Surface.setVoxelVisibility.ErrorNotAVector";
	}
	if(typeof visibility !== "boolean"){
		throw "Surface.setVoxelVisibility.ErrorNotABoolean";
	}
	// --------------------------------------
	var x = position.m[0];
	var y = position.m[1];
	var z = position.m[2];
	
	if(this.isIn(x, y, z)){
		this.matVoxel[x][y][z].setVisibility(visibility);
	}
	else{
		throw "Surface.setVoxelVisibility.OutOfBounds";
	}
};


//==============================================================================
/**
 * @param {Vector} position - the coordinates of the voxel to test 
 * @return {boolean} true if the voxel is visible, else false
 * @throws {String} "Surface.isVoxelVisible.ErrorNotAVector"
 * - the position should be of type Vector
 * @throws {String} "Surface.isVoxelVisible.OutOfBounds"
 * - the voxel is out of bounds
 */
Surface.prototype.isVoxelVisible = function (position) {
	//console.log ("Surface.getNbCube");
	if(!(position instanceof Vector){
		throw "Surface.isVoxelVisible.ErrorNotAVector";
	}
	// --------------------------------------
	var x = position.m[0];
	var y = position.m[1];
	var z = position.m[2];
	
	if(this.isIn(x, y, z)){
		this.matVoxel[x][y][z].isVisible(visibility);
	}
	else{
		throw "Surface.isVoxelVisible.OutOfBounds";
	}
};

//==============================================================================
/**
 * @param {Vector} position - the coordinates of the voxel to set the visibility 
 * @param {boolean} visibility - the visibility to set to the voxel 
 * @throws {String} "Surface.printOnly.ErrorNotARange" 
 * - the range should be of type Range
 */
 // Nom à revoir
Surface.prototype.printOnly = function (range, axis) {
	//console.log ("Surface.getNbCube");
	if(!(range instanceof Range)){
		throw "Surface.printOnly.ErrorNotARange";
	}
	// --------------------------------------
	var visible;
	for(var x = 0; x < this.dimension.m[0]; ++x){
		for(var y = 0; y < this.dimension.m[1]; ++y){			
			for(var z = 0; z < this.dimension.m[2]; ++z){
				switch axis :
					case X :
						visible = range.isIn(x);
					break;
					case Y :
						visible = range.isIn(y);
					break;
					case Z :
						visible = range.isIn(z);
					break;
					default :
						visible = false;
					break;
				this.matVoxel[x][y][z].setVisiblity(visible);
			}
		}
	}
};


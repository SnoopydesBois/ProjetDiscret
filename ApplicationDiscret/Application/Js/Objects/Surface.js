/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
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


/* 
 * Surface(size : Vector)
 * getVoxel(position : Vector | float[3] | float,
			yCoord : float,
			zCoord : float) : Voxel
 * addVoxel(position : Vector, connexity : EnumConnexity) : void
 * voxelHasFacet (voxelPosition : Vector, direction : DirectionEnum, connexity : ConnexityEnum) : boolean
 * isIn (x : int, y : int, z : int) : boolean
 * getDimension () : Vector
 * clear () : void
 * getNbNeighbor (position : Vector) : int
 * getNbVoxel () : int
 * setVoxelVisibility (position : Vector, visibility : boolean) : void
 * isVoxelVisible (position : Vector | Number[3] | Number,
					yCoord : float, 
					zCoord : float) : boolean
 * slice (range : Range, axis : AxisEnum) : vpid
 * printOnly () : 
 * setConnexity (connexity : ConnexityEnum) :  void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Represents the surface, contains a Matrix of voxels of the Surface
 */
Surface.prototype.constructor = Surface;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Vector} size - Vector to define the size of the model.
 */
function Surface (size) {
	/// parameter verification
	if (! size instanceof Vector) {
		console.error ("Surface.constructor: parameter is not a Vector");
	}
	
	/**
	 * {Vector} The dimensions of the surface
	 */
	this.dimension = new Vector (size);
	
	/**
	 * {Array} 3 dimensional array containing the surface data.
	 */
	this.matVoxel = [];
	for (var x = 0; x < this.dimension.x; ++x) {
		this.matVoxel[x] = [];
		for (var y = 0; y < this.dimension.y; ++y) {
			this.matVoxel[x][y] = [];
			for (var z = 0; z < this.dimension.z; ++z) {
				this.matVoxel[x][y][z] = null;
			}
		}
	}
	
	/**
	 * {int} Number of voxels the surface contains
	 */
	this.nbVoxel = 0;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @param {Vector | float[3] | float } position - the voxel's coordinates.
 * @param {float} [yCoord] - The y coordinate.
 * @param {float} [zCoord] - The z coordinate.
 * 
 * @return {Voxel} voxel at the specified coordinates.
 * @throws {String} "Surface.getVoxel.ErrorNotAVector"
 * - Position should be of type Vector.
 */
Surface.prototype.getVoxel = function (position, yCoord, zCoord) {
	var x, y, z;
	if (position instanceof Vector) {
		x = position.x;
		y = position.y;
		z = position.z;
	}
	else if (position instanceof Array && position.length >= 3) {
		x = position[0];
		y = position[1];
		z = position[2];
	}
	else if (checkType (arguments, "number", "number", "number")) {
		x = position;
		y = yCoord;
		z = zCoord;
	}
	else
		throw "Surface.getVoxel: bad type(s) of parameter(s)"
	
	return (this.isIn (x, y, z)) ? this.matVoxel[x][y][z] : null;
};


//==============================================================================
/**
 * Adds a voxel to the model.
 * @param {Vector} position - The coordinates of the voxel to add.
 * @param {EnumConnexity} connexity - The connexity for which the voxel should 
 * be displayed.
 * 
 * @throws {String} The parameters are not of expected type.
 * @throws {String} "Surface.addVoxel.OutOfBounds"
 * - the voxel is out of bounds
 */
Surface.prototype.addVoxel = function (position, connexity) {
	/// parameters verification
	if (! checkType (arguments, Vector, "number"))
		throw "Surface.addVoxel: bad type(s) of parameter(s)";
	
	/// add the voxel
	var x = position.x;
	var y = position.y;
	var z = position.z;
	
	if (this.isIn (x, y, z)) {
		if (this.matVoxel[x][y][z] === null) {
			
			this.matVoxel[x][y][z] = new Voxel (position, connexity);
			this.nbVoxel++;
		}
		else {
			// the voxel already exists, just add connexity
			this.matVoxel[x][y][z].connexity |= connexity;
		}
		var size = DirectionEnum.size;
		for (var i = 0; i < size; ++i) {
			var newX = x + DirectionEnum.properties[i].x;
			var newY = y + DirectionEnum.properties[i].y;
			var newZ = z + DirectionEnum.properties[i].z;
			
			if (this.isIn (newX, newY, newZ) 
				&& this.matVoxel[newX][newY][newZ] !== null)
			{
				this.matVoxel[x][y][z].addFacetConnexity (
					i, 
					this.matVoxel[newX][newY][newZ].getConnexity ()
				);
				this.matVoxel[newX][newY][newZ].addFacetConnexity (
					DirectionEnum.properties[i].oppose,
					connexity
				);
			}
		} // end for each neighbor
	} // end if coordinates are corect
	else {
		console.error ("out of bound:", x, y, z);
		throw "Surface.addVoxel.OutOfBounds";
	}
};


//==============================================================================
/**
 * Tests if a voxel has a visible facet
 * 
 * @param {Vector} voxelPosition - The coordinates of the voxel to test.
 * @param {DirectionEnum} direction - The direction of the facet.
 * @param {ConnexityEnum} connexity - The current connexity.
 * 
 * @return {boolean} True if the voxel is visible, false otherwise.
 */
Surface.prototype.voxelHasFacet = function (voxelPosition, direction, 
	connexity)
{
	var voxel = this.getVoxel (voxelPosition);
	var nx = voxelPosition.x + DirectionEnum.properties[direction].x,
		ny = voxelPosition.y + DirectionEnum.properties[direction].y,
		nz = voxelPosition.z + DirectionEnum.properties[direction].z;
	var neighbor = (this.isIn (nx, ny, nz)) ? this.getVoxel (nx, ny, nz) : null;
	return (neighbor == null || !neighbor.visibility ||
		(voxel.getConnexity () < neighbor.getConnexity ()
		&& neighbor.getConnexity () > connexity)
	);
};


//==============================================================================
/**
 * @param {int} x - x-coordinates.
 * @param {int} y - y-coordinates.
 * @param {int} z - z-coordinates.
 * 
 * @return {boolean} true if the coordinates are in the matrix, false otherwise.
 * @throws {String} "Surface.isIn.ErrorNotANumber"
 * - the coordinates should be numbers
 */
Surface.prototype.isIn = function (x, y, z) {
	if (! checkType (arguments, "number", "number", "number"))
		throw "Surface.isIn.ErrorNotANumber";
	
	return (x >= 0 && x < this.dimension.x &&
		y >= 0 && y < this.dimension.y &&
		z >= 0 && z < this.dimension.z);
};


//==============================================================================
/**
 * @return {Vector} The size of the matrix.
 */
Surface.prototype.getDimension = function () {
	return this.dimension;
};


//==============================================================================
/**
 * Empties the matrix.
 * 
 * @return {void}
 */
Surface.prototype.clear = function () {
	for (var x = 0; x < this.dimension.x; ++x) {
		for (var y = 0; y < this.dimension.y; ++y) {
			for (var z = 0; z < this.dimension.z; ++z) {
				this.matVoxel[x][y][z] = null;
			}
		}
	}
	this.nbVoxel = 0;
};


//==============================================================================
/**
 * Gets the numbers of neighbors of a voxel.
 *
 * @param {Vector} position - the coordinates of the voxel.
 *
 * @return {int} number of neighbours.
 * @throws {String} "Surface.getNbNeighbor.ErrorNotAVector"
 * - the position should be of type Vector
 */
Surface.prototype.getNbNeighbor = function (position) {
	if (!position instanceof Vector)
		throw "Surface.getNbNeighbor.ErrorNotAVector";
	
	var nb = 0; // number of neighbours
	var size = DirectionEnum.size;
	for (var i = 0; i < size; ++i) {
		var x = position.x + DirectionEnum.properties[i].x;
		var y = position.y + DirectionEnum.properties[i].y;
		var z = position.z + DirectionEnum.properties[i].z;

		if (this.isIn (x, y, z) && this.matVoxel[x][y][z] !== null)
			++nb;
	}
	return nb;
};


//==============================================================================
/**
 * @return {int} the number of voxels of the model.
 */
Surface.prototype.getNbVoxel = function () {
	return this.nbVoxel;
};


//==============================================================================
/**
 * @param {Vector} position - The coordinates of the voxel to set the
 * visibility.
 * @param {boolean} visibility - The visibility to set to the voxel.
 * 
 * @return {void}
 * @throws {String} The parameters are not of expected type.
 * @throws {String} "Surface.setVoxelVisibility.OutOfBounds"
 * - The voxel is out of bounds.
 */
Surface.prototype.setVoxelVisibility = function (position, visibility) {
	if (! checkType (arguments, Vector, "boolean"))
		throw "Surface.setVoxelVisibility: bad type(s) of parameter(s)";
	
	var x = position.x;
	var y = position.y;
	var z = position.z;
	
	if (this.isIn (x, y, z))
		this.matVoxel[x][y][z].visibility = visibility;
	else
		throw "Surface.setVoxelVisibility.OutOfBounds";
};


//==============================================================================
/**
 * @param {Vector | Number[3] | Number} position - The coordinates of the voxel to test.
 * @param {float} [yCoord] - The y-coordinate.
 * @param {float} [zCoord] - The z-coordinate.
 *
 * @return {boolean} True if the voxel is visible, false otherwise.
 * @throws {String} "Surface.isVoxelVisible.ErrorNotAVector"
 * - the position should be of type Vector.
 * @throws {String} "Surface.isVoxelVisible.OutOfBounds"
 * - the voxel is out of bounds.
 */
Surface.prototype.isVoxelVisible = function (position, yCoord, zCoord) {
	/// coordinates assignation
	var x, y, z;
	if (position instanceof Vector) {
		x = position.x;
		y = position.y;
		z = position.z;
	}
	else if (position instanceof Array && position.length >= 3) {
		x = position[0];
		y = position[1];
		z = position[2];
	}
	else if (checkType (arguments, "number", "number", "number")) {
		x = position;
		y = yCoord;
		z = zCoord;
	}
	else
		throw "Surface.getVoxel: bad type(s) of parameter(s)"
	
	/// search visibility
	if (this.isIn (x, y, z))
		return this.matVoxel[x][y][z].isVisible ();
	else 
		throw "Surface.isVoxelVisible.OutOfBounds";
};


//==============================================================================
/**
 * Sets the voxels out of the new range to not visible so they are not displayed.
 * 
 * @param {Range} range - The new range of the slice.
 * @param {AxisEnum} axis - The axis on which the slice is performed.
 * 
 * @return {void}
 * @throws {String} "Surface.slice.ErrorNotARange" 
 * - The range should be of type Range.
 */
Surface.prototype.slice = function (range, axis) {
	if (! (range instanceof Range))
		throw "Surface.slice.ErrorNotARange";
	
	var visible, x, y, z, i, newX, newY, newZ;
	for (x = 0; x < this.dimension.x; ++x) {
		for (y = 0; y < this.dimension.y; ++y) {			
			for (z = 0; z < this.dimension.z; ++z) {
				switch (axis) {
					case AxisEnum.X :
						visible = range.isIn (x);
					break;
					case AxisEnum.Y :
						visible = range.isIn (y);
					break;
					case AxisEnum.Z :
						visible = range.isIn (z);
					break;
					default :
						visible = false;
					break;
				}
				if (this.matVoxel[x][y][z] !== null) {
					this.matVoxel[x][y][z].visibility = visible;
					for (i = 0; i < DirectionEnum.size; ++i) {
						newX = x + DirectionEnum.properties[i].x;
						newY = y + DirectionEnum.properties[i].y;
						newZ = z + DirectionEnum.properties[i].z;
			
						if (this.isIn (newX, newY, newZ) 
							&& this.matVoxel[newX][newY][newZ] !== null)
						{
							this.matVoxel[newX][newY][newZ]
								.neighborVisibility[DirectionEnum.properties[i].oppose] = visible;
						}
					} // end for each neighbor
				}
			} // end for z
		} // end for y
	} // end for x
};


//==============================================================================
/**
 * @see {@link slice}. Perform a slice on 3 axis
 * 
 * @param {Range} rangeX - The new x-Range.
 * @param {Range} rangeY - The new y-Range.
 * @param {Range} rangeZ - The new z-Range.
 * 
 * @return {void}
 * @throws {String} "Surface.printOnly.ErrorNotARange" 
 * - All ranges should be of type Range.
 */
Surface.prototype.printOnly = function (rangeX, rangeY, rangeZ) {
	if (! checkType (arguments, Range, Range, Range))
		throw "Surface.printOnly.ErrorNotARange";
	
	var visible, x, y, z, i, newX, newY, newZ;
	for (x = 0; x < this.dimension.x; ++x) {
		for (y = 0; y < this.dimension.y; ++y) {			
			for (z = 0; z < this.dimension.z; ++z) {
				voxel = this.matVoxel[x][y][z];
				if (voxel !== null) {
					visible = rangeX.isIn (x) && rangeY.isIn (y)
						&& rangeZ.isIn (z);
					voxel.visibility = visible;
					for (i = 0; i < DirectionEnum.size; ++i) {
						newX = x + DirectionEnum.properties[i].x;
						newY = y + DirectionEnum.properties[i].y;
						newZ = z + DirectionEnum.properties[i].z;
			
						if (this.isIn (newX, newY, newZ) 
							&& this.matVoxel[newX][newY][newZ] !== null)
						{
							this.matVoxel[newX][newY][newZ]
								.neighborVisibility[
									DirectionEnum.properties[i].oppose
								] = visible;
						}
					} // end for each neighbor
				} // end if voxel exist
			} // end for z
		} // end for y
	} // end for x
};


//==============================================================================
/**
 * Sets a new connexity to the Surface.
 * 
 * @param {ConnexityEnum} connexity - The new connexity of the surface.
 * 
 * @return {void}
 * @throws {String} "Surface.setConnexity.ErrorNotAConnexity" - Connexity should
 * be a ConnexityEnum.
 */
Surface.prototype.setConnexity = function (connexity) {
	if (! isValueOfEnum (ConnexityEnum, connexity))
		throw "Surface.setConnexity.ErrorNotAConnexity";
	
	var vox;
	for (var x = 0; x < this.dimension.x; ++x) {
		for (var y = 0; y < this.dimension.y; ++y) {			
			for (var z = 0; z < this.dimension.z; ++z) {
				vox = this.matVoxel[x][y][z];
				if (vox != null && vox.connexity | connexity){
					vox.visibility = true;
				}
			} // end for each z
		} // end for each y
	} // end for each x
};



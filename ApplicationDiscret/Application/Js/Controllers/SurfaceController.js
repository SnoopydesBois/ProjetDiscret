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


/* surface : Surface
 * selectedFacets : Facet[]
 * hoverFacet : Facet
 *
 * Controller3D(size : Vector, name : String)
 * getsurface() : Surface
 * getName() : String
 * isSelectedFacet(facet : Facet) : bool
 * getSelectedFacet(index : int) : Facet
 * addSelectedFacet(facet : Facet) : void
 * removeSelectedFacet(facet : Facet) : void
 * clearSelectFacet() : void
 * setSelectedFacet(facet : Facet) : void
 * getNbSelectedFacet() : int
 * getHoverFacet() : Facet
 * setHoverFacet(facet : Facet) : void
 * isHoverFacet() : bool
 * copy() : Controller3D
 */

/// CODE ///////////////////////////////////////////////////////////////////////



Controller3D.prototype.constructor = Controller3D;

/**
 * @constructor 
 * @param {Vector} dimension - Vector to define the dimension of the 3D space.
 */ 
function Controller3D (dimension)
{
//	console.log ("Controller3D.constructor");
	if (typeof size != "Vector") {
		console.error ("ERROR - Controller3D.constructor : "
				+ "bad type of parameter");
	}
	// --------------------------------------
	
	/**
	 * {Surface} The surface.
	 */
	this.surface = new Surface (size);
	
	/**
	 * {Function} A function that provide a frozen reference to the meridian
	 */
	this.getMeridian = null;
	 
	/**
	 * {Function} A function that provide a frozen reference to the curve of revolution
	 */
	this.getCurveRevolution = null;
	
	/**
	 * {Facet[]} The cube selected.
	 */
	this.selectedFacets = null;
}

//==============================================================================
/**
 * Function that start the generation of the surface from the meridian and the curbe of revolution
 * @return {Surface} The surface surfaceed by the meridian and the curve of revolution
 */
Controller3D.prototype.generate = function() {
	if(!(this.getMeridian instanceof Function) 
		|| (!this.getCurveRevolution instanceof Function)){
		throw "The meridian or the curve of revolution are not functions."
	}
	else{
		meridian = this.getMeridian();
		curveRevolution = this.getCurveRevolution();
		return this.surface.generate(meridian, curveRevolution);
	}
}

//==============================================================================
/**
 * @param {Function} meridian - The function that allows this controller to obtain a frozen reference to the meridian
 */
Controller3D.prototype.setGetMeridian = function(meridian){
	this.getMeridian = meridian();
}

//==============================================================================
/**
 * @param {Function} curveRevolution - The function that allows this controller to obtain a frozen reference to the curve of revolution
 */
Controller3D.prototype.setGetCurveRevolution = function(curveRevolution){
	this.getCurveRevolution = curveRevolution();
}

//==============================================================================
/**
 * @return {Surface} the surface.
 */
Controller3D.prototype.getSurface = function () {
//	console.log ("Controller3D.getsurface");
	// --------------------------------------
	return this.surface;
};

//==============================================================================
/**
 * @param {int} x - the x coordinate of the voxel to get
 * @param {int} y - the y coordinate of the voxel to get
 * @param {int} z - the z coordinate of the voxel to get
 * @return {Voxel} the voxel at the x, y, z coordinates
 */
Controller3D.prototype.getVoxel = function (x, y, z) {
//	console.log ("Controller3D.getCube");
	// --------------------------------------
	return this.surface.getVoxel (x, y, z);
};


//==============================================================================
/**
 * @return {Vector} the dimension of the surface.
 */
Controller3D.prototype.getDimension = function () {
//	console.log ("Controller3D.getSize");
	// --------------------------------------
	return this.surface.getDimension();
};


//==============================================================================
/**
 * Is this cube selected.
 * @param {Cube} cube - cube to test.
 * @return {boolean} true if the cube is selected, false otherwise.
 */
Controller3D.prototype.isSelectedCube = function (cube) {
	/*console.log ("Controller3D.isSelectedCube"
			+ "cube.cubeCoor = [" + cube.cubeCoor.m[0] + ", "
			+ cube.cubeCoor.m[1] + ", " + cube.cubeCoor.m[2] 
			+ " cube.direction= " + cube.direction);*/
	if (typeof cube != "cube") {
		console.error ("ERROR - Controller3D.isSelectedCube :"
				+ "bad type of parameter");
	}
	// -------------------------------------
	for (var i = 0; i < size; ++i) {
		if (this.surface.getSelectedCube(i).equals(cube)) {
			return true;
		
	}
	return false;
};


//==============================================================================
/**
 * Get the nth selected cube.
 * @param {int} index - the nth cube.
 * @return {Cube} the selected cube.
 */
Controller3D.prototype.getSelectedCube = function (index) {
//	console.log ("Controller3D.getSelectedFacet");
	if (typeof index != "number") {
		console.error ("ERROR - Controller3D.getSelectedCube :"
				+ "bad type of parameter");
	}
	// --------------------------------------
	return this.surface.getSelectedCube(index);
};


//==============================================================================
/**
 * Add this cube to the selection list.
 * @param {Cube} cube - cube to add.
 * @return {void}
 */
Controller3D.prototype.addSelectedCube = function (cube) {
//	console.log ("Controller3D.addSelectedCube");
	if (typeof facet != "object") {
		console.error ("ERROR - Controller3D.addSelectedCube :"
						+ "bad type of parameter");
	}
	// --------------------------------------
	if (this.model.getSelectedCube() == null) {
		this.model.setSelectedCube(cube);
	}
};


//==============================================================================
/**
 * Removes this cube of the selection list 
 * @param {Cube} cube - cube to remove.
 * @return {void}
 */
Controller3D.prototype.removeSelectedFacet = function (cube) {
//	console.log ("Controller3D.removeSelectedCube");
	if (typeof cube != "object") {
		console.error ("ERROR - Controller3D.removeSelectedCube :"
						+ "bad type of parameter");
	}
	// --------------------------------------
	for (var i=this.selectedFacets.length-1; i>=0; --i) {
		if (this.selectedFacets[i].egale(facet)) {
			this.selectedFacets.splice(i, 1);
		}
	}
	if (facet.direction == DirectionEnum.ALL) {
		for (var j = 0; j < DirectionEnum.size; ++j) {
			var tmp = new Facet (facet.cubeCoor, j);
			for (var i = this.selectedFacets.length-1; i >= 0; --i) {
				if (this.selectedFacets[i].egale(tmp)) {
					this.selectedFacets.splice(i, 1);
				}
			}
		}
	}
};


//==============================================================================
/**
 * Removes a facet from the selection list given it's index.
 * @param {int} index - The index of the facet to remove.
 * @return {void}
 */
Controller3D.prototype.removeSelectedFacetByIndex = function (index) {
	//console.log ("Controller3D.removeSelectedFacetByIndex");
	this.selectedFacets.splice (index, 1);
};


//==============================================================================
/**
 * Removes all facet of the selection list.
 * @return {void}
 */
Controller3D.prototype.clearSelectFacet = function () {
	//console.log ("Controller3D.clearSelectFacet");
	// --------------------------------------
	this.selectedFacets = [];
};


//==============================================================================
/**
 * Removes all facet and adds a facet to the selection list.
 * @param {Facet} facet - facet to add.
 * @return {void}
 */
Controller3D.prototype.setSelectedFacet = function (facet) {
//	console.log ("Controller3D.setSelectedFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - Controller3D.setSelectedFacet : "
				+ "bad type of parameter");
	}
	// --------------------------------------
	this.clearSelectFacet ();
	this.addSelectedFacet (facet);
};


//==============================================================================
/**
 * @return {int} the number of selected facet.
 */
Controller3D.prototype.getNbSelectedFacet = function () {
//	console.log ("Controller3D.getNbSelectedFacet");
	// --------------------------------------
	return this.selectedFacets.length;
};


//==============================================================================
/**
 * @return {Facet} the hover facet.
 */
Controller3D.prototype.getHoverFacet = function () {
//	console.log ("Controller3D.getHoverFacet");
	// --------------------------------------
	return this.hoverFacet;
};


//==============================================================================
/**
 * Set the hovered facet.
 * @param {Facet} facet - facet to hover.
 * @return {void}
 */
Controller3D.prototype.setHoverFacet = function (facet) {
//	console.log ("Controller3D.setHoverFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - Controller3D.setHoverFacet : "
						+ "bad type of parameter");
	}
	// --------------------------------------
	this.hoverFacet = facet;
};


//==============================================================================
/**
 * @return {boolean} true if a facet is hovered, false otherwise.
 */
Controller3D.prototype.isHoverFacet = function () {
//	console.log ("Controller3D.isHoverFacet");
	// --------------------------------------
	return this.hoverFacet != null;
};


//==============================================================================
/**
 * @return {Controller3D} a deep copy of this surface controller.
 */
Controller3D.prototype.copy = function () {
//	console.log ("Controller3D.copy");
	// --------------------------------------
	var result = this.surface.copy();
	result.selectedFacets = this.selectedFacets;
	result.hoverFacet = this.hoverFacet;
	return result;
};


//==============================================================================
/**
 * Empty the surfaceController. Remove all the cubes in the surface 
 * and remove the selectedFacets and hoverFacet.
 * Keep name, id, creator, creation date and description.
 * @return {void}
 */
Controller3D.prototype.clear = function () {
//	console.log ("Controller3D.clear");
	// --------------------------------------
	this.surface.clear();
	this.selectedFacets = [];
	this.hoverFacet = null;
};


//==============================================================================
/**
 * Add a cube at the x, y, z coordinates.
 * @param {int} x - the x coordinate where to add the cube.
 * @param {int} y - the y coordinate where to add the cube.
 * @param {int} z - the z coordinate where to add the cube.
 * @return {boolean} true if no error, flase otherwise.
 */
Controller3D.prototype.addCube = function (x, y, z) {
//	console.log ("Controller3D.addCube");
	// --------------------------------------
	return this.surface.addCube (x, y, z);
};


//==============================================================================
/**
 * Remove a cube at the x, y, z coordinates.
 * @param {int} x - the x coordinate where to remove the cube.
 * @param {int} y - the y coordinate where to remove the cube.
 * @param {int} z - the z coordinate where to remove the cube.
 * @return {boolean} true if no error, else false
 */
Controller3D.prototype.removeCube = function (x, y, z) {
//	console.log ("Controller3D.removeCube");
	// --------------------------------------
	return this.surface.removeCube (x, y, z);
};


//==============================================================================
/**
 * Boolean operation "AND" (intersection) on the matrix.
 * @param {Surface} surface - an other surface.
 * @return {void}
 */
Controller3D.prototype.andsurface = function (surface) {
//	console.log ("Controller3D.andsurface");
	// --------------------------------------
	this.surface.andsurface(surface);
};


//==============================================================================
/**
 * Boolean operation "OR" (union) on the matrix.
 * @param {Surface} surface - an other surface.
 * @return {void}
 */
Controller3D.prototype.orsurface = function (surface) {
//	console.log ("Controller3D.orsurface");
	// --------------------------------------
	this.surface.orsurface(surface);
};


//==============================================================================
/**
 * Boolean operation "XOR" on the matrix.
 * @param {Surface} surface - an other surface.
 * @return {void}
 */
Controller3D.prototype.xorsurface = function (surface) {
//	console.log ("Controller3D.xorsurface");
	// --------------------------------------
	this.surface.xorsurface(surface);
};


//==============================================================================
/**
 * Boolean operation "ANDNOT" (exclusion) on the matrix.
 * the matrix is changed, but not the parameter
 * @param {Surface} surface - an other surface.
 * @return {void}
 */
Controller3D.prototype.andNotsurface = function (surface) {
	//console.log ("Controller3D.andNotsurface");
	// --------------------------------------
	this.surface.andNotsurface(surface);
};


//==============================================================================
/**
 * Send a signal to the application depending on the type of operation.
 * @param {Signal} signal - The signal to send to the application.
 * @return {void}
 */
Controller3D.prototype.alert = function (signal) {
//	console.log ("Controller3D.alert");
	this.listener.alertChange (signal);
};


//==============================================================================
/**
 * Add a listener.
 * @param {Object} listener - the object to communicate with.
 */
Controller3D.prototype.setListener = function (listener) {
//	console.log ("Controller3D.setListener");
	this.listener = listener;
};


//==============================================================================
/**
 * Verify if a cube exist in this a given slice.
 * @param {AxisEnum} axis - the orthogonal axis to the slice.
 * @param {int} nb - the slice's number.
 * @return {boolean} true if there is at least one cube in the slice,
 * false otherwise.
 */
Controller3D.prototype.isCubeInSlice = function (axis, nb) {
	switch (axis) {
		case AxisEnum.X :
			for (var i=0; i<this.getSize().m[1]; ++i) {
				for (var j=0; j<this.getSize().m[2]; ++j) {
					if (this.getsurface().getCube(nb,i,j) != null) {
						return true;
					}
				}
			}
			break;
		case AxisEnum.Y :
			for (var i=0; i<this.getSize().m[0]; ++i) {
				for (var j=0; j<this.getSize().m[2]; ++j) {
					if (this.getsurface().getCube(i,nb,j) != null) {
						return true;
					}
				}
			}
			break;
		case AxisEnum.Z :
			for (var i=0; i<this.getSize().m[0]; ++i) {
				for (var j=0; j<this.getSize().m[1]; ++j) {
					if (this.getsurface().getCube(i,j,nb) != null) {
						return true;
					}
				}
			}
			break;
	}
	return false;
};


//==============================================================================
/**
 * @return {boolean} true if the surface is connex, false otherwise.
 */
Controller3D.prototype.isConnex = function () {
	var tmp = new Array();
	var cube = null;
	for (var x=0; x<this.getSize().m[0]; ++x) {
		tmp.push(new Array());
		for (var y=0; y<this.getSize().m[1]; ++y) {
			tmp[x].push(new Array());
			for (var z=0; z<this.getSize().m[2]; ++z) {
				if (this.getCube(x,y,z) != null) {
					tmp[x][y].push(1);
					cube = new Vector (x,y,z);
				}
				else {
					tmp[x][y].push(0);
				}
			}
		}
	}
	if (cube==null) {
		return true;
	}
	this.propagation(tmp,cube.m[0],cube.m[1],cube.m[2]);
	for (var x=0; x<this.getSize().m[0]; ++x) {
		for (var y=0; y<this.getSize().m[1]; ++y) {
			for (var z=0; z<this.getSize().m[2]; ++z) {
				if (tmp[x][y][z]==1) {
					return false;
				}
			}
		}
	}
	return true;
}


//==============================================================================
/**
 * Replace all the 1 in the matrix by 2 if the cube at this position is connex
 * to another cube.
 * @param {int[][][]} mat - the surface cubes represented by ones.
 * @param {int} x - the x coordinate of the first cube.
 * @param {int} y - the y coordinate of the first cube.
 * @param {int} z - the z coordinate of the first cube.
 * @return {void}
 */
Controller3D.prototype.propagation = function (mat,x,y,z) {
	var listeCoord = new Array();
	listeCoord.push([x,y,z]);
	while(listeCoord.length>0) {
		var x = listeCoord[0][0];
		var y = listeCoord[0][1]
		var z = listeCoord[0][2];
		listeCoord.splice(0,1);
		if (this.isIn(x,y,z) && mat[x][y][z]==1) {
			mat[x][y][z] = 2;
			for (var i=0; i<DirectionEnum.size; ++i) {
				var newX = x + DirectionEnum.properties[i].x;
				var newY = y + DirectionEnum.properties[i].y;
				var newZ = z + DirectionEnum.properties[i].z;
				listeCoord.push([newX,newY,newZ]);
			}
		}
	}
};


//==============================================================================
/**
 * @return {boolean} true if the surface possess 25 cubes along an axis,
 * false otherwise.
 */
Controller3D.prototype.dimensionVerification = function () {
	for (var i=0; i<3; ++i) {
		if (this.isCubeInSlice(AxisEnum.toAxis(i),0)) {
			if (this.isCubeInSlice(AxisEnum.toAxis(i),this.getSize().m[i]-1)) {
				return true;
			}
		}
	}
	return false;
};


//==============================================================================
/**
 * @return {boolean} true if a surface is valid, false otherwise.
 */
Controller3D.prototype.isValid = function () {
	return this.dimensionVerification() && this.isConnex();
};



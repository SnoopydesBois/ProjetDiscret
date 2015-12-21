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


/* model : Surface
 * selectedFacets : Facet[]
 * hoverFacet : Facet
 *
 * SurfaceController(size : Vector, name : String)
 * getModel() : Surface
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
 * copy() : SurfaceController
 */

/// CODE ///////////////////////////////////////////////////////////////////////



SurfaceController.prototype.constructor = SurfaceController;

/**
 * @constructor 
 * @param {Vector} size - Vector to define the size of the model.
 * @param {String} name - The name of the SurfaceController.
 * @param {String} [_modelCreator] - The name of the creator of the model.
 * @param {String} [_modelCreationDate] - The date of the creation of the model.
 * @param {String} [_modelDescription] - The description of the model.
 */ 
function SurfaceController (size, name,_modelCreator,
		_modelCreationDate,_modelDescription)
{
//	console.log ("SurfaceController.constructor");
	if (typeof size != "object") {
		console.error ("ERROR - SurfaceController.constructor : "
				+ "bad type of parameter");
	}
	// --------------------------------------
	
	/**
	 * {Surface} The model.
	 */
	this.model = new Surface (size);
	
	/**
	 * {Facet[]} List of selected face.
	 */
	this.selectedFacets = [];
	
	/**
	 * {Facet} The horeved face.
	 */
	this.hoverFacet = null;
	
	
	/**
	 * {String} The name of this model.
	 */
	this.name = name;
	
	/**
	 * {String} The id of this model.
	 */
	this.id = "";
	
	/**
	 * {String} The creator of this model.
	 */
	this.creator = "";
	if (_modelCreator != undefined) {
		this.creator = _modelCreator;
	}
	
	/**
	 * {String} The creation date.
	 */
	this.creationDate = "";
	if (_modelCreationDate != undefined) {
		this.creationDate = _modelCreationDate;
	}
	
	/**
	 * {String} A description of this model.
	 */
	this.description = "";
	if (_modelDescription != undefined) {
		this.description = _modelDescription;
	}
	
	/**
	 * {Application} A listener to which every changement.
	 */
	this.listener = appli;
}


//==============================================================================
/**
 * @return {Surface} the model.
 */
SurfaceController.prototype.getModel = function () {
//	console.log ("SurfaceController.getModel");
	// --------------------------------------
	return this.model;
};


//==============================================================================
/**
 * @param {int} x - the x coordinate of the cube to get
 * @param {int} y - the y coordinate of the cube to get
 * @param {int} z - the z coordinate of the cube to get
 * @return {Voxel} the cube
 */
SurfaceController.prototype.getCube = function (x, y, z) {
//	console.log ("SurfaceController.getCube");
	// --------------------------------------
	return this.model.getCube (x, y, z);
};


//==============================================================================
/**
 * Assessor on name of the model
 * @return {String} name of the model
 */
SurfaceController.prototype.getName = function () {
//	console.log ("SurfaceController.getName");
	// --------------------------------------
	return this.name;
};


//==============================================================================
/**
 * Assessor on creator of the model
 * @return {String} creator of the model
 */
SurfaceController.prototype.getCreator = function () {
//	console.log ("SurfaceController.getCreator");
	// --------------------------------------
	return this.creator;
};


//==============================================================================
/**
 * @return {String} the date of creation of the model.
 */
SurfaceController.prototype.getCreationDate = function () {
	//console.log ("SurfaceController.getDate");
	// --------------------------------------
	return this.creationDate;
};


//==============================================================================
/**
 * @return {String} the description of the model.
 */
SurfaceController.prototype.getDescription = function () {
	//console.log ("SurfaceController.getDescription");
	// --------------------------------------
	return this.description;
};


//==============================================================================
/**
 * @return {Vector} the size of the model.
 */
SurfaceController.prototype.getSize = function () {
//	console.log ("SurfaceController.getSize");
	// --------------------------------------
	return this.model.getSize();
};


//==============================================================================
/**
 * Get the number of neighbor of a cube at the x, y, z coordinates
 * @param {int} x - the x coordinate of the cube to look
 * @param {int} y - the y coordinate of the cube to look
 * @param {int} z - the z coordinate of the cube to look
 * @return {int} the number of neighbors.
 */
SurfaceController.prototype.getNbNeighbor = function (x, y, z) {
	//console.log ("SurfaceController.getNbNeighbor");
	// --------------------------------------
	return this.model.getNbNeighbor (x, y, z);
};


//==============================================================================
/**
 * @return {int} the number of cubes in the model.
 */
SurfaceController.prototype.getNbCube = function () {
//	console.log ("SurfaceController.getNbCube");
	// --------------------------------------
	return this.model.getNbCube();
};


//==============================================================================
/**
 * @return {int} the id of the model.
 */
SurfaceController.prototype.getId = function () {
//	console.log ("SurfaceController.getId");
	// --------------------------------------
	return this.id;
};


//==============================================================================
/**
 * @param {int} id - the id of the model.
 * @return {void}
 */
SurfaceController.prototype.setId = function (id) {
//	console.log ("SurfaceController.getNbCube");
	// --------------------------------------
	this.id = id;
};


//==============================================================================
/**
 * Test if coordonates is in the model.
 * @param {int} x - the x coordinate to test.
 * @param {int} y - the y coordinate to test.
 * @param {int} z - the z coordinate to test.
 * @return {boolean} true if the coordinates are valid, false otherwise.
 */
SurfaceController.prototype.isIn = function (x, y, z) {
//	console.log ("SurfaceController.isIn");
	// --------------------------------------
	return this.model.isIn (x, y, z);
};


//==============================================================================
/**
 * Is this facet selected.
 * @param {Facet} facet - facet to test.
 * @return {boolean} true if the facet is selected, false otherwise.
 */
SurfaceController.prototype.isSelectedFacet = function (facet) {
	/*console.log ("SurfaceController.isSelectedFacet"
			+ "facet.cubeCoor = [" + facet.cubeCoor.m[0] + ", "
			+ facet.cubeCoor.m[1] + ", " + facet.cubeCoor.m[2] 
			+ " facet.direction= " + facet.direction);*/
	if (typeof facet != "object") {
		console.error ("ERROR - SurfaceController.isSelectedFacet :"
				+ "bad type of parameter");
	}
	// --------------------------------------
	for (var i = 0; i < this.selectedFacets.length; ++i) {
		if (this.selectedFacets[i].egale(facet)) {
			return true;
		}
	}
	return false;
};


//==============================================================================
/**
 * Get the nth selected face.
 * @param {int} index - the nth face.
 * @return {Facet} the selected facet.
 */
SurfaceController.prototype.getSelectedFacet = function (index) {
//	console.log ("SurfaceController.getSelectedFacet");
	if (typeof index != "number") {
		console.error ("ERROR - SurfaceController.getSelectedFacet :"
				+ "bad type of parameter");
	}
	// --------------------------------------
	return this.selectedFacets[index];
};


//==============================================================================
/**
 * Add this facet to the selection list.
 * @param {Facet} facet - facet to add.
 * @return {void}
 */
SurfaceController.prototype.addSelectedFacet = function (facet) {
//	console.log ("SurfaceController.addSelectedFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - SurfaceController.addSelectedFacet :"
						+ "bad type of parameter");
	}
	// --------------------------------------
	if (this.selectedFacets.indexOf (facet) == -1) {
		this.selectedFacets.push (facet);
	}
};


//==============================================================================
/**
 * Removes this facet of the selection list 
 * @param {Facet} facet - facet to remove.
 * @return {void}
 */
SurfaceController.prototype.removeSelectedFacet = function (facet) {
//	console.log ("SurfaceController.removeSelectedFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - SurfaceController.removeSelectedFacet :"
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
SurfaceController.prototype.removeSelectedFacetByIndex = function (index) {
	//console.log ("SurfaceController.removeSelectedFacetByIndex");
	this.selectedFacets.splice (index, 1);
};


//==============================================================================
/**
 * Removes all facet of the selection list.
 * @return {void}
 */
SurfaceController.prototype.clearSelectFacet = function () {
	//console.log ("SurfaceController.clearSelectFacet");
	// --------------------------------------
	this.selectedFacets = [];
};


//==============================================================================
/**
 * Removes all facet and adds a facet to the selection list.
 * @param {Facet} facet - facet to add.
 * @return {void}
 */
SurfaceController.prototype.setSelectedFacet = function (facet) {
//	console.log ("SurfaceController.setSelectedFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - SurfaceController.setSelectedFacet : "
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
SurfaceController.prototype.getNbSelectedFacet = function () {
//	console.log ("SurfaceController.getNbSelectedFacet");
	// --------------------------------------
	return this.selectedFacets.length;
};


//==============================================================================
/**
 * @return {Facet} the hover facet.
 */
SurfaceController.prototype.getHoverFacet = function () {
//	console.log ("SurfaceController.getHoverFacet");
	// --------------------------------------
	return this.hoverFacet;
};


//==============================================================================
/**
 * Set the hovered facet.
 * @param {Facet} facet - facet to hover.
 * @return {void}
 */
SurfaceController.prototype.setHoverFacet = function (facet) {
//	console.log ("SurfaceController.setHoverFacet");
	if (typeof facet != "object") {
		console.error ("ERROR - SurfaceController.setHoverFacet : "
						+ "bad type of parameter");
	}
	// --------------------------------------
	this.hoverFacet = facet;
};


//==============================================================================
/**
 * @return {boolean} true if a facet is hovered, false otherwise.
 */
SurfaceController.prototype.isHoverFacet = function () {
//	console.log ("SurfaceController.isHoverFacet");
	// --------------------------------------
	return this.hoverFacet != null;
};


//==============================================================================
/**
 * @return {SurfaceController} a deep copy of this model controller.
 */
SurfaceController.prototype.copy = function () {
//	console.log ("SurfaceController.copy");
	// --------------------------------------
	var result = this.model.copy();
	result.selectedFacets = this.selectedFacets;
	result.hoverFacet = this.hoverFacet;
	return result;
};


//==============================================================================
/**
 * Empty the modelController. Remove all the cubes in the model 
 * and remove the selectedFacets and hoverFacet.
 * Keep name, id, creator, creation date and description.
 * @return {void}
 */
SurfaceController.prototype.clear = function () {
//	console.log ("SurfaceController.clear");
	// --------------------------------------
	this.model.clear();
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
SurfaceController.prototype.addCube = function (x, y, z) {
//	console.log ("SurfaceController.addCube");
	// --------------------------------------
	return this.model.addCube (x, y, z);
};


//==============================================================================
/**
 * Remove a cube at the x, y, z coordinates.
 * @param {int} x - the x coordinate where to remove the cube.
 * @param {int} y - the y coordinate where to remove the cube.
 * @param {int} z - the z coordinate where to remove the cube.
 * @return {boolean} true if no error, else false
 */
SurfaceController.prototype.removeCube = function (x, y, z) {
//	console.log ("SurfaceController.removeCube");
	// --------------------------------------
	return this.model.removeCube (x, y, z);
};


//==============================================================================
/**
 * Boolean operation "AND" (intersection) on the matrix.
 * @param {Surface} model - an other model.
 * @return {void}
 */
SurfaceController.prototype.andModel = function (model) {
//	console.log ("SurfaceController.andModel");
	// --------------------------------------
	this.model.andModel(model);
};


//==============================================================================
/**
 * Boolean operation "OR" (union) on the matrix.
 * @param {Surface} model - an other model.
 * @return {void}
 */
SurfaceController.prototype.orModel = function (model) {
//	console.log ("SurfaceController.orModel");
	// --------------------------------------
	this.model.orModel(model);
};


//==============================================================================
/**
 * Boolean operation "XOR" on the matrix.
 * @param {Surface} model - an other model.
 * @return {void}
 */
SurfaceController.prototype.xorModel = function (model) {
//	console.log ("SurfaceController.xorModel");
	// --------------------------------------
	this.model.xorModel(model);
};


//==============================================================================
/**
 * Boolean operation "ANDNOT" (exclusion) on the matrix.
 * the matrix is changed, but not the parameter
 * @param {Surface} model - an other model.
 * @return {void}
 */
SurfaceController.prototype.andNotModel = function (model) {
	//console.log ("SurfaceController.andNotModel");
	// --------------------------------------
	this.model.andNotModel(model);
};


//==============================================================================
/**
 * Send a signal to the application depending on the type of operation.
 * @param {Signal} signal - The signal to send to the application.
 * @return {void}
 */
SurfaceController.prototype.alert = function (signal) {
//	console.log ("SurfaceController.alert");
	this.listener.alertChange (signal);
};


//==============================================================================
/**
 * Add a listener.
 * @param {Object} listener - the object to communicate with.
 */
SurfaceController.prototype.setListener = function (listener) {
//	console.log ("SurfaceController.setListener");
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
SurfaceController.prototype.isCubeInSlice = function (axis, nb) {
	switch (axis) {
		case AxisEnum.X :
			for (var i=0; i<this.getSize().m[1]; ++i) {
				for (var j=0; j<this.getSize().m[2]; ++j) {
					if (this.getModel().getCube(nb,i,j) != null) {
						return true;
					}
				}
			}
			break;
		case AxisEnum.Y :
			for (var i=0; i<this.getSize().m[0]; ++i) {
				for (var j=0; j<this.getSize().m[2]; ++j) {
					if (this.getModel().getCube(i,nb,j) != null) {
						return true;
					}
				}
			}
			break;
		case AxisEnum.Z :
			for (var i=0; i<this.getSize().m[0]; ++i) {
				for (var j=0; j<this.getSize().m[1]; ++j) {
					if (this.getModel().getCube(i,j,nb) != null) {
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
 * @return {boolean} true if the model is connex, false otherwise.
 */
SurfaceController.prototype.isConnex = function () {
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
 * @param {int[][][]} mat - the model cubes represented by ones.
 * @param {int} x - the x coordinate of the first cube.
 * @param {int} y - the y coordinate of the first cube.
 * @param {int} z - the z coordinate of the first cube.
 * @return {void}
 */
SurfaceController.prototype.propagation = function (mat,x,y,z) {
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
 * @return {boolean} true if the model possess 25 cubes along an axis,
 * false otherwise.
 */
SurfaceController.prototype.dimensionVerification = function () {
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
 * @return {boolean} true if a model is valid, false otherwise.
 */
SurfaceController.prototype.isValid = function () {
	return this.dimensionVerification() && this.isConnex();
};



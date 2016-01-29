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


/* position : Vector
 * faces : boolean[]
 *
 * constructor (pos : Vector)
 * 
 * hasFacet (dir : DirectionEnum) : boolean
 * getPosition () : Vector
 * addFacet (dir : DirectionEnum) : void
 * removeFacet (dir : DirectionEnum) : void
 * isVisible () : boolean
 * getNbVisibleFace () : int
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */
Voxel.prototype.constructor = Voxel;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Vector} pos - Vector to define the position of the Voxel.
 * @param {EnumConnexity} connexity - The connexity for which the voxel should 
 * be displayed.
 */
function Voxel (pos, connexity) {
	if (!pos instanceof Vector) {
		console.error ("Voxel.constructor: bad type(s) of parameter(s)");
	}
	
	/**
	 * {Vector} The position.
	 */
	this.position = pos;
	
	/**
	 * {ConnexityEnum[]} List of connexity of neightbor.
	 */
	this.faces = [];
	for (var i = 0; i < DirectionEnum.size; ++i) {
		this.faces.push (ConnexityEnum.NULL);
	}
	
	/**
	 * {boolean} List of visible neightbor.
	 */
	this.neighborVisibility = [];
	for (var i = 0; i < DirectionEnum.size; ++i) {
		this.faces.push (true);
	}
	
	/**
	 * {ConnexityEnum} TODO
	 */
	this.connexity = connexity;
	
	/**
	 * {boolean} True if the voxel is visible. Use for the multi-slice.
	 */
	this.visibility = true;
}



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Vector} The position of the Voxel.
 */
Voxel.prototype.getPosition = function () {
	return this.position;
};


//==============================================================================
/**
 * @return {ConnexityEnum} The connexity for which the voxel should be visible.
 */
Voxel.prototype.getConnexity = function () {
	return this.connexity;
};


//==============================================================================
/**
 * TODO
 * 
 * @param {ConnexityEnum} [connexity] - The global connexity.
 * 
 * @return {boolean} True if the voxel is visible, false otherwise.
 */
Voxel.prototype.isVisible = function (connexity) {
	return this.visibility && (this.connexity & connexity);
};


//==============================================================================
/**
 * TODO
 * 
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - The connexity.
 * 
 * @throws {String} Voxel.hasFacet.ErrorNotADirection - 'dir' should be a
 * DirectionEnum.
 * @return {boolean} True if the face exists in this connexity, false otherwise.
 */
Voxel.prototype.hasFacet = function (dir, connexity) {
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.hasFacet: bad type(s) of parameter(s)";
	}
	
//	return !(this.neighborVisibility[dir] || this.faces[dir] & connexity); 
	return !(this.faces[dir] & connexity); // FIXME
};


//==============================================================================
/**
 * TODO
 * 
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - TODO
 * 
 * @throws {String} TODO
 * @return {void}
 */
Voxel.prototype.addFacetConnexity = function (dir, connexity) {
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.addFacetConnexity: bad type(s) of parameter(s)";
	}
	
	this.faces[dir] = this.faces[dir] | connexity;
};


//==============================================================================
/**
 * TODO
 * 
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - TODO
 * 
 * @throws {String} TODO
 * @return {void}
 */
Voxel.prototype.removeFacetConnexity = function (dir, connexity) {
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.removeFacetConnexity: bad type(s) of parameter(s)";
	}
	
	this.faces[dir] = this.faces[dir] & !connexity;
};




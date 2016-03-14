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
 * Voxel (pos : Vector)
 * hasFacet (dir : DirectionEnum) : boolean
 * getPosition () : Vector
 * getConnexity () : ConnexityEnum
 * isVisible (connexity : ConnexityEnum) : boolean
 * isHidden (connexity : ConnexityEnum) : boolean
 * hasFacet (dir : DirectionEnum, connexity : ConnexityEnum) : boolean
 * addFacetConnexity (dir : DirectionEnum, connexity : ConnexityEnum) : void
 * removeFacetConnexity (dir : DirectionEnum, connexity : ConnexityEnum) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Represent a voxel from the surface with its position and 
 * its connexity. It also store the state of its neighbours and compute 
 * if it is visible.
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
	 * {Vector} The voxel's position.
	 */
	this.position = pos;

	/**
	 * {ConnexityEnum[]} List of connexity of neighbours.
	 */
	this.faces = [];
	for (var i = 0; i < DirectionEnum.size; ++i) {
		this.faces.push (ConnexityEnum.NULL);
	}

	/**
	 * {boolean} List of visible neighbours.
	 */
	this.neighborVisibility = [];
	for (var i = 0; i < DirectionEnum.size; ++i) {
		this.neighborVisibility.push (true);
	}

	/**
	 * {ConnexityEnum} The current connexity of the voxel
	 */
	this.connexity = connexity;

	/**
	 * {boolean} True if the voxel is visible. Used for the multi-slice.
	 */
	this.visibility = true;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Vector} The position of the voxel.
 */
Voxel.prototype.getPosition = function () {
	return this.position;
};


//==============================================================================
/**
 * @return {ConnexityEnum} The connexity for which the voxel should be displayed.
 */
Voxel.prototype.getConnexity = function () {
	return this.connexity;
};


//==============================================================================
/**
 * Tests if a the voxel is visible in the connexity passed in parameter
 *
 * @param {ConnexityEnum} connexity - The connexity to test.
 *
 * @return {boolean} True if the voxel is visible, false otherwise.
 */
Voxel.prototype.isVisible = function (connexity) {
	/* A voxel is visible if:
	 * - visibility attribute it true
	 * - the current connexity contains this voxel
	 */
	return this.visibility && (this.connexity & connexity);
};


//==============================================================================
/**
 * Tests if the voxel is visible in the specified connexity.
 *
 * @param {ConnexityEnum} connexity - The connexity to test.
 *
 * @return {boolean} True if the voxel is visible, false otherwise.
 */
Voxel.prototype.isHidden = function (connexity) {
	/* A voxel is hidden by its neighbour if at least one or more facets 
	 * are visible
	 * (i.e. if one of its neighbour doesn't have the current connexity)
	 */
	var oneFacetVisible = false;
	for (var i = 0; (!oneFacetVisible) && i < DirectionEnum.size; ++i) {
		oneFacetVisible = oneFacetVisible ||
			!(this.neighborVisibility[i] && this.faces[i] & connexity);
	}
	return !oneFacetVisible;
};


//==============================================================================
/**
 * Tests if a facet exist.
 *
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - The connexity.
 *
 * @throws {String} Voxel.hasFacet.ErrorNotADirection - 'dir' should be a
 * DirectionEnum.
 * @return {boolean} True if the face exists in this connexity, false otherwise.
 */
Voxel.prototype.hasFacet = function (dir, connexity) {
	/// parameters verification
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.hasFacet: bad type(s) of parameter(s)";
	}

	/// compute facet visibility
	return !(this.neighborVisibility[dir] && this.faces[dir] & connexity);
};


//==============================================================================
/**
 * Add the neighbour's connexity to the face.
 *
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - The neighbour's connexity.
 *
 * @return {void}
 * @throws {String} The parameters are not of expected type.
 */
Voxel.prototype.addFacetConnexity = function (dir, connexity) {
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.addFacetConnexity: bad type(s) of parameter(s)";
	}

	this.faces[dir] = this.faces[dir] | connexity;
};


//==============================================================================
/**
 * Remove the neighbour's connexity to the face.
 *
 * @param {DirectionEnum} dir - Direction of the face.
 * @param {ConnexityEnum} connexity - The neighbour's connexity.
 *
 * @return {void}
 * @throws {String} The parameters are not of expected type.
 */
Voxel.prototype.removeFacetConnexity = function (dir, connexity) {
	if (! checkType (arguments, "number", "number")) {
		throw "Voxel.removeFacetConnexity: bad type(s) of parameter(s)";
	}

	this.faces[dir] = this.faces[dir] & !connexity;
};

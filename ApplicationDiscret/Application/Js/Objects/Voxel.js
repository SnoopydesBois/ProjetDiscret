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



Voxel.prototype.constructor = Voxel;

/**
 * @constructor
 * @param {Vector} pos - vector to define the position of the Voxel.
 * @param {EnumConnexity} connexity - the connexity for which the voxel should 
 * be displayed
 */
function Voxel (pos, connexity) {
	if (!pos instanceof Vector) {
		console.error ("ERROR - Voxel.constructor : bad type of parameter");
	}
	// --------------------------------------
	
	/**
	 * {Vector} The position.
	 */
	this.position = pos;
	
	/**
	 * {boolean[]} List of visible faces (all visible by default).
	 */
	this.faces = [];
	for (var i = 0; i < DirectionEnum.size; ++i) {
		this.faces.push (true);
	}
	
	this.connexity = connexity;
}


//==============================================================================
/**
 * Assessor on the faces.
 * @param {DirectionEnum} dir - direction of the face.
 * @throws {string} Voxel.hasFacet.ErrorNotADirection - dir should be a
 * DirectionEnum
 * @return {boolean} true if the face exists, false otherwise.
 */
Voxel.prototype.hasFacet = function (dir) {
//	console.log ("Voxel.hasFacet);
	if (typeof dir != "number" || dir < 0 || dir > DirectionEnum.length) {
		throw "Voxel.hasFacet.ErrorNotADirection";
	}
	// --------------------------------------
	return this.faces[dir];
};


//==============================================================================
/**
 * @return {Vector} the position of the Voxel.
 */
Voxel.prototype.getPosition = function () {
//	console.log ("Voxel.getPosition");
	// --------------------------------------
	return this.position;
};


//==============================================================================
/**
 * Add a face.
 * @param {DirectionEnum} dir - direction of the face.
 * @throws {string} Voxel.hasFacet.ErrorNotADirection - dir should be a
 * DirectionEnum
 * @return {void}
 */
Voxel.prototype.addFacet = function (dir) {
	//console.log ("Voxel.addFacet");
	if (typeof dir != "number" || dir < 0 || dir > DirectionEnum.length) {
		throw "Voxel.hasFacet.ErrorNotADirection";
	}
	// --------------------------------------
	this.faces[dir] = true;
};


//==============================================================================
/**
 * Remove a face.
 * @param {DirectionEnum} dir - direction of the face.
 * @throws {string} Voxel.hasFacet.ErrorNotADirection - dir should be a
 * DirectionEnum
 * @return {void}
 */
Voxel.prototype.removeFacet = function (dir) {
//	console.log ("Voxel.removeFacet");
	if (typeof dir != "number" || dir < 0 || dir > DirectionEnum.length) {
		throw "Voxel.hasFacet.ErrorNotADirection";
	}
	// --------------------------------------
	this.faces[dir] = false;
};


//==============================================================================
/**
 * @return {boolean} true if the cube is visible, false otherwise.
 */
Voxel.prototype.isVisible = function () {
//	console.log ("Voxel.isVisible");
	// --------------------------------------
	for (var i = 0; i < this.faces.length; ++i) {
		if (this.faces[i]) {
			return true;
		}
	}
	return false;
};


//==============================================================================
/**
 * @return {int} how many faces are visible.
 */
Voxel.prototype.getNbVisibleFace = function () {
//	console.log ("Voxel.getNbVisibleFace");
	// --------------------------------------
	var nb = 0;
	for (var i = 0; i < this.faces.length; ++i) {
		if (this.faces[i]) {
			nb++;
		}
	}
	return nb;
};


//==============================================================================
/**
 * @return {ConnexityEnum} the connexity for which the voxel should be visible
 */
Voxel.prototype.getConnexity = function () {
	return this.connexity;
};

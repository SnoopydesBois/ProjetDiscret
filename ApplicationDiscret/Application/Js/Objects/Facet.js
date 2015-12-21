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


/* cubeCoor : Vector
 * direction : DirectionEnum
 *
 * constructor (cubeCoor : Vector, dir : DirectionEnum)
 * 
 * getCube () : Vector
 * getDirection () : DirectionEnum
 * egale (face : Facet) : boolean
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc This class represent a cube or just a face of a cube. This object
 * has a position (the center of the cube) and a direction (all or none for a
 * cube, something else for a face). It is used to store/send/recieve data but
 * not used by the Voxel class.
 * @see DirectionEnum, Voxel.
 */



Facet.prototype.constructor = Facet;

/**
 * @constructor
 * @param {Vector} cubeCoor - vector to define the position of the Voxel.
 * @param {DirectionEnum} dir - the face of the cube.
 */
function Facet (cubeCoor, dir) {
//	console.log ("Facet.constructor");
	if (typeof cubeCoor != "object" || typeof dir != "number") {
		console.error ("ERROR - Facet.constructor : bad type of parameter");
	}
	// --------------------------------------
	
	/**
	 * {Vector} The coordonates in the univers.
	 */
	this.cubeCoor = cubeCoor;
	
	/**
	 * {DirectionEnum} The direction of the face (ALL or NONE for a cube).
	 */
	this.direction = dir;
}


//==============================================================================
/**
 * @return {Vector} the coordinates.
 */
Facet.prototype.getCube = function () {
//	console.log ("Facet.getCube");
	// --------------------------------------
	return this.cubeCoor;
};


//==============================================================================
/**
 * @return {DirecionEnum} the direction of the face.
 */
Facet.prototype.getDirection = function () {
//	console.log ("Facet.getDirection");
	// --------------------------------------
	return this.direction;
};


//==============================================================================
/**
 * Test the equality between to Facet (i.e. same coordonates and same
 * direction).
 */
Facet.prototype.egale = function (face) {
//	console.log ("Facet.egale");
	// --------------------------------------
	if (face != null) {
		return (this.cubeCoor.m[0] == face.cubeCoor.m[0] 
				&& this.cubeCoor.m[1] == face.cubeCoor.m[1] 
				&& this.cubeCoor.m[2] == face.cubeCoor.m[2] 
				&& this.direction == face.direction);
	}
	else
		return false;
};



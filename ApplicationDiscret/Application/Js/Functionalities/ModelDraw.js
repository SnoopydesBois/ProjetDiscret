/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * Copyright BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy,
 * LAURET Karl, (juin 2015)
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
 * termes
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 *
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @classdesc TODO
 */
ModelDraw.prototype.constructor = ModelDraw;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO
 */
function ModelDraw () {

	/**
	 * {DrawnCurve} the curve on which the model act
	 */
	this.curve = new DrawnCurve ();
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {DrawnCurve} The current curve.
 */
ModelDraw.prototype.getCurve = function () {
	return this.curve;
};


//##############################################################################
//	Other methods
//##############################################################################



/**
 * Create a new curve.
 *
 * @return {void}
 */
ModelDraw.prototype.newCurve = function () {
	this.curve = new DrawnCurve ();
};


//==============================================================================
/**
 * Add a point to the curve. Transform x/y coordinates on the canvas to y/z
 * coordinates in the 3D space.
 *
 * @param {int} x - X coordinate of the new point (in pixel).
 * @param {int} y - Y coordinate of the new point (in pixel).
 * @param {Vector} canvasSize - Size of the cavas (in pixel).
 * @param {Vector} universSize - Size of the 3D space (in voxel).
 *
 * @return {void}
 */
ModelDraw.prototype.addPoint = function (x, y, canvasSize, universSize) {
	this.curve.addPoint (
		x * universSize.x / canvasSize.x,
		y * universSize.y / canvasSize.y
	);
};

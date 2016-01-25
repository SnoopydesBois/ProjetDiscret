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


/* constructor ()
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


Controller2DMeridian.prototype = new Controller2D;
Controller2DMeridian.prototype.constructor = Controller2DMeridian;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Number} imageMin - The lower bound of the output range.
 * @param {Number} imageMax - The upper bound of the output range.
 * @param {Number} antecedantMin - The lower bound of the input range.
 * @param {Number} antecedantMax - The upper bound of the input range.
 * @param {DrawModeEnum} mode - The drawing method used.
 */
function Controller2DMeridian (imageMin, imageMax, antecedantMin, antecedantMax,
	mode)
{
	
	Controller2D.call (this, imageMin, imageMax, antecedantMin, antecedantMax,
		mode);
	
	this.modelDraw = new ModelDraw ();
}



//##############################################################################
//	Curve methods
//##############################################################################



/**
 * TODO
 * 
 * @param {Dimmension} dim - 
 */
Controller2DMeridian.prototype.startFreeHand = function (dim) {
	/// parameter verification
	if (! (dim instanceof Dimension)) {
		throw "Controlelr2DMeridian.startFreeHand : bad type of parameter";
	}
	
	/// add point
	throw "Controller2DMeridian.startFreeHand: this function is not "
		+ "implemented";
};


//==============================================================================
/**
 * TODO
 * 
 * @param {Dimmension} dim - 
 * @param {Vector} coord - 
 * 
 * @return {}
 */
Controller2DMeridian.prototype.newFreeHand = function (dim, coord) {
	/// parameter verification
	if (! checkType (arguments, Dimension, Vector)) {
		throw "Controller2DMeridian.newFreeHand: bad type(s) of parameter(s)";
	}
	
	/// set a new curve
	throw "Controller2DMeridian.newFreeHand: this function is not implemented";
};


//==============================================================================
/**
 * Add a point to the current drawn curve.
 * 
 * @param {Dimension} dim - 
 * @param {Vector} coord - The coordinate of the point to add.
 * 
 * @return {}
 */
Controller2DMeridian.prototype.addPoint = function (dim, coord) {
	/// parameter verification
	if (! checkType (arguments, Dimension, Vector)) {
		throw "Controller2DMeridian.addPoint: bad type(s) of paramter(s)";
	}
	
	/// add the point
	this.modelDraw.addPoint (coord, dim);
};


//==============================================================================
/**
 * TODO
 * 
 * @param {} eq - 
 * 
 * @return {}
 */
Controller2DMeridian.prototype.parseImplicit = function (eq) {
	// TODO parsing
	throw "Controller2DMeridian.parseImplicit: this function is not implemented";
};


//==============================================================================
/**
 * TODO
 * 
 * @param {} eqX - 
 * @param {} eqY - 
 * 
 * @return {}
 */
Controller2DMeridian.prototype.parseParametric = function (eqX, eqY) {
	// TODO parsing
	throw "Controller2DMeridian.parseParametric: this function is not implemented";
};


//==============================================================================
/**
 * TODO
 * 
 * @param {} eq - 
 * 
 * @return {}
 */
Controller2DMeridian.prototype.parseExplicit = function (eq) {
	// TODO parsing
	throw "Controller2DMeridian.parseExplicit: this function is not implemented";
};



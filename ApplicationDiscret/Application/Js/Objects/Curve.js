/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
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
 * Curve ()
 * computePoints (ranX, ranY)
 * setParameter (parameter, value)
 * getAllParameters ()
 * getParameter (name)
 * getParametersRange (name)
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc A curve used in the 2D space. Can be a generatrix or a directrix.
 * Abstract class, the curves used must inherit from this class.
 */
Curve.prototype.constructor = Curve;



//##############################################################################
//	Constructor
//##############################################################################



function Curve () {}



//##############################################################################
//	Compute method
//##############################################################################



/**
 * @abstract
 */
Curve.prototype.computePoints = function (ranX, ranY) {
	throw "Curve.computePoints.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.setParameter = function (parameter, value) {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getAllParameters = function () {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getParameter = function (name) {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getParametersRange = function (name) {
	throw "Curve.getParametersRange.ErrorNotImplementedInAbstractClass";
};



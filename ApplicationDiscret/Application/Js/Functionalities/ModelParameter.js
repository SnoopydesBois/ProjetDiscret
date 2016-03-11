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
 * termes.
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* curve : Curve
 * 
 * ModelParameter ()
 * 
 * setCurve (curve : Curve) : void
 * setParameter (parameter : String, value : Number) : void
 * getAllParameters () : Map<String, Number>
 * getParameter (name : String) : Number
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc 
 */
ModelParameter.prototype.constructor = ModelParameter;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function ModelParameter () {

	/**
	 * {Curve} The curve on which the model acts.
	 */
	this.curve = null;
}



//##############################################################################
//	Mutator
//##############################################################################



/**
 * Set the active curve.
 * 
 * @param {Curve} curve - The curve which parameters are modified.
 * 
 * @return {void}
 */
ModelParameter.prototype.setCurve = function (curve) {
	this.curve = curve;
};



//##############################################################################
//	Curve modifier
//##############################################################################



/**
 * Set a value to a parameter.
 * @see {@link Curve.setParameter}
 * 
 * @param {String} parameter - The name of the parameter to modify.
 * @param {Number} value - The value of the parameter to set.
 * 
 * @return {void}
 */
ModelParameter.prototype.setParameter = function (parameter, value) {
	this.curve.setParameter (parameter, value);
};


//==============================================================================
/**
 * Return all the parameters of a curve.
 * @see {@link Curve.getAllParameters}
 * 
 * @return {Map<String, Number>} A map composed of the name of a parameter (the
 * key) and its value (the value).
 */
ModelParameter.prototype.getAllParameters = function () {
	return this.curve.getAllParameters ();
};


//==============================================================================
/**
 * Retrieve the value of a parameter which name is passed in parameter.
 * @see {@link Curve.getParameter}
 * 
 * @param {String} name - The name of the parameter.
 * 
 * @return {Number} The value of the named parameter.
 */
ModelParameter.prototype.getParameter = function (name) {
	return this.curve.getParameter (name);
};



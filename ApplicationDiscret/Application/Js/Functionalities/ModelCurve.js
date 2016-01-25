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
 * select (modelContr : ModelController,
 *         face : Facet,
 *         multiple : boolean) : void
 * cube (modelContr : ModelController) : void
 * face (modelContr : ModelController) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



ModelCurve.prototype.constructor = ModelCurve;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Range} image - The image range of the curve.
 * @param {Range} inverseImage - The inverse image range of the curve.
 */
function ModelCurve (image, inverseImage) {
	if (! checkType (arguments, Range, Range)) {
		console.error ("ModelCurve.constructor: bad type of parameter");
	}
	
	/**
	 * {Range} The image range of the curve
	 */
	this.image = image;
	
	/**
	 * {Range} The inverse image range of the curve
 	 */
	this.inverseImage = inverseImage;
	
	/**
	 * {Map<String, Function>} The list of curves available for the user
	 * Contain the default list of curves and the curves created by the
	 * user (by formula or by loading is files)
	 */
	this.listCurve = new Map ();
	
	/**
	 * {Curve} The active curve of the model
	 */
	this.activeCurve = null;
	
};


//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * Add a curve to its list.
 * 
 * @param {String} name - The name of the curve.
 * @param {Function} constructor - The constructor of the curve. This class
 * constructor must inherit from Curve.
 * 
 * @return {void}
 */
ModelCurve.prototype.addCurve = function (name, constructor) {
	this.listCurve.set (name, constructor);
};



//==============================================================================
/**
 * Set the new active curve for the model.
 * If the type of the curve is provided, a new curve is created with 
 * the parameter curve as it's equation.
 * If the type of the curve is not provided, the new active curve is a 
 * default curve and the parameter "curve" is the name of this default curve 
 * present in the attribute listCurve of the model.
 *
 * @param {String} curve - The equation of the curve or its name
 * @param {EquationTypeEnum} [type] - The type of the new active curve.
 */
ModelCurve.prototype.setActive = function (curve, type) {
	/// paramters verification
	if(!(typeof curve == "string")){		
		console.error ("ModelCurve.setActive: parameter curve is of wrong type");
	}
	
	/// set
	switch (type) {
		case EquationTypeEnum.implicit :
			this.activeCurve = new ImplicitCurve(curve);
			break;
		case EquationTypeEnum.explicit :
			this.activeCurve = new Explicit(curve);
			break;
		case EquationTypeEnum.parametric :
			throw "ModelCurve.setActive: This model does not handle parametric curves";
			break;
		case undefined:
		case null:
			if (this.listCurve.has (curve))
				this.activeCurve = new (this.listCurve.get(curve))();
			else {
				this.consolePrintAvailableCurve ();
				throw "ModelCurve.setActive: Unknown equation name";
			}
			break;
		default :
			throw "ModelCurve.setActive: Unknown type of equation";
			break;
	}
//	this.activeCurve = curve;
};


//==============================================================================
/**
 * @return {List<Vector>} A list of points of the curve.
 */
ModelCurve.prototype.getPoints = function () {
	return this.activeCurve.computePoints (this.image, this.inverseImage, 0.1);
};


//==============================================================================
/**
 * @return {Curve} the active curve of the model.
 */
ModelCurve.prototype.getActiveCurve = function () {
	return this.activeCurve;
};


//==============================================================================
/**
 * @return {Equation} The equation of the active curve
 */
ModelCurve.prototype.getEquation = function () {
	return this.activeCurve.getEquation ();
};


//==============================================================================
/**
 * @return {Range} the image range of the curve.
 */
ModelCurve.prototype.getImage = function(){
	return this.image;
};


//==============================================================================
/**
 * @return {Range} the inverse image range of the curve
 */
ModelCurve.prototype.getInverseImage = function(){
	return this.inverseImage;
};


//==============================================================================
/**
 * @param {Range} the image range of the curve to set.
 */
ModelCurve.prototype.setImage = function(image){
	this.image = image;
};


//==============================================================================
/**
 * @param {Range} the inverse image range of the curve to set
 */
ModelCurve.prototype.setInverseImage = function(inverseImage){
	this.inverseImage = inverseImage;
};


//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @param {Equation} eq - The equation to set to the active implicit/explicit
 * curve.
 */
ModelCurve.prototype.addEquation = function(eq){
	if(!(eq instanceof Equation)){
		throw "ModelCurve.addEquation : eq parameter is of wrong type";
	}
	this.activeCurve.setEquation (eq);
};


//==============================================================================
/**
 * Print (with console.log ()) all available curve in this model.
 * 
 * @return {void}
 */
ModelCurve.prototype.consolePrintAvailableCurve = function () {
	this.listCurve.forEach (function (val, key, map) {
		console.log (key);
	});
};



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
 * constructor ()
 */


/// CODE ///////////////////////////////////////////////////////////////////////



Controller2D.prototype = new Controller;
Controller2D.prototype.constructor = Controller2D;



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
function Controller2D (imageMin, imageMax, antecedantMin, antecedantMax, mode) {
	if (arguments.length == 0) {
		Controller.call (this);
	}
	else {
		if (! checkType (arguments, "number", "number", "number", "number",
			"number"))
		{
			console.error ("Controller2D.constructor: bad type(s) of "
				+ "parameter(s)");
			showType ();
		}

		Controller.call (this);

		/**
		 * {ModelCurve} The model that create curve.
		 */
		this.modelCurve = new ModelCurve (
			new Range (imageMin, imageMax),
			new Range (antecedantMin, antecedantMax)
		);

		/**
		 * {DrawModeEnum} The type of drawing method used.
		 */
		this.mode = mode;
		//this.modelParser = new ModelParser();
		this.modelParameter = new ModelParameter();
	}
}



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * Add a curve to the model.
 * @see {@link ModelCurve.addCurve}
 *
 * @param {String} name - The name of the curve.
 * @param {Function} constructor - The constructor of the curve. This class
 * constructor must inherit from Curve.
 *
 * @return {void}
 */
Controller2D.prototype.addCurve = function (name, constructor) {
	/// parameter verification
	if (! checkType (arguments, "string", Function)) {
		showType (name, constructor);
		throw "Controller2D.addCurve: bad type(s) of parameter(s)";
	}

	/// add the curve
	this.modelCurve.addCurve (name, constructor);
};


//==============================================================================
/**
 * TODO doc
 *
 * @return {void}
 */
Controller2D.prototype.getActiveCurve = function () {
	return this.modelCurve.getActiveCurve ();
};


//==============================================================================
/**
 * TODO doc
 *
 * @param {(Curve | String)} name - TODO ???
 *
 * @return {void}
 */
Controller2D.prototype.setActive = function (name) {
	if(!(name instanceof Curve) && !(typeof name == "string")){
		throw "Controller2D.setActive.ErrorParameterType";
	}

	/// set the curve
	var curve = this.modelCurve.setActive (name);
	this.modelParameter.setCurve(curve);
};


//==============================================================================
/**
 *
 */
Controller2D.prototype.getAllParameters = function (){
	//console.log(this.modelParameter.getAllParameters());
	return this.modelParameter.getAllParameters ();
};


//==============================================================================
/**
 * TODO
 * @see ModelCurve.getParametersRange
 *
 * @param {TODO} name - TODO description
 *
 * @return {TODO}
 */
Controller2D.prototype.getParametersRange = function (name){
	return this.modelCurve.getParametersRange(name);
};


//==============================================================================
/**
 * TODO
 * @see ModelParameter.setParameter
 *
 * @param {TODO} param - TODO description
 * @param {TODO} name - TODO description
 *
 * @return {void}
 */
Controller2D.prototype.setParameter = function (param, value){
	return this.modelParameter.setParameter (param, value);
};


//==============================================================================
/**
 * Test if is an instance of the given type.
 *
 * @param {Function} type - The curve type (i.e. the constructor of this kind of
 * curve).
 *
 * @return {TODO} TODO
 */
Controller2D.prototype.isTypeOf = function (type) {
	return this.modelCurve.getActiveCurve () instanceof type;
};


//==============================================================================
/**
 * @return {Point[][]} A list of list of point. One list of point is a set of
 * connected point.
 */
Controller2D.prototype.getPoints = function () {
	return this.modelCurve.getPoints ();
};


//==============================================================================
/**
 * @return {Equation} The equation of the active curve.
 */
Controller2D.prototype.getEquation = function () {
	return this.modelCurve.getEquation ();
};


//==============================================================================
/**
 * @return {Range} TODO
 */
Controller2D.prototype.getXRange = function () {
	return this.modelCurve.getImage ();
};


//==============================================================================
/**
 * @return {Range} TODO
 */
Controller2D.prototype.getYRange = function () {
	return this.modelCurve.getInverseImage ();
};


//==============================================================================
/**
 * @param {Range} xRange - The new xRange to set.
 *
 * @return {TODO}
 */
Controller2D.prototype.setXRange = function (xRange) {
	return this.modelCurve.setImage (xRange);
};


//==============================================================================
/**
 * @param {Range} yRange - The new yRange to set.
 *
 * @return {TODO}
 */
Controller2D.prototype.setYRange = function (yRange) {
	return this.modelCurve.setInverseImage (yRange);
};


//==============================================================================
/**
 * TODO doc
 * To redefine in child controllers XXX realy ???
 *
 * @param {} dim -
 */
Controller2D.prototype.startHandFree = function (dim) {
	throw "Controller2D.startHandFree: this function is not implemented";
};


//==============================================================================
/**
 * TODO doc
 * To redefine in child controllers XXX realy ???
 *
 * @param {} dim -
 * @param {} coord -
 */
Controller2D.prototype.newHandFree = function (dim, coord) {
	throw "Controller2D.newHandFree: this function is not implemented";
};


//==============================================================================
/**
 * TODO doc
 *
 * @param {} eq -
 */
Controller2D.prototype.parseImplicit = function (eq) {
	// TODO parsing
	throw "Controller2D.parseImplicit: this function is not implemented";
};


//==============================================================================
/**
 * TODO doc
 *
 * @param {} eqX -
 * @param {} eqY -
 */
Controller2D.prototype.parseParametric = function (eqX, eqY) {
	// TODO parsing
	throw "Controller2D.parseParametric: this function is not implemented";
};


//==============================================================================
/**
 * TODO doc
 *
 * @param {} eq -
 */
Controller2D.prototype.parseExplicit = function (eq) {
	// TODO parsing
	throw "Controller2D.parseExplicit: this function is not implemented";
};

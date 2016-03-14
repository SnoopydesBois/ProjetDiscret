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


/* constructor (imageMin : Number, imageMax : Number, antecedantMin : Number, antecedantMax : Number, mode : DrawModeEnum)
 * addCurve (name : String, Function)
 * getActiveCurve ()
 * setActive (name : {Curve, String}, type : EquationTypeEnum) 
 * getAllParameters ()
 * getParametersRange (name : String)
 * setParameter (param : String, value : Number) 
 * getPoints ()
 * getEquation ()
 * getEquationNoParameter ()
 * getXRange ()
 * getYRange ()
 * setXRange (xRange : Range)
 * setYRange (yRange : Range)
 * startHandFree (dim)
 * newHandFree (dim, coord)
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc A class used to communicate between the application and the curve model
 */
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
		 * {ModelCurve} The model that creates curve.
		 */
		this.modelCurve = new ModelCurve (
			new Range (imageMin, imageMax),
			new Range (antecedantMin, antecedantMax)
		);

		/**
		 * {DrawModeEnum} The type of drawing method used.
		 */
		this.mode = mode;
		
		/**
		 * {ModelParameter} The model that controls the curve parameters
		 */
		this.modelParameter = new ModelParameter();
	}
};



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
 * Returns the active curve of the model.
 * The curve returned can only be of type FormulaCurve as a Controller2D only use a modelCurve
 * @return {FormulaCurve} the curve of the model
 */
Controller2D.prototype.getActiveCurve = function () {
	return this.modelCurve.getActiveCurve ();
};


//==============================================================================
/**
 * Set the active curve
 *
 * @param {(Curve | String)} name - If of type curve, it is the new curve to set as the active curve
 * if of type String, it is the name of a predefined curve to set as active
 * @param {(EquationTypeEnum)} type - If name is of type Curve, the model needs to know the
 * type of this new curve
 *
 * @return {void}
 */
Controller2D.prototype.setActive = function (name, type) {
	if(!(name instanceof Curve) && !(typeof name == "string")){
		throw "Controller2D.setActive.ErrorParameterType";
	}

	/// set the curve
	var curve;
	if(type == undefined){
		curve =  this.modelCurve.setActive (name);
	}
	else{
		curve = this.modelCurve.setActive (name, type);
	}
	this.modelParameter.setCurve(curve);
};


//==============================================================================
/**
 * Returns all the parameters associated to a curve
 * @return {Map<String, Number>} A map composed of the name of a parameter (the
 * key) and its value (the value).
 */
Controller2D.prototype.getAllParameters = function (){
	return this.modelParameter.getAllParameters ();
};


//==============================================================================
/**
 * Returns the range of a parameter
 * @see ModelCurve.getParametersRange
 *
 * @param {String} name - The name of the parameter
 *
 * @return {Range} The range of the parameter
 */
Controller2D.prototype.getParametersRange = function (name){
	return this.modelCurve.getParametersRange(name);
};


//==============================================================================
/**
 * Sets a value to a specified parameter
 * @see ModelParameter.setParameter
 *
 * @param {String} param - The name of the parameter to set
 * @param {Number} value - The new value for the parameter
 *
 * @return {void}
 */
Controller2D.prototype.setParameter = function (param, value){
	return this.modelParameter.setParameter (param, value);
};


//==============================================================================
/**
 * @return {Point[][]} A list of list of points. One list of point is a set of
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
 * @return {String} The string corresponding to the current equation (without parameters).
 */
Controller2D.prototype.getEquationNoParameter = function(){
	return this.modelCurve.getEquationNoParameter();
};


//==============================================================================
/**
 * @return {Range} Returns the X range of the curve
 */
Controller2D.prototype.getXRange = function () {
	return this.modelCurve.getImage ();
};


//==============================================================================
/**
 * @return {Range} Returns the Y range of the curve
 */
Controller2D.prototype.getYRange = function () {
	return this.modelCurve.getInverseImage ();
};


//==============================================================================
/**
 * @param {Range} xRange - The new xRange for the model.
 *
 * @return {void}
 */
Controller2D.prototype.setXRange = function (xRange) {
	// TODO tester si enlever le return marche
	this.modelCurve.setImage (xRange);
};


//==============================================================================
/**
 * @param {Range} yRange - The new yRange for the model.
 *
 * @return {void}
 */
Controller2D.prototype.setYRange = function (yRange) {
	this.modelCurve.setInverseImage (yRange);
};


//==============================================================================
/**
 * IMPLEMENTED IN CHILD CLASSES
 */
Controller2D.prototype.startHandFree = function (dim) {
	throw "Controller2D.startHandFree: this function is not implemented";
};


//==============================================================================
/**
 * IMPLEMENTED IN CHILD CLASSES
 */
Controller2D.prototype.newHandFree = function (dim, coord) {
	throw "Controller2D.newHandFree: this function is not implemented";
};

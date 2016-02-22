/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
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
 * @param {(EquationTypeEnum)} type - TODO ???
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

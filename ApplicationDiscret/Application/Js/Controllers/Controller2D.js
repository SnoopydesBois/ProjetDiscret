/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license TODO
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
		
		/**
		 * {ModelParameter} The model that control the curve parameters
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
 * Return the active curve of the model
 * The curve returned can only be of type FormulaCurve as a Controller2D only use a modelCurve
 * @return {FormulaCurve} the curve of the model
 */
Controller2D.prototype.getActiveCurve = function () {
	return this.modelCurve.getActiveCurve ();
};


//==============================================================================
/**
 * Set a curve to the model
 *
 * @param {(Curve | String)} name - If of type curve, it is the new curve to set to the model
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
 * Return all the parameters associated to a curve
 * @return {Map<String, Number>} A map composed of the name of a parameter (the
 * key) and its value (the value).
 */
Controller2D.prototype.getAllParameters = function (){
	return this.modelParameter.getAllParameters ();
};


//==============================================================================
/**
 * Return the range of a parameter
 * @see ModelCurve.getParametersRange
 *
 * @param {String} name - The name of the parameter
 *
 * @return {Range} The range of the named parameter
 */
Controller2D.prototype.getParametersRange = function (name){
	return this.modelCurve.getParametersRange(name);
};


//==============================================================================
/**
 * Set a value to a specified parameter
 * @see ModelParameter.setParameter
 *
 * @param {String} param - The name of the parameter to set
 * @param {Number} value - The value to set to the parameter
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
 * @return {String} The string corresponding to the current equation (without parameters).
 */
Controller2D.prototype.getEquationNoParameter = function(){
	return this.modelCurve.getEquationNoParameter();
};


//==============================================================================
/**
 * @return {Range} Return the X range of the curve
 */
Controller2D.prototype.getXRange = function () {
	return this.modelCurve.getImage ();
};


//==============================================================================
/**
 * @return {Range} Return the Y range of the curve
 */
Controller2D.prototype.getYRange = function () {
	return this.modelCurve.getInverseImage ();
};


//==============================================================================
/**
 * @param {Range} xRange - The new xRange to set to the model.
 *
 * @return {void}
 */
Controller2D.prototype.setXRange = function (xRange) {
	// TODO tester si enlever le return marche
	this.modelCurve.setImage (xRange);
};


//==============================================================================
/**
 * @param {Range} yRange - The new yRange to set to the model.
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

/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 * setActive(name : (Curve | String), type : (EquationTypeEnum)
 * getActiveCurve()
 * newCurve()
 * closeCurve()
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc This class inherits from Controller2D and is used to communicate with a modelCurve or a ModelDraw
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
	// Call to mother constructor
	Controller2D.call (this, imageMin, imageMax, antecedantMin, antecedantMax,
		DrawModeEnum.HAND_FREE);

	/**
	 * {ModelDraw} The model used to handle the drawn curve
	 */
	this.modelDraw = new ModelDraw ();

	/**
	 * {HTMLSelectElement} The current curve mode.
	 */
	this.mode = document.getElementById ("meridianType");
};



//##############################################################################
//	Curve methods
//##############################################################################

/**
 * Set an active curve depending of the active mode
 * @param {(Curve | String)} name - If of type curve, it is the new curve for the model
 * if of type String, it is the name of a predefined curve to set as active
 * @param {(EquationTypeEnum)} type - If name is of type Curve, the model needs to know the
 * type of this new curve
 * @return {void}
 */
Controller2DMeridian.prototype.setActive = function (name, type) {
	var mode = document.forms["meridianType"]["meridianTypeValue"].value
	var curve;
	// List of curves mode
	if (mode === "meridianPrimitive") {
		curve = this.modelCurve.setActive (name, type);
		this.modelParameter.setCurve(curve);
	}
	// Draw mode
	else if (mode === "meridianFreeHand") {
		curve = this.newCurve ();
	}
	// Formula mode
	else if (mode === "meridianFormula") {
		curve = this.modelCurve.setActive(name, EquationTypeEnum.EXPLICIT);
		this.modelParameter.setCurve(curve);
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode: " + mode);
	}
};

//==============================================================================
/**
 * @return {Curve} The current curve.
 */
Controller2DMeridian.prototype.getActiveCurve = function () {
	var mode = document.forms["meridianType"]["meridianTypeValue"].value;
	if (mode === "meridianPrimitive") {
		return this.modelCurve.getActiveCurve ();
	}
	else if (mode === "meridianFreeHand") {
		return this.modelDraw.getActiveCurve ();
	}
	else if (mode === "meridianFormula") {
		return this.modelCurve.getActiveCurve ();
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode: " + mode);
		return null;
	}
};


//==============================================================================
/**
 * Ask the modelDraw to create a new Curve
 */
Controller2DMeridian.prototype.newCurve = function () {
	this.modelDraw.newCurve ();
};


//==============================================================================
/**
 * Closes the active drawn curve.
 *
 * @return {Point} The added point (null if does not exist or already added).
 */
Controller2DMeridian.prototype.closeCurve = function () {
	return this.modelDraw.closeCurve ();
};
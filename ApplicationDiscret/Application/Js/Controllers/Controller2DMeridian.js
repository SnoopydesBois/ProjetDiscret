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
		DrawModeEnum.HAND_FREE);

	/**
	 * {ModelDraw} TODO
	 */
	this.modelDraw = new ModelDraw ();

	/**
	 * {HTMLSelectElement} The current curve mode.
	 */
	this.mode = document.getElementById ("meridianType");
}



//##############################################################################
//	Curve methods
//##############################################################################

/**
 * @return {Curve} The current curve.
 */
Controller2DMeridian.prototype.setActive = function (name, type) {
	var mode = document.forms["meridianType"]["meridianTypeValue"].value
	var curve;
	if (mode === "meridianPrimitive") {
		curve = this.modelCurve.setActive (name, type);
		this.modelParameter.setCurve(curve);
	}
	else if (mode === "meridianFreeHand") {
		curve = this.newCurve ();
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
	var mode = document.forms["meridianType"]["meridianTypeValue"].value
	if (mode === "meridianPrimitive") {
		return this.modelCurve.getActiveCurve ();
	}
	else if (mode === "meridianFreeHand") {
		return this.modelDraw.getActiveCurve ();
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode: " + mode);
		return null;
	}
};


//==============================================================================
/**
 * TODO
 */
Controller2DMeridian.prototype.newCurve = function () {
	this.modelDraw.newCurve ();
};


//==============================================================================
/**
 * Closes the active drawn curve.
 *
 * @return {Point} The added point (null if not exist or already added).
 */
Controller2DMeridian.prototype.closeCurve = function () {
	return this.modelDraw.closeCurve ();
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

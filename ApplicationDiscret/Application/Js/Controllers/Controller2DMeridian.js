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
Controller2DMeridian.prototype.getActiveCurve = function () {
	var mode = this.mode.value;
	if (mode === "primitive") {
		return this.modelCurve.getActiveCurve ();
	}
	else if (mode === "freeHand") {
		return this.modelDraw.getActiveCurve ();
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode");
		return null;
	}
};


//==============================================================================
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

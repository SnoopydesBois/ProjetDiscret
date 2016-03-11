// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Heart.prototype = new ImplicitCurve;
Heart.prototype.constructor = Heart;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Heart () {
	var equation = new Equation (
		"((x - 0.0)^2 + (y + 0.1)^2 - 0.7)^3 - x^2 * y^3");

	ImplicitCurve.call (this, equation);
};

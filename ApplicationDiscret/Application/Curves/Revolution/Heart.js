// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
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
	//(x^2 + y^2 - 1)^3 - x^2 * y^3 -> equation de cercle - (x^2 * y^3)
	var equation = new Equation (
		"((x - 0.0)^2 + (y + 0.1)^2 - 0.7)^3 - x^2 * y^3");

	ImplicitCurve.call (this, equation);
}

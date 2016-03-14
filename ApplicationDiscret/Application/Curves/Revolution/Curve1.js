// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Curve1.prototype = new ImplicitCurve;
Curve1.prototype.constructor = Curve1;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor {Equation} the equation of the curve
 */
function Curve1 () {
	var equation = new Equation (
		"-0.5 + (12.96x^2 - 49.7664x^4 + 47.7757x^6 - 5.76 y^2 + 8.2944y^4)^2");

	ImplicitCurve.call(this, equation);
};

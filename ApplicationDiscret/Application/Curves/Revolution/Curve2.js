// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Curve2.prototype = new ImplicitCurve;
Curve2.prototype.constructor = Curve2;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor {Equation} The equation of the curve.
 */
function Curve2 () {
	// -1. + (-3. x + 4. x^3)^2 + (-1. + 2.25 y^2)^2
	var equation = new Equation ("-1. + (-3.x + 4.x^3)^2 + (-1. + 2.25y^2)^2");

	ImplicitCurve.call (this, equation);
};

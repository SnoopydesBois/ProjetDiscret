// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Knot.prototype = new ImplicitCurve;
Knot.prototype.constructor = Knot;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Knot () {
	var equation = new Equation ("16 y^3 + 12 y^2 - (4 x^2 - 1)^2");

	ImplicitCurve.call (this, equation);
};

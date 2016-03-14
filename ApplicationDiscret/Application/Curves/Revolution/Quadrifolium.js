// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Quadrifolium.prototype = new ImplicitCurve;
Quadrifolium.prototype.constructor = Quadrifolium;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Quadrifolium () {
	var equation = new Equation ("((2 x^2 + 2 y^2)^3 - 48 x^2 y^2)");

	ImplicitCurve.call(this, equation);
};

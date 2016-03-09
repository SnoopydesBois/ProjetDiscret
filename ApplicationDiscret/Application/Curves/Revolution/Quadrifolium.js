// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Quadrifolium.prototype = new ImplicitCurve;
Quadrifolium.prototype.constructor = Quadrifolium;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO desc
 */
function Quadrifolium () {
	//((2*x^2 + 2*y^2)^3 - 48*x^2*y^2);
	var equation = new Equation ("((2 x^2 + 2 y^2)^3 - 48 x^2 y^2)");

	ImplicitCurve.call(this, equation);
}

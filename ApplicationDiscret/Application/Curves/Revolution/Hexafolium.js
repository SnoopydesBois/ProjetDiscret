// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Hexafolium.prototype = new ImplicitCurve;
Hexafolium.prototype.constructor = Hexafolium;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO desc
 */
function Hexafolium () {
	// -(3*x^2 - y^2)^2*y^2 + (x^2 + y^2)^4
	var equation = new Equation ("-(3x^2 - y^2)^2 * y^2 + (x^2 + y^2)^4");

	ImplicitCurve.call (this, equation);
}

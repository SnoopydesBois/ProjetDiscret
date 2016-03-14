// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Hexafolium.prototype = new ImplicitCurve;
Hexafolium.prototype.constructor = Hexafolium;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Hexafolium () {
	var equation = new Equation ("-(3x^2 - y^2)^2 * y^2 + (x^2 + y^2)^4");

	ImplicitCurve.call (this, equation);
};

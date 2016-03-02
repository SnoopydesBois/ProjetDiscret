// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Knot.prototype = new ImplicitCurve;
Knot.prototype.constructor = Knot;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO desc
 */
function Knot () {
	//16*y^3 + 12*y^2 - (4*x^2 - 1)^2
	var equation = new Equation ("16 y^3 + 12 y^2 - (4 x^2 - 1)^2");

	ImplicitCurve.call (this, equation);
}

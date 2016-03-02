// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Hyperbol.prototype = new ImplicitCurve;
Hyperbol.prototype.constructor = Hyperbol;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Hyperbol () {
	//12 x^2 - 12 y^2 - 1
	var equation = new Equation ("12 x^2 - 12 y^2 - 1");

	ImplicitCurve.call (this, equation);
}

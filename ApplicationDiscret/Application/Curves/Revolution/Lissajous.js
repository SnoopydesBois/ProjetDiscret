// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Lissajous.prototype = new ImplicitCurve;
Lissajous.prototype.constructor = Lissajous;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Lissajous () {
	var equation = new Equation ("y^2 - 16 x^2 * (1 - x^2) * (1 - 2 x^2)^2");

	ImplicitCurve.call (this, equation);
};

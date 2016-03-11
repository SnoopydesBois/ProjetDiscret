// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Lemniscate.prototype = new ImplicitCurve;
Lemniscate.prototype.constructor = Lemniscate;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Lemniscate () {
	var equation = new Equation ("(x^2 + b * y^2)^2 - (x^2 - b * y^2)");
	equation.setParameter ("b", 1);

	ImplicitCurve.call (this, equation);

	this.parametersRange['b'] = new Range (1.0, 5.0);
};

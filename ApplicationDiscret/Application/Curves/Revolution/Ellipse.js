// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Ellipse.prototype = new ImplicitCurve;
Ellipse.prototype.constructor = Ellipse;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Ellipse () {
	var equation = new Equation ("x^2 + (y * minor_axis)^2 - 1");
	equation.setParameter ("minor_axis", 1);

	ImplicitCurve.call (this, equation);

	this.parametersRange['minor_axis'] = new Range(1.0,5.0);
};

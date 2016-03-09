// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Curve1.prototype = new ImplicitCurve;
Curve1.prototype.constructor = Curve1;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor {Equation} the equation of the curve
 */
function Curve1 () {
	// -0.5 + (12.96 x^2 - 49.7664 x^4 + 47.7757 x^6 - 5.76 y^2 + 8.2944 y^4)^2
	var equation = new Equation (
		"-0.5 + (12.96x^2 - 49.7664x^4 + 47.7757x^6 - 5.76 y^2 + 8.2944y^4)^2");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);

	ImplicitCurve.call(this, equation);

	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

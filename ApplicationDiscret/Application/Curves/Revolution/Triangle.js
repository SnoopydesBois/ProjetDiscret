// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Triangle.prototype = new ImplicitCurve;
Triangle.prototype.constructor = Triangle;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor {Equation} The equation of the curve.
 */
function Triangle () {
	//(x^2 + y^2 - 1)^3 - x^2 * y^3 -> equation de cercle - (x^2 * y^3)
	//var equation = new Equation("(b^2-(x-y)^2)*(x+y-q*b)^2");

	var equation = new Equation("x^2 * y^3");
	//var equation1 = new Equation("(x^3 * y^3) + 0.5");

	// this.parametersRange['xCenter'] = new Range(-2.0, 3.0);
	// this.parametersRange['yCenter'] = new Range(-1.0,1.0);


	//equation.setParameter("b", 1);
	//equation.setParameter("q", 1);



	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);

	ImplicitCurve.call (this, equation);
	//ImplicitCurve.call(this, equation1);

	// this.parametersRange['xCenter'] = new Range(-2.0, 3.0);
	// this.parametersRange['yCenter'] = new Range(-1.0,1.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

Circle.prototype = new ImplicitCurve;
Circle.prototype.constructor = Circle;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Circle() {
//	var equation = new Equation("a*(x - h)^2 + b*(y - k)^2 - r^2");
	var equation = new Equation("x^2 + (y * b)^2 - 1");
	// equation.setParameter("a", 1);
	equation.setParameter("b", 1);
	// equation.setParameter("radius", 1);
	ImplicitCurve.call(this, equation);
	
	this.parametersRange['b'] = new Range(1.0,5.0);
};
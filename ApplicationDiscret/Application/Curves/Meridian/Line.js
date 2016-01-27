Line.prototype = new ExplicitCurve();
Line.prototype.constructor = Line;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Line() {
	var equation = new Equation("a*x + b");
	equation.setParameter("a", 0.3);
	equation.setParameter("b", 0.0);
	ExplicitCurve.call(this, equation);
}

Line.prototype = new ExplicitCurve();
Line.prototype.constructor = Line;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Line() {
//	var equation = new Equation("a*x + b");
	var equation = new Equation("0.3*x -0");
	ImplicitCurve.call(this, equation);
}

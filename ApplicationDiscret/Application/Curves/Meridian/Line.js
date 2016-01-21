Line.prototype = new ExplicitCurve();
Line.prototype.constructor = Line;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Line() {
	var equation = new Equation("a*x + b");
	ImplicitCurve.call(this, equation);
}

Line.prototype = new ExplicitCurve;
Line.prototype.constructor = Line;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Line() {
	var equation = new Equation("1/a*x + b");
	equation.setParameter("a", 3);
	equation.setParameter("b", 1.0);
	ExplicitCurve.call(this, equation);
	
	this.parametersRange['a'] = new Range(1.0, 15.0);
	this.parametersRange['b'] = new Range(1.0,5.0);
}

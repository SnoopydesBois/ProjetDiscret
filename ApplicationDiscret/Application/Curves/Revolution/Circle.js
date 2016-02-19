Circle.prototype = new ImplicitCurve;
Circle.prototype.constructor = Circle;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Circle() {
	var equation = new Equation("x^2 + (y * ecrasement)^2 - 1");
	equation.setParameter("ecrasement", 1);
	ImplicitCurve.call(this, equation);
	
	this.parametersRange['ecrasement'] = new Range(1.0,5.0);
};
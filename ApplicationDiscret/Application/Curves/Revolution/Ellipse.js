Ellipse.prototype = new ImplicitCurve;
Ellipse.prototype.constructor = Ellipse;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Ellipse() {
	var equation = new Equation("x^2 + (y * minor_axis)^2 - 1");
	equation.setParameter("minor_axis", 1);
	ImplicitCurve.call(this, equation);
	
	this.parametersRange['minor_axis'] = new Range(1.0,5.0);
};
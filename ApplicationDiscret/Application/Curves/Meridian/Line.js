Line.prototype = new ExplicitCurve;
Line.prototype.constructor = Line;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Line() {
	var equation = new Equation("tan(3.14/2 - angle*3.14/180) * x + shift");
	equation.setParameter("angle", 45);
	equation.setParameter("shift", 1.0);
	ExplicitCurve.call(this, equation);
	
	this.parametersRange['angle'] = new Range(5.0, 85.0);
	this.parametersRange['shift'] = new Range(1.0,50.0);
}

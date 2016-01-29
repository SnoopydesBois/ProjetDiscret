Lemniscate.prototype = new ImplicitCurve;
Lemniscate.prototype.constructor = Lemniscate;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Lemniscate() {
	var equation = new Equation("(1*x^2 + b*y^2)^2 - 1 * (1*x^2 - b*y^2)");
	// equation.setParameter("a", 1);
	equation.setParameter("b", 1);
	 // equation.setParameter("c", 1);
	
	ImplicitCurve.call(this, equation);
	
	// this.parametersRange['a'] = new Range(1.0, 15.0);
	this.parametersRange['b'] = new Range(1.0,5.0);
	 // this.parametersRange['c'] = new Range(1.0,5.0);
}

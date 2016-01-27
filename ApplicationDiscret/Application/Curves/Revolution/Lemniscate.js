Lemniscate.prototype = new ImplicitCurve;
Lemniscate.prototype.constructor = Lemniscate;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Lemniscate() {
	var equation = new Equation("(a*x^2 + b*y^2)^2 - c * (a*x^2 - b*y^2)");
	equation.setParameter("a", 1);
	equation.setParameter("b", 1);
	equation.setParameter("c", 1);
	ImplicitCurve.call(this, equation);
}

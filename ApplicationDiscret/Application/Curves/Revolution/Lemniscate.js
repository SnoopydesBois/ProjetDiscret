Lemniscate.prototype = new ImplicitCurve();
Lemniscate.prototype.constructor = Lemniscate;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Lemniscate() {
	var equation = new Equation("(a*x^2 + b*y^2)^2 - c * (a*x^2 - b*y^2)");
	ImplicitCurve.call(this, equation);
}
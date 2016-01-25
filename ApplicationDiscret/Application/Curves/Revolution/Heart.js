Heart.prototype = new ImplicitCurve;
Heart.prototype.constructor = Heart;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Heart() {
	var equation = new Equation("(x^2 + y^2 -1)^3 - x^2 * y^3"); // TODO coefficients input
	ImplicitCurve.call(this, equation);
}

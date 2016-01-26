Heart.prototype = new ImplicitCurve;
Heart.prototype.constructor = Heart;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Heart() {
	//(x^2 + y^2 - 1)^3 - x^2 * y^3 -> equation de cercle - (x^2 * y^3)
	var equation = new Equation("(x^2 + (y+0.1)^2 -0.7)^3 - x^2 * y^3");
	ImplicitCurve.call(this, equation);
}

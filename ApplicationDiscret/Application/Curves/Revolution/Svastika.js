Svastika.prototype = new ImplicitCurve();
Svastika.prototype.constructor = Svastika;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Svastika() {
	var equation = new Equation("2x*y - x^4+y^4");
	ImplicitCurve.call(this, equation);
}
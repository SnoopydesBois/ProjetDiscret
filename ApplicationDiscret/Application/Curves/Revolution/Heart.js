Heart.prototype = new ImplicitCurve;
Heart.prototype.constructor = Heart;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Heart() {
	//(x^2 + y^2 - 1)^3 - x^2 * y^3 -> equation de cercle - (x^2 * y^3)
	var equation = new Equation("((x - xCenter)^2 + (y - yCenter)^2 - radius^2)^3 - x^2 * y^3");
	equation.setParameter("xCenter", 0.0);
	equation.setParameter("yCenter", -0.1);
	equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
}

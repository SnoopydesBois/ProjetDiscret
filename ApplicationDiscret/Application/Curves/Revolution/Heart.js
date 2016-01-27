Heart.prototype = new ImplicitCurve;
Heart.prototype.constructor = Heart;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Heart() {
	//(x^2 + y^2 - 1)^3 - x^2 * y^3 -> equation de cercle - (x^2 * y^3)
	var equation = new Equation("((x - 0.0)^2 + (y +0.1)^2 - 0.7)^3 - x^2 * y^3");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

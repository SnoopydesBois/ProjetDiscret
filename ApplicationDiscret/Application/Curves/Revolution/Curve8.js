Curve8.prototype = new ImplicitCurve;
Curve8.prototype.constructor = Curve8;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Curve8() {
	// -1. + (-3. x + 4. x^3)^2 + (-1. + 2.25 y^2)^2
	var equation = new Equation("-1. + (-3. x + 4. x^3)^2 + (-1. + 2.25 y^2)^2");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

Curve9.prototype = new ImplicitCurve;
Curve9.prototype.constructor = Curve9;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Curve9() {
	// -(3*x^2 - y^2)^2*y^2 + (x^2 + y^2)^4
	var equation = new Equation("-(3*x^2 - y^2)^2*y^2 + (x^2 + y^2)^4");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

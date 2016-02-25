Knot.prototype = new ImplicitCurve;
Knot.prototype.constructor = Knot;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Knot() {
	//16*y^3 + 12*y^2 - (4*x^2 - 1)^2
	var equation = new Equation("16*y^3 + 12*y^2 - (4*x^2 - 1)^2");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

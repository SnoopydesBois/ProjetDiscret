Curve6.prototype = new ImplicitCurve;
Curve6.prototype.constructor = Curve6;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Curve6() {
	//8 x^3 + 8 y^3 - 12 x y
	var equation = new Equation("8 x^3 + 8 y^3 - 12 x y");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

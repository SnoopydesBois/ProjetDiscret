Lissajous.prototype = new ImplicitCurve;
Lissajous.prototype.constructor = Lissajous;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Lissajous() {
	// y^2 - 16 x^2*(1 - x^2)*(1 - 2 x^2)^2
	var equation = new Equation("y^2 - 16 x^2*(1 - x^2)*(1 - 2 x^2)^2");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

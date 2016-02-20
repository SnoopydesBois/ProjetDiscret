Hyperbol.prototype = new ImplicitCurve;
Hyperbol.prototype.constructor = Hyperbol;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Hyperbol () {
	//12 x^2 - 12 y^2 - 1
	var equation = new Equation("12 x^2 - 12 y^2 - 1");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);

	ImplicitCurve.call(this, equation);

	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

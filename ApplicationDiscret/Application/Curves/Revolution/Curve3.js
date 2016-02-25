Curve3.prototype = new ImplicitCurve;
Curve3.prototype.constructor = Curve3;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Curve3() {
	 // x^2 + y^2 - (0.9 + 0.1*Abs[Cos[5*th]])^2] -> th angle entre vecteur {1,0} et {x,y}
	var equation = new Equation("x^2 + y^2 - ( 0.9 + 0.2* abs( cos( 5*( acos( 1 * x / sqrt(x^2 + y^2) ) ) ) ^2 ) ) ");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

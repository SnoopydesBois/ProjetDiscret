Scarabeus.prototype = new ImplicitCurve;
Scarabeus.prototype.constructor = Scarabeus;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Scarabeus() {
	//-4 ((1 - 2.14286 x)^2 - 4.59184 y^2)^2 +  9 (0.714286 x - 1.53061 x^2 - 1.53061 y^2)^2 ((1 - 2.14286 x)^2 + 4.59184 y^2)
	var equation = new Equation("-4 ((1 - 2.14286 x)^2 - 4.59184 y^2)^2 +  9 (0.714286 x - 1.53061 x^2 - 1.53061 y^2)^2 ((1 - 2.14286 x)^2 + 4.59184 y^2)");
	// equation.setParameter("xCenter", 0.0);
	// equation.setParameter("yCenter", -0.1);
	// equation.setParameter("radius", 0.7);
	
	ImplicitCurve.call(this, equation);
		
	// this.parametersRange['xCenter'] = new Range(2.0, 15.0);
	// this.parametersRange['yCenter'] = new Range(1.0,5.0);
	// this.parametersRange['radius'] = new Range(1.0,5.0);
}

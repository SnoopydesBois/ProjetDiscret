Sinusoid.prototype = new ExplicitCurve ();
Sinusoid.prototype.constructor = Sinusoid;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Sinusoid () {
	// a : amplitude
	// b : period
	// x : position
	// C : phase shift
	// h : vertical shift
	var equation = new Equation ("a*sin(b*x + c) + h");
	ImplicitCurve.call (this, equation);
}
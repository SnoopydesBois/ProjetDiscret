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
//	var equation = new Equation ("9*sin((1/4)*x)");
	equation.setParameter('a', 7);
	equation.setParameter('b', 1/4);
	equation.setParameter('c', 0);
	equation.setParameter('h', 10);
	ExplicitCurve.call (this, equation);
}

//==============================================================================
/**
 *
 */
Sinusoid.prototype.computeRange = function(){
	var phase = Math.PI / this.equation.getParameter('b');
	var amp = this.equation.getParameter('a');
	var décalage = Math.abs(this.equation.getParameter('h'));
	//console.log(amp + décalage);
	var rangeX = new Range(-(amp + décalage), amp + décalage);
	var rangeY = new Range(-phase, phase);
	if(rangeX.length() >= rangeY.length())
		return rangeX;
	else
		return rangeY;
}
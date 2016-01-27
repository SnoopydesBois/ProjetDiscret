Sinusoid.prototype = new ExplicitCurve ();
Sinusoid.prototype.constructor = Sinusoid;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Sinusoid () {
	var equation = new Equation ("amplitude*sin(period*x + phase_shift) + vertical_shift");
//	var equation = new Equation ("9*sin((1/4)*x)");
	equation.setParameter('amplitude', 7);
	equation.setParameter('period', 1/4);
	equation.setParameter('phase_shift', 0);
	equation.setParameter('vertical_shift', 10);
	ExplicitCurve.call (this, equation);
}

//==============================================================================
/**
 * That function compute the adequate range for the 2D rendering.
 * @return {Range} - The most appropriate range for the sin wave.
 */
Sinusoid.prototype.computeRange = function(){
	var phase = Math.PI / this.equation.getParameter('period');
	var amp = this.equation.getParameter('amplitude');
	var décalage = Math.abs(this.equation.getParameter('vertical_shift'));
	//console.log(amp + décalage);
	var rangeX = new Range(-(amp + décalage), amp + décalage);
	var rangeY = new Range(-phase, phase);
	if(rangeX.length() >= rangeY.length())
		return rangeX;
	else
		return rangeY;
}
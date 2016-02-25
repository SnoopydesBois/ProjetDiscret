Sinusoid.prototype = new ExplicitCurve;
Sinusoid.prototype.constructor = Sinusoid;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Sinusoid () {
	var equation = new Equation ("amplitude*sin(2 * 3.14159265359 * (1/period) *x + phase_shift) + amplitude + horizontal_shift");
	
	equation.setParameter('amplitude', 7);
	equation.setParameter('period', 10);
	equation.setParameter('phase_shift', 0);
	equation.setParameter('horizontal_shift', 2);
	
	ExplicitCurve.call (this, equation);
	
	this.parametersRange['amplitude'] = new Range(2.0, 50);
	this.parametersRange['period'] = new Range(10,30);
	this.parametersRange['phase_shift'] = new Range(0, 2 * 3.14159265359);
	this.parametersRange['horizontal_shift'] = new Range(1,50);
};

//==============================================================================
/**
 * That function compute the adequate range for the 2D rendering.
 * @return {Range} - The most appropriate range for the sin wave.
 */
Sinusoid.prototype.computeRange = function(){
	var phase = Math.PI / this.equation.getParameter('period');
	var amp = this.equation.getParameter('amplitude');
	var décalage = Math.abs(amp + this.equation.getParameter('horizontal_shift'));
	var rangeX = new Range(-(amp + décalage), amp + décalage);
	var rangeY = new Range(-phase, phase);
	if(rangeX.length() >= rangeY.length())
		return rangeX;
	else
		return rangeY;
}
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


//==============================================================================
/**
 * Compute the points of the curve based on its equation
 * @param {Range} ranX - The x-axis range on which to compute the points
 * @param {Range} ranX - The y-axis range on which to compute the points
 * @param {float} step - Define how much points are computed
 * @result {Point[][]} An array composed of list of points to represent the curve
 * (for exemple for 1/x we will have two list of points)
 */
Sinusoid.prototype.computePoints = function (ranX, ranY, step) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "Sinusoid.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "Sinusoid.computePoints.ErrorEquationNotDefined";
	}
	var result = [];
	
	var points = [];
	// Convert from degrees to radians via multiplication by PI/180        
	for(var x = ranX.getMin(); x <= ranX.getMax(); x += step){
		var y = this.equation.compute([x]);
		
		/* 
		 * If the point on the circle is within the display range,
		 * we add that point to the current connex part of the curve
		 */
		if(ranY.isIn(y)){
			points.push(new Point(x,y));
		}
		/* 
		 * Else, we push into the result array the current connex curve computed
		 * and we start a new connex part.
		 */
		else if(points.length > 0){
			result.push(points.slice(0));
			points = [];
		}
	}
	
	/* 
	 * Pushing into result the last connex part computed of the curve
	 */
	if(points.length > 0){
		result.push(points.slice(0));
	}
	return result;
}

Circle.prototype = new ImplicitCurve();
Circle.prototype.constructor = Circle;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function Circle() {
//	var equation = new Equation("a*(x - h)^2 + b*(y - k)^2 - r^2");
	var equation = new Equation("x^2 + y^2 - 1");
	ImplicitCurve.call(this, equation);
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
Circle.prototype.computePoints = function (ranX, ranY) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "Circle.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "Circle.computePoints.ErrorEquationNotDefined";
	}
	
	var result = [];
	
	var points = [];
	
//	var centerX = this.equation.getParameter("h");
//	var centerY = this.equation.getParameter("k");
	var centerX = 0;
	var centerY = 0;
	
//	var radius = this.equation.getParameter("r");
	var radius = 9;
	
	var step = this.computeStep(ranX, ranY);
	
	var convertRad = Math.PI /180;
	// Convert from degrees to radians via multiplication by PI/180        
	for(var angle = 0; angle < 360; angle += step){	
		var x = (radius * Math.cos(angle * convertRad)) + centerX;
		var y = (radius * Math.sin(angle * convertRad)) + centerY;
		
		/* 
		 * If the point on the circle is within the display range,
		 * we add that point to the current connex part of the curve
		 */
		if(ranX.isIn(x) && ranY.isIn(y)){
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
	result.push(points.slice(0));
	
	return result;
}

ExplicitCurve.prototype = new FormulaCurve();
ExplicitCurve.prototype.constructor = ExplicitCurve;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function ExplicitCurve(equation) {
	FormulaCurve.call(this, equation);
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
ExplicitCurve.prototype.computePoints = function (ranX, ranY) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ExplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ExplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	
	var result = [];
	
	var points = [];
	
	var xMin = ranX.getMin();
	var xMax = ranX.getMax();
	
	var step = this.computeStep();
	
	for(var x = xMin; x <= xMax; x += step){	
		var y = this.equation.compute([x]);
		
		/* 
		 * If the point is within the display range,
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

//==============================================================================
/**
 *
 */
ExplicitCurve.prototype.computeRange = function(){
	return new Range(-10,10);
}
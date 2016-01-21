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
*/
ExplicitCurve.prototype.computePoints = function (ranX, ranY, step) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ExplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ExplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	var result = [];
	throw "ExplicitCurve.computePoints.NotImplementedYet";
	return result;
}


// ocmputeStep

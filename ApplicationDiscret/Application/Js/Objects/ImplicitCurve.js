ImplicitCurve.prototype = new FormulaCurve();
ImplicitCurve.prototype.constructor = ImplicitCurve;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/
function ImplicitCurve(equation) {
	FormulaCurve.call(this, equation);
}


//==============================================================================
/**
* Compute the points of the curve based on its equation
* @param {Range} ranX - The x-axis range on which to compute the points
* @param {Range} ranX - The y-axis range on which to compute the points
* @param {float} step - Define how much points are computed
*/
ImplicitCurve.prototype.computePoints = function (ranX, ranY, step) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ImplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ImplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	var result = [];
	throw "ImplicitCurve.computePoints.NotImplementedYet";
	return result;
}


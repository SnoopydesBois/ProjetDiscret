ImplicitCurve.prototype = new FormulaCurve();
ImplicitCurve.prototype.constructor = ImplicitCurve;

function ImplicitCurve(equation) {
	FormulaCurve.call(this, equation);
}

ImplicitCurve.prototype.computePoints(ranX, ranY, step) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ImplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ImplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	var result = [];
	throw "ImplicitCurve.computePoints.NotImplementedYet";
	return result;
}


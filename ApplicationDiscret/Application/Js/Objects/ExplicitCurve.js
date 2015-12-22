ExplicitCurve.prototype = new FormulaCurve();
ExplicitCurve.prototype.constructor = ExplicitCurve;

function ExplicitCurve(equation) {
	FormulaCurve.call(this, equation);
}

ExplicitCurve.prototype.computePoints(ranX, ranY, step) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ExplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ExplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	var result = [];
	throw "ExplicitCurve.computePoints.NotImplementedYet";
	return result;
}


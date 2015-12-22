FormulaCurve.prototype = new Curve();
FormulaCurve.prototype.constructor = FormulaCurve;

function FormulaCurve(equation){
	if(arguments.length === 0) {
		this.equation = undefined;
	} else if(typeof equation == "string") {
		this.equation = new Equation(equation);
	} else if(equation instanceof Equation) {
		this.equation = equation;
	} else {
		this.equation = undefined;
	}
}

FormulaCurve.prototype.getEquation = function(){
	return this.Equation;
};

FormulaCurve.prototype.setEquation = function(equation){
	if(typeof equation == "string"){
		this.equation = new Equation(equation)
	} else if(equation instanceof Equation){
		this.equation = equation
	} else{
		throw "FormulaCurve.setEquation.ErrorNotAnEquation";
	}
};
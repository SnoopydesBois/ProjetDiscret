FormulaCurve.prototype = new Curve();
FormulaCurve.prototype.constructor = FormulaCurve;

//==============================================================================
/**
* @constructor
* @param {Equation | String} equation - Either a string of an equation or an equation
*/
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


//==============================================================================
/**
* @return {Equation} the equation of the curve
*/
FormulaCurve.prototype.getEquation = function(){
	return this.equation;
};


//==============================================================================
/**
* @param {Equation | String} equation - Set a new equation to the curve
* if the parameter is a String, a new equation is created, else the parameter 
* is set as the equation of the curve
*/
FormulaCurve.prototype.setEquation = function(equation){
	if(typeof equation == "string"){
		this.equation = new Equation(equation)
	} else if(equation instanceof Equation){
		this.equation = equation
	} else{
		throw "FormulaCurve.setEquation.ErrorNotAnEquation";
	}
};

//==============================================================================
FormulaCurve.prototype.computePoints = function(ranX, ranY){
	throw "FormulaCurve.computePoints.NotImplementedInThisClass";
};


//==============================================================================
FormulaCurve.prototype.computeStep = function (ranX, ranY) {
	return 0.1;
}


//==============================================================================
/**
 * @param {String} parameter - The parameter to modify.
 * @param {Number} value - The value to set.
 */
FormulaCurve.prototype.setParameter = function(parameter, value){
	this.equation.setParameter(parameter, value);
}


//==============================================================================
/**
 * TODO
 */
FormulaCurve.prototype.getAllParameters = function(){
	return this.equation.getAllParameters();
}


//==============================================================================
/**
 *
 */
FormulaCurve.prototype.getParameter = function(name){
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
}
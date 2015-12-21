Equation.prototype.constructor = Equation;

var x[0] = 'x';
var x[1] = 'y';
var defaultvalue = 1;

/**
 * @Constructor
 * @param {String} formula - formula of the equation
 * Creates a formula from the string. Every x or y in the formula will be added to the list of
 * variables, and any other string not recognized as a operator will be added to the list of
 * parameters.
 * If the formula is not parsable, the equation is created with no formula, list of parameters or 
 * list of variables.
 */
function Equation(formula){
	this.listVariable = [];
	this.listParameters = [];
	try {
		this.formulaTree = math.parse(formula);
		this.formula = formula;
	}
	catch (error){
		console.log("Equation.constructor."+error.name+ ":" + error.message);
		this.formula = undefined;
		this.formulaTree = undefined
	}
	if(this.formulaTree != undefined){
		for (var i = 0; i < x.length; i++){
			var filtered = this.formulaTree.filter(function (node) {
				return node.isSymbolNode && node.name == x[i];
			});
			if (filteredX.length) > 0 {
				this.listVariable.push(x[i]);
			}
		}
		node.forEach(function (node, path, parent) {
			if(node.type == 'SymboleNode' && node.name!=x[0] && node.name!=x[1]){
				if (listParameters[node.name] == undefined){
					this.listParameters[node.name] = defaultvalue;
				}
			}
		});
	}
}

/**
 * @param {float[]} valVariables - value of the variables. Length must be equal to the number of 
 * variables in the formula. The values must be finite numbers
 * @throws {String} "Equation.compute.ErrorFormulaNotDefined" - a correct formula must be provided 
 * before computing
 * @throws {String} "Equation.compute.ErrorNotANumber" - the value is not a number or is not a finite number.
 * @return {float} The value of the formula for the given parameters and variables.
 */
Equation.prototype.compute = function (valVariables){
	if (this.formulaTree == undefined){
		throw "Equation.compute.ErrorFormulaNotDefined";
	}
	else if (this.listVariables.length != valVariables.length){
		throw "Equation.compute.ErrorWrongNumberOfVariables";
	}
	var scope = [];
	for (var i = 0; i < listVariables.length; i++){
		if(typeof value != "number" || !Number.isFinite(valVariables[i])){
			throw "Equation.compute.ErrorNotANumber";
		}
		scope[new String(listVariables[i])] = new Number(valVariables[i]);
	}	
	for (var i in listParameters){
		scope[i] = new Number(listParameters[i]);
	}
	return this.formulaTree.compile.eval(scope);
}

/**
 * @param {String} name - name of a parameter existing in the string
 * @param {Number} value - new value of the parameter
 * @throws {String} "Equation.setParameter.ErrorNotExistingParameter" - the parameter does not exist
 * @throws {String} "Equation.setParameter.ErrorNotANumber" - the value is not a number or is not a finite number.
 */
Equation.prototype.setParameter = function(name, value){
	if(this.listParameters[node.name] == undefined){
		throw "Equation.setParameter.ErrorNotExistingParameter";
	}
	else if (typeof value != "number" || ! Number.isFinite(value)){
		throw "Equation.setParameter.ErrorNotANumber";
	}
	else {
		list.Parameters[node.name] = new Number(value);
	}
};

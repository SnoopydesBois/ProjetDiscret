var x = [];
x[0] = 'x';
x[1] = 'y';
var defaultvalue = 1;


Equation.prototype.constructor = Equation;

/**
 * @classDesc Class representing a equation using a formula (String). From this
 * formula we get the variables (x or y) and the parameters (anything but x or
 * y and mathematical objects).
 */


/**
 * @constructor
 * @param {String} formula - formula of the equation
 * Creates a formula from the string. Every x or y in the formula will be added
 * to the list of variables, and any other string not recognized as a operator
 * will be added to the list of parameters.
 * If the formula is not parsable, the equation is created with no formula, list
 * of parameters or list of variables.
 */
function Equation(formula) {
	this.listVariables = [];
	this.listParameters = [];
	try {
		this.formulaTree = math.parse(formula);
		this.formula = formula;
	}
	catch (error) {
		console.error("Equation.constructor." + error.name + ":"
			+ error.message);
		this.formula = undefined;
		this.formulaTree = undefined;
	}
	if(this.formulaTree !== undefined) {
		var length = x.length;
		for (var i = 0; i < length; i++) {
			var filtered = this.formulaTree.filter(function (node) {
				return node.isSymbolNode && node.name === x[i];
			});
			if (filtered.length > 0) {
				this.listVariables.push(x[i]);
			}
		}
		var lpara = this.listParameters
		this.formulaTree.traverse(function (node, path, parent) {
			if(node.isSymbolNode && node.name != x[0] && node.name != x[1]) {
				if (lpara[node.name] === undefined) {
					lpara[node.name] = defaultvalue;
				}
			}
		});
	}
}


//==============================================================================
/**
 * @param {String} formula - new formula of the equation
 * @throws {String} the name of the error from math.parse.
 * Creates a formula from the string. The object is completly reset. Every x or
 * y in the formula will be added to the list of variables, and any other
 * string not recognized as a operator will be added to the list of parameters.
 * If the formula is not parsable, the formula, list of parameters and list of
 * variables will be set to undefined.
 */
Equation.prototype.setFormula = function(formula) {
	this.listVariables = [];
	this.listParameters = [];
	try {
		this.formulaTree = math.parse(formula);
		this.formula = formula;
	}
	catch (error) {
		this.formula = undefined;
		this.formulaTree = undefined;
		console.log(error.message);
		throw "Equation.setFormula." + error.name;
	}
	if(this.formulaTree !== undefined) {
		var length = x.length;
		for (var i = 0; i < length; i++) {
			var filtered = this.formulaTree.filter(function (node) {
				return node.isSymbolNode && node.name === x[i];
			});
			if (filtered.length > 0) {
				this.listVariables.push(x[i]);
			}
		}
		var lpara = this.listParameters
		this.formulaTree.traverse(function (node, path, parent) {
			if(node.isSymbolNode && node.name !== x[0] && node.name != x[1]) {
				if (lpara[node.name] === undefined) {
					lpara[node.name] = defaultvalue;
				}
			}
		});
	}
}


//==============================================================================
/**
 * @param {float[]} valVariables - value of the variables. Length must be equal
 * to the number of variables in the formula. The values must be finite numbers
 * @throws {String} "Equation.compute.ErrorFormulaNotDefined" - a correct
 * formula must be provided before computing
 * @throws {String} "Equation.compute.ErrorNotANumber" - the value is not a
 * number or is not a finite number.
 * @return {float} The value of the formula for the given parameters and
 * variables.
 */
Equation.prototype.compute = function (valVariables) {
	if (this.formulaTree === undefined) {
		throw "Equation.compute.ErrorFormulaNotDefined";
	} else if (this.listVariables.length !== valVariables.length) {
		throw "Equation.compute.ErrorWrongNumberOfVariables";
	}
	var scope = [];
	var length = this.listVariables.length;
	for (var i = 0; i < length; i++) {
		if(typeof valVariables[i] !== "number" || !Number.isFinite(valVariables[i])) {
			throw "Equation.compute.ErrorNotANumber";
		}
		scope[this.listVariables[i]] = valVariables[i];
	}
	for (var i in this.listParameters) {
		scope[i] = this.listParameters[i];
	}
	return this.formulaTree.compile().eval(scope);
}


//==============================================================================
/**
 * @param {String} name - name of a parameter existing in the formula
 * @param {Number} value - new value of the parameter
 * @throws {String} "Equation.setParameter.ErrorNotExistingParameter" - the
 * parameter does not exist
 * @throws {String} "Equation.setParameter.ErrorNotANumber" - the value is not a
 * number or is not a finite number.
 */
Equation.prototype.setParameter = function(name, value) {
	if (this.listParameters[name] === undefined) {
		throw "Equation.setParameter.ErrorNotExistingParameter";
	} else if (typeof value !== "number" || ! Number.isFinite(value)) {
		throw "Equation.setParameter.ErrorNotANumber";
	} else {
		this.listParameters[name] = value;
	}
};


//==============================================================================
/**
 * @param {String} name - name of a parameter existing in the formula
 * @throws {String} "Equation.getParameter.ErrorNotExistingParameter" - the
 * parameter does not exist
 * @return {float} value of the parameter
 */
Equation.prototype.getParameter = function (name) {
	if(this.listParameters[name] === undefined) {
		throw "Equation.getParameter.ErrorNotExistingParameter";
	} else {
		return this.listParameters[name];
	}
};


//==============================================================================
/**
 * @return {Object} an array of float (values) indexed by strings (names of
 * parameters).
 */
Equation.prototype.getAllParameters = function() {	
	return this.listParameters;
};


//==============================================================================
/**
 * @return {Integer} Nombre of variables
 */
Equation.prototype.getNbVariable = function() {
	return this.listVariables.length;
};


//==============================================================================
/**
 * @return {String[]} an array containing every variable (x or y) present in the
 * formula
 */
Equation.prototype.getListVariables = function() {
	return this.listVariables;
};


//==============================================================================
/**
 * @return {String} The formula describing the equation depending on the
 * current environment
 */
Equation.prototype.toStringNoParam = function() {
	var that = this;
	var transformed = this.formulaTree.transform(function (node, path, parent) {
		if (node.isSymbolNode && that.listParameters[node.name] != undefined) {
			return new math.expression.node.ConstantNode(that.listParameters[node.name]);
		} else {
			return node;
		}
	});
	return transformed.toString();
};


//==============================================================================
/**
 * @return {String} The formula describing the equation
 */
Equation.prototype.toString = function() {
	return this.formulaTree.toString();
};


//==============================================================================
Equation.prototype.check = function (){
	return this.formulaTree != undefined;
}
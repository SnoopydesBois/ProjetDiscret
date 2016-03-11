/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
 *
 * Ce logiciel est un programme informatique servant à modéliser des
 * structures 3D voxellisées.
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 */


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
		try{
			this.preparedFormula = this.formulaTree.compile();
		}
		catch(e){
			console.log("compilation failed");
			console.log(this.getString());
		}
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
		this.preparedFormula = this.formulaTree.compile();
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
	return this.preparedFormula.eval(scope);
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

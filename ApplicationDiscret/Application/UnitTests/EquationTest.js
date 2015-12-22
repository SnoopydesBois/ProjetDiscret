var testStringDefault = "Test!";

/*------------CONSTRUCTOR---------------*/

QUnit.module("Constructor");

QUnit.test("Constructor with no formula", function(assert){
	var eq1 = new Equation();
	assert.equal(eq1.formula, undefined, "this.formula = undefined");
	assert.equal(eq1.formulaTree, undefined, "this.formulaTree = undefined");
	assert.deepEqual(eq1.listParameters, [], "this.listParameters = []");
	assert.deepEqual(eq1.listVariables, [], "this.listVariables = []");
});

QUnit.test("Constructor with simple formula (no parameters nor variables)", function(assert){
	var f = "3+4"
	var eq1 = new Equation(f);
	f = "blah"
	assert.equal(eq1.formula, "3+4", "this.formula = 3+4");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.deepEqual(eq1.listParameters, [], "this.listParameters = []");
	assert.deepEqual(eq1.listVariables, [], "this.listVariables = []");
});

QUnit.test("Constructor with simple formula (no parameters but variables)", function(assert){
	var f = "y+x"
	var eq1 = new Equation(f);
	assert.equal(eq1.formula, f, "this.formula = y+x");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.deepEqual(eq1.listParameters, [], "this.listParameters = []");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x', 'y']");
});

QUnit.test("Constructor with formula (parameters and variables)", function(assert){
	var f = "a+b+x+y"
	var eq1 = new Equation(f);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.equal(eq1.listParameters['a'], 1, "check this.listParameters");
	assert.equal(eq1.listParameters['b'], 1, "check this.listParameters");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});

QUnit.test("Constructor with not parsable formula", function(assert){
	var f = "+-+-="
	var eq1 = new Equation(f);
	assert.equal(eq1.formula, undefined , "this.formula = undefined");
	assert.equal(eq1.formulaTree, undefined, "this.formulaTree = undefined");
	assert.deepEqual(eq1.listParameters, [], "this.listParameters = []");
	assert.deepEqual(eq1.listVariables, [], "this.listVariables = []");
});


/*------------Setters---------------*/

QUnit.module("Setters");

QUnit.test("empty Constructor then setFormula(a*y+b*x)", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation();
	eq1.setFormula(f);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.equal(eq1.listParameters['a'], 1, "check this.listParameters");
	assert.equal(eq1.listParameters['b'], 1, "check this.listParameters");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});

QUnit.test("Constructor with formula (parameters and variables) then set formula not parsable", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation(f);
	assert.throws(function(){eq1.setFormula("=+=+=+=+")}, "setFormula(=+=+=+=) throws an error");
	assert.equal(eq1.formula, undefined, "this.formula");
	assert.equal(eq1.formulaTree, undefined, "this.formulaTree = undefined");
	assert.deepEqual(eq1.listParameters, [], "check this.listParameters");
	assert.deepEqual(eq1.listVariables, [], "this.listVariables = []");
});

QUnit.test("Constructor with formula (a*y+b*x) then a = 2 b = -2", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation(f);
	eq1.setParameter('a', 2);
	eq1.setParameter('b', -2);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.equal(eq1.listParameters['a'], 2, "check this.listParameters");
	assert.equal(eq1.listParameters['b'], -2, "check this.listParameters");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});

QUnit.test("Constructor with no formula try to set parameter a", function(assert){
	var eq1 = new Equation();
	assert.throws(function(){eq1.setParameter('a', 2)});
});


/*------------Getters---------------*/

QUnit.module("Getters");

QUnit.test("Constructor with formula (a*y+b*x) then a = 2 b = -2. getAllParameters", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation(f);
	eq1.setParameter('a', 2);
	eq1.setParameter('b', -2);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	var tab = eq1.getAllParameters();
	assert.equal(tab['a'], 2, "check this.listParameters");
	assert.equal(tab['b'], -2, "check this.listParameters");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});

QUnit.test("Constructor with formula (a*y+b*x) then a = 2 b = -2. getParameter('a') getParameter('c')", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation(f);
	eq1.setParameter('a', 2);
	eq1.setParameter('b', -2);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.equal(eq1.getParameter('a'), 2, "check this.listParameters");
	assert.throws(function(){eq1.getParameter('c')});
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});


/*------------Compute---------------*/

QUnit.module("Compute");

QUnit.test("Constructor with formula (a*y+b*x) then a = 2 b = -2. compute(1,1)", function(assert){
	var f = "a*y+b*x"
	var eq1 = new Equation(f);
	eq1.setParameter('a', 2);
	eq1.setParameter('b', -2);
	assert.equal(eq1.formula, f, "this.formula");
	assert.notEqual(eq1.formulaTree, undefined, "this.formulaTree != undefined");
	assert.equal(eq1.compute([1,1]), 0, "check compute");
	assert.deepEqual(eq1.listVariables, ['x','y'], "this.listVariables = ['x','y']");
});
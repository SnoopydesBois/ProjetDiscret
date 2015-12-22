var testStringDefault = "Test!";

/*------------CONSTRUCTOR---------------*/

QUnit.module("Constructor");

QUnit.test("Constructor with correct min=1 and max=2", function(assert){
	var range1 = new Range(1,2);
	assert.equal(range1.min, 1, "this.min = 1");
	assert.equal(range1.max, 2, "this.max = 2");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with correct min= max = -3", function(assert){
	var range1 = new Range(-3,-3);
	assert.equal(range1.min, -3, "this.min = -3");
	assert.equal(range1.max, -3, "this.max = -3");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with no param", function(assert){
	var range1 = new Range();
	assert.equal(range1.min, undefined, "this.min = undefined");
	assert.equal(range1.max, undefined, "this.max = undefined");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with min > max", function(assert){
	var range1 = new Range(4,-1);
	assert.equal(range1.min, undefined, "this.min = undefined");
	assert.equal(range1.max, undefined, "this.max = undefined");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with min and max = strings", function(assert){
	var range1 = new Range("min","max");
	assert.equal(range1.min, undefined, "this.min = undefined");
	assert.equal(range1.max, undefined, "this.max = undefined");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with max = Infinity", function(assert){
	var range1 = new Range(- Infinity,Infinity);
	assert.equal(range1.min, - Infinity, "this.min = - Infinity");
	assert.equal(range1.max, Infinity, "this.max = Infinity");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("Constructor with max = NaN", function(assert){
	var range1 = new Range(2,NaN);
	assert.equal(range1.min,undefined, "this.min = undefined");
	assert.equal(range1.max, undefined, "this.max = undefined");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

/*------------SETTERS---------------*/

QUnit.module("Setters");

/*SetMin*/
QUnit.test("setMin(4) with max = 7", function(assert){
	var range1 = new Range(1,7);
	range1.setMin(4);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, 7, "this.max = 7");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMin(4) with max = undefined", function(assert){
	var range1 = new Range();
	range1.setMin(4);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, undefined, "this.max = undefined");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMin(this.max)", function(assert){
	var range1 = new Range(1,7);
	range1.setMin(range1.max);
	assert.equal(range1.min, range1.max, "this.min = 4");
	assert.equal(range1.max, 7, "this.max = 7");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMin(-infinity)", function(assert){
	var range1 = new Range(1,7);
	range1.setMin(- Infinity);
	assert.equal(range1.min, - Infinity, "this.min = - Infinity");
	assert.equal(range1.max, 7, "this.max = 7");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMin(max+1) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMin(range1.max+1)},
		"Range.setMin.ErrorMinGreaterThanMax", 
		"throws Range.setMin.ErrorMinGreaterThanMax"
	);
});

QUnit.test("setMin(infinity) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMin(Infinity)},
		"Range.setMin.ErrorMinGreaterThanMax", 
		"throws Range.setMin.ErrorMinGreaterThanMax"
	);
});

QUnit.test("setMin(String(min)) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMin("min")},
		"Range.setMin.ErrorNotANumber", 
		"throws Range.setMin.ErrorNotANumber"
	);
});

QUnit.test("setMin(NaN) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMin(NaN)},
		"Range.setMin.ErrorNotANumber", 
		"Range.setMin.throws ErrorNotANumber"
	);
});


/*SetMax*/
QUnit.test("setMax(4) with max = 7", function(assert){
	var range1 = new Range(1,7);
	range1.setMax(4);
	assert.equal(range1.min, 1, "this.min = 4");
	assert.equal(range1.max, 4, "this.max = 7");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMax(this.min)", function(assert){
	var range1 = new Range(1,7);
	range1.setMax(range1.min);
	assert.equal(range1.min, 1, "this.min = 1");
	assert.equal(range1.max, range1.min, "this.max = this.min");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMax(infinity)", function(assert){
	var range1 = new Range(1,7);
	range1.setMax(Infinity);
	assert.equal(range1.min, 1, "this.min = - Infinity");
	assert.equal(range1.max, Infinity, "this.max = 7");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMax(min -1) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMax(range1.min-1)},
		"Range.setMax.ErrorMinGreaterThanMax", 
		"throws Range.setMax.ErrorMinGreaterThanMax"
	);
});

QUnit.test("setMax(-infinity) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMax(-Infinity)},
		"Range.setMax.ErrorMinGreaterThanMax", 
		"throws Range.setMax.ErrorMinGreaterThanMax"
	);
});

QUnit.test("setMax(String(max)) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMax("max")},
		"Range.setMax.ErrorNotANumber", 
		"throws Range.setMax.ErrorNotANumber"
	);
});

QUnit.test("setMax(NaN) (error)", function(assert){
	var range1 = new Range(1,7);
	assert.throws(function() {range1.setMax(NaN)},
		"Range.setMax.ErrorNotANumber", 
		"throws Range.setMax.ErrorNotANumber"
	);
});

/*SetMinMax*/
QUnit.test("setMinMax(4,5) from undefined", function(assert){
	var range1 = new Range();
	range1.setMinMax(4,5);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, 5, "this.max = 5");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});


QUnit.test("setMinMax(4,5) from 1,2", function(assert){
	var range1 = new Range(1,2);
	range1.setMinMax(4,5);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, 5, "this.max = 5");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMinMax(-infinity, infinity) ", function(assert){
	var range1 = new Range(1,2);
	range1.setMinMax(-Infinity,Infinity);
	assert.equal(range1.min, -Infinity, "this.min = -Infinity");
	assert.equal(range1.max, Infinity, "this.max = Infinity");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.ok(range1.includeMax, "this.includeMax = true");
});

QUnit.test("setMinMax(2, 1) ", function(assert){
	assert.throws(function() {
	var range1 = new Range(1,2);
	range1.setMinMax(2,1);},
		"Range.setMinMax.ErrorMinGreaterThanMax", 
		"throws Range.setMinMax.ErrorMinGreaterThanMax"
	);
});

QUnit.test("setMinMax(NaN, NaN) ", function(assert){
	assert.throws(function() {
	var range1 = new Range(1,2);
	range1.setMinMax(NaN,NaN);},
		"Range.setMinMax.ErrorNotANumber", 
		"throws Range.setMinMax.ErrorNotANumber"
	);
});

QUnit.test("setMinMax(string, string) ", function(assert){
	assert.throws(function() {
	var range1 = new Range(1,2);
	range1.setMinMax("min","max");},
		"Range.setMinMax.ErrorNotANumber", 
		"throws Range.setMinMax.ErrorNotANumber"
	);
});

/*setIncludeMin*/
QUnit.test("setIncludeMin(false)", function(assert){
	var range1 = new Range(4,5);
	range1.setIncludeMin(false);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, 5, "this.max = 5");
	assert.notOk(range1.includeMin, "this.includeMin = false");
	assert.ok(range1.includeMax, "this.includeMax = true");
});


QUnit.test("setIncludeMin(string)", function(assert){
	var range1 = new Range(4,5);
	assert.throws(function() {range1.setIncludeMin("blah");},
		"Range.setIncludeMin.ErrorNotABoolean", 
		"throws Range.setIncludeMin.ErrorNotABoolean"
	);
});

/*setIncludeMax*/
QUnit.test("setIncludeMax(false)", function(assert){
	var range1 = new Range(4,5);
	range1.setIncludeMax(false);
	assert.equal(range1.min, 4, "this.min = 4");
	assert.equal(range1.max, 5, "this.max = 5");
	assert.ok(range1.includeMin, "this.includeMin = true");
	assert.notOk(range1.includeMax, "this.includeMax = false");
});


QUnit.test("setIncludeMax(string)", function(assert){
	var range1 = new Range(4,5);
	assert.throws(function() {range1.setIncludeMax("blah");},
		"Range.setIncludeMax.ErrorNotABoolean", 
		"throws Range.setIncludeMax.ErrorNotABoolean"
	);
});


/*------------GETTERS---------------*/
QUnit.test("getMin()", function(assert){
	var range1 = new Range(4,5);
	assert.equal(range1.getMin(), range1.min, "this.min = this.getMin()");
});

QUnit.test("getMax()", function(assert){
	var range1 = new Range(4,5);
	assert.equal(range1.getMax(), range1.max, "this.max = this.getMax()");
});

QUnit.test("getIncludeMin()", function(assert){
	var range1 = new Range(4,5);
	assert.equal(range1.getIncludeMin(), range1.includeMin, "this.Includemin = this.IncludegetMin()");
});

QUnit.test("getMin()", function(assert){
	var range1 = new Range(4,5);
	assert.equal(range1.getIncludeMax(), range1.includeMax, "this.Includemax = this.getIncludeMax()");
});
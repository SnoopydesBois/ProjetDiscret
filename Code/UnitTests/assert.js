var testStringDefault = "Test!";


function roundValue(v) {
	return Number(v.toFixed(5));
}

/*
 *
 */
QUnit.assert.matrixEqual = function(actual, expected, message) {
	
};


// matrixEqual
QUnit.assert.matrixEqual = function(actual, expected, message) {
	var exp = [];
	for(var y = 0; y < 4; y++) {
		for(var x = 0; x < 4; x++)
			exp.push(roundValue(expected[x*4+y]));
	}

	var act = [];
	for(var i = 0; i < 4*4; i++)
		act[i] = roundValue(actual[i]);

	var ok = true;
	for(var i = 0; i < 4*4; i++) {
		if(act[i] !== exp[i])
			ok = false;
	}
	this.push(ok, act, exp, message);
};

// vectorEqual
QUnit.assert.vectorEqual = function(actual, expected, message) {
	var exp = [];
	for(var i = 0; i < 3; i++)
		exp[i] = roundValue(expected[i]);

	var act = [];
	for(var i = 0; i < 3; i++)
		act[i] = roundValue(actual[i]);

	var ok = true;
	for(var i = 0; i < 3; i++) {
		if(act[i] !== exp[i])
			ok = false;
	}
	this.push(ok, act, expected, message);
};

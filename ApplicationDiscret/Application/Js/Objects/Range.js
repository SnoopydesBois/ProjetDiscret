Range.prototype.constructor = Range;
// TODO refactoring code + class description
/**
 * @constructor
 * 
 * @param {Number} min - Minimum for the range.
 * @param {Number} max - Maximum for the range.
 */
function Range (min, max){
	if (arguments.length != 2 || typeof min != "number"
		|| typeof max != "number" || isNaN (max) || isNaN (min)){
		this.min = undefined;
		this.max = undefined;
	}
	else if (min <= max){
		this.min = min;
		this.max = max;
	}
	else {
		console.warn ("WARNING: min > max the range has been created with"
			+ " undefined values");
		this.min = undefined;
		this.max = undefined;
	}
	this.includeMin = true;
	this.includeMax = true;
}

/**
 * @param {Number} min - new minimum for the range
 * @throws {String} "Range.setMin.ErrorMinGreaterThanMax" - the maximum must be
 * greater or equal to the minimum
 * @throws {String} "Range.setMin.ErrorNotANumber" - the parameter must be a
 * number
 */
Range.prototype.setMin = function (min) {
	if (typeof min != "number" || isNaN (min)){
		throw "Range.setMin.ErrorNotANumber";
	}
	else if (min > this.max) {
		throw "Range.setMin.ErrorMinGreaterThanMax";
	}
	else {
		this.min = min;
	}
};

/**
 * @param {Number} max - new maximum for the range
 * @throws {String} "Range.setMax.ErrorMinGreaterThanMax" - the maximum must be
 * greater or equal to the minimum
 * @throws {String} "Range.setMax.ErrorNotANumber" - the parameter must be a
 * number
 */
Range.prototype.setMax = function (max) {
	if (typeof max != "number" || isNaN (max)){
		throw "Range.setMax.ErrorNotANumber";
	}
	else if (this.min > max){
		throw "Range.setMax.ErrorMinGreaterThanMax";
	}
	else{
		this.max = max;
	}
};

/**
 * @param {Number} min - new minimum for the range
 * @param {Number} max - new maximum for the range
 * @throws {String} "Range.setMinMax.ErrorMinGreaterThanMax" - the maximum must
 * be greater or equal to the minimum
 * @throws {String} "Range.setMinMax.ErrorNotANumber" - the parameters must be
 * numbers
 */
Range.prototype.setMinMax = function (min, max) {
	if (typeof max != "number" || isNaN (max) || typeof min != "number"
		|| isNaN (min)){
		throw "Range.setMinMax.ErrorNotANumber";
	}
	else if (min > max){
		throw "Range.setMinMax.ErrorMinGreaterThanMax";
	}
	else {
		this.min = min;
		this.max = max;
	}
};

/**
 * @param {boolean} include - Whether the minimum should be included in the
 * range
 * @throws {String} "Range.setIncludeMin.ErrorNotABoolean" - the include should
 * be a boolean
 */
Range.prototype.setIncludeMin = function (include){
	if (typeof include != "boolean")
		throw "Range.setIncludeMin.ErrorNotABoolean";
	else
		this.includeMin = include;
};

/**
 * @param {boolean} include - Whether the maximum should be included in the
 * range
 * @throws {String} "Range.setIncludeMax.ErrorNotABoolean" - the include should
 * be a boolean
 */
Range.prototype.setIncludeMax = function (include) {
	if (typeof include != "boolean")
		throw "Range.setIncludeMax.ErrorNotABoolean";
	else
		this.includeMax = include;
};

/**
 * @return {Number|undefined} this.min - Minimum of the range, possibly
 * undefined
 */
Range.prototype.getMin = function () {
	return this.min;
};

/**
 * @return {Number|undefined} this.max - Maximum of the range, possibly
 * undefined
 */
Range.prototype.getMax = function () {
	return this.max;
};

/**
 * @return {Number} this.includeMin - whether the minimum is included in the
 * range
 */
Range.prototype.getIncludeMin = function () {
	return this.includeMin;
};

/**
 * @return {Number} this.includeMax - whether the maximum is included in the
 * range
 */
Range.prototype.getIncludeMax = function () {
	return this.includeMax;
};

/**
 * @param {Number} coord - the coord to test
 * @return {boolean} true if the coord is in the range, false else
 * @throws {String} "Range.isIn.ErrorNotANumber" - the coord should be a number
 */ 
Range.prototype.isIn = function (coord) {
	if (typeof coord !== "number") {
		throw "Range.isIn.ErrorNotANumber";
	}
	var min = this.includeMin ? this.min : this.min + 1;
	var max = this.includeMax ? this.max : this.max - 1;
	
	return coord >= this.min && coord <= this.max;
};


//==============================================================================
/**
 * @return {Number} The length of the range (max - min).
 */
Range.prototype.length = function () {
	return this.max - this.min;
};



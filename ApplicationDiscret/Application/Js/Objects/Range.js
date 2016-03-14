/////// LICENCE ////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////


/* 
 * Range (min : Number , max : Number)
 * getMin () : Number | undefined
 * setMin (min : Number) : void
 * getMax () : Number | undefined
 * setMax (max : Number) : void
 * setMinMax (min : Number, max : Number) : void
 * getIncludeMin () : Number
 * setIncludeMin (include : boolean) : void
 * getIncludeMax () : Number
 * setIncludeMax (include : boolean) : void
 * isIn (value : Number) : boolean
 * length () : Number
 * toString () : String
 */


/// CODE ///////////////////////////////////////////////////////////


/**
 * @classdesc A class representing a Range. This range is bounded 
 * by a minimum and a maximum. Theses minimum and maximum can be 
 * included or excluded
 */
Range.prototype.constructor = Range;



//##############################################################################
//	Constructor
//##############################################################################


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
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {(Number | undefined)} this.min - Minimum of the range, possibly
 * undefined.
 */
Range.prototype.getMin = function () {
	return this.min;
};


//==============================================================================
/**
 * Sets the minimum of the range.
 * 
 * @param {Number} min - New minimum for the range.
 * 
 * @return {void}
 * @throws {String} "Range.setMin.ErrorMinGreaterThanMax" - The maximum must be
 * greater or equal to the minimum.
 * @throws {String} "Range.setMin.ErrorNotANumber" - The parameter must be a
 * number.
 */
Range.prototype.setMin = function (min) {
	if (typeof min != "number" || isNaN (min)) {
		throw "Range.setMin.ErrorNotANumber";
	}
	else if (min > this.max) {
		throw "Range.setMin.ErrorMinGreaterThanMax";
	}
	else {
		this.min = min;
	}
};


//==============================================================================
/**
 * @return {(Number | undefined)} this.max - Maximum of the range, possibly
 * undefined.
 */
Range.prototype.getMax = function () {
	return this.max;
};


//==============================================================================
/**
 * Sets the minimum of the range.
 * 
 * @param {Number} max - New maximum for the range.
 * 
 * @return {void}
 * @throws {String} "Range.setMax.ErrorMinGreaterThanMax" - The maximum must be
 * greater or equal to the minimum.
 * @throws {String} "Range.setMax.ErrorNotANumber" - The parameter must be a
 * number
 */
Range.prototype.setMax = function (max) {
	if (typeof max != "number" || isNaN (max)) {
		throw "Range.setMax.ErrorNotANumber";
	}
	else if (this.min > max) {
		throw "Range.setMax.ErrorMinGreaterThanMax";
	}
	else {
		this.max = max;
	}
};


//==============================================================================
/**
 * Sets the minimum and the maximum of the range.
 * 
 * @param {Number} min - New minimum for the range.
 * @param {Number} max - New maximum for the range.
 * 
 * @return {void}
 * @throws {String} "Range.setMinMax.ErrorMinGreaterThanMax" - the maximum must
 * be greater or equal to the minimum.
 * @throws {String} "Range.setMinMax.ErrorNotANumber" - the parameters must be
 * numbers.
 */
Range.prototype.setMinMax = function (min, max) {
	if (typeof max != "number" || isNaN (max) || typeof min != "number"
		|| isNaN (min))
	{
		throw "Range.setMinMax.ErrorNotANumber";
	}
	else if (min > max) {
		throw "Range.setMinMax.ErrorMinGreaterThanMax";
	}
	else {
		this.min = min;
		this.max = max;
	}
};


//==============================================================================
/**
 * @return {Number} this.includeMin - Whether the minimum is included in the
 * range.
 */
Range.prototype.getIncludeMin = function () {
	return this.includeMin;
};


//==============================================================================
/**
 * @param {boolean} include - Whether the minimum should be included in the
 * range.
 * 
 * @return {void}
 * @throws {String} "Range.setIncludeMin.ErrorNotABoolean" - The include should
 * be a boolean.
 */
Range.prototype.setIncludeMin = function (include) {
	if (typeof include != "boolean")
		throw "Range.setIncludeMin.ErrorNotABoolean";
	else
		this.includeMin = include;
};


//==============================================================================
/**
 * @return {Number} this.includeMax - Whether the maximum is included in the
 * range.
 */
Range.prototype.getIncludeMax = function () {
	return this.includeMax;
};


//==============================================================================
/**
 * @param {boolean} include - Whether the maximum should be included in the
 * range.
 *
 * @return {void}
 * @throws {String} "Range.setIncludeMax.ErrorNotABoolean" - the include should
 * be a boolean.
 */
Range.prototype.setIncludeMax = function (include) {
	if (typeof include != "boolean")
		throw "Range.setIncludeMax.ErrorNotABoolean";
	else
		this.includeMax = include;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * Tests if the range contain a value.
 * 
 * @param {Number} value - The value to test.
 * 
 * @return {boolean} True if the value is in the range, false otherwise.
 * @throws {String} "Range.isIn.ErrorNotANumber" - The value should be a number.
 */ 
Range.prototype.isIn = function (value) {
	if (typeof value != "number") {
		throw "Range.isIn.ErrorNotANumber";
	}
	
	if (value == this.min)
		return this.includeMin;
	else if (value == this.max)
		return this.includeMax;
	else
		return this.min <= value && value <= this.max;
};


//==============================================================================
/**
 * @return {Number} The length of the range (max - min).
 */
Range.prototype.length = function () {
	return this.max - this.min;
};


//==============================================================================
/**
 * @return {String} A string to display the range.
 */
Range.prototype.toString = function () {
	return (this.includeMin ? "[" : "]") 
		+ this.min + "; " + this.max
		+ (this.includeMax ? "]" : "[");
};



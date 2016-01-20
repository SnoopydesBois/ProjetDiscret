Dimension.prototype.constructor = Dimension;

/**
 * @Constructor
 * @param {Range} image - image range of the dimension
 * @param {Range} inverseImage - inverseImage range of the dimension
 */
function Dimension(image, inverseImage){
	if(arguments.length != 2 || !(checkType(arguments, Range, Range))){
		console.error("ERROR - Dimension.constructor : bad type of parameter");
	}
	this.image = image;
	this.inverseImage = inverseImage;
}


//==============================================================================
/**
 * @param {Range} image - new image of the dimension
 * @throws {String} "Dimension.setImage.ErrorNotARange" - the parameter must be a
 * range
 */
Dimension.prototype.setImage = function (image) {
	if(!(image instanceof Range)){
		throw "Dimension.setImage.ErrorNotARange";
	}
	this.image = image;
};


//==============================================================================
/**
 * @param {Number} max - new maximum for the range
 * @throws {String} "Range.setMax.ErrorMinGreaterThanMax" - the maximum must be
 * greater or equal to the minimum
 * @throws {String} "Range.setMax.ErrorNotANumber" - the parameter must be a
 * number
 */
Dimension.prototype.setInverseImage = function (inverseImage) {
	if(!(inverseImage instanceof Range)){
		throw "Dimension.setInverseImage.ErrorNotARange";
	}
	this.inverseImage = inverseImage;
};


//==============================================================================
/**
 * @return {Range} this.image - The image range of the dimension
 */
Dimension.prototype.getImage = function (){
	return this.image;
};


//==============================================================================
/**
 * @return {Range} this.inverseImage - The inverse image of the dimension
 */
Dimension.prototype.getinverseImage = function (){
	return this.inverseImage;
}


//==============================================================================
/**
 * @param {Point} point - the point to test
 * @return {boolean} true if the point is in the dimension, else false
 * @throws {String} "Dimension.isIn.ErrorNotAPoint" - the point should be a Point
 */ 
Dimension.prototype.isIn = function(point){
	if(!(point instanceof Point)){
		throw "Dimension.isIn.isIn";
	}
	return this.image.isIn(point.X) && this.inverseImage.isIn(point.Y);
}
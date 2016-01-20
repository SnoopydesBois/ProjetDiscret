/**
 * Point.js
 * 
 * author : biscui
 * created : Thu, 17 Dec 2015 20:34:04 +0100
 * modified : Thu, 17 Dec 2015 20:34:04 +0100
 */



	  ///////////////////
	 /// constructor ///
	///////////////////




Point.prototype = new Vector ();
Point.prototype.constructor = Point;

/** 
 * 
 */
function Point () {
	Vector.call (this);
	switch (arguments.length) {
		case 0 : 
			return this.defaultConstructor ();
		case 1 :
			if (arguments[0] instanceof Array)
				return this.arrayToPointConstructor (arguments[0]);
			else if (typeof arguments[0] == "number")
				return this.coordinateConstructor (arguments[0], arguments[0]);
			else
				return this.copyConstructor (arguments[0]);
		case 2 : 
			return this.coordinateConstructor (arguments[0], arguments[1]);
		default: 
			throw "Point constructor bad syntax";
	};
	return this;
};



//==============================================================================
/**
 * Default constructor (no argument).
 * @return {Point} a vector initialized with 0 in each dimension.
 */
Point.prototype.defaultConstructor = function () {
	this.m[0] = 0;
	this.m[1] = 0;
	this.m[2] = 0;
	return this;
};


//==============================================================================
/**
 * Copy constructor (on argument, another vector).
 * @param {Point} that - the vector to copy.
 * @return {Point} a vector initialized with the value from that.
 */
Point.prototype.copyConstructor = function (that) {
	if (!(that instanceof Point)) { 
		throw("Point: bad copy constructor call");
	}
	this.m[0] = that.m[0];
	this.m[1] = that.m[1];
	return this;
};


//==============================================================================
/**
 * Transform an array of two coordinates to a Point
 * @param {Point} tab - the vector to copy.
 * @return {Point} a vector initialized with the value from that.
 */
Point.prototype.arrayToPointConstructor = function (tab) {
	if (tab.length != 2) { 
		throw "Point : bad array length in array to vector constructor call";
	}
	return this.coordinateConstructor (tab[0], tab[1]);
};


//==============================================================================
/**
 * Constructor using three coordinates (float values).
 * @param {float} x - the first dimension value.
 * @param {float} y - the second dimension value.
 * @param {float} z - the third dimension value.
 * @return {Point} a vector initialized with x, y and z.
 */
Point.prototype.coordinateConstructor = function (x, y) {
	if (isFinite (x) && isFinite (y)) {
		this.m[0] = x;
		this.m[1] = y;
		return this;
	}
	else {
		throw "Point: bad (by coordinate) constructor call (" + x + ", " + y 
			+ ", " + z + ")";
	}
};


//==============================================================================
/**
 * @return {float} the X value (first value of the vector).
 */
Point.prototype.X = function () {
	return this.m[0];
};


//==============================================================================
/**
 * @return {float} the Y value (second value of the vector)
 */
Point.prototype.Y = function () {
	return this.m[1];
};


//==============================================================================
/**
 * @return {float} the Z value (third value of the vector).
 */
Point.prototype.Z = function () {
	// FIXME traduire
	throw "Point.Z : aucune coordinate"
};


//==============================================================================
/**
 * Subtraction (this -= that).
 * @param {Point} that - the vector to substract with.
 * @return {Point} the vector result of the substraction.
 */
Point.prototype.sub = function (that) {
	this.m[0] -= that.m[0];
	this.m[1] -= that.m[1];
	this.m[2] -= that.m[2];
	return this;
};


//==============================================================================
/**
 * Cross product (returns = this ^ that).
 * @param {Point} that - the vector to realize the cross product with.
 * @return {Point} the vector result of the cross product.
 */
Point.prototype.cross = function (that) {
	throw "Point.cross : not yet implemented"
}



//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around Z axis.
 * @param {float} rad - the angle of rotation (in radian).
 * @return {Point} the vector after the rotation.
 */
Point.prototype.rotateX = function (rad) {
	throw "Point.rotateX : not yet implemented"
}


//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around Z axis.
 * @param {float} rad - the angle of rotation (in radian).
 * @return {Point} the vector after the rotation.
 */
Point.prototype.rotateY = function (rad) {
	throw "Point.rotateY : not yet implemented"
}


//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around Z axis.
 * @param {float} rad - the angle of rotation (in radian).
 * @return {Point} the vector after the rotation.
 */
Point.prototype.rotateZ = function (rad) {
	throw "Point.rotateZ : impossible"
}


//==============================================================================
/**
 * @return {Array} the data to the GPU.
 */
Point.prototype.getGLVector = function () {
	return this.m; 
};


//==============================================================================
/**
 * @return {String} a string to display a vector.
 */

Point.prototype.toString = function () {
	return "[" + this.m[0] + "; " + this.m[1] + "]";
};



	  //////////////////////
	 /// other function ///
	//////////////////////
	


/**
 * Return the addition of two vector.
 * 
 * @param a {Point} - A vector.
 * @param b {Point} - A vector.
 * 
 * @return {Point} a new vector corresponding to "a + b"
 */
function addPoint (a, b) {
	if ((!(a instanceof Point) && !(a instanceof Array)) 
		|| (!(b instanceof Point) && !(b instanceof Array)))
	{
		throw "addPoint : one of term is not a Point"
	}
	var pa = new Point (a);
	var pb = new Point (b);
	return pa.add (pb);
}



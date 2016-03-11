/////// LICENCE ////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////


/* 
 * Point()
 * defaultConstructor() : Point
 * copyConstructor (that : Point) : Point
 * arrayToPointConstructor (tab : Point) : Point
 * coordinateConstructor (x : float, y : float) : Point
 * X () : float
 * Y () : float
 * Z () : float
 * sub (that) : Point
 * cross (that : Point) : Point
 * rotateX (rad : float) : Point
 * rotateY (rad : float) : Point
 * rotateZ (rad : float) : Point
 * getGLVector () : Array
 * toString () : String
 * addPoint (a : Point, b : Point) : Point
 */


/// CODE ///////////////////////////////////////////////////////////


/**
 * @classdesc A Point in 2D coordinates
 */
Point.prototype = new Vector;
Point.prototype.constructor = Point;


//##############################################################################
//	Constructor
//##############################################################################

/** 
 * @constructor
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
 * @return {Point} a Point initialized with 0 in each dimension.
 */
Point.prototype.defaultConstructor = function () {
	this.m[0] = 0;
	this.m[1] = 0;
	this.m[2] = 0;
	return this;
};


//==============================================================================
/**
 * Copy constructor (on argument, another Point).
 * @param {Point} that - the ¨Point to copy.
 * @return {Point} a Point initialized with the value from that.
 * @throw {String} The parameter is not of type Point.
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
 * Transforms an array of two coordinates to a Point
 * @param {Point} tab - the Point to copy.
 * @return {Point} a Point initialized with the value from that.
 * @throw {String} The parameter is not an array with a length of 2.
 */
Point.prototype.arrayToPointConstructor = function (tab) {
	if (tab.length != 2) { 
		throw "Point : bad array length in array to point constructor call";
	}
	return this.coordinateConstructor (tab[0], tab[1]);
};


//==============================================================================
/**
 * Constructor using two coordinates (float values).
 *
 * @param {float} x - the first dimension value.
 * @param {float} y - the second dimension value.
 * 
 * @return {Point} a Point initialized with x, y and z.
 * @throw {String} The parameters are not of finites.
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
 * @override
 * @return {float} the X value (first value of the point).
 */
Point.prototype.X = function () {
	return this.m[0];
};


//==============================================================================
/**
 * @override
 * @return {float} the Y value (second value of the point)
 */
Point.prototype.Y = function () {
	return this.m[1];
};


//==============================================================================
/**
 * @override
 * This function must not be called as a Point does not have a Z coordinate
 *
 * @return {void}
 * @throw {String} This function must not be called
 */
Point.prototype.Z = function () {
	throw "Point.Z : No coordinates";
};


//==============================================================================
/**
 * @override
 * Subtraction (this -= that).
 *
 * @param {Point} that - the point to substract with.
 *
 * @return {Point} the point of the substraction.
 */
Point.prototype.sub = function (that) {
	this.m[0] -= that.m[0];
	this.m[1] -= that.m[1];
	this.m[2] -= that.m[2];
	return this;
};


//==============================================================================
/**
 * @override
 * Cross product (returns = this ^ that).
 *
 * @param {Point} that - the point to realize the cross product with.
 *
 * @return {Point} the point result of the cross product.
 * @throw {String} Not implemented
 */
Point.prototype.cross = function (that) {
	throw "Point.cross : not implemented"
};



//==============================================================================
/**
 * @override
 * Rotate a point given an angle (in radian) around Z axis.
 *
 * @param {float} rad - the angle of rotation (in radian).
 *
 * @return {Point} the point after the rotation.
 * @throw {String} Not implemented
 */
Point.prototype.rotateX = function (rad) {
	throw "Point.rotateX : not yet implemented"
};


//==============================================================================
/**
 * @override
 * Rotate a point given an angle (in radian) around Z axis.
 *
 * @param {float} rad - the angle of rotation (in radian).
 *
 * @return {Point} the point after the rotation.
 * @throw {String} Not implemented
 */
Point.prototype.rotateY = function (rad) {
	throw "Point.rotateY : not yet implemented"
};


//==============================================================================
/**
 * @override
 * Rotate a point given an angle (in radian) around Z axis.
 *
 * @param {float} rad - the angle of rotation (in radian).
 *
 * @return {Point} the point after the rotation.
 * @throw {String} Not implemented
 */
Point.prototype.rotateZ = function (rad) {
	throw "Point.rotateZ : impossible"
};


//==============================================================================
/**
 * @override
 * @return {Array} the data to the GPU.
 */
Point.prototype.getGLVector = function () {
	return this.m; 
};


//==============================================================================
/**
 * @override
 * @return {String} a string to display a point.
 */
Point.prototype.toString = function () {
	return "[" + this.m[0] + "; " + this.m[1] + "]";
};



	  //////////////////////
	 /// other function ///
	//////////////////////
	


/**
 * @override
 * Return the addition of two point.
 * 
 * @param a {Point} - A point.
 * @param b {Point} - A point.
 * 
 * @return {Point} a new point corresponding to "a + b"
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
};



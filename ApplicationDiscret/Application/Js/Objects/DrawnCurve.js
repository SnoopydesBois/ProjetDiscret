/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */
DrawnCurve.prototype.constructor = DrawnCurve;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO
 */
function DrawnCurve () {

	/**
	 * {Number[]} X coordinate point list.
	 */
	this.xList = [];

	/**
	 * {Number[]} Y coordinate point list.
	 */
	this.yList = [];
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {int} The maximum value of "t", i.e. the length of 'xList' and
 * 'yList'.
 */
DrawnCurve.prototype.getMaxT = function () {
	return this.xList.length;
};


//==============================================================================
/**
 * Get "x" value at "t". If "t" is a float, return the linear interpolation
 * between "floor(t)" and "ceil(t)".
 *
 * @param {Number} t - A value.
 *
 * @return {Number} The "x" coordinate at "t".
 */
DrawnCurve.prototype.getX = function (t) {
	/// parameter verification
	if (typeof t == "number" && Number.isFinite (t)
		&& 0 <= t && t < this.getMaxT ())
	{
		throw "DrawnCurve.getX: bad value of given parameter"
	}

	/// get value
	if (Number.isInteger (t))
		return this.xList[t];
	else
		return interpol (t, this.xList);
};


//==============================================================================
/**
 * Get "y" value at "t". If "t" is a float, return the linear interpolation
 * between "floor(t)" and "ceil(t)".
 *
 * @param {Number} t - A value.
 *
 * @return {Number} The "y" coordinate at "t".
 */
DrawnCurve.prototype.getY = function (t) {
	/// parameter verification
	if (typeof t == "number" && Number.isFinite (t)
		&& 0 <= t && t < this.getMaxT ())
	{
		throw "DrawnCurve.getX: bad value of given parameter"
	}

	/// get value
	if (Number.isInteger (t))
		return this.yList[t];
	else
		return interpol (t, this.yList);
};



//##############################################################################
//	Point methods
//##############################################################################



/**
 * Add a point to the curve. If the distance between the last point and the new
 * point is too big (chebichev distance), add interpoled point before the new
 * point.
 *
 * @param {Number} x - X coordinate of the new point.
 * @param {Number} y - Y coordinate of the new point.
 */
DrawnCurve.prototype.addPoint = function (x, y) {
	var len = this.xList.length;
	if (len == 0) { // if it's the first point
		this.xList.push (x);
		this.yList.push (y);
	}
	else {
		var lastX = this.xList[len - 1],
			lastY = this.yList[len - 1];
		var diffX = Math.abs (lastX - x),
			diffY = Math.abs (lastY - y);
		var dist = Math.max (diffX, diffY); // chebichev distance
		if (dist > 1) {
			// dist is too big -> interpolation
			for (var i = 1; i <= Math.floor (dist); ++i) {
				this.xList.push (lastX + (i / dist) * diffX);
				this.yList.push (lastY + (i / dist) * diffY);
			}
		} // end if dist too big
		this.xList.push (x);
		this.yList.push (y);
	} // end if not the first point
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * @override
 *
 * Always throw an exception. A drawn curve doesn't have any parameter.
 *
 * @throws {String}
 */
DrawnCurve.prototype.setParameter = function () {
	throw "DrawnCurve.setParameter.ErrorCannotModifyParameterOnDrawnCurve";
};

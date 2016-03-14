/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * DrawnCurve ()
 * getMaxT () : int
 * getXList () : Number[]
 * getYList () : Number[]
 * getX (t : Number) : Number
 * getY (t : Number) : Number
 * addPoint (x : Number, y : Number) : void
 * setParameter () : void
 * getAllParameters () : void
 * interpol (t : float, tab : Point[]) : float
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends Curve
 * @classdesc A 2D curve drawn by the user
 */
DrawnCurve.prototype = new Curve;
DrawnCurve.prototype.constructor = DrawnCurve;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function DrawnCurve () {
	
	Curve.call (this);
	
	/**
	 * {Number[]} X coordinate points list.
	 */
	this.xList = [];

	/**
	 * {Number[]} Y coordinate points list.
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
 * @return {Number[]} X coordinate for each point.
 */
DrawnCurve.prototype.getXList = function () {
	return this.xList;
};


//==============================================================================
/**
 * @return {Number[]} Y coordinate for each point.
 */
DrawnCurve.prototype.getYList = function () {
	return this.yList;
};


//==============================================================================
/**
 * Gets "x" value at "t". If "t" is a float, returns the linear interpolation
 * between "floor(t)" and "ceil(t)".
 *
 * @param {Number} t - A value.
 *
 * @return {Number} The "x" coordinate at "t".
 * @throw {String} The parameter is not a Number or is not a Finite value.
 */
DrawnCurve.prototype.getX = function (t) {
	/// parameter verification
	if (typeof t != "number" && Number.isFinite (t)) {
		throw "DrawnCurve.getX: bad value of given parameter";
	}

	/// get value
	if (Number.isInteger (t))
		return this.xList[t];
	else
		return interpol (t, this.xList);
};


//==============================================================================
/**
 * Gets "y" value at "t". If "t" is a float, returns the linear interpolation
 * between "floor(t)" and "ceil(t)".
 *
 * @param {Number} t - A value.
 *
 * @return {Number} The "y" coordinate at "t".
 * @throw {String} The parameter is not a Number or is not a Finite value.
 */
DrawnCurve.prototype.getY = function (t) {
	/// parameter verification
	if (typeof t != "number" && Number.isFinite (t)) {
		throw "DrawnCurve.getY: bad value of given parameter";
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
 * Adds a point to the curve. If the distance between the last point and the new
 * point is too big (chebichev distance), adds interpolated point before the new
 * point.
 *
 * @param {Number} x - X coordinate of the new point.
 * @param {Number} y - Y coordinate of the new point.
 *
 * @return {void}
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
				this.xList.push (lastX + (i / dist) * -(lastX - x));
				this.yList.push (lastY + (i / dist) * -(lastY - y));
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
 * Always throws an exception. A drawn curve doesn't have any parameter.
 *
 * @return {void}
 * @throws {String} No parameters
 */
DrawnCurve.prototype.setParameter = function () {
	throw "DrawnCurve.setParameter.ErrorCannotModifyParameterOnDrawnCurve";
};


/**
 * @override
 *
 * Always throws an exception. A drawn curve doesn't have any parameter.
 *
 * @return {void}
 * @throws {String} No parameters
 */
DrawnCurve.prototype.getAllParameters = function () {
	throw "DrawnCurve.getAllParameters.ErrorNoParametersOnDrawnCurve";
};

//##############################################################################
//	Function
//##############################################################################


/**
 * @param {float} t - The x coordinate of the point to interpolate.
 * @param {Point[]} tab - list of the curve's points.
 *
 * @return {float} The y coordinate of the interpolated point
 */
function interpol (t, tab) {
	if (t <= 0) {
		return tab[0]
	}
	else if (t >= tab.length -1) {
		return tab[tab.length - 1]
	}
	else {
		var v1 = tab[Math.floor (t)];
		var v2 = tab[Math.floor (t) + 1];
		tPerc = t - Math.floor (t);
		return (1 - tPerc) * v1 + tPerc * v2;
	}
};

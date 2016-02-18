/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 *
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @classdesc TODO
 */
ModelDraw.prototype.constructor = ModelDraw;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO
 */
function ModelDraw () {

	/**
	 * {DrawnCurve} the curve on which the model act
	 */
	this.curve = new DrawnCurve ();
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {DrawnCurve} The current curve.
 */
ModelDraw.prototype.getActiveCurve = function () {
	return this.curve;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Create a new curve.
 *
 * @return {void}
 */
ModelDraw.prototype.newCurve = function () {
	this.curve = new DrawnCurve ();
};


//==============================================================================
/**
 * Add a point to the curve. Transform x/y coordinates on the canvas to y/z
 * coordinates in the 3D space.
 *
 * @param {int} x - X coordinate of the new point (in pixel).
 * @param {int} y - Y coordinate of the new point (in pixel).
 * @param {Vector} canvasSize - Size of the cavas (in pixel).
 * @param {Vector} universSize - Size of the 3D space (in voxel).
 *
 * @return {void}
 */
ModelDraw.prototype.addPoint = function (x, y, canvasSize, universSize) {
	this.curve.addPoint (
		x * (universSize.x / 2 - 1) / canvasSize.x + 1,
		y * universSize.y / canvasSize.y
	);
};


//==============================================================================
/**
 * @return {int} The number of current curve point.
 */
ModelDraw.prototype.getNbPoint = function () {
	return this.curve.getMaxT ();
};


//==============================================================================
/**
 * @return {Number[]} The X coordinates for each point of the current curve. 
 */
ModelDraw.prototype.getXCoordinates = function () {
	return this.curve.getXList ();
};


//==============================================================================
/**
 * @return {Number[]} The Y coordinates for each point of the current curve. 
 */
ModelDraw.prototype.getYCoordinates = function () {
	return this.curve.getYList ();
};



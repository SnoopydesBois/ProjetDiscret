/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* curve : DrawnCurve
 * 
 * ModelDraw ()
 * 
 * getActiveCurve  () : DrawnCurve
 * newCurve  () : void
 * getNbPoint  () : int
 * getXCoordinates  () : Number[]
 * getYCoordinates  () : Number[]
 * closeCurve  () : Point
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc The model to handle the drawn curve.
 */
ModelDraw.prototype.constructor = ModelDraw;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function ModelDraw () {

	/**
	 * {DrawnCurve} The curve on which the model acts.
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


//==============================================================================
/**
 * Closes the curve. If it is already closed, does nothing.
 * 
 * @return {Point} The added point (null if not exist or already added).
 */
ModelDraw.prototype.closeCurve = function () {
	var lastIndex = this.getNbPoint () - 1;
	
	if (lastIndex == -1)
		// there isn't any point
		return null;
		
	var lastX = this.getXCoordinates ()[lastIndex],
		lastY = this.getYCoordinates ()[lastIndex],
		firstX = this.getXCoordinates ()[0],
		firstY = this.getYCoordinates ()[0];
	
	if (lastX != firstX && lastY != firstY) {
		this.getActiveCurve ().addPoint (firstX, firstY);
		return new Point (firstX, firstY);
	}
	else 
		return null;
};



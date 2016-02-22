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



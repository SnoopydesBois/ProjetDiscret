/**
 * TODO license
 */


/**
 * @classdesc 
 */



Grid.prototype.constructor = Grid;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 */
function Grid () {
	
	/**
	 * {Range} The x range of the grid.
	 */
	this.xRange = new Range (-1, 1);
	
	/**
	 * {Range} The y range of the grid.
	 */
	this.yRange = new Range (-1, 1);
	
	/**
	 * {Point[][]} The list of point to draw the grid.
	 */
	this.points = [[], []];
	this.points[0].push (new Point (-1, 0.01));
	for (var i = -0.8; i <= 1; i += 0.2) {
		this.points[0].push (new Point (i - 0.2, 0.0));
		this.points[0].push (new Point (i, 0.0));
		this.points[0].push (new Point (i, 0.01));
	}
	this.points[1].push (new Point ( 0.01, -1));
	for (var i = -0.8; i <= 1; i += 0.2) {
		this.points[1].push (new Point (0.0, i - 0.2));
		this.points[1].push (new Point (0.0, i));
		this.points[1].push (new Point (0.01, i));
	}
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Range} The x range of the grid.
 */
Grid.prototype.getXRange = function () {
	return this.xRange;
};


//==============================================================================
/**
 * @return {Range} The y range of the grid.
 */
Grid.prototype.getYRange = function () {
	return this.yRange;
};


//==============================================================================
/**
 * @return {Point[][]} A list of list of point. One list of point is a set of
 * connected point.
 */
Grid.prototype.getPoints = function () {
	return this.points;
};






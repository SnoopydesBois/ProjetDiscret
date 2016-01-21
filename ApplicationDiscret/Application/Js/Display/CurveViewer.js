/**
 * @license TODO
 */


/**
 * @extends GenericViewer
 * @classdesc TODO
 */



CurveViewer.prototype.constructor = CurveViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 */
function CurveViewer (canvas) {
	GenericViewer.call (this, canvas, "2d");
	
	/**
	 * {Scene} The scene to display the surface.
	 */
	this.contener = new Layer ();
//	this.contener.addObject ();
	
	
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################







//##############################################################################
//	Draw
//##############################################################################



/**
 * Prepare all objects in the contener.
 * 
 * @return {void}
 */
CurveViewer.prototype.prepare = function () {
	
};


//==============================================================================
/**
 * Show all objects in the contener (prepare it and draw it).
 * 
 * @return {void}
 */
CurveViewer.prototype.show = function () {
	
};


//==============================================================================
/**
 * @override
 * Draw all objects in the contener.
 * 
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
CurveViewer.prototype.draw = function (backBuffer) {
	
};



//##############################################################################
//	Other methods
//##############################################################################





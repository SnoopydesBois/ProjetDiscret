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
//	Other methods
//##############################################################################





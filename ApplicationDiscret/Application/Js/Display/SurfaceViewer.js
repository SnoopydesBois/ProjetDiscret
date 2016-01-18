/**
 * @license TODO
 */


/**
 * @extends GenericViewer
 * @classdesc TODO
 */



SurfaceViewer.prototype = new GenericViewer;
SurfaceViewer.prototype.constructor = SurfaceViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 */
function SurfaceViewer (canvas) {
	
	GenericViewer.call (this, canvas, "3d");
	
	/**
	 * {Scene} The scene. TODO
	 */
	this.scene = new Scene ();
	this.scene.addObject (new Repere (new Vector (12, 12, 12), this.glContext));
	
	this.initCanvasEvent ();
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * Set the dimension of the viewport. TODO renommer
 */
SurfaceViewer.prototype.setViewDimension = function () {
	this.glContext.viewportHeight = this.canvas.height;
	this.glContext.viewportWidth = this.canvas.width;
	this.glContext.viewport (
		0, 
		0, 
		this.glContext.viewportWidth, 
		this.glContext.viewportHeight
	);

};


//==============================================================================



//##############################################################################
//	Event methods
//##############################################################################



/**
 * @override
 * Set the 'height' and 'width' canvas attributes and resize the viewport.
 * 
 * @param {WindowEvent} event - The window event.
 * 
 * @return {void}
 */
SurfaceViewer.prototype.onResize = function (event) {
	$("canvas").each (function (id, elem) {
		elem.height = $(elem).height ();
		elem.width = $(elem).width ();
	});
	this.setViewDimension ();
};


//==============================================================================
/**
 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onMouseMove = function (event) {
	if (event.buttons === 2) { // right click is pressed when move
		console.log (event);
	}
};


//==============================================================================
/**
 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onWheel = function (event) {
	if (event.deltaY != 0) {
		var epsilon = event.deltaY < 0 ? -0.1 : 0.1 ;
		this.scene.getCamera ().setProjection (
			this.scene.getCamera ().getProjection () + epsilon
		);
		this.scene.getCamera ().computeMatrices ();
		this.drawScene ();
	}
};



//##############################################################################
//	Other methods
//##############################################################################


/**
 * TODO
 */
SurfaceViewer.prototype.initCanvasEvent = function () {
	// Mouse wheel for zoom
	this.canvas.addEventListener ("wheel", this.onWheel.bind (this));
	
	// mouse move for mouvement
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
};


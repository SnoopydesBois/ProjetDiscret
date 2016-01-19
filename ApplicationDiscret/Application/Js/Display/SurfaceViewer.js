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
	 * {Scene} The scene to display the surface.
	 */
	this.scene = new Scene ();
	this.scene.addObject (new Repere (new Vector (25, 25, 25), this.glContext));
	
	/**
	 * {int[2]} TODO
	 */
	this.mousePosOnPress = [0, 0];
	
	/**
	 * {Vector} TODO
	 */
	this.camPosWhenClick;
	
	this.initCanvasEvent ();
	this.glContext.enable (this.glContext.CULL_FACE);
	this.glContext.enable (this.glContext.DEPTH_TEST);
	this.glContext.frontFace (this.glContext.CW);
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
SurfaceViewer.prototype.onMouseDown = function (event) {
	if (event.buttons === 1) { // FIXME right click is pressed
		this.camPosWhenClick = this.scene.getCamera().getPosition();
		this.mousePosOnPress[0] = event.layerX;
		this.mousePosOnPress[1] = event.layerY;
//		event.preventDefault ();
	}
};


//==============================================================================
/**

 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onMouseMove = function (event) {
	if (event.buttons === 1) { // FIXME right click is pressed when move
		var len = this.scene.getCamera().getPosition().getLength();
		this.moveCameraAt (
			(this.mousePosOnPress[0] - event.layerX) * 0.01,
			(event.layerY - this.mousePosOnPress[1]) * 0.01
		);
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
	// mouse wheel for zoom
	this.canvas.addEventListener ("wheel", this.onWheel.bind (this));
	
	// mouse move for mouvement
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this), false);
//	this.canvas.addEventListener ("contextmenu", function () {return false;});
	
};


//==============================================================================
/** 
 * TODO
 * 
 * @param {Number} phiOffset - Lattitude offset.
 * @param {Number} thetaOffset - Longitude offset.
 */
SurfaceViewer.prototype.moveCameraAt = function (phiOffset, thetaOffset) {
	/// parameter verification 
	if (! checkType (arguments, "number", "number")) {	
		throw "SurfaceViewer.moveCameraAt: parameters are not number";
	}
	
	/// compute angle
	var pos = this.camPosWhenClick;
	var dist = pos.getLength ();
	var phi = Math.acos (pos.x / dist) * Math.sign (pos.y / dist);
	var theta = Math.asin (pos.z / dist);
	
	/// compute pos
	this.scene.setCameraAt ([
		dist * Math.cos (phi + phiOffset) * Math.cos (theta + thetaOffset),
		dist * Math.sin (phi + phiOffset) * Math.cos (theta + thetaOffset),
		dist * Math.sin (theta + thetaOffset)
	]);
	
	/// drawing
	this.drawScene ();
};



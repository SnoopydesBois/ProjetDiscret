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
	this.scene.addObject (new Repere (new Vector (25, 20, 25), this.glContext));
	
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
	this.scene.getCamera ().height = this.canvas.height;
	this.scene.getCamera ().width = this.canvas.width;
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
	console.log ("resize du canvas");
	$("canvas").each (function (id, elem) {
		elem.height = $(elem).height ();
		elem.width = $(elem).width ();
	});
	this.setViewDimension ();
	this.scene.getCamera().computeMatrices();
	this.showScene ();
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
		console.log ("nouveau :", event.layerX, event.layerY);
		console.log ("cam pos now:", this.scene.getCamera().getPosition().x, this.scene.getCamera().getPosition().y, this.scene.getCamera().getPosition().z);
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
SurfaceViewer.prototype.onMouseUp = function (event) {
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
		console.log ("cam pos:", this.scene.getCamera().getPosition().x, this.scene.getCamera().getPosition().y, this.scene.getCamera().getPosition().z);
//		console.log ("move at:", (this.mousePosOnPress[0] - event.layerX) * 0.01, (event.layerY - this.mousePosOnPress[1]) * 0.01);
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
		var cam = this.scene.getCamera ();
		// orthographic zoom
		cam.setProjection (
			cam.getProjection () + epsilon
		);
		// perspective zoom
		var normPos = new Vector (cam.getPosition ()).normalize ();
		this.scene.setCameraAt ([
			cam.getPosition ().x + normPos.x * epsilon,
			cam.getPosition ().y + normPos.y * epsilon,
			cam.getPosition ().z + normPos.z * epsilon,
		]);
		cam.computeMatrices ();
		this.drawScene ();
	}
};


//==============================================================================
/**
 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onKeyDown = function (event) {
	console.log (event)
	switch (event.keyCode) {
	case 38 : // Up
		this.moveCameraAt (0.0, 0.01);
		break;
	case 40 : // Down
		this.moveCameraAt (0.0, -0.01);
		break;
	case 37 : // Left
		this.moveCameraAt (0.01, 0.0);
		break;
	case 39 : // Right
		this.moveCameraAt (-0.01, 0.0);
		break;
	}
};



//##############################################################################
//	Other methods
//##############################################################################


/**
 * TODO
 */
SurfaceViewer.prototype.initCanvasEvent = function () {
	// resize 
	this.canvas.addEventListener ("resize", this.onResize.bind (this));
	
	// mouse wheel for zoom
	this.canvas.addEventListener ("wheel", this.onWheel.bind (this));
	
	// key down for camera mouvement
	this.canvas.addEventListener ("keydown", this.onKeyDown.bind (this));
	window.addEventListener ("keydown", this.onKeyDown.bind (this));
	
	// mouse move for mouvement
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this));
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



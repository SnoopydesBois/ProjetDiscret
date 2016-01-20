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
	this.contener = new Scene ();
	this.contener.addObject (new BoundingBox (
		new Vector (5, 5, 5), 
		this.glContext
	));
	this.contener.addObject (new Repere (this.glContext));
	
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
	this.contener.getCamera ().height = this.canvas.height;
	this.contener.getCamera ().width = this.canvas.width;
};


//==============================================================================
/**
 * Change dimensions ... can be overloaded.
 * 
 * @param {int} width - The scene width.
 * @param {int} height - The scene height.
 * 
 * @return {void}
 */
SurfaceViewer.prototype.setDimension = function (width, height) {
	if (this.contener !== null) {
		this.contener.setWidth (width);
		this.contener.setHeight (height);
	}
};


//==============================================================================
/**
 * Change the mouse position .. can be overloaded.
 * 
 * @param {int} x - The mouse position along the x axis.
 * @param {int} y - The mouse position along the y axis.
 * 
 * @return {void}
 */
SurfaceViewer.prototype.setMouse = function (x, y) {
	if (this.contener !== null)
		this.contener.setMouse (x, y);
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * Reload the scene.
 * 
 * @return {void}
 */
GenericViewer.prototype.reload = function () {
	if (!(this.contener instanceof Scene))
		console.error ("GenericViewer.reload: scene does not exist !");
	else
		this.contener.reload ();
};


//==============================================================================
/**
 * Show the scene (prepare it and draw it).
 * 
 * @return {void}
 */
GenericViewer.prototype.show = function () {
	this.prepare ();
	this.draw ();
};


//==============================================================================
/**
 * Prepare the scene if there are objects.
 * 
 * @return {void}
 */
GenericViewer.prototype.prepare = function () {
	if (this.contener.getNbObject () != 0)
		this.contener.prepare (this.glContext);
	else
		console.log ("No object to prepare");
};


//==============================================================================
/**
 * Draw the scene if there are objects.
 * 
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
GenericViewer.prototype.draw = function (backBuffer) {
	if (this.contener.getNbObject () != 0)
		this.contener.draw (this.glContext, backBuffer)
	else
		console.log ("No object to draw");
};



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
	this.contener.getCamera().computeMatrices();
	this.show ();
};


//==============================================================================
/**
 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onMouseDown = function (event) {
	if (event.buttons === 1) { // FIXME right click is pressed
		this.camPosWhenClick = this.contener.getCamera().getPosition();
//		console.log ("nouveau :", event.layerX, event.layerY);
//		console.log ("cam pos now:", this.contener.getCamera().getPosition().x, this.contener.getCamera().getPosition().y, this.contener.getCamera().getPosition().z);
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
		this.camPosWhenClick = this.contener.getCamera().getPosition();
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
//		console.log ("cam pos:", this.contener.getCamera().getPosition().x, this.contener.getCamera().getPosition().y, this.contener.getCamera().getPosition().z);
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
		var cam = this.contener.getCamera ();
		// orthographic zoom
		cam.setProjection (
			cam.getProjection () + epsilon
		);
		// perspective zoom
		var normPos = new Vector (cam.getPosition ()).normalize ();
		this.contener.setCameraAt ([
			cam.getPosition ().x + normPos.x * epsilon,
			cam.getPosition ().y + normPos.y * epsilon,
			cam.getPosition ().z + normPos.z * epsilon,
		]);
		cam.computeMatrices ();
		this.draw ();
	}
};


//==============================================================================
/**
 * @override
 * 
 * TODO
 */
SurfaceViewer.prototype.onKeyDown = function (event) {
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
	this.contener.setCameraAt ([
		dist * Math.cos (phi + phiOffset) * Math.cos (theta + thetaOffset),
		dist * Math.sin (phi + phiOffset) * Math.cos (theta + thetaOffset),
		dist * Math.sin (theta + thetaOffset)
	]);
	
	/// drawing
	this.draw ();
};



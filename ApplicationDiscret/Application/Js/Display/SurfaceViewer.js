// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends GenericViewer
 * @classdesc Class to manage a canvas and object (FIXME traduire) et les objets
 * à dessiner.
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
	this.container = new Scene ();
	this.container.addObject (new BoundingBox (
		new Vector (1, 1, 1),
		this.glContext
	));
	this.container.addObject (new Repere (this.glContext));

	/**
	 * {int[2]} The position of the mouse on the canvas when the user press a
	 * button (used for the camera mouvement). -1 is the default value (use to
	 * resolved conflict).
	 * @see {@link onMouseDown, onMouseMove}
	 */
	this.mousePosOnPress = [-1, -1];

	/**
	 * {Vector} Camera position in space when the user press left mouse button.
	 * Used by 'onMouseMove' method to compute the new camera position.
	 */
	this.camPosWhenClick = new Vector (3, 3, 3);

	/**
	 * {HTMLInputElement} The connexity user choice.
	 */
	this.connexityInput = document.getElementById ("connexityChoice");

	/**
	 * {HTMLInputElement} The connexity user choice.
	 */
	this.voxelRadiusInput = document.getElementById ("voxelRadius");

	/**
	 * {WebGLFrameBuffer} TODO
	 */
	this.frameBuffer = this.glContext.createFramebuffer ();

	/**
	 * {WebGLFrameBuffer} TODO
	 */
	this.screenBuffer = this.glContext.createRenderbuffer ();

	/**
	 * {WebGLFrameBuffer} TODO
	 */
	this.backBuffer = this.glContext.createRenderbuffer ();


	/// Initialisation
	var gl = this.glContext;

	this.initCanvasEvent ();
	gl.enable (gl.CULL_FACE);
	gl.enable (gl.DEPTH_TEST);
	gl.frontFace (gl.CW);

	gl.bindFramebuffer (gl.FRAMEBUFFER, this.frameBuffer);

	// screen buffer
	gl.bindRenderbuffer (gl.RENDERBUFFER, this.screenBuffer);
	gl.renderbufferStorage (gl.RENDERBUFFER, gl.RGBA4,
		gl.drawingBufferWidth, gl.drawingBufferHeight);
	gl.framebufferRenderbuffer (gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
		gl.RENDERBUFFER, this.screenBuffer);

	// back buffer
	gl.bindRenderbuffer (gl.RENDERBUFFER, this.backBuffer);
	gl.renderbufferStorage (gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
		gl.drawingBufferWidth, gl.drawingBufferHeight);
	gl.framebufferRenderbuffer (gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
		gl.RENDERBUFFER, this.backBuffer);

	gl.bindRenderbuffer (gl.RENDERBUFFER, null);
	gl.bindFramebuffer (gl.FRAMEBUFFER, null);
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * Set the dimension of the viewport. TODO renommer
 */
SurfaceViewer.prototype.setViewDimension = function () {
	this.glContext.viewport (
		0,
		0,
		this.glContext.drawingBufferWidth,
		this.glContext.drawingBufferHeight
	);
	this.container.getCamera ().height = this.canvas.height;
	this.container.getCamera ().width = this.canvas.width;
};


//==============================================================================
/**
 * Change dimension of the scene.
 *
 * @param {int} width - The scene width.
 * @param {int} height - The scene height.
 *
 * @return {void}
 */
SurfaceViewer.prototype.setDimension = function (width, height) {
	if (this.container !== null) {
		this.container.setWidth (width);
		this.container.setHeight (height);
	}
};


//==============================================================================
/**
 * Change the mouse position.
 *
 * @param {int} x - The mouse position along the x axis.
 * @param {int} y - The mouse position along the y axis.
 *
 * @return {void}
 */
SurfaceViewer.prototype.setMouse = function (x, y) {
	if (this.container !== null)
		this.container.setMouse (x, y);
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * Reload the scene.
 *
 * @return {void}
 */
SurfaceViewer.prototype.reload = function () {
	if (!(this.container instanceof Scene))
		console.error ("SurfaceViewer.reload: scene does not exist !");
	else
		this.container.reload ();
};


//==============================================================================
/**
 * Show the scene (prepare it and draw it).
 *
 * @param {boolean} forcePrepare - If true, call 'unprepare' before 'prepare'
 * methods.
 *
 * @return {void}
 */
SurfaceViewer.prototype.show = function (forcePrepare) {
	if (forcePrepare)
		this.unprepare ();
	this.prepare ();
	this.draw ();
};


//==============================================================================
/**
 * Prepare the scene if there are objects.
 *
 * @return {void}
 */
SurfaceViewer.prototype.prepare = function () {
	if (this.container.getNbObject () != 0) {
		this.container.prepare (
			this.glContext,
			parseInt (this.connexityInput.value),
			parseFloat (this.voxelRadiusInput.value) / 2.0
		);
	}
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
SurfaceViewer.prototype.draw = function (backBuffer) {
	if (this.container.getNbObject () != 0) {
//		this.container.draw (this.glContext, true, this.backColorBuffer);
		this.container.draw (this.glContext, backBuffer, this.screenBuffer);
	}
	else
		console.log ("No object to draw");
};


//==============================================================================
/**
 * Unprepared all object.
 *
 * @return {void}
 */
SurfaceViewer.prototype.unprepare = function () {
	this.container.unprepare ();
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
	this.setViewDimension ();
	this.container.getCamera ().computeMatrices ();
	this.show ();
};


//==============================================================================
/**
 * @override
 * Save the camera coordinates and the mouse coordintates. TODO compléter
 * @see {@link camPosWhenClick, mousePosOnPress}
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onMouseDown = function (event) {
	if (event.buttons === 1) {
		this.camPosWhenClick = this.container.getCamera().getPosition();
		this.mousePosOnPress[0] = event.layerX;
		this.mousePosOnPress[1] = event.layerY;
	}

	// draw the scene for picking
	this.container.draw (this.glContext, true, this.backBuffer);
	var color = new Uint8Array (4);
	this.glContext.readPixels (
		event.layerX, this.glContext.drawingBufferHeight - event.layerY,
		1, 1,
		this.glContext.RGBA, this.glContext.UNSIGNED_BYTE, color
	);
//	console.log (colorToPos (color, new Vector (31 ,31, 31)).toString ());

	// redraw correctly the scene
	this.container.draw (this.glContext, false, this.screenBuffer);
};


//==============================================================================
/**
 * @override
 * TODO
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onMouseUp = function (event) {
	this.mousePosOnPress[0] = -1;
};


//==============================================================================
/**
 * @override
 * Move the camera.
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onMouseMove = function (event) {
	if (event.buttons === 1 && this.mousePosOnPress[0] != -1) {
		/* left button is pressed and the user generate mousedown event on the
		 * surface canvas.
		 */
		this.moveCameraAt (
			(this.mousePosOnPress[0] - event.layerX) * 0.01,
			(event.layerY - this.mousePosOnPress[1]) * 0.01
		);
	}
};


//==============================================================================
/**
 * @override
 * Change the zoom of the camera.
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onWheel = function (event) {
	if (event.deltaY != 0) {
		var epsilon = event.deltaY < 0 ? -0.1 : 0.1 ;
		var cam = this.container.getCamera ();
		// orthographic zoom
		cam.setProjection (
			cam.getProjection () + epsilon
		);
		// perspective zoom
		var normPos = new Vector (cam.getPosition ()).normalize ();
		this.container.setCameraAt ([
			cam.getPosition ().x + normPos.x * epsilon,
			cam.getPosition ().y + normPos.y * epsilon,
			cam.getPosition ().z + normPos.z * epsilon
		]);
		cam.computeMatrices ();
		this.draw ();
	}
};


//==============================================================================
/**
 * @override
 * Store camera and mouse position.
 *
 * @param {KeyEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onKeyDown = function (event) { // FIXME
	switch (event.keyCode) {
	case 38 : // Up
		this.moveCameraAt (0.0, 0.01);
		++this.mousePosOnPress[1];
		break;
	case 40 : // Down
		this.moveCameraAt (0.0, -0.01);
		--this.mousePosOnPress[1];
		break;
	case 37 : // Left
		this.moveCameraAt (0.01, 0.0);
		++this.mousePosOnPress[0];
		break;
	case 39 : // Right
		this.moveCameraAt (-0.01, 0.0);
		--this.mousePosOnPress[0];
		break;
	}
};



//##############################################################################
//	Other methods
//##############################################################################


/**
 * Init all event on the canvas.
 *
 * @return {void}
 */
SurfaceViewer.prototype.initCanvasEvent = function () {
	// resize
	this.canvas.addEventListener ("resize", this.onResize.bind (this));

	// mouse wheel for zoom
	this.canvas.addEventListener ("wheel", this.onWheel.bind (this));

	// key down for camera mouvement
//	this.canvas.addEventListener ("keydown", this.onKeyDown.bind (this));
//	window.addEventListener ("keydown", this.onKeyDown.bind (this));

	// mouse move for mouvement
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this));
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
	this.canvas.addEventListener ("mouseup", this.onMouseUp.bind (this));
//	this.canvas.addEventListener ("contextmenu", function () {return false;});
};


//==============================================================================
/**
 * Move the camera at spheric coordintates.
 *
 * @param {Number} phiOffset - Lattitude offset.
 * @param {Number} thetaOffset - Longitude offset.
 *
 * @return {void}
 */
SurfaceViewer.prototype.moveCameraAt = function (phiOffset, thetaOffset) {
	/// parameter verification
	if (! checkType (arguments, "number", "number")) {
		throw "SurfaceViewer.moveCameraAt: one of parameter are not number";
	}

	/// compute angle
	var pos = this.camPosWhenClick;
	var dist = pos.getLength ();
	var phi = angle (pos.x, pos.y) + phiOffset;
	var theta = clamp (-Math.PI / 2, Math.PI / 2,
		Math.asin (pos.z / dist) + thetaOffset);


	/// compute position
	var x = dist * Math.cos (phi) * Math.cos (theta);
	var y = dist * Math.sin (phi) * Math.cos (theta);
	var z = dist * Math.sin (theta);
	this.container.setCameraAt ([x, y, z]);

	/// drawing
	this.draw ();
};


//==============================================================================
/**
 * Forces the scene's camera to compute its matrices. TODO vérifier anglais.
 *
 * @return {void}
 */
SurfaceViewer.prototype.computeCamera = function () {
	this.container.getCamera ().computeMatrices ();
};


//==============================================================================
/**
 * @return {SurfaceRenderer} The SurfaceRenderer which containt the actual
 * generated surface (i.e. not the repere, not the bounding box but the third
 * object).
 */
SurfaceViewer.prototype.getSurfaceRenderer = function () {
	return this.container.getObjectByName (
		SurfaceRenderer.getCurrentSurfaceName ()
	);
};


//==============================================================================
/**
 * @param {int} width - The width of the canvas from which we get the data
 * @param {int} height - The height of the canvas from which we get the data
 * @return {float[]} the image data
 */
SurfaceViewer.prototype.getImgData = function (width, height) {
	// Bind the frame framebuffer and the depth buffer for the color rendering
	this.glContext.bindRenderbuffer (this.glContext.RENDERBUFFER,
		this.screenBuffer);
	this.glContext.bindFramebuffer (this.glContext.FRAMEBUFFER,
		this.framebuffer);

	// Drawing the colored scene
	this.draw ();

	// Pixel on which we click
	var pixel = new Uint8Array (width * height * 4);

	// Read the pixel at x and y coordinates
	this.glContext.readPixels (0, 0,
		width, height,
		this.glContext.RGBA, this.glContext.UNSIGNED_BYTE,
		pixel
	);
	// Unbind the buffers used
	this.glContext.bindRenderbuffer (this.glContext.RENDERBUFFER, null);
	this.glContext.bindFramebuffer (this.glContext.FRAMEBUFFER, null);

	return this.reverseTab (pixel, width, height);
};


//==============================================================================
/**
 * Reverse the data in the array
 */
SurfaceViewer.prototype.reverseTab = function (tab, width, height) {

	var pixel = [];
	for (var i = height - 1; i >= 0; --i) {
		for (var j = 0; j < width * 4; ++j) {
			pixel.push (tab[i * width * 4 + j]);
		}
	}
	return pixel;
};

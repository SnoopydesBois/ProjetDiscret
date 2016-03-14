// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
 *
 * Ce logiciel est un programme informatique servant à modéliser des
 * structures 3D voxellisées.
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* container : Scene
 * mousePosOnPress : int[2]
 * camPosWhenClick : Vector
 * camCenterWhenClick : Vector
 * connexityInput : HTMLInputElement
 * voxelRadiusInput : HTMLInputElement
 * frameBuffer : WebGLFrameBuffer
 * screenBuffer : WebGLRenderBuffer
 * backBuffer : WebGLRenderBuffer
 * 
 * SurfaceViewer (canvas : HTMLCanvasElement)
 * 
 * setViewDimension () : void
 * setDimension (width : int, height : int) : void
 * setMouse (x : int, y : int) : void
 * reload () : void
 * show (forcePrepare : boolean) : void
 * prepare () : void
 * draw (backBuffer : boolean) : void
 * unprepare () : void
 * onResize (event : WindowEvent) : void
 * onMouseDown (event : MouseEvent) : void
 * onMouseUp (event : MouseEvent) : void
 * onMouseMove (event : MouseEvent) : void
 * onWheel (event : MouseEvent) : void
 * onContextMenu (event : MouseEvent) : void
 * initCanvasEvent () : void
 * rotateCamera (phiOffset : Number, thetaOffset : Number) : void
 * moveCamera (xOffset : Number, yOffset : Number) : void
 * computeCamera () : void
 * getSurfaceRenderer () : SurfaceRenderer
 * getImgData (width : int, height : int) : float[]
 * reverseTab (tab : Array, width : int, height : int) : Array
 * resetCamera () : void
 * centerCamera () : void
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends GenericViewer
 * @classdesc Class which manage a canvas and the objects to display
 */
SurfaceViewer.prototype = new GenericViewer;
SurfaceViewer.prototype.constructor = SurfaceViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
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
	 * {int[2]} The position of the mouse on the canvas when the user presses a
	 * button (used for the camera mouvement). -1 is the default value (used to
	 * resolve conflicts).
	 * @see {@link onMouseDown, onMouseMove}
	 */
	this.mousePosOnPress = [-1, -1];

	/**
	 * {Vector} Camera position in space when the user presses left mouse button.
	 * Used by 'onMouseMove', 'rotateCamera' and 'moveCamera' methods to compute
	 * the new camera position.
	 * @see {@link onMouseMove, rotateCamera}
	 */
	this.camPosWhenClick = new Vector (3, 3, 3);

	/**
	 * {Vector} Centers the camera position in space when the user presses the middle mouse
	 * button. Used by 'onMouseMove', 'rotateCamera' and 'moveCamera' methods to
	 * compute the new camera position.
	 * @see {@link onMouseMove, rotateCamera, moveCamera}
	 */
	this.camCenterWhenClick = new Vector (0, 0, 0);

	/**
	 * {HTMLInputElement} The connexity selected by the user.
	 */
	this.connexityInput = document.getElementById ("connexityChoice");

	/**
	 * {HTMLInputElement} The voxel radius selected by the user.
	 */
	this.voxelRadiusInput = document.getElementById ("voxelRadius");

	/**
	 * {WebGLFrameBuffer} The frame buffer which contains all render buffers.
	 */
	this.frameBuffer = this.glContext.createFramebuffer ();

	/**
	 * {WebGLRenderBuffer} The main render buffer. Used to draw the main image.
	 */
	this.screenBuffer = this.glContext.createRenderbuffer ();

	/**
	 * {WebGLRenderBuffer} Render buffer for picking. Used to store picking
	 * color of each facet.
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
 * Sets the dimension of the viewport.
 * 
 * @return {void}
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
 * Changes the dimensions of the scene.
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
 * @throws {String} The scene does not exist
 */
SurfaceViewer.prototype.reload = function () {
	if (!(this.container instanceof Scene))
		console.error ("SurfaceViewer.reload: scene does not exist");
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
 * Prepares the scene if there are some objects.
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
 * Draws the scene if there are some objects.
 *
 * @param {boolean} [backBuffer] - Indicates if we have to draw the scene
 * normally or if we need to draw for picking.
 *
 * @return {void}
 */
SurfaceViewer.prototype.draw = function (backBuffer) {
	if (this.container.getNbObject () != 0) {
		this.container.draw (
			this.glContext,
			backBuffer,
			parseFloat (this.voxelRadiusInput.value) / 2,
			this.screenBuffer
		);
	}
	else
		console.log ("No object to draw");
};


//==============================================================================
/**
 * Unprepare all the objects.
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
 * Sets the 'height' and 'width' canvas attributes and resize the viewport.
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
 * Left and middle buttons : saves the camera coordinates and the mouse
 * coordinates.
 * Right button : highlights X, Y and Z slices where the user clicked. If there is
 * no facet, highlight is desactivated.
 * @see {@link camPosWhenClick, mousePosOnPress}
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onMouseDown = function (event) {
	if (event.buttons & 5) { // left or middle click
		this.camPosWhenClick = this.container.getCamera ().getPosition ();
		this.mousePosOnPress[0] = event.layerX;
		this.mousePosOnPress[1] = event.layerY;
		this.camCenterWhenClick =
			this.container.getCamera ().getLookAtPosition ();
	}
	if (event.buttons === 2) {
		// draw the scene for picking
		this.container.draw (this.glContext, true, this.backBuffer);
		var color = new Uint8Array (4);
		this.glContext.readPixels (
			event.layerX, this.glContext.drawingBufferHeight - event.layerY,
			1, 1,
			this.glContext.RGBA, this.glContext.UNSIGNED_BYTE, color
		);
		var surface = this.getSurfaceRenderer ();
		var dim = surface.getDimension ();
		var facet = colorToPos (color, dim);
		var dir = facet.getDirection ();
		var noHighlight;
		if (0 <= dir && dir < DirectionEnum.size) {
			var voxelPos = facet.getCube ();
			surface.setHighlightX (voxelPos.x);
			surface.setHighlightY (voxelPos.y);
			surface.setHighlightZ (voxelPos.z);
		}
		else {
			noHighlight = (surface.highlightX == -1);
			if (! noHighlight) {
				surface.setHighlightX (-1);
				surface.setHighlightY (-1);
				surface.setHighlightZ (-1);
			}
		}
		// redraw correctly the scene
		this.show (true);
	}
};


//==============================================================================
/**
 * @override
 * Resets attribute 'mousePosOnPress' (only sets the first value at -1).
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
 * Moves the camera.
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onMouseMove = function (event) {
	if ((event.buttons == 4 || (event.buttons == 1 && event.ctrlKey)) 
		&& this.mousePosOnPress[0] != -1) 
	{
		/* middle button is pressed (or left button and ctrl key pressed) and
		 * the user generate mousedown event on the surface canvas.
		 */
		this.moveCamera (
			(event.layerX - this.mousePosOnPress[0]) * 0.005,
			(event.layerY - this.mousePosOnPress[1]) * 0.005
		);
	}
	else if (event.buttons == 1 && this.mousePosOnPress[0] != -1) {
		/* left button is pressed and the user generate mousedown event on the
		 * surface canvas.
		 */
		this.rotateCamera (
			(this.mousePosOnPress[0] - event.layerX) * 0.01,
			(event.layerY - this.mousePosOnPress[1]) * 0.01
		);
	}
};


//==============================================================================
/**
 * @override
 * Changes the zoom of the camera.
 *
 * @param {MouseEvent} event - The event.
 *
 * @return {void}
 */
SurfaceViewer.prototype.onWheel = function (event) {
	if (event.deltaY != 0) {
		if (event.deltaY < 0)
			this.container.getCamera ().zoomIn ();
		else
			this.container.getCamera ().zoomOut ();
		this.draw ();
	}
};


//==============================================================================
/**
 * Prevents the context menu from appearing. FIXME doesn't work correctly on Windows
 * 
 * @param {MouseEvent} event - The mouse event.
 * @return {void}
 */
SurfaceViewer.prototype.onContextMenu = function (event) {
	if (event.buttons === 2) {
		event.preventDefault();
		event.stopPropagation();
	}
};



//##############################################################################
//	Other methods
//##############################################################################


/**
 * Initializes all the events on the canvas.
 *
 * @return {void}
 */
SurfaceViewer.prototype.initCanvasEvent = function () {
	// resize
	this.canvas.addEventListener ("resize", this.onResize.bind (this));

	// mouse wheel for zoom
	this.canvas.addEventListener ("wheel", this.onWheel.bind (this));

	// mouse move for mouvement
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this));
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
	this.canvas.addEventListener ("mouseup", this.onMouseUp.bind (this));
	this.canvas.addEventListener ("contextmenu", this.onContextMenu.bind (this),
		true);
};


//==============================================================================
/**
 * Moves the camera using spheric coordinates.
 *
 * @param {Number} phiOffset - Azimuth offset.
 * @param {Number} thetaOffset - Altitude offset.
 *
 * @return {void}
 * @throw {String} the parameters are not of type number
 */
SurfaceViewer.prototype.rotateCamera = function (phiOffset, thetaOffset) {
	/// parameter verification
	if (! checkType (arguments, "number", "number")) {
		throw "SurfaceViewer.rotateCamera: one of the parameters is not a number";
	}

	/// compute angle
	var pos = new Vector (this.camPosWhenClick).sub (this.camCenterWhenClick);
	var dist = pos.getLength ();
	var phi = getAzimuth (this.camPosWhenClick, this.camCenterWhenClick) + phiOffset;
	var theta = clamp (
		-Math.PI / 2 + 0.0002, 
		Math.PI / 2 - 0.0002, 
		getAltitude (
			this.camPosWhenClick, 
			this.camCenterWhenClick
		) + thetaOffset
	);


	/// compute position
	pos.x = dist * Math.cos (phi) * Math.cos (theta);
	pos.y = dist * Math.sin (phi) * Math.cos (theta);
	pos.z = dist * Math.sin (theta);
	this.container.setCameraAt (pos.add (this.camCenterWhenClick));

	/// drawing
	this.draw ();
};


//==============================================================================
/**
 * Translates the camera (eye and center position).
 *
 * @param {Number} xOffset - X offset (left-right).
 * @param {Number} yOffset - Y offset (up-down).
 *
 * @return {void}
 * @throw {String} the parameters are not of type number
 */
SurfaceViewer.prototype.moveCamera = function (xOffset, yOffset) {
	/// parameter verification
	if (! checkType (arguments, "number", "number")) {
		throw "SurfaceViewer.moveCamera: one of parameter are not number";
	}
	
	/// compute local base
	var base = new Matrix ()
		.rotateZ (getAzimuth (this.camPosWhenClick, this.camCenterWhenClick))
	base.rotate (
		getAltitude (this.camPosWhenClick, this.camCenterWhenClick),
		base.getYVector ()
	);
	
	/// compute translation
	var t = new Vector (base.getYVector ())
		.mul (-xOffset)
		.add (new Vector (base.getZVector ()).mul (yOffset));
	
	/// set camera position
	this.container.setCameraAt (
		addVector (this.camPosWhenClick, t),
		addVector (this.camCenterWhenClick, t)
	);

	/// drawing
	this.draw ();
};


//==============================================================================
/**
 * Forces the scene's camera to compute its matrices.
 *
 * @return {void}
 */
SurfaceViewer.prototype.computeCamera = function () {
	this.container.getCamera ().computeMatrices ();
};


//==============================================================================
/**
 * @return {SurfaceRenderer} The SurfaceRenderer which contains the current
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
 * @param {int} width - The width of the canvas from which we get the data.
 * @param {int} height - The height of the canvas from which we get the data.
 * 
 * @return {float[]} The image data
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
 * Vertical flip of a matrix.
 * @example | 1 2 |  ->  | 3 4 |
 *          | 3 4 |      | 1 2 |
 * XXX Function instead of method?
 * 
 * @param {Array} tab - An array (like a matrix).
 * @param {int} width - Matrix width.
 * @param {int} height - Matrix height.
 * 
 * @return {Array} The flipped matrix.
 */
SurfaceViewer.prototype.reverseTab = function (tab, width, height) {
	var pixels = [];
	for (var i = height - 1; i >= 0; --i) {
		for (var j = 0; j < width * 4; ++j) {
			pixels.push (tab[i * width * 4 + j]);
		}
	}
	return pixels;
};


//==============================================================================
/**
 * Puts the camera back to its initial position.
 * @see {@link centerCamera, Scene.resetCamera, Camera.setCameraAt}
 * 
 * @return {void}
 */
SurfaceViewer.prototype.resetCamera = function () {
	this.container.resetCamera ();
	this.draw ();
};


//==============================================================================
/**
 * Centers the camera (i.e Recenter the camera to look at the center without 
 * modifying the zoom. Keeps the previous altitude.).
 * @see {@link resetCamera, Scene.centerCamera, Camera.setCameraAt}
 * 
 * @return {void}
 */
SurfaceViewer.prototype.centerCamera = function () {
	this.container.centerCamera ();
	this.draw ();
};



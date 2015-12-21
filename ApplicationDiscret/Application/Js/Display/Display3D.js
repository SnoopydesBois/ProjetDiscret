// TODO refactoring

/// LICENCE ////////////////////////////////////////////////////////////////////

/*
 * Copyright (juin 2015)
 * Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
 *
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * tanguy.desplebain@gmail.com
 * lauret.karl@hotmail.fr
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
 * termes
 */

/// INDEX //////////////////////////////////////////////////////////////////////

/*
 * Display3D.js
 * 
 * @author : BISUTTI Adrien, DESPLEBAIN Tanguy
 * @created : Wed, 27 May 2015 14:00:00 +0200
 * @modified : Mon, 01 June 2015 17:00:00 +0200
 *
 * *******************************************
 *
 * renderTarget_list : 
 * canvas : 
 * htmlSrc :
 * scene : 
 * shader : 
 * models :
 * functionality : 
 * gl :
 *
 * Display3D()
 * addModel(modelControl : ModelController) : void
 * removeModel(modelControl : ModelController) : void
 * reload() : void
 * setDimension(width : int, height : int) : void
 * setMouse(x : int, y : int) : void
 * addTranslateX(x : int) : void
 * addTranslateY(x : int) : void
 * multScale(x : int) : void
 * getCurentModel() : ModelController
 * prepare(idIDisplay : int) : void
 * update() : void
 * onResize() : void
 * draw() : void
 * calcul() : void
 * calculHover() : void
 * calculSelect() : void
 * onMouseClick(event : WindowEvent) : void
 * onMousePressed(event : WindowEvent) : void
 * onMouseReleased(event : WindowEvent) : void
 * onMouseMove(event : WindowEvent) : void
 * onKeyPressed(event : WindowEvent) : void
 * getPixel(x : int, y : int) : Arrayd
 * getPointedCube(x : int, y : int) : Vector
 * getPointedFace(x : int, y : int) : DirectionEnum
 */

/// CODE ///////////////////////////////////////////////////////////////////////


Display3D.prototype = new Display ();
Display3D.prototype.constructor = Display3D;


/** 
 * Constructor
 * @constructor
 */
function Display3D (application) {	 
	Display.call (this,application);
	this.renderTarget_list = new Array(); // List of renderTarget
	this.canvas;
	this.htmlSrc = "Display/iDisplay3D.html";
	this.scene = new Scene (); // Scene creation
	
	// Add a full scene ...
    this.cameraAt = new Vector(-Math.sqrt((
			Math.pow(3.5,2)-Math.pow(3.5/2.0,2)) 
    		/ 2.0),
			- Math.sqrt ((
			Math.pow (3.5, 2)-Math.pow (3.5 / 2.0, 2)) 
			/ 2.0),
			3.5 / 2);

    this.cameraTo = new Vector(0,0,0);// Where the camera looks
    
	this.scene.addCamera(
	new Camera(this.cameraAt, //eyePos,
		    this.cameraTo, //centerPos, 
		    new Vector(0,0,1), //up, 
		    // width, height, fov,  near, far
		    512,      512,    25.0, 0.01, 1000.0
		) 
);
	this.shader = null;
	this.models = new Array();
	this.functionality = new Array();
	this.gl = null;
}


//==============================================================================
/**
 *  @return {Functions[]} The list of functionalities
 */
Display3D.prototype.getFunctionalities = function () {
	return this.functionality;
};


//==============================================================================
/**
 * add a model to display
 * @param {ModelController} modelControl - the model to display
 * @return {void}
 */
Display3D.prototype.addModel = function (modelControl) {
	if (this.shader != null) {
		var model3D = new ModelView3D(modelControl, modelControl.getName(), this.shader);
		this.scene.addObject(model3D);
		for (var i = 0; i < this.scene.objectList.length; ++i) {
			this.scene.objectList[i].clearHover(this.gl);
			this.scene.objectList[i].clearSelect(this.gl);
		}
		//this.calcul ();
		//this.draw ();
	} else {
		console.error ("Display3D.addModel shader = null");
	}
};


//==============================================================================
/**
 * delete a model from a list view
 * @param {ModelController} modelControl : the model to delete
 * @return {void}
 */
Display3D.prototype.removeModel = function (modelControl) {
	//console.log ("Display3D.removeModel");
	for (var i = 0; i < this.scene.objectList.length; ++i) {
		if (this.scene.objectList[i].getModel() == modelControl) {
			this.scene.objectList.splice(i, 1); //Remove from the list
			break;
		}
    }
	if (this.scene.extrud!=null) {
		this.scene.extrud.modelController.clear();
	}
};


//==============================================================================
/**
 * Empty the list of models to display
 * @return {void}
 */
Display3D.prototype.clearModel = function () {
	//console.log ("Display3D.clearModel");
	this.scene.objectList = new Array();
	if (this.scene!= null && this.scene.extrud!=null) {
		this.scene.extrud.modelController.clear();
	}
};

//==============================================================================
/**
 * Reload an exercise (UI) : can (should?) be overloaded
 * @return {void}
 */
Display3D.prototype.reload = function () {
	if (this.scene == null) {
		return;
	}
	this.scene.Reload();
};


//==============================================================================
/**
 * Change dimensions ... can be overloaded
 * @param {int} width - the scene width
 * @param {int} height - the scene height
 * @return {void}
 */
Display3D.prototype.setDimension = function (width, height) {
	if (this.scene == null) {
		return;
	}
	this.scene.setWidth (width);
	this.scene.setHeight (height);
};


//==============================================================================
/**
 * Change the mouse position .. can be overloaded
 * @param {int} x - the mouse position along the x axis
 * @param {int} y - the mouse position along the y axis
 * @return {void}
 */
Display3D.prototype.setMouse = function (x, y) {
	if (this.scene == null) { 
		return;
	}
	this.scene.setMouse (x, y);
};


//==============================================================================
/**
 * @return {int} the height of the canvas used by the Display3D
 */
Display3D.prototype.getCanvasHeight = function () {
	return this.canvas.height;
}


//==============================================================================
/**
 * @return {int} the width of the canvas used by the Display3D
 */
Display3D.prototype.getCanvasWidth = function () {
	return this.canvas.width;
}


//==============================================================================
/**
 * @return {int} the width of the canvas used by the Display3D
 */
Display3D.prototype.getCanvas = function () {
	return this.canvas;
}


//==============================================================================
/**
 * Translation along the x axis
 * @param {int} x - how much do we translate
 * @return {void}
 */
Display3D.prototype.addTranslateX = function (x) {
	if (this.scene != null) { 
		this.scene.addTranslateX (x);
	} 
};


//==============================================================================
/**
 * Translation along the y axis
 * @param {int} x - how much do we translate
 * @return {void}
 */
Display3D.prototype.addTranslateY = function (x) { 
	if (this.scene != null) {
		this.scene.addTranslateY (x); 
	}
};


//==============================================================================
/**
 * Scaling
 * @param {int} x - how much do we scale
 * @return {void}
 */
Display3D.prototype.multScale = function (x) { 
	if (this.scene != null) { 
		this.scene.multScale (x);
	} 
};

//==============================================================================
/**
 * @return {ModelController} the curent model
 */
Display3D.prototype.getCurentModel = function () {
	if (this.models.length == 1) {
		return this.models[0];
	} else {
		return null;
	}
};


//==============================================================================
/**
 * set the list of models
 * @param {ModelController[]} models - the list of models
 * @return {void}
 */
Display3D.prototype.setListModel = function (models) { 
	this.models = models;
};


//==============================================================================
/** 
 * First function to be call, initialize the Display after it is loaded
 * @param {int} idIDisplay - id of the IDisplay tag in which the Display is
 * @return {void}
 */
Display3D.prototype.prepare = function (idIDisplay, doc) {
//	console.log ("Display3D.prepare")
	/// vérification arguments
	if (!idIDisplay)
		throw "Display3D.prepare : invalid iDisplay id (" + idIDisplay + ")";
	
	/// gestion id conteneur
	this.idIDisplay = idIDisplay;
	this.DisplayDocument = doc;
	
	this.canvas = this.DisplayDocument.getElementById ("View3D");
	
	this.canvas.addEventListener ('click', 
			this.onMouseClick.bind (this), false);
	this.canvas.addEventListener ('mousedown', 
			this.onMousePressed.bind (this), false);
	this.canvas.addEventListener ('mouseup', 
			this.onMouseReleased.bind (this), false);
	this.canvas.addEventListener ('mousemove', 
			this.onMouseMove.bind (this), false);
	this.canvas.addEventListener ('onScroll', 
			this.mouseWheelHandler.bind (this), false);
	this.canvas.addEventListener ('DOMMouseScroll', 
			this.mouseWheelHandler.bind (this), false);

			
	// Forced to be global in the next function
    var Display = this;
    
    this.DisplayDocument.onkeypress = function (event) {
		Display.onKeyPressed(event);
    }
    document.onkeypress = function (event) {
		Display.onKeyPressed(event);
    }
	
    this.onResize();
		
	this.gl = WebGLDebugUtils.makeDebugContext(
		this.canvas.getContext("webgl")
		|| this.canvas.getContext("experimental-webgl")); 
	this.resizeBuffer();

	this.shader = new DefaultShader(this.gl);
    this.scene.addShader (this.shader);
    
    // Load different models
	this.modelSize = new Vector(25, 25, 25);
	
	var repereShader = new DefaultShader(this.gl);
	this.scene.addShader(repereShader);
	this.repere = new Repere("Repere", repereShader, this);
	this.scene.repere = this.repere;
	
	var modelExtrusion = new ModelView3DExtrud(new ModelController(
			this.modelSize, "extrusion"), "extrud", this.shader);
	this.scene.extrud = modelExtrusion;
	
	this.functionality = [];
	this.functionality.push(new ControllerCamera(this, "ControllerCamera"));
	this.functionality.push(new ControllerHover(this, "ControllerHover"));
	this.functionality.push(new ControllerSelect(this, "ControllerSelect", modelExtrusion));
	this.functionality.push(new ControllerRemove(this, "ControllerRemove",this.appli));
	this.functionality.push(new ControllerTranslate(this, 
			"ControllerTranslate",this.appli));
	this.functionality.push(new ControllerRotate(this, "ControllerRotate", this.appli));
	this.functionality.push(new ControllerExtrusion(this, 
			"ControllerExtrusionAdd", modelExtrusion, true, this.appli));
	this.functionality.push(new ControllerExtrusion(this, 
			"ControllerExtrusionRemove", modelExtrusion, false, this.appli));
	this.functionality.push(new ControllerCopy(this, 
			"ControllerCopy"));
	for (var i = 0; i < this.functionality.length; i++) {
		this.appli.addFunctionality(this.functionality[i]);	
	}
	
	this.update ();
};


Display3D.prototype.resizeBuffer = function () {
	this.gl.viewportWidth  = this.canvas.width;
	this.gl.viewportHeight = this.canvas.height;  
	
		
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

	this.gl.enable (this.gl.DEPTH_TEST);
	this.gl.enable (this.gl.CULL_FACE);
	this.gl.cullFace (this.gl.FRONT);

    this.scene.setWidth(this.canvas.width);
	this.scene.setHeight(this.canvas.height);
    

	// Picking gestion
	// Displaybuffer and RenderBuffer creation

	this.Displaybuffer = this.gl.createDisplaybuffer();
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, this.Displaybuffer);
	this.Displaybuffer.width = this.scene.width;
	this.Displaybuffer.height = this.scene.height;

	this.depthbuffer = this.gl.createRenderbuffer();
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthbuffer);

	// allocate renderbuffer
	this.gl.renderbufferStorage(this.gl.RENDERBUFFER,
			this.gl.DEPTH_COMPONENT16, this.Displaybuffer.width, 
			this.Displaybuffer.height);  

	// attach renderebuffer
	this.gl.DisplaybufferRenderbuffer(this.gl.DisplayBUFFER, 
			this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthbuffer);

	this.colorbuffer = this.gl.createRenderbuffer();
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.colorbuffer);
	// allocate colorBuffer
	this.gl.renderbufferStorage(this.gl.RENDERBUFFER, 
			this.gl.RGBA4, this.Displaybuffer.width, this.Displaybuffer.height);  

	// attach colorbuffer
	this.gl.DisplaybufferRenderbuffer(this.gl.DisplayBUFFER, 
			this.gl.COLOR_ATTACHMENT0, this.gl.RENDERBUFFER, this.colorbuffer);

	if (this.gl.checkDisplaybufferStatus(this.gl.DisplayBUFFER) 
			!= this.gl.DisplayBUFFER_COMPLETE) {
	   alert("this combination of attachments does not work");
	}

	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, null);
}
//==============================================================================
/**
 * update the Display
 * @return {void}
 */
Display3D.prototype.update = function () {
	//console.log ("Display3Dupdate");
	if (this.gl != null) {
		this.onResize();
		this.clearModel();
		for (var i=0; i<this.models.length; ++i) {
			this.addModel(this.models[i]);
		}
		this.calcul ();
		this.draw ();
	}
};


//==============================================================================
/** 
 * update for selection in the Display
 * @return {void}
 */
Display3D.prototype.updateSelect = function () {
	this.calculSelect ();
	this.draw ();
};


//==============================================================================
/** 
 * update for hover in the Display
 * @return {void}
 */
Display3D.prototype.updateHover = function () {
	this.calculHover ();
	this.draw ();
};


//==============================================================================
/**
 * update for extrusion in the Display
 * @return {void}
 */
Display3D.prototype.updateExtrud = function () {
	this.calculExtrud ();
	this.draw ();
};


//==============================================================================
/**
 * update size of the Display
 * @return {void}
 */
Display3D.prototype.onResize = function () {
	//console.log ("Display3D : On resize !");
	// width & height
	this.setSize ($(this.DisplayDocument).find('#Display3D').width(), 
		$(this.DisplayDocument).find('#Display3D').height());
	
	this.canvas.width = $(this.DisplayDocument).find('#Display3D').width();
	this.canvas.height = $(this.DisplayDocument).find('#Display3D').height();
	
	this.scene.setWidth(this.canvas.width);
	this.scene.setHeight(this.canvas.height);
	if (this.gl!=null) {
		this.resizeBuffer(); 
	}
};


//==============================================================================
/**
 * draw models
 * @return {void}
 */
Display3D.prototype.draw = function () {
	this.scene.draw(this.gl);
};


//==============================================================================
/**
 * computation of triangles of models
 * @return {void}
 */
Display3D.prototype.calcul = function () {
	this.scene.prepare(this.gl);
};


//==============================================================================
/**
 * computation of hover triangles of models
 * @return {void}
 */
Display3D.prototype.calculHover = function () {
	this.scene.prepareHover(this.gl);
};


//==============================================================================
/**
 * computation of selected triangles of models
 * @return {void}
 */
Display3D.prototype.calculSelect = function () {
	this.scene.prepareSelect(this.gl);
};


//==============================================================================
/**
 * computation of extruded triangles of models
 * @return {void}
 */
Display3D.prototype.calculExtrud = function () {
	this.scene.prepareExtrud(this.gl);
};


//==============================================================================
/**
 * turn isDown to true to start the MouseMouve event
 * @param {MouseEvent} event
 * @return {void}
 */
Display3D.prototype.onMouseClick = function (event) {
	//console.log ("Display3D : onMouseClick");
};


//==============================================================================
/**
 * Call when a mouse button is pressed
 * @param {MouseEvent} event
 * @return {void}
 */
Display3D.prototype.onMousePressed = function (event) {
	//console.log ("Display3D : onMousePressed");
	var face = new Facet(this.getPointedCube(event.pageX,event.pageY), 
			this.getPointedFace(event.pageX,event.pageY));
	if (face.getCube()==null) {
		face=null;
	}
	for (var i=0; i<this.functionality.length; ++i) {
		this.functionality[i].mouseDown(event, face);
	}
};


//==============================================================================
/**
 * Call when a mouse button is released
 * @param {MouseEvent} event
 * @return {void}
 */
Display3D.prototype.onMouseReleased = function (event) {
	//console.log ("Display3D : onMouseReleased");
	var face = new Facet(this.getPointedCube(event.pageX,event.pageY),
			this.getPointedFace(event.pageX,event.pageY));
	if (face.getCube()==null) {
		face=null;
	}
	for (var i=0; i<this.functionality.length; ++i) {
		this.functionality[i].mouseUp(event, face);
	}
};


//==============================================================================
/**
 * Call when the mouse is moved
 * @param {MouseEvent} event
 * @return {void}
 */
Display3D.prototype.onMouseMove = function (event) {
	//console.log ("Display3D : onMouseMove");
	var face = new Facet(this.getPointedCube(event.pageX,event.pageY),
			this.getPointedFace(event.pageX,event.pageY));
	//console.log (face);
	if (face.getCube()==null) {
		face=null;
	}
	for (var i=0; i<this.functionality.length; ++i) {
		this.functionality[i].mouseMouv(event, face);
	}
};


//==============================================================================
/**
 * Call when a keyboard key is pressed
 * @param {WindowEvent} event
 * @return {void}
 */
Display3D.prototype.onKeyPressed = function (event) {
	//console.log ("Display3D : pressKey");
	var face = new Facet(this.getPointedCube(event.pageX,event.pageY), 
			this.getPointedFace(event.pageX,event.pageY));
	if (face.getCube()==null) {
		face=null;
	}
	for (var i=0; i<this.functionality.length; ++i) {
		this.functionality[i].pressKey(event, face);
	}
	this.appli.shortcut(event);
};


//==============================================================================
/**
 * Call when the middle mouse button is used to scroll
 * @param {MouseEvent} event
 * @return {void}
 */
Display3D.prototype.mouseWheelHandler = function (event) {
	//console.log ("Display3D : mouseWheelHandler");
	var face = new Facet(this.getPointedCube(event.pageX,event.pageY), 
			this.getPointedFace(event.pageX,event.pageY));
	if (face.getCube()==null) {
		face=null;
	}
	for (var i=0; i<this.functionality.length; ++i) {
		this.functionality[i].scrolle(event, face);
	}
};


//==============================================================================
/**
 * Picking.
 * @param {float} x	- x coordinate of the mouse in the window
 * @param {float} y	- y coordinate of the mouse in the window
 * @return {int[]} the pixel read
 */
Display3D.prototype.getPixel = function (x, y) {
	// Bind the Display Displaybuffer and the depth buffer for the color rendering
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, this.Displaybuffer);

	// Drawing the colored scene
	this.scene.draw(this.gl, true);

	var pixel = new Uint8Array(4); // Pixel on which we click
	// Handling the size of the canvas
	var iBody = $(this.DisplayDocument).contents().find("body");

	//here you have the control over any element (#myContent)
	var canoffset = iBody.find("#View3D").offset();
	
	var offsetX = canoffset.left;
	var offsetY = canoffset.top;
	// Read the pixel at x and y coordinates
	this.gl.readPixels(x-offsetX, this.scene.getHeight() -y+offsetY,
			1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixel);
	// Unbind the buffers used
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, null);

	//this.scene.draw(gl); // Optimization for the moment
	return pixel;
};


//==============================================================================
/**
 * @return {float[]} the image data
 */
Display3D.prototype.getImgData = function () {
	// Bind the Display Displaybuffer and the depth buffer for the color rendering
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, this.Displaybuffer);

	// Drawing the colored scene
	this.scene.draw(this.gl);
	
	// Pixel on which we click
	var pixel = new Uint8Array(this.canvas.width * this.canvas.height * 4); 
	// Handling the size of the canvas
	var iBody = $(this.DisplayDocument).contents().find("body");

	//here you have the control over any element (#myContent)
	var canoffset = iBody.find("#View3D").offset();
	
	// Read the pixel at x and y coordinates
	this.gl.readPixels(0, 0,
			this.canvas.width, this.canvas.height, this.gl.RGBA, 
			this.gl.UNSIGNED_BYTE, pixel);
	// Unbind the buffers used
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
	this.gl.bindDisplaybuffer(this.gl.DisplayBUFFER, null);

	return this.reverseTab(pixel);
};


//==============================================================================
/**
 * @return {float[]} the image data
 */
Display3D.prototype.reverseTab = function (tab) {
	
	var pixel = [];
	for (var i = this.canvas.height-1; i >= 0; i--) {
		for (var j = 0; j < this.canvas.width*4; j++) {
			pixel.push(tab[i*this.canvas.width*4 + j]);
		}		
	}
	return pixel;
};


//==============================================================================
/**
 * @param {float} x	- x coordinate of the mouse in the window
 * @param {float} y	- y coordinate of the mouse in the window
 * @return {Cube} the cube pointed by the mouse
 */
Display3D.prototype.getPointedCube = function (x, y) {
	var resultat;
	var buf = this.getPixel(x, y); // Pixel read at x,y coordinate
	
	// Cube coordinates
	// When a cube is created, the color it is given is based on 
	// it's coordinates. So to get the cubes coordinates based on a pixel,
	// we only need to transform it back.
	// Transformation => cf. Cube.js
	var cubeX = (buf[0]-(buf[0]%10))/10 -1;
	var cubeY = buf[1]/10 -1;
	var cubeZ = buf[2]/10 -1;
	
	//console.log (buf);
	
	if (buf[0] != 0 && buf[1] != 0 && buf[2] != 0) {
		resultat = new Vector(cubeX,cubeY,cubeZ);
	}
	else {
		resultat = null;
	}
	
	return resultat;
};


//==============================================================================
/**
 * @param {float} x - x coordinate of the mouse in the window
 * @param {float} y - y coordinate of the mouse in the window
 * @return {float} the coordinates of the cube next to the face pointed
 */
Display3D.prototype.getPointedFace = function (x, y) {
	var buf = this.getPixel(x, y);// Pixel read at x,y coordinate
	if (buf[0] != 0 && buf[1] != 0 && buf[2] != 0) {
		/**
		* We know of which face the pixel is part of based on it's red color
		* @see {@link Objects/Cube.js}
		*/
		return buf[0]%10;
	} 
	else {
		return DirectionEnum.NONE;
	}
};


Display3D.prototype.resetCamera = function () {
	for (var i in this.functionality) {
		if (this.functionality[i] instanceof ControllerCamera) {
			this.functionality[i].reinit();
			break;
		}
	}
};

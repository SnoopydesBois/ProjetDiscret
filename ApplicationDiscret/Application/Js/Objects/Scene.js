/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
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
 * termes.
 */

/// INDEX //////////////////////////////////////////////////////////////////////

/* constructor ()
 * 
 * getNbObject () : int
 * getObjectByName (aName : String) : Object
 * setLightPosition (pos : Vector) : void
 * getCameraById (anIndex : int) : Camera
 * setCamera (camera : Camera) : void
 * getCamera () : Camera
 * setScale (scale : float) : void
 * getScale () :float
 * multScale (scale : float) : void
 * setWidth (width : int) : void
 * setHeight (height : int) : void
 * getWidth () : int
 * getHeight () : int
 * setTranslate (x : float, y : float) : void
 * addTranslateX (x : float) : void
 * addTranslateY (y : float) : void
 * addObject (anObject : Object) : void
 * removeObjectById (id : int) : void
 * removeObjectByName (anObjectName : String) : void
 * addShader (aShader : Shader) : void
 * removeShaderByName (aName : String) : void
 * prepare (gl : glContext) : void
 * drawObject(gl : glContext, obj : GenericObject) : void
 * reload () : void
 * draw (gl : glContext, backBuffer : boolean) : void
 * prepareSelect (gl : glContext) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Scene class management.
 */



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 */
function Scene () {
	
	/**
	 * {GenericStructure[]} List of objects.
	 */
	this.objectList = [];
	
	/**
 	 * {Camera} The camera used in the scene.
 	 */
	this.camera = new Camera (
		new Vector (10, 10, 10),
		new Vector (0, 0, 0),
		new Vector (0, 0, 1),
		800,
		600,
		30.0,
		0.1,
		1000.0
	);
		
	/**
	 * {float} Tha scale factor.
	 */
	this.scale = 1.0;
	
	/**
	 * {int} TODO compléter
	 */
	this.width = 0; 
	
	/**
	 * {int} TODO compléter
	 */
	this.height = 0;
	
	/**
	 * {float} The translation along the X axis.
	 */
	this.translateX = 0.0;
	
	/**
	 * {float} The translation along the Y axis.
	 */
	this.translateY = 0.0;
	
	/**
	 * {int} The X mouse coordinate.
	 */
	this.mouseX = 512;
	
	/**
	 * {int} The Y mouse coordinate.
	 */
	this.mouseY = 384;
}



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {int} The number of objects in this scene (the length of the list of
 * objects).
 */
Scene.prototype.getNbObject = function () {
//	console.error (this.objectList.length);
	return this.objectList.length;
};
Scene.prototype.getLength = function () {
	console.error ("Cette methode à été renommé, il faut utiliser Scene.getNbObject");
	return this.getNbObject ();
};


//==============================================================================
/**
 * Get the light position.
 * 
 * @return {Vector} The light position.
 */
Scene.prototype.getLightPosition = function () {
	return this.lightPosition;
};


//==============================================================================
/**
 * Set the light position.
 * 
 * @param {(Vector | Number | Number[3])} pos - The xyz position of the light.
 * If juste one Number are provied, a Vector is created with the same value for
 * all coordinate. TODO vérifier anglais
 * @see {@link Vector}
 * 
 * @return {void}
 */
Scene.prototype.setLightPosition = function (pos) {
	this.lightPosition = new Vector (pos);
};


//==============================================================================
/**
 * Get the camera.
 * 
 * @return {Camera} The camera corresponding to the id if it exists, null
 * otherwise.
 */
Scene.prototype.getCamera = function () {
	return this.camera;
};


//==============================================================================
/**
 * Set a camera.
 * 
 * @param {Camera} camera - The new camera of the scene
 * 
 * @throws {String} If the provied parameter is not a Camera. TODO vérifier anglais
 */
Scene.prototype.setCamera = function (camera) {
	if (camera instanceof Camera)
		this.camera = camera;
	else
		throw "Scene.setCamera: parameter is not a Camera";
};


//==============================================================================
/**
 * Scaling.
 * 
 * @param {float} scale - The scaling of the scene.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.setScale = function (scale) {
	if (typeof scale == "number") {
		this.scale = scale;
	}
	else
		throw "Scene.setScale: parameter is not a number"
};


//==============================================================================
/**
 * @return {float} The scale of the scene.
 */
Scene.prototype.getScale = function () {
	return this.scale;
};


//==============================================================================
/**
 * Multiply the scale of the scene.
 * 
 * @param {float} scale - How much do we scale.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.multScale = function (scale) {
	if (typeof scale == "number")
		this.scale *= scale;
	else
		throw "Scene.multScale: parameter is not a number"
};


//==============================================================================
/**
 * Get the width of the scene.
 * 
 * @return {int} the width of the scene.
 */
Scene.prototype.getWidth = function () {
	return this.width;
};


//==============================================================================
/**
 * Set a new width for the scene.
 * 
 * @param {int} width - The new width for the scene.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.setWidth = function (width) {
	if (typeof width == "number")
		this.width = width;
	else
		throw "Scene.setWidth: parameter is not a number"
};


//==============================================================================
/**
 * Get the height of the scene.
 * 
 * @return {int} the height of the scene.
 */
Scene.prototype.getHeight = function () {
	return this.height;
};


//==============================================================================
/**
 * Set a new height for the scene.
 * 
 * @param {int} height - The new height for the scene.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.setHeight = function (height) {
	if (typeof height == "number")
		this.height = height;
	else
		throw "Scene.setHeight: parameter is not a number"
};


//==============================================================================
/**
 * Translate along the x axis.
 * 
 * @param {float} x - How much we translate along the x axis.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.addTranslateX = function (x) {
	if (typeof x == "number")
		this.translateX += x;
	else
		throw "Scene.addTranslateX: parameter is not a number"
};


//==============================================================================
/**
 * Translate along the y axis.
 * 
 * @param {float} y - How much we translate along the y axis.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.addTranslateY = function (y) {
	if (typeof y == "number")
		this.translateY += y;
	else
		throw "Scene.addTranslateY: parameter is not a number"
};


//==============================================================================
/**
 * Translate the scene along x and y axis.
 * 
 * @param {float} x - How much we translate along the x axis.
 * @param {float} y - How much we translate along the y axis.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a number. TODO vérifier anglais
 */
Scene.prototype.setTranslate = function (x, y) {
	if (typeof x == "number" && typeof y == "number") {
		this.translateX = x;
		this.translateY = y;
	}
	else
		throw "Scene.setHeight: one of parameters is not a number"
};



//##############################################################################
//	Object managing methods
//##############################################################################



/**
 * Add an object (only if is a GenericStructure subclass).
 * 
 * @param {!GenericStructure} anObject - Object to add to the scene.
 * 
 * @return {void}
 * @throws {String} If the provied parameter is not a GenericStructure or
 * GenericStructure subclass. TODO vérifier anglais
 */
Scene.prototype.addObject = function (anObject) {
	if (anObject instanceof GenericStructure)
		this.objectList.splice (0, 0, anObject); // push at the beginning
	else
		throw "Scene.addObject: parameter is not a GenericStructure";
};


//==============================================================================
/**
 * Get an object given its name.
 * 
 * @param {String} aName - Name of the object to return.
 * 
 * @return {GenericStructure} The object corresponding to the name in parameter
 * if it exists, null otherwise.
 */
Scene.prototype.getObjectByName = function (aName) {
	var length = this.objectList.length;
	
	for (var i = 0; i < length; ++i) {
		if (this.objectList[i].getName() === aName)
			return this.objectList[i];
	}
	
	console.error ("Scene.getObjectByName : object : \"" + aName
			+ "\" not found");
	return null;
};


//==============================================================================
/**
 * Remove an object by id (if id is out of bound, nothing happend). TODO vérifier anglais
 * 
 * @param {int} id - The id in the object list.
 * 
 * @return {void}
 */
Scene.prototype.removeObjectById = function (id) {
	if (id >= 0 && id < this.objectList.length)
		this.objectList.splice (id, 1); // Remove from the list
};


//==============================================================================
/**
 * Remove an object by name.
 * 
 * @param {!String} aName - Name of the object to remove.
 * 
 * @return {void}
 */
Scene.prototype.removeObjectByName = function (aName) {
	for (var i = 0; i < this.objectList.length; ++i) {
		if (this.objectList[i].getName() === aame) {
			this.objectList.splice (i, 1); // Remove from the list
			break;
		}
	}
	console.error ("Scene.removeObjectByName: object : \"" + aName 
			+ "\" not found");
};



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * Reload the scene. Reload shader for each displayable object.
 * 
 * @return {void}
 */
Scene.prototype.reload = function () {
	var obj, length = this.getNbObject ();
	
	for (var i = 0; i < length; ++i) {
		obj = this.objectList[i];
		if (obj.displayMe ())
			obj.getShader ().reload (); 
	}
};


//==============================================================================
/**
 * Prepare the scene before render. Prepare all object and check if there are a
 * camera. If not, the default camera is set to the scene. TODO vérifier anglais
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 * 
 * @return {void}
 */
Scene.prototype.prepare = function (glContext) {
	var length = this.getNbObject ();
	
	for (var i = 0; i < length; ++i) {
		this.objectList[i].prepare (glContext);
		this.objectList[i].getShader ().activate ();
	}
	
//	this.prepareSelect (glContext);
};


//==============================================================================
/**
 * Draw a scene.
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
Scene.prototype.draw = function (glContext, backBuffer) {
	var size = Math.min (this.height, this.width) * 2;
	// voir SurfaceViewer.onResize()
//	glContext.viewport (
//		(this.width - size) / 2,
//		(this.height - size) / 2,
//		size, 
//		size
//	);
//	glContext.clearColor (0.1, 0.11, 0.12, 1.0);
	glContext.clear (glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
//	this.camera.computeMatrices ();
	var length = this.getNbObject ();
	for (var i = 0; i < length; ++i) {
		// Get Object Properties 
		var obj = this.objectList[i];
		if (!obj.displayMe ())
			continue;
		console.log ("Scene.draw :", i);
		this.drawObject (glContext, obj);
		
		// RenderObject 
		if (backBuffer)
			obj.backBufferDraw (glContext, this);
		else
			obj.draw (glContext, this);
	} // end for each displayable object
};


//==============================================================================
/**
 * Draw an object. Compute the data to draw TODO reformuler
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {GenericStructure} obj - The object to draw. TODO vérifier anglais
 * 
 * @return {void}
 */
Scene.prototype.drawObject = function (glContext, obj) {
	/// Parameter verification
	if (! (glContext instanceof WebGLRenderingContext 
		&& obj instanceof GenericStructure)) 
	{
		showType (glContext, obj);
		throw "Scene.drawObject: bad type(s) of parameter(s)"
	}
	
	var cam = this.camera;
	var mvMat = cam.getViewMatrix ();
	var pjMat = cam.getProjectionMatrix ();
	var objMat = obj.getMatrix ();
	
	// Get Location of uniform variables
	var shad = obj.getShader ();
//	shad.activate (glContext); 
	var locMvMat = shad.getUniformLocation ("uModelViewMatrix");
	var locPjMat = shad.getUniformLocation ("uProjectionMatrix");
//	var locNmMat = shad.getUniformLocation ("uNormalMatrix");
	
	// Compute real ModelView matrix
	var mv = new Matrix (mvMat).mul (objMat);
	
	// Set Uniform Matrices
	if (locMvMat != null)
		glContext.uniformMatrix4fv (locMvMat, false, mv.getGLVector ());
	
	if (locPjMat != null)
		glContext.uniformMatrix4fv (locPjMat, false, pjMat.getGLVector ());
	
//	// If Shader has normal matrix give it !
//	if (locNmMat != null) {
//		// Compute Normal matrix 
//		var nm = new Matrix (mv).toNormal();
//		glContext.uniformMatrix4fv (locNmMat, false, nm.getGLVector ()); 
//	}
	
//	// scaling
//	var locScale = shad.getUniformLocation ("uScale");
//	if (locScale != null)
//		glContext.uniform1f (locScale, this.scale);
	
//	// resolution
//	var locResol = shad.getUniformLocation ("uResolution");
//	if (locResol != null)
//		glContext.uniform2f (locResol, this.width, this.height);
	
//	// translation
//	var locTranslate = shad.getUniformLocation ("uTranslate");
//	if (locTranslate != null)
//		glContext.uniform2f (locTranslate, this.translateX, this.translateY);
	
//	// mouse
//	var locMouse = shad.getUniformLocation ("uMouse");
//	if (locMouse !== null) {
//		var x = Math.floor ((this.mouseX) * this.scale);
//		var y = Math.floor ((this.mouseY) * this.scale);
//		glContext.uniform2f (locMouse, x, y);
//	}
};


//==============================================================================
/**
 * TODO
 * 
 * @param {(Vector | Number[3])} position - The new position of the camera.
 */
Scene.prototype.setCameraAt = function (posistion) {
	this.camera.eyePos = new Vector (position);
};



///**
// * Prepare the scene for selection.
// * 
// * @param {WebGLRenderingContext} glContext - The gl context.
// * 
// * @return {void}
// */
//Scene.prototype.prepareSelect = function (glContext) {
//	// Prepare each objects 
//	var lengthObject = this.getNbObject ();
//	for (var i = 0; i < lengthObject; ++i)
//		this.objectList[i].prepareSelection (glContext);
//};



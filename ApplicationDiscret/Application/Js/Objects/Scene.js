/// LICENCE ////////////////////////////////////////////////////////////////////

/* Copyright (juin 2015)
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
 * getLength () : int
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
 * prepareDraw(gl : glContext, obj : GenericObject) : void
 * reload () : void
 * draw (gl : glContext, backBuffer : boolean) : void
 * prepareSelect (gl : glContext) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////

/**
 * @classdesc Scene class management.
 */

/**
 * @constructor 
 */
function Scene () {
//	console.log ("Scene.constructor");
	
	/**
	 * {Array} List of objects.
	 */
	this.objectList = new Array();
	
	/**
	 * {Array} List of shaders.
	 */
	this.shaderList = new Array();
	
	/**
 	 * {Camera} The camera used in the scene
 	 */
	this.camera = undefined;
		
	// add on for discrete geometry
	/**
	 * {float} 
	 */
	this.scale = 1.0;
	
	/**
	 * {int} 
	 */
	this.width = 0; 
	
	/**
	 * {int} 
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
	
	/**
	 * {} 
	 */
	this.repere = null;
}


	  //////////////////////////////
	 /// Accessors and Mutators ///
	//////////////////////////////


/**
 * @return {int} The length of the list of objects.
 */
Scene.prototype.getLength = function () {
//	console.log ("Scene.getLength");
	return this.objectList.length;
};


//==============================================================================
/**
 * Get an object given its name.
 * @param {String} aName - name of the object to return.
 * @return {Object} the object corresponding to the name in parameter if it
 * exists, null otherwise.
 */
Scene.prototype.getObjectByName = function (aName) {
//	console.log ("Scene.getObjectByName");
	var length = this.objectList.length;
	for (var i = 0; i < length; ++i) {
		if (this.objectList[i].getName() === aName) {
			return this.objectList[i];
		}
	}
	console.log ("[Scene::getObjectByName] object : \"" + aName
			+ "\" not found");
	return null;
};


//==============================================================================
/**
 * Set the light position.
 * @param {Vector} pos - the position of the light.
 * @return {void}
 */
Scene.prototype.setLightPosition = function (pos) {
//	console.log ("Scene.setLightPosition");
	this.lightPosition  = new Vector (pos);
};


//==============================================================================
/**
 * Get a camera.
 * @return {Camera} the camera corresponding to the id if it exists, null
 * otherwise.
 */
Scene.prototype.getCamera = function () {
//	console.log ("Scene.getCameraById");
	return this.camera;
};


//==============================================================================
/**
 * Get a camera.
 * @param {Camera} camera - The new camera of the scene
 */
Scene.prototype.setCamera = function (camera) {
//	console.log ("Scene.getCameraById");
	this.camera = camera;
};


//==============================================================================
/**
 * Scaling.
 * @param {float} scale - the scaling of the scene.
 * @return {void}
 */
Scene.prototype.setScale = function (scale) {
//	console.log ("Scene.setScale");
	this.scale = scale;
};


//==============================================================================
/**
 * @return {float} the scale of the scene.
 */
Scene.prototype.getScale = function () {
//	console.log ("Scene.getScale");
	return this.scale;
};


//==============================================================================
/**
 * Multiply the scale of the scene.
 * @param {float} scale - how much do we scale.
 * @return {void}
 */
Scene.prototype.multScale = function (scale) {
//	console.log ("Scene.multScale");
	this.scale *= scale;
};


//==============================================================================
/**
 * Set a new width for the scene.
 * @param {int} width - the new width for the scene.
 * @return {void}
 */
Scene.prototype.setWidth = function (width) {
//	console.log ("Scene.setWidth");
	this.width = width;
};


//==============================================================================
/**
 * Set a new height for the scene.
 * @param {int} height - the new height for the scene.
 * @return {void}
 */
Scene.prototype.setHeight = function (height) {
//	console.log ("Scene.setHeight");
	this.height = height;
};


//==============================================================================
/**
 * Get the width of the scene.
 * @return {int} the width of the scene.
 */
Scene.prototype.getWidth = function () {
//	console.log ("Scene.getWidth");
	return this.width;
};


//==============================================================================
/**
 * Get the height of the scene.
 * @return {int} the height of the scene.
 */
Scene.prototype.getHeight = function () {
//	console.log ("Scene.getHeight");
	return this.height;
};


//==============================================================================
/**
 * Translate the scene along x and y axis.
 * @param {float} x - how much we translate along the x axis.
 * @param {float} y - how much we translate along the y axis.
 * @return {void}
 */
Scene.prototype.setTranslate = function (x, y) {
//	console.log ("Scene.setTranslate");
	this.translateX = x;
	this.translateY = y;
};


//==============================================================================
/**
 * Translate along the x axis.
 * @param {float} x - how much we translate along the x axis.
 * @return {void}
 */
Scene.prototype.addTranslateX = function (x) {
//	console.log ("Scene.addTranslateX");
	this.translateX += x;
};


//==============================================================================
/**
 * Translate along the y axis.
 * @param {float} y - how much we translate along the y axis.
 * @return {void}
 */
Scene.prototype.addTranslateY = function (y) {
//	console.log ("Scene.addTranslateY");
	this.translateY += y;
};


	  //////////////////////
	 /// Others methods ///
	//////////////////////


/**
 * Add an object.
 * @param {Object} anObject - object to add to the scene.
 * @return {void}
 */
Scene.prototype.addObject = function (anObject) {
//	console.log ("Scene.addObject");
	this.objectList.push (anObject);
};


//==============================================================================
/**
 * Remove an object by id.
 * @param {int} id - the id in the object list.
 * @return {void}
 */
Scene.prototype.removeObjectById = function (id) {
//	console.log ("Scene.removeObjectById");
	if (id >= 0 && id < this.objectList.length) {
		this.objectList.splice (id, 1); // Remove from the list
	}
};


//==============================================================================
/**
 * Remove an object by name.
 * @param {String} anObjectName - name of the object to remove.
 * @return {void}
 */
Scene.prototype.removeObjectByName = function (anObjectName) {
//	console.log ("Scene.removeObjectByName");
	for (var i = 0; i < this.objectList.length; ++i) {
		if (this.objectList[i].getName() == anObjectName) {
			this.objectList.splice (i, 1); // Remove from the list
			break;
		}
	}
	console.log ("[Scene::removeObjectByName] object : \"" + anObjectName 
			+ "\" not found");
};


//==============================================================================
/**
 * Add a shader.
 * @param {Shader} aShader - the shader to add to the scene.
 * @return {void}
 */
Scene.prototype.addShader = function (aShader) {
//	console.log ("Scene.addShader");
	this.shaderList.push(aShader);
};


//==============================================================================
/**
 * Remove a shader from list given its name.
 * @param {String} aName - the name of the shader to remove.
 * @return {void}
 */
Scene.prototype.removeShaderByName = function (aName) {
//	console.log ("Scene.removeShaderByName");
	for (var i = 0; i < this.objectList.length; ++i) {
		if (this.shaderList[i].getName() == aName) {
			this.shaderList.splice (i, 1); // Remove from the list
			break;
		}
	}
	console.log ("[Scene::removeShaderByName] shader : \"" + aName
			+ "\" not found");
};


//==============================================================================
/**
 * Prepare Scene before render.
 * @param {glContext} gl - the gl context.
 * @return {void}
 */
Scene.prototype.prepare = function (gl) {
//	console.log ("Scene.prepare");
	// Prepare each objects 
	if (this.repere != null) {
		this.repere.prepare(gl);
	}
	
	for (var i = 0; i < this.objectList.length; ++i) {
		this.objectList[i].prepare(gl);
	}
	
	// If no camera 
	if (this.camera === undefined) {
		// Default Camera
		this.camera = new Camera (new Vector (10, 10, 10),
			new Vector(0, 0, 0),
			new Vector(0, 0, 1),
			800,
			600,
			30.0,
			0.1,
			1000.0);
	}

	this.prepareSelect (gl);
};


//==============================================================================
/**
 * Reload the shader, reinit the scene (the time).
 * @return {void}
 */
Scene.prototype.reload = function () {
//	console.log ("Scene.reload");
	var length = this.objectList.length;
	for (var i = 0; i < length; ++i) {
		var obj = this.objectList[i];
		if (obj.displayMe()) { 
			var shad = obj.getShader();
			shad.Reload(); 
		}
	}
};


//==============================================================================
/**
 * Draw a scene.
 * @param {glContext} gl - the gl context.
 * @param {boolean} [backBuffer] - indicate if we have to draw the scene 
 * normally or if we need to draw for picking (with color on each object).
 * @return {void}
 */
Scene.prototype.draw = function (gl, backBuffer) {
//	console.log ("Scene.draw");
	var taille = Math.min (this.height, this.width) * 2;
	gl.viewport ((this.width - taille) / 2, (this.height - taille) / 2,
			taille, taille);
			
	var colorFont = appli.getCanvasColor();
	
	gl.clearColor (colorFont[0], colorFont[1], colorFont[2], colorFont[3]);
	gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Get Current Camera Matrices
	var cam = this.camera;
	var mvMat = cam.getViewMatrix();
	var pjMat = cam.getProjectionMatrix();
	
	if (this.repere !== undefined && this.repere.displayMe()) {
		// Get Object Properties
		var obj = this.repere;
		this.prepareDraw(obj);
		// RenderObject
		if (!backBuffer) {
			obj.draw (gl, this);
		}
	}

	var length = this.objectList.length;
	for (var i = 0; i < length; ++i) {
		// Get Object Properties 
		var obj = this.objectList[i];
		if (!obj.displayMe()) {
			continue;
		}
		this.prepareDraw(obj);
		
		// RenderObject 
		if (backBuffer) {
			obj.backBufferDraw (gl, this);
		} else {
			obj.draw (gl, this);
		}
	} // end for
};


/**
 * Compute the data to draw
 * @param [glContext} gl - the gl context
 * @param {}
 */
Scene.prototype.prepareDraw = function(gl, obj) {
	var objMat = obj.getMatrix();
	
	// Get Location of uniform variables
	var shad = obj.getShader();
	shad.setActive(gl); 
	var locMvMat = shad.getUniformLocation("uModelViewMatrix");
	var locPjMat = shad.getUniformLocation("uProjectionMatrix");
	var locNmMat = shad.getUniformLocation("uNormalMatrix");
	
	// Compute real ModelView matrix
	var mv = new Matrix(mvMat).mul(objMat);
	
	// Set Uniform Matrices
	if (locMvMat != null) {
		gl.uniformMatrix4fv (locMvMat, false, mv.getGLVector());
	}
	
	if (locPjMat != null) {
		gl.uniformMatrix4fv (locPjMat, false, pjMat.getGLVector());
	}
	
	// If Shader has normal matrix give it !
	if (locNmMat != null) {
		// Compute Normal matrix 
		var nm = new Matrix(mv).toNormal();
		gl.uniformMatrix4fv(locNmMat, false, nm.getGLVector()); 
	}
	
	// scaling ...
	var locScale = shad.getUniformLocation ("uScale");
	if (locScale != null) {
		gl.uniform1f(locScale, this.scale);
	}
	
	// resolution
	var locResol = shad.getUniformLocation ("uResolution");
	if (locResol != null) {
		gl.uniform2f (locResol, this.width, this.height);
	}
	
	// translation
	var locTranslate = shad.getUniformLocation ("uTranslate");
	if (locTranslate != null) {
		gl.uniform2f (locTranslate, this.translateX, this.translateY);
	}
	
	// mouse
	var locMouse = shad.getUniformLocation ("uMouse");
	if (locMouse != null) {
		var x = Math.floor ((this.mouseX)*this.scale);
		var y = Math.floor ((this.mouseY)*this.scale);
		gl.uniform2f(locMouse, x, y);
	}
}

//==============================================================================
/**
 * Prepare the scene for selection.
 * @param {glContext} gl - the gl context.
 * @return {void}
 */
Scene.prototype.prepareSelect = function (gl) {
//	console.log ("Scene.prepareSelect");
	// Prepare each objects 
	var lengthObject = this.objectList.length;
	for (var i = 0; i < lengthObject; ++i) {
		this.objectList[i].prepareSelection(gl);
	}
	
	// If no camera
	if (this.camera === undefined) {
		// Default Camera
		this.camera	= new Camera (new Vector(10, 10, 10),
			new Vector(0, 0, 0),
			new Vector(0, 0, 1),
			800,
			600,
			30.0,
			0.1,
			1000.0
		);
	}
};

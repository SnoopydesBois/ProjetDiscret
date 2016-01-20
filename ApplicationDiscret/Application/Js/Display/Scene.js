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
 * @extends GenericContener
 * @classdesc Scene class management.
 */


Scene.prototype = new GenericContener;
Scene.prototype.constructor = Scene;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 */
function Scene () {
	
	/**
 	 * {Camera} The camera used in the scene.
 	 */
	this.camera = new Camera (
		new Vector (3, 3, 3),
		new Vector (0, 0, 0),
		new Vector (0, 0, 1),
		800,
		600,
		45.0,
		0.0001,
		7.0
	);
		
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
 * @throws {String} If the provided parameter is not a Camera.
 */
Scene.prototype.setCamera = function (camera) {
	if (camera instanceof Camera)
		this.camera = camera;
	else
		throw "Scene.setCamera: parameter is not a Camera";
};



//##############################################################################
//	Object managing methods
//##############################################################################


/**
 * @override
 * Add an object (only if is a GenericStructure subclass).
 * 
 * @param {!GenericStructure} anObject - Object to add to the scene.
 * 
 * @return {void}
 * @throws {String} If the provided parameter is not a GenericStructure or
 * a GenericStructure subclass.
 */
Scene.prototype.addObject = function (anObject) {
	if (anObject instanceof GenericStructure) {
		this.objectList.push (anObject);
		console.log ("On push l'object", anObject);
	}
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
 * Prepare the scene before rendering. Prepare all objects and check if there is a
 * camera. If not, the default camera is set to the scene.
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 * 
 * @return {void}
 */
Scene.prototype.prepare = function (glContext) {
	var length = this.getNbObject ();
	
	for (var i = 0; i < length; ++i) {
		if (! this.objectList[i].isPrepared ()) {
			this.objectList[i].prepare (glContext);
			this.objectList[i].getShader ().activate ();
		}
	}
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
	glContext.clear (glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
//	this.camera.computeMatrices ();
	var length = this.getNbObject ();
	for (var i = 0; i < length; ++i) {
		// Get Object Properties 
		var obj = this.objectList[i];
		if (!obj.displayMe ())
			continue;
		
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
 * Draw an object. Compute the data to draw. TODO reformuler
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {GenericStructure} obj - The object to draw.
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
	shad.activate (glContext); 
	var locMvMat = shad.getUniformLocation ("uModelViewMatrix");
	var locPjMat = shad.getUniformLocation ("uProjectionMatrix");
	var locDim = shad.getUniformLocation ("uDimension");
	
	// Compute real ModelView matrix
	var mv = new Matrix (mvMat).mul (objMat);
	
	// Set Uniform Matrices
	if (locMvMat != null)
		glContext.uniformMatrix4fv (locMvMat, false, mv.getGLVector ());

	if (locPjMat != null)
		glContext.uniformMatrix4fv (locPjMat, false, pjMat.getGLVector ());
	
	if (locDim != null) {
		glContext.uniform3fv (locDim, 
			obj.getDimension ().getGLVector ()
		);
	}
};



//##############################################################################
//	Other methods
//##############################################################################


/**
 * TODO
 * 
 * @param {(Vector | Number[3])} position - The new position of the camera.
 */
Scene.prototype.setCameraAt = function (position) {
	this.camera.eyePos = new Vector (position);
	this.camera.computeMatrices ();
};



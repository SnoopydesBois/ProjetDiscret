/// LICENCE ////////////////////////////////////////////////////////////////////


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


/* defaultCameraPosition : Vector
 * defaultLookAtPoint : Vector
 * mouseX : int
 * mouseY : int
 * 
 * Scene ()
 * 
 * getCamera () : Camera
 * setCamera (camera : Camera) : void
 * addObject (anObject : GenericStructure) : void
 * getObjectByName (aName : String) : GenericStructure
 * removeObjectByName (aName : GenericStructure) : void
 * unprepare () : void
 * reload () : void
 * prepare (
 *     glContext : WebGLRenderingContext,
 *     connexity : ConnexityEnum,
 *     voxelRadius : float
 * ) : void
 * draw (
 *     glContext : WebGLRenderingContext,
 *     backBuffer : boolean,
 *     voxelRadius : float,
 *     renderBuffer : WebGLRenderbuffer
 * ) : void
 * prepareShaderMatrix (
 *     glContext : WebGLRenderingContext, 
 *     obj : GenericStructure
 * ) : void
 * setCameraAt (position : Number, lookAt : Number) : void
 * resetCamera () : void
 * centerCamera () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends GenericContainer
 * @classdesc Scene class management.
 */
Scene.prototype = new GenericContainer;
Scene.prototype.constructor = Scene;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * Create a 3D container.
 */
function Scene () {

	GenericContainer.call (this);

	/**
	 * {Vector} Initial camera position.
	 */
	this.defaultCameraPosition = new Vector (3.5, 3.0, 2.5);

	/**
	 * {Vector} Initial camera look at point.
	 */
	this.defaultLookAtPoint = new Vector (0, 0, 0);

	/**
	 * {Camera} The camera used in the scene.
	 */
	this.camera = new Camera (
		new Vector (this.defaultCameraPosition),
		new Vector (this.defaultLookAtPoint),
		new Vector (0, 0, 1),
		800,
		600,
		45.0,
		0.0001,
		30.0
	);

	/**
	 * {int} The X mouse coordinate.
	 */
	this.mouseX = 512;

	/**
	 * {int} The Y mouse coordinate.
	 */
	this.mouseY = 384;
};



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
 * @return {void}
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
 *
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

//	console.warn ("Scene.getObjectByName: object : \"" + aName
//		+ "\" not found");
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
		if (this.objectList[i].getName() === aName) {
			this.objectList.splice (i, 1); // Remove from the list
			return;
		}
	}
//	console.warn ("Scene.removeObjectByName: object : \"" + aName
//		+ "\" not found");
};


//==============================================================================
/**
 * Set the 'prepared' attribute of each object at false.
 *
 * @return {void}
 */
Scene.prototype.unprepare = function () {
	var len = this.getNbObject ();
	for (var i = 0; i < len; ++i) {
		this.objectList[i].unprepare ();
	}
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
 * Prepare the scene before rendering. Call the 'prepare' method of all object.
 *
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {ConnexityEnum} connexity - Which connexity is displayed.
 * @param {float} voxelRadius - The voxel radius.
 *
 * @return {void}
 */
Scene.prototype.prepare = function (glContext, connexity, voxelRadius) {
	var length = this.getNbObject ();

	for (var i = 0; i < length; ++i) {
		if (! this.objectList[i].isPrepared ()) {
			if (this.objectList[i] instanceof SurfaceRenderer) { // FIXME sale !
				var o = this.objectList[i].getModelController ().getSurface ();
				o.printOnly (
					new Range (
						parseInt ($("#slider-rangeX").slider ('values', 0)),
						parseInt ($("#slider-rangeX").slider ('values', 1))
							- 1
					),
					new Range (
						parseInt ($("#slider-rangeY").slider ('values', 0)),
						parseInt ($("#slider-rangeY").slider ('values', 1))
							- 1
					),
					new Range (
						parseInt ($("#slider-rangeZ").slider ('values', 0)),
						parseInt ($("#slider-rangeZ").slider ('values', 1))
							- 1
					)
				);
			} // fin du truc sale
			this.objectList[i].prepare (glContext, connexity, voxelRadius);
			this.objectList[i].getShader ().activate ();
		} // end if not prepared
	} // end for all object
};


//==============================================================================
/**
 * Draw a scene.
 *
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {boolean} backBuffer - Indicate if we have to draw the scene
 * normally or if we need to draw for picking (false -> normally; 
 * true -> picking).
 * @param {float} voxelRadius - Voxels' radius.
 * @param {WebGLRenderbuffer} renderBuffer - The render buffer.
 *
 * @return {void}
 */
Scene.prototype.draw = function (
	glContext,
	backBuffer,
	voxelRadius,
	renderBuffer)
{
	var size = Math.min (this.height, this.width) * 2;
	glContext.clear (glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	glContext.bindRenderbuffer (glContext.RENDERBUFFER, renderBuffer);
	var length = this.getNbObject ();
	for (var i = 0; i < length; ++i) {
		// Get Object Properties
		var obj = this.objectList[i];
		if (!obj.displayMe ())
			continue;

		this.prepareShaderMatrix (glContext, obj);

		// Render Object
		if (backBuffer) {
			try {
				obj.drawBackBuffer (glContext);
			}
			catch (e) {
//				console.warn (obj.getName() + ": object is not pickable !");
			}
		}
		else
			obj.draw (glContext, voxelRadius);
	} // end for each displayable object
};


//==============================================================================
/**
 * Compute matrices (model, view, projection) of an object and send it to the
 * shader.
 *
 * @param {WebGLRenderingContext} glContext - The gl context.
 * @param {GenericStructure} obj - An object.
 *
 * @return {void}
 */
Scene.prototype.prepareShaderMatrix = function (glContext, obj) {
	/// Parameter verification
	if (! (glContext instanceof WebGLRenderingContext
		&& obj instanceof GenericStructure))
	{
		showType (glContext, obj);
		throw "Scene.prepareShaderMatrix: bad type(s) of parameter(s)"
	}

	var cam = this.camera;
	var mvMat = cam.getViewMatrix ();
	var ppMat = cam.getPerspectiveProjectionMatrix ();
	var opMat = cam.getOrthographicProjectionMatrix ();
	var objMat = new Matrix (obj.getMatrix (cam));

	// Get Location of uniform variables
	var shad = obj.getShader ();
	shad.activate (glContext);
	var locMvMat = shad.getUniformLocation ("uModelViewMatrix");
	var locPpMat = shad.getUniformLocation ("uPerspectiveProjectionMatrix");
	var locOpMat = shad.getUniformLocation ("uOrthographicProjectionMatrix");
	var locDim = shad.getUniformLocation ("uDimension");

	// Compute real ModelView matrix
	var mv = new Matrix (mvMat).mul (objMat);

	// Set Uniform Matrices
	if (locMvMat != null)
		glContext.uniformMatrix4fv (locMvMat, false, mv.getGLVector ());

	if (locPpMat != null)
		glContext.uniformMatrix4fv (locPpMat, false, ppMat.getGLVector ());

	if (locOpMat != null)
		glContext.uniformMatrix4fv (locOpMat, false, opMat.getGLVector ());

	if (locDim != null)
		glContext.uniform3fv (locDim, obj.getDimension ().getGLVector ());
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Set the position and the look at point of the camera. Recompute the matrix
 * camera.
 *
 * @param {(Vector | Number[3])} position - The new position of the camera.
 * @param {(Vector | Number[3])} [lookAt] - The new look at point of the camera.
 *
 * @return {void}
 */
Scene.prototype.setCameraAt = function (position, lookAt) {
	this.camera.eyePos = new Vector (position);
	lookAt && (this.camera.centerPos = new Vector (lookAt));
	this.camera.computeMatrices ();
};


//==============================================================================
/**
 * Replace the camera at its initial position.
 * @see {@link centerCamera, setCameraAt}
 *
 * @return {void}
 */
Scene.prototype.resetCamera = function () {
	this.setCameraAt (this.defaultCameraPosition, this.defaultLookAtPoint);
};


//==============================================================================
/**
 * Project the camera look at point on the Z axis.
 * @see {@link resetCamera, setCameraAt}
 *
 * @return {void}
 */
Scene.prototype.centerCamera = function () {
	var lookAt = new Vector (
		this.defaultLookAtPoint.x,
		this.defaultLookAtPoint.y,
		this.getCamera ().getLookAtPosition ().z
	);
	this.setCameraAt (this.getCamera ().getPosition (), lookAt);
};



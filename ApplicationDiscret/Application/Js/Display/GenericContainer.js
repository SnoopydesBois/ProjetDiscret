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


/* objectList : GenericStructure[]
 * scale : float
 * width : int
 * height : int
 * translateX : float
 * translateY : float
 *
 * GenericContainer ()
 * 
 * getNbObject () : int
 * setScale (scale : float) : void
 * getScale () : float
 * multScale (scale: float) : void
 * getWidth () : int
 * setWidth (width : int) : void
 * getHeight () : int
 * setHeight (height : int) : void
 * addTranslateX (x : float) : void
 * addTranslateY (y : float) : void
 * setTranslate (x : float, y : float) : void
 * addObject (anObject : Object) : void
 * getObject (index : int) : Object
 * removeObject (index : int) : void
 * prepare (glContext : Object) : void
 * draw (glContext : Object, backBuffer boolean) : void
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc A container to store multiple object in order to render them
 */
GenericContainer.prototype.constructor = GenericContainer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 *
 */
function GenericContainer () {

	/**
	 * {GenericStructure[]} List of objects.
	 */
	this.objectList = [];

	/**
	 * {float} Scale factor.
	 */
	this.scale = 1.0;

	/**
	 * {int} The width (in pixels) of the container.
	 */
	this.width = 0;

	/**
	 * {int} The height (in pixels) of the container.
	 */
	this.height = 0;

	/**
	 * {float} Translation along the X axis.
	 */
	this.translateX = 0.0;

	/**
	 * {float} Translation along the Y axis.
	 */
	this.translateY = 0.0;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {int} Number of objects in this scene (the length of the list of
 * objects).
 */
GenericContainer.prototype.getNbObject = function () {
	return this.objectList.length;
};


//==============================================================================
/**
 * Scaling.
 *
 * @param {float} scale - The scaling factor of the scene.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.setScale = function (scale) {
	if (typeof scale == "number") {
		this.scale = scale;
	}
	else
		throw "GenericContainer.setScale: parameter is not a number";
};


//==============================================================================
/**
 * @return {float} The scale factor of the scene.
 */
GenericContainer.prototype.getScale = function () {
	return this.scale;
};


//==============================================================================
/**
 * Multiplies the scale of the scene.
 *
 * @param {float} scale - The scaling factor.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.multScale = function (scale) {
	if (typeof scale == "number")
		this.scale *= scale;
	else
		throw "GenericContainer.multScale: parameter is not a number";
};


//==============================================================================
/**
 * Gets the width of the scene.
 *
 * @return {int} the width of the scene.
 */
GenericContainer.prototype.getWidth = function () {
	return this.width;
};


//==============================================================================
/**
 * Sets a new width for the scene.
 *
 * @param {int} width - The new width for the scene.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.setWidth = function (width) {
	if (typeof width == "number")
		this.width = width;
	else
		throw "GenericContainer.setWidth: parameter is not a number";
};


//==============================================================================
/**
 * Gets the height of the scene.
 *
 * @return {int} The height of the scene.
 */
GenericContainer.prototype.getHeight = function () {
	return this.height;
};


//==============================================================================
/**
 * Sets a new height for the scene.
 *
 * @param {int} height - The new height for the scene.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.setHeight = function (height) {
	if (typeof height == "number")
		this.height = height;
	else
		throw "GenericContainer.setHeight: parameter is not a number";
};


//==============================================================================
/**
 * Translates along the x axis.
 *
 * @param {float} x - How much we translate along the x axis.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.addTranslateX = function (x) {
	if (typeof x == "number")
		this.translateX += x;
	else
		throw "GenericContainer.addTranslateX: parameter is not a number";
};


//==============================================================================
/**
 * Translates along the y axis.
 *
 * @param {float} y - How much we translate along the y axis.
 *
 * @return {void}
 * @throws {String} The provided parameter is not of type Number.
 */
GenericContainer.prototype.addTranslateY = function (y) {
	if (typeof y == "number")
		this.translateY += y;
	else
		throw "GenericContainer.addTranslateY: parameter is not a number";
};


//==============================================================================
/**
 * Translates the scene along x and y axis.
 *
 * @param {float} x - How much we translate along the x axis.
 * @param {float} y - How much we translate along the y axis.
 *
 * @return {void}
 * @throws {String} One of the parameters is not of type Number.
 */
GenericContainer.prototype.setTranslate = function (x, y) {
	if (typeof x == "number" && typeof y == "number") {
		this.translateX = x;
		this.translateY = y;
	}
	else
		throw "GenericContainer.setTranslate: one parameter is not a number";
};



//##############################################################################
//	Object managing methods
//##############################################################################



/**
 * Adds an object.
 *
 * @param {Object} anObject - Object to add to the scene.
 *
 * @return {void}
 */
GenericContainer.prototype.addObject = function (anObject) {
	this.objectList.push (anObject);
};


//==============================================================================
/**
 * Gets an object given its index.
 *
 * @param {int} index - Index of the object to return.
 *
 * @return {!Object} The object associated to the index in
 * parameter if it exists, null otherwise.
 */
GenericContainer.prototype.getObject = function (index) {
	/// parameter verification
	if (! checkType (arguments, "number"))
		throw "GenericContainer.getObject: given index is not a number"

	/// find the object !
	if (index >= 0 && index < this.objectList.length)
		return this.objectList[index];
	else {
		console.error ("GenericContainer.getObjectByName: index out of bounds");
		return null;
	}
};


//==============================================================================
/**
 * Removes an object by index (if index is out of bound, nothing happens).
 *
 * @param {int} index - The index in the object list.
 *
 * @return {void}
 */
GenericContainer.prototype.removeObject = function (index) {
	/// parameter verification
	if (! checkType (arguments, "number"))
		throw "GenericContainer.removeObject: given index is not a number"

	/// remove the object !
	if (index >= 0 && index < this.objectList.length)
		this.objectList.splice (index, 1); // Remove from the list
};



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * @abstract
 * Prepares all objects in the container.
 *
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * gl context.
 *
 * @return {void}
 */
GenericContainer.prototype.prepare = function (glContext) {};


//==============================================================================
/**
 * @abstract
 * Draws all object in the container.
 *
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * gl context.
 * @param {boolean} [backBuffer] - Indicates if we have to draw the object
 * normally or if we need to draw for picking.
 *
 * @return {void}
 */
GenericContainer.prototype.draw = function (glContext, backBuffer) {};



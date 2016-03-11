/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
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



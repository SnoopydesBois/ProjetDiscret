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
 * @classdesc
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
	 * {float} Tha scale factor.
	 */
	this.scale = 1.0;

	/**
	 * {int} The width (in pixel) of the container.
	 */
	this.width = 0;

	/**
	 * {int} The height (in pixel) of the container.
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
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {int} The number of objects in this scene (the length of the list of
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
 * @throws {String} If the provided parameter is not a number.
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
 * Multiply the scale of the scene.
 *
 * @param {float} scale - How much do we scale.
 *
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContainer.prototype.multScale = function (scale) {
	if (typeof scale == "number")
		this.scale *= scale;
	else
		throw "GenericContainer.multScale: parameter is not a number";
};


//==============================================================================
/**
 * Get the width of the scene.
 *
 * @return {int} the width of the scene.
 */
GenericContainer.prototype.getWidth = function () {
	return this.width;
};


//==============================================================================
/**
 * Set a new width for the scene.
 *
 * @param {int} width - The new width for the scene.
 *
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContainer.prototype.setWidth = function (width) {
	if (typeof width == "number")
		this.width = width;
	else
		throw "GenericContainer.setWidth: parameter is not a number";
};


//==============================================================================
/**
 * Get the height of the scene.
 *
 * @return {int} The height of the scene.
 */
GenericContainer.prototype.getHeight = function () {
	return this.height;
};


//==============================================================================
/**
 * Set a new height for the scene.
 *
 * @param {int} height - The new height for the scene.
 *
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContainer.prototype.setHeight = function (height) {
	if (typeof height == "number")
		this.height = height;
	else
		throw "GenericContainer.setHeight: parameter is not a number";
};


//==============================================================================
/**
 * Translate along the x axis.
 *
 * @param {float} x - How much we translate along the x axis.
 *
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContainer.prototype.addTranslateX = function (x) {
	if (typeof x == "number")
		this.translateX += x;
	else
		throw "GenericContainer.addTranslateX: parameter is not a number";
};


//==============================================================================
/**
 * Translate along the y axis.
 *
 * @param {float} y - How much we translate along the y axis.
 *
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContainer.prototype.addTranslateY = function (y) {
	if (typeof y == "number")
		this.translateY += y;
	else
		throw "GenericContainer.addTranslateY: parameter is not a number";
};


//==============================================================================
/**
 * Translate the scene along x and y axis.
 *
 * @param {float} x - How much we translate along the x axis.
 * @param {float} y - How much we translate along the y axis.
 *
 * @return {void}
 * @throws {String} If one of the provided parameters is not a number.
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
 * Add an object.
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
 * Get an object given its index.
 *
 * @param {int} index - Index of the object to return.
 *
 * @return {!Object} The object corresponding to the index in
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
 * Remove an object by index (if index is out of bound, nothing happen).
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
 * Prepare all object in the container.
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
 * Draw all object in the container.
 *
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * gl context.
 * @param {boolean} [backBuffer] - Indicate if we have to draw the object
 * normally or if we need to draw for picking.
 *
 * @return {void}
 */
GenericContainer.prototype.draw = function (glContext, backBuffer) {};



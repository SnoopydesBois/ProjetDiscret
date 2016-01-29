/**
 * @classdesc 
 */



GenericContener.prototype.constructor = GenericContener;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 */
function GenericContener () {
	
	/**
	 * {NamedStructure[]} List of objects. TODO documenté le type
	 */
	this.objectList = [];
	
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

};



//##############################################################################
//	Accessors and Mutators
//##############################################################################


/**
 * @return {int} The number of objects in this scene (the length of the list of
 * objects).
 */
GenericContener.prototype.getNbObject = function () {
	return this.objectList.length;
};
GenericContener.prototype.getLength = function () {
	console.error ("Cette methode à été renommé, il faut utiliser GenericContener.getNbObject");
	return this.getNbObject ();
};


//==============================================================================
/**
 * Scaling.
 * 
 * @param {float} scale - The scaling of the scene.
 * 
 * @return {void}
 * @throws {String} If the provided parameter is not a number.
 */
GenericContener.prototype.setScale = function (scale) {
	if (typeof scale == "number") {
		this.scale = scale;
	}
	else
		throw "GenericContener.setScale: parameter is not a number";
};


//==============================================================================
/**
 * @return {float} The scale of the scene.
 */
GenericContener.prototype.getScale = function () {
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
GenericContener.prototype.multScale = function (scale) {
	if (typeof scale == "number")
		this.scale *= scale;
	else
		throw "GenericContener.multScale: parameter is not a number";
};


//==============================================================================
/**
 * Get the width of the scene.
 * 
 * @return {int} the width of the scene.
 */
GenericContener.prototype.getWidth = function () {
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
GenericContener.prototype.setWidth = function (width) {
	if (typeof width == "number")
		this.width = width;
	else
		throw "GenericContener.setWidth: parameter is not a number";
};


//==============================================================================
/**
 * Get the height of the scene.
 * 
 * @return {int} the height of the scene.
 */
GenericContener.prototype.getHeight = function () {
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
GenericContener.prototype.setHeight = function (height) {
	if (typeof height == "number")
		this.height = height;
	else
		throw "GenericContener.setHeight: parameter is not a number";
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
GenericContener.prototype.addTranslateX = function (x) {
	if (typeof x == "number")
		this.translateX += x;
	else
		throw "GenericContener.addTranslateX: parameter is not a number";
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
GenericContener.prototype.addTranslateY = function (y) {
	if (typeof y == "number")
		this.translateY += y;
	else
		throw "GenericContener.addTranslateY: parameter is not a number";
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
GenericContener.prototype.setTranslate = function (x, y) {
	if (typeof x == "number" && typeof y == "number") {
		this.translateX = x;
		this.translateY = y;
	}
	else
		throw "GenericContener.setTranslate: one parameter is not a number";
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
GenericContener.prototype.addObject = function (anObject) {
	this.objectList.push (anObject);
};


//==============================================================================
/**
 * Get an object given its index.
 * 
 * @param {int} id - Index of the object to return.
 * 
 * @return {!GenericStructure} The object corresponding to the index in
 * parameter if it exists, null otherwise.
 */
GenericContener.prototype.getObject = function (id) {
	/// parameter verification
	if (! checkType (arguments, "number")) 
		throw "GenericContener.getObject: given id is not a number"
	
	/// find the object !
	if (id >= 0 && id < this.objectList.length)
		return this.objectList[id];
	else {
		console.error ("GenericContener.getObjectByName: index out of bounds");
		return null;
	}
};


//==============================================================================
/**
 * Remove an object by id (if id is out of bound, nothing happen).
 * 
 * @param {int} id - The id in the object list.
 * 
 * @return {void}
 */
GenericContener.prototype.removeObject = function (id) {
	/// parameter verification
	if (! checkType (arguments, "number")) 
		throw "GenericContener.removeObject: given id is not a number"
	
	/// remove the object !
	if (id >= 0 && id < this.objectList.length)
		this.objectList.splice (id, 1); // Remove from the list
};



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * TODO refaire doc
 * Prepare the scene before rendering. Prepare all objects and check if there is a
 * camera. If not, the default camera is set to the scene.
 * 
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * gl context.
 * 
 * @return {void}
 */
GenericContener.prototype.prepare = function (glContext) {};


//==============================================================================
/**
 * Draw a scene. TODO refaire doc
 * 
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * gl context.
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
GenericContener.prototype.draw = function (glContext, backBuffer) {};



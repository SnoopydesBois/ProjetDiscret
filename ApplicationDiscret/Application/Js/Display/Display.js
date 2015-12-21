/*
 * Display.js
 * 
 * author : abisutti
 * created : Tue, 26 May 2015 16:55:30 +0200
 * modified : Tue, 26 May 2015 16:55:30 +0200
 */

// TODO refactoring

/**
 * @classdesc Abstract class.
 */



	  ///////////////////
	 /// Constructor ///
	///////////////////



Display.prototype.constructor = Display;


/**
 * @constructor
 */
function Display (application) {
	/**
	 * Current width.
	 */
	this.width = 0;
	
	/**
	 * Current height.
	 */
	this.height = 0;
	this.appli = application;
	//console.log ("Display constructor : "+ this.appli);
	/**
	 * 
	 */
	this.htmlSrc = "";
	
	/**
	 * id of the iDisplay tag in which the Display is
	 */
	this.idIDisplay = "";
	
	
	/**
	* Path to access the Display.
	* @example
	* If the Display is inside another Display it will be 
	* document.getElementById (this.idIDisplay).contentWindow.document;
	*/
	this.DisplayDocument = null;
}



	  //////////////////////////////
	 /// Accessors and Mutators ///
	//////////////////////////////



/**
 * @return {int} the width of the Display
 */
Display.prototype.getWidth = function () {
	return this.width;
};


//==============================================================================
/**
 * Set the width of the Display.
 * @param {int/string} the width. If the parameter is lower than 0, 0 is set.
 * @return {void}
 */
Display.prototype.setWidth = function (width) {
	var w = width;
	if (parseInt (width) < 0)
		w = 0;
	this.width = w;
};


//==============================================================================
/**
 * @return {int} the height of the Display
 */
Display.prototype.getHeight = function () {
	return this.height;
};


//==============================================================================
/**
 * Set the height of the Display.
 * @param {int/string} the height. If the parameter is lower than 0, 0 is set.
 * @return {void}
 */
Display.prototype.setHeight = function (height) {
	var h = height;
	if (parseInt (height) < 0)
		h = 0;
	this.height = h;
};


//==============================================================================
/**
 * @return {String} the id in the iDisplay tag of this Display
 */
Display.prototype.getIdIDisplay = function () {
	return this.idIDisplay;
};


//==============================================================================
/**
 * @return {HTMLElement} the contentWindow.document of the Display
 */
Display.prototype.getDisplayDocument = function () {	
	return this.DisplayDocument;
}



	  /////////////////////
	 /// Other methods ///
	/////////////////////



/**
 * Set the size of the Display
 * @param {int} width - The new width to set
 * @param {int} height - The new height to set
 * @return {void}
 */
Display.prototype.setSize = function (width, height) {
	this.setWidth (width);
	this.setHeight (height);
};


//==============================================================================
/**
 * @return {String} Path of the file which contain the html code for this Display.
 */
Display.prototype.getHtmlSrc = function () {
	return this.htmlSrc;
};


//==============================================================================
/**
 * Prepare the Display when it is put in an iDisplay tag. This method is called 
 * every time the Display is load/reload.
 * 
 * MUST BE OVERLOAD IN DAUGHTER CLASSES
 * @param {String} idIDisplay - the id in the iDisplay tag of this Display
 * @param {HTMLElement} doc - Path to access the Display.
 */
Display.prototype.prepare = function (idIDisplay, doc) {};


//==============================================================================
/**
 * Update the Display display and it's content
 * MUST BE OVERLOAD IN DAUGHTER CLASSES
 */
Display.prototype.update = function () {};



	  /////////////
	 /// Event ///
	/////////////



Display.prototype.onMouseClick = function (event) {};
Display.prototype.onMouseDblClick = function (event) {};
Display.prototype.onMousePressed = function (event) {};
Display.prototype.onMouseReleased = function (event) {};
Display.prototype.onMouseMove = function (event) {};
Display.prototype.onResize = function (event) {};
Display.prototype.onBlur = function (event) {};
Display.prototype.onFocus = function (event) {};
Display.prototype.onKeyUp = function (event) {};
Display.prototype.onKeyDown = function (event) {};
Display.prototype.onKeyPressed = function (event) {};





/*
 * Display.js
 * 
 * author : abisutti
 * created : Tue, 26 May 2015 16:55:30 +0200
 * modified : Tue, 26 May 2015 16:55:30 +0200
 */


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
	 * {int} The current width.
	 */
	this.width = 0;
	
	/**
	 * {int} The current height.
	 */
	this.height = 0;
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
 * @param {int|String} width - the width. If the parameter is lower than 0, 0 is
 * set.
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
 * @param {int|String} height - the height. If the parameter is lower than 0, 0
 * is set.
 * @return {void}
 */
Display.prototype.setHeight = function (height) {
	var h = height;
	if (parseInt (height) < 0)
		h = 0;
	this.height = h;
};



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
 * Update the display and it's content.
 * MUST BE OVERLOAD IN DAUGHTER CLASSES !
 */
Display.prototype.update = function () {};


//==============================================================================
/**
 * Initialize this object and it's content.
 * MUST BE OVERLOAD IN DAUGHTER CLASSES !
 */
Display.prototype.init = function () {};



	  /////////////
	 /// Event ///
	/////////////


Display.prototype.onMouseClick    = function (event) {};
Display.prototype.onMouseDblClick = function (event) {};
Display.prototype.onMousePressed  = function (event) {};
Display.prototype.onMouseReleased = function (event) {};
Display.prototype.onMouseMove     = function (event) {};
Display.prototype.onResize        = function (event) {};
Display.prototype.onBlur          = function (event) {};
Display.prototype.onFocus         = function (event) {};
Display.prototype.onKeyUp         = function (event) {};
Display.prototype.onKeyDown       = function (event) {};
Display.prototype.onKeyPressed    = function (event) {};



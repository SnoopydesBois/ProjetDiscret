/**
 * Layer.js
 * 
 * author : abisutti
 * created : Wed, 20 Jan 2016 09:23:38 +0100
 * modified : Wed, 20 Jan 2016 09:23:38 +0100
 */


/**
 * @classdesc 
 */



Layer.prototype.constructor = Layer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Layer () {
	
	/**
	 * {Drawable2DObject} List of object to draw on the associated canvas. TODO documenté le type
	 */
	this.objectList;
	
//	this.addObject (new Grid ());
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################





//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * TODO
 * 
 * @param {CanvasRenderingContext2D} glContext - The gl context.
 * 
 * @return {void}
 * @throws {String}
 */
Layer.prototype.prepare = function (glContext) {
	/// parameter verification
	if (! checkType (arguments, CanvasRenderingContext2D)) {
		throw "Layer.prepare: given gl context is not a "
			+ "CanvasRenderingContext2D";
	}
	
	/// 
};


//==============================================================================
/**
 * TODO
 * 
 * @param {CanvasRenderingContext2D} glContext - The gl context.
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene FIXME
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
Layer.prototype.draw = function (glContext, backBuffer) {
	/// parameter verification
	if (! checkType (arguments, CanvasRenderingContext2D, "boolean")) {
		throw "Layer.prepare: bad type(s) of parameter(s)";
	}
	
	/// Let's render
	var pointList = [
		[new Point (25, 25), new Point (20, 30), new Point (25, 30), new Point (25, 40)], 
		[new Point (10, 10), new Point (10, 20), new Point (20, 20)]
	];
	
	glContext.lineWidth = 5;
	glContext.lineJoin = "round";
	glContext.beginPath ();
	for (var i = 0; i < pointList.length; ++i) {
		glContext.moveTo (pointList[i][0].x, pointList[i][0].y);
		for (var j = 1; j < pointList[i].length; ++j) {
			glContext.lineTo (pointList[i][j].x, (pointList[i][j].y));
		}
	}
	glContext.stroke ();
};



/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * constructor ()
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends GenericViewer
 * @classdesc TODO
 */
CurveViewer.prototype = new GenericViewer;
CurveViewer.prototype.constructor = CurveViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 *
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 */
function CurveViewer (canvas, curveController) {
	GenericViewer.call (this, canvas, "2d");

	/**
	 * {Controller2D} TODO
	 */
	this.controller = curveController;

	/**
	 * {float[2]} Last point added to the curve. If -1, there are not last
	 * point. TODO vérifier anglais
	 */
	this.lastPoint = new Point (-1, -1);

	/**
	 * {HTMLInputElement} TODO
	 */
	this.xMaxInput = document.getElementById ("dimy");

	/**
	 * {HTMLInputElement} TODO
	 */
	this.yMaxInput = document.getElementById ("dimz");

	/**
	 * {float} Minimal distance between two added point.
	 */
	this.MIN_DIST_BETWEEN_POINT = 0.15;

	/**
	 * TODO
	 */
	this.modeSelect = document.getElementById ("meridianType");


	// initialisation
	this.initCanvasEvent ();
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Controller2D} The 2D controller.
 */
CurveViewer.prototype.getController = function () {
	return this.controller;
};



//##############################################################################
//	Draw
//##############################################################################


/**
 * Draw all current object.
 *
 * @return {void}
 */
CurveViewer.prototype.show = function () {
	this.draw ();
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
CurveViewer.prototype.draw = function () {
	var curve = this.controller.getActiveCurve ();
	var xRange = this.controller.getXRange ();
	if (curve instanceof ImplicitCurve) {
		CurveViewer.drawImplicit (curve, xRange);
	}
	else if (curve instanceof ExplicitCurve) {
		CurveViewer.drawExplicit (curve, xRange);
	}
	else if (curve instanceof DrawnCurve) {
		CurveViewer.drawFreeHand (curve, xRange, this.controller.getYRange (),
			this.glContext);
	}
	else {
		console.error ("Bad type of curve, find: " + type (curve));
	}
};


//==============================================================================
/**
 * @static
 * Draw a curve implicit curve.
 *
 * @param {ImplicitCurve} obj - The curve to draw.
 * @param {Range} xRange - The inverse image range.
 *
 * @return {void}
 */
CurveViewer.drawImplicit = function (obj, xRange) {
	/// Let's render
	var color = "black",
		width = $('#revolCanvas2').width (),
		height = $('#revolCanvas2').height (),
		min = Math.min (
			$('#revolCanvas2').width (),
			$('#revolCanvas2').height ()
		);

	functionPlot ({
		target: '#revolCanvas2',
		width : $('#revolCanvas2').width (),
		height : $('#revolCanvas2').height (),
		xAxis : {domain: [
			xRange.getMin (),
			xRange.getMax ()
		]},
		yAxis : CurveViewer.computeYScale (width, height, xRange),
		disableZoom : true,
		data : [{
			color : color,
			fn : obj.getEquation ().toStringNoParam (),
			fnType : 'implicit',
		}]
	}); // end functionPlot
};



//==============================================================================
/**
 * @static
 * Draw a curve explicit curve.
 *
 * @param {ImplicitCurve} obj - The curve to draw.
 * @param {Range} xRange - The inverse image range.
 *
 * @return {void}
 */
CurveViewer.drawExplicit = function (obj, xRange) {
	/// Let's render
	var color = "black",
		min = Math.min (
			$('#meridianCanvas2').width (),
			$('#meridianCanvas2').height ()
		);

	functionPlot ({
		target : '#meridianCanvas2',
		width : min,
		height : min,
		xAxis : {domain: [0, xRange.getMax ()]},
		yAxis : {domain: [0, xRange.getMax ()]},
		disableZoom : true,
		data: [{
			x: obj.getEquation ().toStringNoParam ().replace (/x/g, 't'),
			y: 't',
			color : color,
			range : [-10 * Math.PI, 10 * Math.PI],
			fnType : 'parametric',
			graphType : 'polyline'
		}]
	}); // end functionPlot
};


//==============================================================================
/**
 * @static
 * Draw a free hand curve.
 *
 * @param {DrawnCurve} obj - The curve to draw.
 * @param {Range} xRange - The inverse image range.
 * @param {Range} yRange - The image range.
 * @param {Range} glContext - The gl context.
 *
 * @return {void}
 */
CurveViewer.drawFreeHand = function (curve, xRange, yRange, glContext) {
	/// Let's render
	var x = curve.getXList (),
		y = curve.getYList ();
	var len = x.length;

	if (len > 0) {
		glContext.beginPath ();
		glContext.strokeStyle = "black";
		glContext.moveTo (
			x[0] * glContext.canvas.width / xRange.length(),
			y[0] * glContext.canvas.height / yRange.length()
		);
		for (var i = 1; i < len ; ++i) {
			glContext.lineTo (
				x[i] * glContext.canvas.width / xRange.length(),
				glContext.canvas.height - 1 - y[i] * glContext.canvas.height
					/ yRange.length()
			);
		}
		glContext.stroke ();
		for (var i = 1; i < len ; ++i) {
			glContext.strokeStyle = "red";
			glContext.strokeRect (
				x[i] * glContext.canvas.width / xRange.length(),
				glContext.canvas.height - 1 - y[i] * glContext.canvas.height
					/ yRange.length(),
				1, 1
			);
			// console.log ("draw point at",
			// 	x[i] * glContext.canvas.width / xRange.length(),
			// 	glContext.canvas.height - 1 - y[i] * glContext.canvas.height
			// 		/ yRange.length());
		}
	}
};


//==============================================================================
/**
 * Draw a segment between two point. /!\ Arguments are curve's point not pixel's
 * point.
 *
 * @param {Point} pointA - The first point.
 * @param {Point} pointB - The second point.
 *
 * @return {void}
 * @throws {String} If one of parameter is not a Point.
 */
CurveViewer.prototype.drawSegment = function (pointA, pointB) {
	/// parameter verification
	if (! checkType (arguments, Point, Point)) {
		console.trace ();
		throw "CurveViewer.drawSegment: one of parameter is not a Point";
	}

	var p1 = this.pointToPixel (pointA.x, pointA.y),
		p2 = this.pointToPixel (pointB.x, pointB.y);

	/// draw it
	var ctx = this.glContext;
	ctx.beginPath ();
	ctx.moveTo (p1.x, p1.y);
	ctx.lineTo (p2.x, p2.y);
	ctx.stroke ();

var color = ctx.strokeStyle;
ctx.strokeStyle = "red";
ctx.strokeRect (p2.x, p2.y, 1, 1);
ctx.strokeStyle = color;
};


//==============================================================================
/**
 *
 */
CurveViewer.prototype.clearDraw = function () {
	this.glContext.clearRect (0, 0, this.glContext.canvas.width,
		this.glContext.canvas.height);
	this.controller.newCurve ();
	this.lastPoint = new Point (-1, -1);
};



//##############################################################################
//	Event methods
//##############################################################################



/**
 * @override
 * Redraw the curve.
 *
 * @param {WindowEvent} event - The window event.
 *
 * @return {void}
 */
CurveViewer.prototype.onResize = function (event) {
	console.log ("CurveViewer.onResize");
	this.draw ();
};


//==============================================================================
/**
 * @override
 * Add a point to the curve and draw it on the screen.
 *
 * @param {MouseEvent} event - The mouse event.
 */
CurveViewer.prototype.onMouseDown = function (event) {
	if ((event.buttons & 1) && this.modeSelect.value == "freeHand") {
		// if left button is pressed and the mode is "drawing mode"
		var p = this.pixelToPoint (event.layerX, event.layerY);
		this.addPoint (p);
	}
};


//==============================================================================
/**
 * @override
 * Add a point to the curve and draw it on the screen.
 *
 * @param {MouseEvent} event - The mouse event.
 */
CurveViewer.prototype.onMouseMove = function (event) {
	if ((event.buttons & 1) && this.modeSelect.value == "freeHand") {
		// if left button is pressed and the mode is "drawing mode"
		var p = this.pixelToPoint (event.layerX, event.layerY);
		this.addPoint (p);
	}
};


//==============================================================================
/**
 * @override
 * TODO
 *
 * @param {MouseEvent} event - The mouse event.
 */
CurveViewer.prototype.onMouseUp = function (event) {
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * TODO
 *
 * @return {void}
 */
CurveViewer.prototype.initCanvasEvent = function () {
	// initialisation
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this));
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
	this.canvas.addEventListener ("mouseup", this.onMouseUp.bind (this));

};


//==============================================================================
/**
 * Transform a pixel coordinates on the canvas into point of the curve. /!\ The
 * origine of point is the bottom left corner but pixel origine is the top left
 * corner. Top and bottom was inverted in this function.
 *
 * @param {float} x - Pixel X coordinate.
 * @param {float} y - Pixel Y coordinate.
 *
 * @return {Point} The computed point (truncate at two decimal number).
 * @throws {String} If one of the parameter is not of the expected type.
 */
CurveViewer.prototype.pixelToPoint = function (x, y) {
	/// parameter verification
	if (! checkType (arguments, "number", "number")) {
		throw "CurveViewer.pixelToPoint: bad type(s) of parameter(s)";
	}

	/// compute
	var point = new Point (
		x * (this.xMaxInput.value / 2) / this.glContext.canvas.width,
		y * this.yMaxInput.value / this.glContext.canvas.height
	);
	point.y = this.yMaxInput.value - point.y;
//	point.x = Math.trunc (point.x * 10) / 10; // round value with to decimal
//	point.y = Math.trunc (point.y * 10) / 10; // round value with to decimal
	return point;
};


//==============================================================================
/**
 * Transform a point of the curve into pixel coordinates on the canvas. /!\ The
 * origine of point is the bottom left corner but pixel origine is the top left
 * corner. Top and bottom was inverted in this function.
 *
 * @param {float} x - Point X coordinate.
 * @param {float} y - Point Y coordinate.
 *
 * @return {Point} The computed pixel.
 * @throws {String} If one of the parameter is not of the expected type.
 */
CurveViewer.prototype.pointToPixel = function (x, y) {
	/// parameter verification
	if (! checkType (arguments, "number", "number")) {
		throw "CurveViewer.pointToPixel: bad type(s) of parameter(s)";
	}

	/// compute
	var pixel = new Point (
		x * this.glContext.canvas.width / (this.xMaxInput.value / 2),
		y * this.glContext.canvas.height / this.yMaxInput.value
	);
	pixel.y = this.glContext.canvas.height - 1 - Math.floor (pixel.y);

	return pixel;
};


//==============================================================================
/**
 * Add a point to the current curve and draw it on the canvas. If the point is
 * too close that the last, it is not added.
 *
 * @param {Point} point - A point.
 *
 * @return {boolean} True if the point was added, false otherwise.
 */
CurveViewer.prototype.addPoint = function (point) {
	/// parameter verification
	if (! point instanceof Point) {
		throw "CurveViewer.addPoint: parameter is not a Point";
	}

	/// add
	if (Math.hypot (point.x - this.lastPoint.x, point.y - this.lastPoint.y)
		 > this.MIN_DIST_BETWEEN_POINT)
	{
		this.controller.getActiveCurve ().addPoint (point.x, point.y);
		if (this.lastPoint.x != -1)
			this.drawSegment (this.lastPoint, point);
		this.lastPoint = point;
		return true;
	}
	else
		return false;
};


//==============================================================================
/**
 * @static
 * TODO
 */
CurveViewer.computeYScale = function (width, height, xRange) {
	var xDiff = xRange.length;
	var yDiff = height * xDiff / width;
	return [-yDiff / 2, yDiff / 2];
};

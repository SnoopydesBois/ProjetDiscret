/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* CurveViewer (
 *     canvas : HTMLCanvasElement,
 *     div : HTMLDivElement,
 *     curveController : curveController
 * )
 * getController () : Controller2D
 * show () : void
 * draw () : void
 * drawImplicit (obj : ImplicitCurve) : void
 * drawExplicit (obj : ExplicitCurve) : void
 * drawGrid () : void
 * drawFreeHand (curve : DrawnCurve) : void
 * drawSegment (pointA : Point, pointB : Point) : void
 * clearDraw () : void
 * resizeCanvas () : void
 * drawCanvasGrid () : void
 * onResize (event : MouseEvent) : void
 * onMouseDown (event : MouseEvent) : void
 * onMouseMove (event : MouseEvent) : void
 * initCanvasEvent () : void
 * pixelToPoint (x : float, y : float) : Point
 * pointToPixel (x : float, y : float) : Point
 * addPoint (point : Point) : boolean
 * computeYScale (width : int, height : int, xRange : Range) : int[2]
 * closeCurve () : void
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
 * Construct a CurveViewer with a div and a canvas for drawing and a controller.
 * Call the super constructor with the canvas and the string "2d".
 * @see {@link GenericViewer}
 * 
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 * @param {HTMLDivElement} div - The associated div where the SVG curve is draw.
 * @param {Controller2D} curveController - Controller of this view.
 */
function CurveViewer (canvas, div, curveController) {
	GenericViewer.call (this, canvas, "2d");

	/**
	 * {Controller2D} Controller of this view. Must be a Controller2DMeridian if
	 * you want to have the possibility to draw a curve. XXX vérifier anglais
	 */
	this.controller = curveController;

	/**
	 * {float[2]} Last point added to the curve. If -1, there are not last
	 * point. XXX vérifier anglais
	 */
	this.lastPoint = new Point (-1, -1);

	/**
	 * {HTMLInputElement} Input which containt the Y dimension of the 3D space.
	 * Use to compute the x range of the drawn curve.
	 */
	this.xMaxInput = document.getElementById ("dimy");

	/**
	 * {HTMLInputElement} Input which containt the Z dimension of the 3D space.
	 * Use to compute the y range of the drawn curve.
	 */
	this.yMaxInput = document.getElementById ("dimz");

	/**
	 * {float} Minimal distance between two added point.
	 */
	this.MIN_DIST_BETWEEN_POINT = 0.5;

	/**
	 * {HTMLFormElement} Use 'value' attribute to identify the drawing mode (
	 * i.e. primitive, free hand or formula).
	 * @see {@link onMouseDown, onMouseMove}
	 */
	this.formModeSelected = document.forms["meridianType"];
	// FIXME just adapt to the meridian
	
	/**
	 * {HTMLDivElement} The div where the SVG (i.e. explicit and implicit curve)
	 * is draw.
	 */
	this.displayDiv = div;
	
	
	// initialisation
	this.initCanvasEvent ();
	this.resizeCanvas ();
//	this.drawCanvasGrid ();
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
 * Draw the curve on the target (canvas or div).
 *
 * @return {void}
 */
CurveViewer.prototype.draw = function () {
	var curve = this.controller.getActiveCurve ();
	var xRange = this.controller.getXRange ();
//	this.drawCanvasGrid ();
	if (curve instanceof DrawnCurve) {
		/// set the canvas size
		this.resizeCanvas ();
		/// draw the curve
		this.drawFreeHand (curve);
	}
	else if (curve.getEquation ().toString () == "undefined") {
		this.drawGrid ();
	}
	else if (curve instanceof ImplicitCurve) {
		this.drawImplicit (curve);
	}
	else if (curve instanceof ExplicitCurve) {
		this.drawExplicit (curve);
	}
	else {
		this.drawGrid ();
		console.error ("Bad type of curve, find: " + type (curve));
	}
};


//==============================================================================
/**
 * Draw a curve implicit curve.
 *
 * @param {ImplicitCurve} obj - The curve to draw.
 *
 * @return {void}
 */
CurveViewer.prototype.drawImplicit = function (obj) {
	/// Let's render
	var xRange = this.controller.getXRange ();
	var width = $('#revolCanvas2').width (),
		height = $('#revolCanvas2').height (),
		min = Math.min (
			$('#revolCanvas2').width (),
			$('#revolCanvas2').height ()
		);

	functionPlot ({
		target: this.displayDiv,
		width: $('#revolCanvas2').width (),
		height: $('#revolCanvas2').height (),
		xAxis: {domain: [-1.05, 1.05]},
		yAxis: CurveViewer.computeYScale (
			width, height, new Range (-1.05, 1.05)),
		disableZoom: true,
		data: [{
			color: "black",
			fn: obj.getEquation ().toStringNoParam (),
			fnType: 'implicit',
		}]
	}); // end functionPlot
};


//==============================================================================
/**
 * Draw a curve explicit curve.
 *
 * @param {ImplicitCurve} obj - The curve to draw.
 *
 * @return {void}
 */
CurveViewer.prototype.drawExplicit = function (obj) {
	/// Let's render
	maxX = document.getElementById ("dimy").value / 2;
	maxY = document.getElementById ("dimz").value;
	var min = Math.min (
			$('#meridianCanvas2').width (),
			$('#meridianCanvas2').height ()
		); // FIXME just adapt to the meridian

	functionPlot ({
		target: this.displayDiv,
		width: min,
		height: min,
		xAxis: {domain: [0, maxX]},
		yAxis: {domain: [0, maxY]},
		disableZoom: true,
		data: [{
			x: obj.getEquation ().toStringNoParam ().replace (/x/g, 't'),
			y: 't',
			color: "black",
			range: [0, 150],
			fnType: 'parametric',
			graphType: 'polyline'
		}]
	}); // end functionPlot
};


//==============================================================================
/**
 * Draw a grid on the div. In order to show it, a point is draw outside the
 * grid.
 *
 * @return {void}
 */
CurveViewer.prototype.drawGrid = function () {
	maxX = document.getElementById ("dimy").value / 2;
	maxY = document.getElementById ("dimz").value;
	/// Let's render
	var min = Math.min (
			$('#meridianCanvas2').width (),
			$('#meridianCanvas2').height ()
		); // FIXME just adapt to the meridian

	functionPlot ({
		target: this.displayDiv,
		width: min,
		height: min,
		xAxis: {domain: [0, maxX]},
		yAxis: {domain: [0, maxY]},
		disableZoom: true,
		data: [{
			x: '-5',
			y: '-5',
			color: "black",
			range: [0, 150],
			fnType: 'parametric',
			graphType: 'polyline'
		}]
	}); // end functionPlot
};


//==============================================================================
/**
 * Draw a free hand curve on the canvas.
 *
 * @param {DrawnCurve} curve - The curve to draw.
 *
 * @return {void}
 */
CurveViewer.prototype.drawFreeHand = function (curve) {
	/// Let's render
	var x = curve.getXList (),
		y = curve.getYList ();
	var len = x.length, point;

	this.glContext.clearRect (0, 0, this.glContext.canvas.width,
		this.glContext.canvas.height);
	if (len > 0) {
		this.lastPoint = new Point (x[0], y[0]);
		for (var i = 1; i < len ; ++i) {
			point = new Point (x[i], y[i]);
			this.drawSegment (this.lastPoint, point);
			delete this.lastPoint;
			this.lastPoint = point;
		} // end for each next point
	} // end if there are point
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
		throw "CurveViewer.drawSegment: one of parameter is not a Point";
	}

	var p1 = this.pointToPixel (pointA.x, pointA.y),
		p2 = this.pointToPixel (pointB.x, pointB.y);

	/// draw it
	var ctx = this.glContext;
	ctx.strokeStyle = "black";
	ctx.beginPath ();
	ctx.moveTo (p1.x, p1.y);
	ctx.lineTo (p2.x, p2.y);
	ctx.stroke ();
};


//==============================================================================
/**
 * Clear the canvas and set a new drawn curve.
 *
 * @return {void}
 */
CurveViewer.prototype.clearDraw = function () {
	this.glContext.clearRect (0, 0, this.glContext.canvas.width,
		this.glContext.canvas.height);
	this.controller.newCurve ();
	this.lastPoint = new Point (-1, -1);
};


//==============================================================================
/**
 * Resize the associeted canvas.
 *
 * @return {void}
 */
CurveViewer.prototype.resizeCanvas = function () {
	var $ref = $("#meridianCanvas2"); // FIXME just adapt to the meridian
	var max = Math.max (this.xMaxInput.value / 2, this.yMaxInput.value);
	var canvas = this.glContext.canvas;

	canvas.width = ($ref.width () + 2) * this.xMaxInput.value / 2 / max;
	canvas.style.width = canvas.width + "px";
	canvas.style.right = (($ref.width () + 2) - canvas.width) / 2 + "px";

	canvas.height = ($ref.height () + 2) * this.yMaxInput.value / max;
	canvas.style.height = canvas.height + "px";
	canvas.style.top = (($ref.height () + 2) - canvas.height) / 2 + "px";
};


//==============================================================================
/**
 * Draw a grid on the canvas. FIXME doesn't work correctly, some lines are
 * missing.
 *
 * @return {void}
 */
CurveViewer.prototype.drawCanvasGrid = function () {
	var xMax = this.xMaxInput.value / 2;
	var yMax = this.yMaxInput.value * 1; // 'this.yMaxInput.value' is a string !
	var ctx = this.glContext,
		offset = Math.round (this.pointToPixel (1, yMax - 1).y),
		i;
	ctx.fillStyle = "#CCC";
	for (i = 1; i < xMax; ++i) {
		ctx.fillRect (offset * i, 0, 1, ctx.canvas.height);
	}
	for (i = 1; i < yMax + 1; ++i) {
		ctx.fillRect (0, offset * i, ctx.canvas.width, 1);
	}
};



//##############################################################################
//	Event methods
//##############################################################################



/**
 * @override
 * Redraw the current curve.
 *
 * @param {WindowEvent} event - The window event.
 *
 * @return {void}
 */
CurveViewer.prototype.onResize = function (event) {
	this.lastPoint = new Point (-1, -1);
	this.draw ();
};


//==============================================================================
/**
 * @override
 * Add a point to the drawn curve and draw it on the screen. Only works if the
 * drawing mode is free hand.
 *
 * @param {MouseEvent} event - The mouse event.
 *
 * @return {void}
 */
CurveViewer.prototype.onMouseDown = function (event) {
	if ((event.buttons & 1) && this.formModeSelected["meridianTypeValue"].value
		== "meridianFreeHand") // FIXME just adapt to the meridian
	{
		// if left button is pressed and the mode is "drawing mode"
		var p = this.pixelToPoint (event.layerX, event.layerY);
		this.addPoint (p);
	}
};


//==============================================================================
/**
 * @override
 * Add a point to the drawn curve and draw it on the screen. Only works if the
 * drawing mode is free hand.
 *
 * @param {MouseEvent} event - The mouse event.
 *
 * @return {void}
 */
CurveViewer.prototype.onMouseMove = function (event) {
	if ((event.buttons & 1) && this.formModeSelected["meridianTypeValue"].value
		== "meridianFreeHand") // FIXME just adapt to the meridian
	{
		// if left button is pressed and the mode is "drawing mode"
		var p = this.pixelToPoint (event.layerX, event.layerY);
		this.addPoint (p);
	}
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Initialize canvas event (mouse down and mouse up).
 *
 * @return {void}
 */
CurveViewer.prototype.initCanvasEvent = function () {
	// initialisation
	this.canvas.addEventListener ("mousedown", this.onMouseDown.bind (this));
	this.canvas.addEventListener ("mousemove", this.onMouseMove.bind (this));
};


//==============================================================================
/**
 * Transform a pixel coordinates on the canvas into point of the curve. /!\ The
 * origin of point is the bottom left corner but pixel origin is the top left
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
		x * (this.xMaxInput.value / 2) / (this.glContext.canvas.width + 1),
		(y + 1) * this.yMaxInput.value / (this.glContext.canvas.height + 1)
	);
	point.y = this.yMaxInput.value - point.y;
	return point;
};


//==============================================================================
/**
 * Transform a point of the curve into pixel coordinates on the canvas. /!\ The
 * origin of point is the bottom left corner but pixel origin is the top left
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
 * Compute the Y range of a curve with its X range.
 *
 * @param {int} width - Width in pixel of the element where the curve is
 * display.
 * @param {int} height - Height in pixel of the element where the curve is
 * display.
 * @param {Range} xRange - X range of the curve.
 *
 * @return {int[2]} Y range of the curve.
 */
CurveViewer.computeYScale = function (width, height, xRange) {
	var xDiff = xRange.length();
	var yDiff = height * xDiff / width;
	return [-yDiff / 2, yDiff / 2];
};


//==============================================================================
/**
 * Closes the current drawn curve.
 * 
 * @return {void}
 */
CurveViewer.prototype.closeCurve = function () {
	var addedPoint = this.controller.closeCurve ();
	if (addedPoint) {
		this.drawSegment (this.lastPoint, addedPoint);
		this.lastPoint = addedPoint;
	}
};



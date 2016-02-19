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
	 * {float[2]} Last mouse position where a point was added (in % of
	 * width/height). If -1, there are not last point. TODO vérifier anglais
	 */
	this.lastMousePos = [-1, -1];


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
				glContext.canvas.height - 1 - y[i] * glContext.canvas.height / yRange.length()
			);
		}
		glContext.stroke ();
		for (var i = 1; i < len ; ++i) {
			glContext.strokeStyle = "red";
			glContext.strokeRect (
				x[i] * glContext.canvas.width / xRange.length(),
				glContext.canvas.height - 1 - y[i] * glContext.canvas.height / yRange.length(),
				1, 1
			);
			// console.log ("draw point at",
			// 	x[i] * glContext.canvas.width / xRange.length(),
			// 	glContext.canvas.height - 1 - y[i] * glContext.canvas.height / yRange.length());
		}
	}
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
	this.drawLastSegment (event.layerX, event.layerY);
};


//==============================================================================
/**
 * @override
 * Add a point to the curve and draw it on the screen.
 *
 * @param {MouseEvent} event - The mouse event.
 */
CurveViewer.prototype.onMouseMove = function (event) {
	if ((event.buttons & 1) && (distance ([
			event.layerX / event.currentTarget.width,
			event.layerY / event.currentTarget.height
		],
		this.lastMousePos) > 0.02))
	{ // if left button is pressed
		this.drawLastSegment (
			event.layerX,
			event.layerY,
			event.currentTarget.width,
			event.currentTarget.height
		);
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
 * TODO
 */
CurveViewer.prototype.drawLastSegment = function (x, y) {
	/// add point
	this.controller.addPoint (
		x,
		this.glContext.canvas.height - 1 - y,
		new Vector (
			this.glContext.canvas.width, this.glContext.canvas.height, 0
		),
		new Vector (
			parseInt ($("#dimy").val ()), parseInt ($("#dimz").val ()), 0
		)
	);

	if (this.lastMousePos[0] != -1) { // there is an other point
		/// draw it
		var ctx = this.glContext;
		ctx.beginPath ();
		ctx.moveTo (
			this.lastMousePos[0] * this.glContext.canvas.width,
			this.lastMousePos[1] * this.glContext.canvas.height
		);
		ctx.lineTo (x, y);
		ctx.stroke ();
	}
	/// remember
	this.lastMousePos[0] = x / this.glContext.canvas.width;
	this.lastMousePos[1] = y / this.glContext.canvas.height;
};

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
	 * {int[2]} Last mouse position where a point was added.
	 */
	this.lastMousePos = [-1, -1];
	
	
	// initialisation$
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


////==============================================================================
///**
// * Show all objects in the container (prepare it and draw it).
// *
// * @return {void}
// */
//CurveViewer.prototype.show = function () {
//	this.container.show (this.glContext);
//};


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
	else {
		console.error ("Bad type of curve , find: " + type (curve));
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
		width, height, min;
		
	width = $('#revolCanvas2').width();
	height = $('#revolCanvas2').height();
	min = Math.min (
		$('#revolCanvas2').width(),
		$('#revolCanvas2').height ()
	);
	
	functionPlot ({
		target: '#revolCanvas2',
		width : $('#revolCanvas2').width(),
		height : $('#revolCanvas2').height(),
		xAxis : {domain: [
			xRange.getMin(),
			xRange.getMax()
		]},
		yAxis : CurveViewer.computeYScale (width, height, xRange),
		disableZoom : true,
		data: [{
			color : color,
			fn : obj.getEquation().toStringNoParam (),
			fnType : 'implicit',
		}]
	}); // end functionPlot
};



//==============================================================================
/**
 * @static
 * Draw a curve parametric curve.
 * 
 * @param {ImplicitCurve} obj - The curve to draw.
 * @param {Range} xRange - The inverse image range.
 * 
 * @return {void}
 */
CurveViewer.drawExplicit = function (obj, xRange) {
	/// Let's render
	var color = "black",
		width, height, min;

	min = Math.min (
		$('#meridianCanvas2').width (),
		$('#meridianCanvas2').height ()
	);
	functionPlot ({
		target: '#meridianCanvas2',
		width : min,
		height : min,
		xAxis : {domain: [0, xRange.getMax()]},
		yAxis : {domain: [0, xRange.getMax()]},
		disableZoom : true,
		data: [{
			x: obj.getEquation().toStringNoParam().replace(/x/g , 't'),
			y: 't',
			color : color,
			range: [-10 * Math.PI, 10 * Math.PI],
			fnType: 'parametric',
			graphType: 'polyline'
		}]
	}); // end functionPlot
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
	if (event.buttons & 1) {
		this.drawLastSegment (event.layerX, event.layerY);
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
 * 
 */
CurveViewer.prototype.drawLastSegment = function (x, y) {
	/// add point 
	this.controller.addPoint (x, y, new Vector (
			this.glContext.canvas.width, this.glContext.canvas.height, 0
		), new Vector (
			parseInt ($("#dimy").val ()), parseInt ($("#dimz").val ()), 0
		)
	);
	
	if (this.lastMousePos[0] != -1) { // there is an other point
		/// draw it
		var ctx = this.glContext;
		ctx.beginPath ();
		ctx.moveTo (this.lastMousePos[0], this.lastMousePos[1]);
		ctx.lineTo (x, y);
		ctx.stroke ();
	}
	/// remember
	this.lastMousePos[0] = x;
	this.lastMousePos[1] = y;
};



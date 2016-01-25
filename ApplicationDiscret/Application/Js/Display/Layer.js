/**
 * Layer.js
 * 
 * author : abisutti
 * created : Wed, 20 Jan 2016 09:23:38 +0100
 * modified : Wed, 20 Jan 2016 09:23:38 +0100
 */


/**
 * @extends GenericContener
 * @classdesc 
 */



Layer.prototype = new GenericContener;
Layer.prototype.constructor = Layer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Layer () {
	
	GenericContener.call (this);
	/**
	 * {Drawable2DObject} List of object to draw on the associated canvas. TODO documenté le type
	 */
	this.objectList;
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
 * Draw all object of this layer on the associated canvas.
 * 
 * @param {CanvasRenderingContext2D} glContext - The gl context.
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene FIXME
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 * @throws {String} If one of parameter have a bad type.
 */
Layer.prototype.draw = function (glContext, backBuffer) {
	/// parameter verification
	if (! checkType (arguments, CanvasRenderingContext2D, "boolean")) {
		throw "Layer.prepare: bad type(s) of parameter(s)";
	}
	
	/// Let's render
	glContext.lineJoin = "round";
	var len = this.getNbObject (),
		color = "black",
		lineWidth = 1,
		dim = glContext.canvas.width,
		xRangeLength, yRangeLength,
		obj, pointList, nbLines, nbPoints,
		type, curve;
	
	for (var id = 0; id < len; ++id) {
		obj = this.getObject (id);
		if(obj instanceof Grid){
			continue;
		}
		type = obj.isTypeOf(ImplicitCurve);
		if (type){
			functionPlot({
			  target: '#revolCanvas2',
			  width : $('#revolCanvas2').width(),
			  height : $('#revolCanvas2').height(),
			  xAxis : {domain: [obj.getXRange().getMin(), obj.getXRange().getMax()]},
			  yAxis : {domain: [obj.getYRange().getMin(), obj.getYRange().getMax()]},
//			  disableZoom : true,
			  data: [{
				color : color,
				fn: obj.getEquation().toStringNoParam(),
				fnType: 'implicit',
			  }]
			});
		}
		else{
			functionPlot({
			  target: '#meridianCanvas2',
			  width : $('#meridianCanvas2').width(),
			  height : $('#meridianCanvas2').height(),
			  xAxis : {domain: [obj.getXRange().getMin(), obj.getXRange().getMax()]},
			  yAxis : {domain: [obj.getYRange().getMin(), obj.getYRange().getMax()]},
//			  disableZoom : true,
			  data: [{
				x: obj.getEquation().toStringNoParam().replace(/x/g , 't'),
				y: 't',
				color : color,
				range: [-10 * Math.PI, 10 * Math.PI],
				fnType: 'parametric',
				graphType: 'polyline'
			  }]
			})
		}
		/*
		pointList = obj.getPoints ();
//		console.log("dessin de :", pointList)
		xRangeLength = obj.getXRange ().length ();
		yRangeLength = obj.getYRange ().length ();
//		console.log ("x range ", obj.getXRange (), xRangeLength)
//		console.log ("y range ", obj.getYRange (), yRangeLength)
		if (obj instanceof Grid) {
			color = "#80f";
			lineWidth = 1;
		}
	
		glContext.lineWidth = lineWidth;
		glContext.fillStyle = color;
		
		glContext.beginPath ();
		nbLines = pointList.length;
//		console.log ("nbLines", nbLines);
		for (var x = 0; x < nbLines; ++x) {
			nbPoints = pointList[x].length;
//			console.log ("nbPoints", nbPoints);
			glContext.moveTo (
				(pointList[x][0].x + (0 - obj.getXRange ().getMin ()))
					* glContext.canvas.width / xRangeLength, 
				(pointList[x][0].y + (0 - obj.getYRange ().getMin ()))
					* glContext.canvas.height / yRangeLength
			);
			for (var y = 1; y < nbPoints; ++y) {
				glContext.lineTo (
					(pointList[x][y].x + (0 - obj.getXRange ().getMin ()))
						* glContext.canvas.width / xRangeLength, 
					(pointList[x][y].y + (0 - obj.getYRange ().getMin ()))
						* glContext.canvas.height / yRangeLength
				);
			} // end for y
		} // end for x
		glContext.stroke ();
		glContext.closePath ();*/
	} // end for each object
};

//==============================================================================
/**
 *
 */
Layer.prototype.computeYScale = function(width, height, xRange) {
  var xDiff = xRange.length;
  var yDiff = height * xDiff / width;
  return [-yDiff / 2, yDiff / 2]
}

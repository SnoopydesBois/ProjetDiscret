// LICENCE /////////////////////////////////////////////////////////////////////


/**
 * @license
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * Simule a click on the select primitive meridian button.
 *
 * @return {void}
 */
Application.prototype.selectMeridian = function () {
    $("#meridianPrimitive").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Simule a click on the select primitive revolution button.
 *
 * @return {void}
 */
Application.prototype.selectRevol = function () {
    $("#revolPrimitive").prop ("checked", true).button ("refresh");
    this.changeRevolMode ();
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.inputMeridianFormula = function () {
    $("#meridianFormula").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Simule a click on the formula revolution button.
 *
 * @return {void}
 */
Application.prototype.inputRevolFormula = function () {
    $("#revolFormula").prop ("checked", true).button ("refresh");
    this.changeRevolMode ();
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.drawFreeHandMeridian = function () {
    $("#meridianFreeHand").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Toggle the display attribute of the repere.
 *
 * @return {void}
 */
Application.prototype.toggleBox = function () {
    var box = this.surfaceView.getContainer ().getObjectByName ("boundingBox");
    box.setDisplay (! box.displayMe ());
    this.show ();
};


//==============================================================================
/**
 * Toggle the display attribute of the bounding box.
 *
 * @return {void}
 */
Application.prototype.toggleRepere = function () {
    var repere = this.surfaceView.getContainer ().getObjectByName ("repere");
    repere.setDisplay (! repere.displayMe ());
    this.show ();
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.export3DPng = function () {
	this.exportController.export3DPng (this.surfaceView);
}


//==============================================================================
/**
 * TODO
 */
Application.prototype.exportMeridianPng = function () {
	this.exportController.exportMeridianPng ();
}


//==============================================================================
/**
 * TODO
 */
Application.prototype.exportRevolutionPng = function () {
	this.exportController.exportRevolutionPng ();
}


//==============================================================================
/**
 * TODO
 */
Application.prototype.exportX3D = function () {
	if (this.surfaceView.getSurfaceRenderer ().getSurface() == null) {
		return;
	}
	this.exportController.exportX3D (
		this.surfaceView.getSurfaceRenderer().getSurface());
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.exportSTL = function () {
	if (this.surfaceView.getSurfaceRenderer () == null) {
		return;
	}
	this.exportController.exportSTL (this.surfaceView.getSurfaceRenderer ());
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.saveDirectrix = function(){
	this.exportController.saveDirectrix(this.revolController);
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.saveGeneratrix = function(){
	this.exportController.saveGeneratrix(this.meridianController);
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.loadMeridian = function (event) {
	var tmppath = URL.createObjectURL (event.target.files[0]);

	var request = new XMLHttpRequest ();
	request.open ("GET", tmppath, false);
	request.send ();

	var xml = request.responseXML;

	var typeCurve = xml.getElementsByTagName ("Class")[0].textContent
        .toString ();
	var equation, xPoints, yPoints, xMin, xMax, yMin, yMax;

	equation = xml.getElementsByTagName ("Equation");
	if(equation.length == 0){
		// Same length for both of the lists
		xPoints = xml.getElementsByTagName ("xCoords")[0].textContent
            .toString ().split (" ");
		yPoints = xml.getElementsByTagName ("yCoords")[0].textContent
            .toString ().split (" ");
	}
	else{
		// Same length since each parameters got a name and a value
		//listNameParameters = xml.getElementsByTagName("Name");
		//listValueParameters = xml.getElementsByTagName("Value");
		xMin = parseFloat (xml.getElementsByTagName ("xMin")[0].textContent
            .toString ());
		xMax = parseFloat (xml.getElementsByTagName ("xMax")[0].textContent
            .toString ());
		yMin = parseFloat (xml.getElementsByTagName ("yMin")[0].textContent
            .toString ());
		yMax = parseFloat (xml.getElementsByTagName ("yMax")[0].textContent
            .toString ());
	}

	if(typeCurve === "DrawnCurve"){
		$("#meridianFreeHand").prop ("checked", true);
		$("#meridianPrimitive").prop ("checked", false);
		$("#meridianFormula").prop ("checked", false);
		this.changeMeridianMode ()
		this.meridianController.newCurve ();
		var drawnCurve = this.meridianController.getActiveCurve ();
		for (var i = 0; i < xPoints.length; ++i) {
			drawnCurve.addPoint (xPoints[i], yPoints[i]);
		}
	}
	else if (typeCurve === "ExplicitCurve" || typeCurve === "ImplicitCurve") {
		this.meridianController.setActive (
            equation[0].textContent.toString (),
            EquationTypeEnum.EXPLICIT
        );

		this.meridianController.setXRange (new Range (xMin, xMax));
		this.meridianController.setYRange (new Range (yMin, yMax));
	}

	this.meridianParameters.displayParameter (
		this.drawMeridian,
		this.getRangeMeridian
	);
	this.meridianView.draw ();
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.loadRevolution = function (event) {
	var tmppath = URL.createObjectURL (event.target.files[0]);

	var request = new XMLHttpRequest ();
	request.open ("GET", tmppath, false);
	request.send ();

	var xml = request.responseXML;

	var typeCurve = xml.getElementsByTagName ("Class")[0].textContent
        .toString ();

	if (typeCurve !== "ImplicitCurve") {
		return;
	}

	var equation, listNameParameters, listValueParameters, xPoints, yPoints,
        xMin, xMax, yMin, yMax;
	equation = xml.getElementsByTagName ("Equation");
	// Same length since each parameters got a name and a value
	listNameParameters = xml.getElementsByTagName ("Name");
	listValueParameters = xml.getElementsByTagName ("Value");

	xMin = parseFloat (xml.getElementsByTagName ("xMin")[0].textContent
        .toString ());
	xMax = parseFloat (xml.getElementsByTagName ("xMax")[0].textContent
        .toString ());
	yMin = parseFloat (xml.getElementsByTagName ("yMin")[0].textContent
        .toString ());
	yMax = parseFloat (xml.getElementsByTagName ("yMax")[0].textContent
        .toString ());

	this.revolController.setActive (
        equation[0].textContent.toString(),
        EquationTypeEnum.IMPLICIT
    );

	for (var i = 0; i < listNameParameters.length; ++i) {
		this.revolController.setParameter (
            listNameParameters[i].textContent.toString (),
            parseFloat (listValueParameters[i].textContent.toString ())
        );
	}

	this.revolController.setXRange (new Range (xMin, xMax));
	this.revolController.setYRange (new Range (yMin, yMax));

	this.revolutionParameters.displayParameter (
		this.drawRevolution,
		this.getRangeRevolution
	);
	this.revolView.draw ();
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.resetSliderMultiSlice = function () {
	this.resetSlider ("slider-rangeX", false);
	this.resetSlider ("slider-rangeY", false);
	this.resetSlider ("slider-rangeZ", true);
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.showXSlice = function () {
	var s = this.surfaceView.getSurfaceRenderer ();
	if (s && s.highlightX != -1) {
		var $slider = $("#slider-rangeX");
		var x = s.highlightX + 1;
		var minX = $slider.slider ('values', 0);
		if (minX > x) {
			minX = x - 1;
			x = $slider.slider ("values", 1);
		}
		var slider = $slider.slider (
			"option", "values", [minX, x]);
		this.resetSlider ("slider-rangeY", false);
		this.resetSlider ("slider-rangeZ", false);
		$("#amountMinX").val (minX);
		$("#amountMaxX").val (x);
		this.show (true);
	}
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.showYSlice = function () {
	var s = this.surfaceView.getSurfaceRenderer ();
	if (s && s.highlightY != -1) {
		var $slider = $("#slider-rangeY");
		var y = s.highlightY + 1;
		var minY = $slider.slider ('values', 0);
		if (minY > y) {
			minY = y - 1;
			y = $slider.slider ("values", 1);
		}
		var slider = $slider.slider (
			"option", "values", [minY, y]);
		this.resetSlider ("slider-rangeX", false);
		this.resetSlider ("slider-rangeZ", false);
		$("#amountMinY").val (minY);
		$("#amountMaxY").val (y);
		this.show (true);
	}
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.showZSlice = function () {
	var s = this.surfaceView.getSurfaceRenderer ();
	if (s && s.highlightZ != -1) {
		var $slider = $("#slider-rangeZ");
		var z = s.highlightZ + 1;
		var minZ = $slider.slider ('values', 0);
		if (minZ > z) {
			minZ = z - 1;
			z = $slider.slider ("values", 1);
		}
		var slider = $slider.slider (
			"option", "values", [minZ, z]);
		this.resetSlider ("slider-rangeX", false);
		this.resetSlider ("slider-rangeY", false);
		$("#amountMinZ").val (minZ);
		$("#amountMaxZ").val (z);
		this.show (true);
	}
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.hideSlice = function () {
	var s = this.surfaceView.getSurfaceRenderer ();
	if (s) {
		s.highlightX = -1;
		s.highlightY = -1;
		s.highlightZ = -1;
		this.show (true);
	}
};


//==============================================================================
/**
 * Put the camera back to its initial position.
 * @see {@link centerCamera}
 *
 * @return {void}
 */
Application.prototype.resetCamera = function () {
	this.surfaceView.resetCamera ();
};


//==============================================================================
/**
 * Put the camera look at point to its initial position.
 * @see {@link resetCamera}
 *
 * @return {void}
 */
Application.prototype.centerCamera = function () {
	this.surfaceView.centerCamera ();
};

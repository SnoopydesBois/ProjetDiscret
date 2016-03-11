/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
 *
 * Ce logiciel est un programme informatique servant à modéliser des
 * structures 3D voxellisées.
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* show (forcePrepare : boolean) : void
 * changeMeridian (name : String) : void
 * changeRevol (name : String) : void
 * changeMeridianMode () : void
 * changeRevolMode () : void
 * changeDimension () : void
 * closeCurve () : void
 * meridianEquation () : void
 * revolutionEquation () : void
 * computationFinished () : void
 * generateAndDraw (mode : int) : void
 * changeVoxelSize () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Show all 3D object.
 *
 * @param {boolean} forcePrepare - True to force the redraw of all object, false
 * otherwise.
 * @see {@link SurfaceViewer.show}
 *
 * @return {void}
 */
Application.prototype.show = function (forcePrepare) {
	this.showMessage ("Dessin"); // FIXME traduire
	this.surfaceView.show (forcePrepare);
	this.showMessage ("Prêt"); // FIXME traduire
};


//==============================================================================
/**
 * Change the meridian curve by a primitive curve. Update view and parameter
 * view.
 * @see {@link Controller2D.setActive}
 *
 * @param {String} name - The name of the new meridian curve.
 *
 * @return {void}
 */
Application.prototype.changeMeridian = function (name) {
	/// parameter verification
	if (! checkType (arguments, "string")) {
		throw "Application.changeMeridian: given parameter is not a string";
	}

	/// let's change
	this.meridianController.setActive (name);
	this.meridianView.draw ();

	this.meridianParameters.displayParameter (
		this.drawMeridian,
		this.getRangeMeridian
	);
};


//==============================================================================
/**
 * Change the revolution curve by a primitive curve. Update view and parameter
 * view.
 * @see {@link Controller2D.setActive}
 *
 * @param {String} name - The name of the new revolution curve.
 *
 * @return {void}
 */
Application.prototype.changeRevol = function (name) {
	/// parameter verification
	if (! checkType (arguments, "string")) {
		throw "Application.changeRevol: given parameter is not a string";
	}

	/// let's change
	this.revolController.setActive (name);
	this.revolView.draw ();

	this.revolutionParameters.displayParameter (
		this.drawRevolution,
		this.getRangeRevolution
	);
};


//==============================================================================
/**
 * Change the meridian mode (primitive, free hand or formula). Update view and
 * parameter view.
 * 
 * @return {void}
 * @throws {String} If the mode (i.e. the checked input radio id) is not valid.
 */
Application.prototype.changeMeridianMode = function () {
	var mode = $('#meridianType :radio:checked').attr ('id');

	/// empty the parameter list
	$("#meridianParam").empty ();

	if (mode === "meridianPrimitive") {
		$("#meridianCanvas").hide (); // hide the div
		$("#meridianCanvas2").show (); // display the canvas
		var selection = document.getElementById ("listMeridians");
		this.meridianController.setActive (selection.value);
		/// fill th parameter list
		this.meridianParameters.displayParameter (
			this.drawMeridian,
			this.getRangeMeridian
		);
		this.exportController.setIdMeridian ("meridianCanvas2");
	}
	else if (mode === "meridianFreeHand") {
		$("#meridianCanvas2").hide ();
		$("#meridianCanvas").show ();

		this.exportController.setIdMeridian ("meridianCanvas");
	}
	else if (mode === "meridianFormula") {
		$("#meridianCanvas").hide ();
		$("#meridianCanvas2").show ();

		this.meridianController.setActive (
			document.getElementById ("meridianFormulaInput").value);

		this.exportController.setIdMeridian ("meridianCanvas2");
	}
	else {
		throw "Application.changeMeridianMode: unkown given mode: " + mode;
	}
	this.meridianView.draw ();
};


//==============================================================================
/**
 * Change the revolution mode (primitive or formula). Update view and parameter
 * view.
 * 
 * @return {void}
 * @throws {String} If the mode (i.e. the checked input radio id) is not valid.
 */
Application.prototype.changeRevolMode = function () {
	var mode = $('#revolType :radio:checked').attr ('id');
	$("#revolParam").empty ();
	if (mode === "revolPrimitive") {
		var selection = document.getElementById ("listRevolutions");
		this.revolController.setActive (selection.value);
		this.revolutionParameters.displayParameter (
			this.drawRevolution,
			this.getRangeRevolution
		);
	}
	else if (mode === "revolFormula") {
		this.revolController.setActive (
			document.getElementById ("revolutionFormulaInput").value,
			EquationTypeEnum.IMPLICIT
		);
	}
	else {
		throw "Application.changeRevolMode: unkown given mode: " + mode;
	}

	this.revolView.draw ();
};


//==============================================================================
/**
 * Get the 3D space size and set dimension of the bounding box and the drawing
 * meridian canvas.
 *
 * @return {void}
 */
Application.prototype.changeDimension = function () {
	var dimX = document.getElementById ("dimx");
	var dimY = document.getElementById ("dimy");
	var dimZ = document.getElementById ("dimz");

	var dim = [0, 0, 0];
	dim[0] = Math.min (256, Math.max (
		parseInt (dimX.value), 1));
	dim[1] = Math.min (256, Math.max (
		parseInt (dimY.value), 1));
	dim[2] = Math.min (256, Math.max (
		parseInt (dimZ.value), 1));

	dimX.value = dim[0];
	dimY.value = dim[1];
	dimZ.value = dim[2];

	var box = this.surfaceView.getContainer ().getObjectByName ("boundingBox");
	box.setDimension (dim);
	this.meridianView.draw ();
};


//==============================================================================
/**
 * Closes the current drawn curve.
 *
 * @return {void}
 */
Application.prototype.closeCurve = function () {
	if ($('#meridianType :radio:checked').attr ('id') === "meridianFreeHand")
		this.meridianView.closeCurve ();
};


//==============================================================================
/**
 * Set the equation of the meridian. Equation string is directly read in the
 * DOM.
 * 
 * @return {void}
 */
Application.prototype.meridianEquation = function () {
	var input = document.getElementById ("meridianFormulaInput");
	this.meridianController.setActive (input.value);
	this.meridianView.draw ();
};


//==============================================================================
/**
 * Set the equation of the revolution curve. Equation string is directly read in
 * the DOM.
 * 
 * @return {void}
 */
Application.prototype.revolutionEquation = function () {
	var input = document.getElementById ("revolutionFormulaInput");
	this.revolController.setActive (input.value, EquationTypeEnum.IMPLICIT);
	this.revolView.draw ();
};


//==============================================================================
/**
 * This function calls itself again every second in a different thread until the
 * computation of the surface is finished. Then it redraws the scene.
 *
 * @return {void}
 */
Application.prototype.computationFinished = function () {
	if (! this.surfaceController.isAlgoFinished ()) {
		setTimeout (this.computationFinished.bind (this), 1000);
	}
	else {
		if (this.surfaceController.isAlgoFinished () != "error") {
			this.validMessage ("Finished", 0);
		}
		document.getElementById ("generate1").disabled = false;
		document.getElementById ("generate2").disabled = false;
		this.stopLoading ();
		this.surfaceView.show (true);
	}
};


//==============================================================================
/**
 * This function is called by the generate button. Calls the algorithm and draws
 * the resulting surface.
 * 
 * @param {int} mode - Generation algorithm. 0 for incremental and 1 for
 * brute-force.
 *
 * @return {void}
 */
Application.prototype.generateAndDraw = function (mode) {
	document.getElementById ("generate1").disabled = true;
	document.getElementById ("generate2").disabled = true;
	this.showMessage ("Computing...", 0, "#04E");
	var dimX = document.getElementById ("dimx").value;
	var dimY = document.getElementById ("dimy").value;
	var dimZ = document.getElementById ("dimz").value;


	this.surfaceController.setDimension ([dimX, dimY, dimZ]);
	this.surfaceView.container.getObjectByName ("boundingBox")
		.setDimension ([dimX, dimY, dimZ]);
	try {
		this.surfaceController.generate (mode);
	}
	catch (e) {
		this.alertMessage ("Aborted", 10000);
		this.abort ();
	}
	this.surfaceRenderer = new SurfaceRenderer (
		this.surfaceController,
		this.surfaceView.getGLContext ()
	);
	this.surfaceView.container.removeObjectByName (
		SurfaceRenderer.getLastSurfaceName ()
	);
	this.surfaceView.container.addObject (this.surfaceRenderer);

	this.computationFinished ();
	this.loading ();
	this.changeValueSlider ("#slider-rangeX", false, 0, parseInt (dimX));
	this.changeValueSlider ("#slider-rangeY", false, 0, parseInt (dimY));
	this.changeValueSlider ("#slider-rangeZ", true, 0, parseInt (dimZ));
};


//==============================================================================
/**
 * Change the voxel size of the current surface after a delay.
 *
 * @return {void}
 */
Application.prototype.changeVoxelSize = function () {
	clearTimeout (this.voxelSizeTriggerId);
	this.voxelSizeTriggerId = setTimeout (
		this.show.bind (this),
		1500,
		true
	);
};



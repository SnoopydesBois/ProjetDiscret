/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
 * Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
 *
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * tanguy.desplebain@gmail.com
 * lauret.karl@hotmail.fr
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


/* addAction (action : UndoRedoAction) : void
 * changeMeridian (name : String) : void
 * changeRevol (name : String) : void
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Store an undoable action in the undo/redo list.
 *
 * @param {UndoRedoAction} action - The undoable action.
 *
 * @return {void}
 */
// Application.prototype.addAction = function (action) {
// 	if (!(action instanceof UndoRedoAction) || ! action.isValidAction ())
// 		console.error ("Application.addAction: argument is not an Action !");
// 	else
// 		this.listAction.addAction (action);
// 	this.updateUndoRedoMenuItem ();
// };


//==============================================================================
/**
 * TODO
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
 * TODO
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
 * TODO
 *
 * @param {} name - .
 */
Application.prototype.getAllParameters = function (name) {
	if (name === 'meridian') {
		this.meridianController.getAllParameters ();
	}
	else if (name === 'revolution') {
		this.revolController.getAllParameters ();
	}
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.changeMeridianMode = function () {
	var mode = $('#meridianType :radio:checked').attr ('id');

	/// empty the parameter list
	$("#meridianParam").empty ();

	if (mode === "meridianPrimitive") {
		$("#meridianCanvas").hide (); // hide the div
		$("#meridianCanvas2").show (); // display the canvas
		var selection = document.getElementById ("listMeridians");
		this.meridianController.setActive(selection.value);
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

		this.meridianController.setActive(document.getElementById ("meridianFormulaInput").value);

		this.exportController.setIdMeridian ("meridianCanvas2");
	}
	else {
		throw "Application.changeMeridianMode: unkown given mode: " + mode;
	}
	this.meridianView.draw ();
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
Application.prototype.changeRevolMode = function () {
	var mode = $('#revolType :radio:checked').attr ('id');
	$("#revolParam").empty ();
	if (mode === "revolPrimitive") {
		var selection = document.getElementById ("listRevolutions");
		this.revolController.setActive (selection.value);
	}
	else if (mode === "revolFormula") {
		this.revolController.setActive (document.getElementById ("revolutionFormulaInput").value, EquationTypeEnum.implicit);
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
	var dim = [0, 0, 0];
	dim[0] = Math.min (256, Math.max (
		parseInt (document.getElementById ("dimx").value), 1));
	dim[1] = Math.min (256, Math.max (
		parseInt (document.getElementById ("dimy").value), 1));
	dim[2] = Math.min (256, Math.max (
		parseInt (document.getElementById ("dimz").value), 1));

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
 * TODO
 */
Application.prototype.meridianEquation = function () {
	var input = document.getElementById ("meridianFormulaInput");
	this.meridianController.setActive(input.value);
	this.meridianView.draw ();
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.revolutionEquation = function () {
	var input = document.getElementById ("revolutionFormulaInput");
	this.revolController.setActive (input.value, EquationTypeEnum.implicit);
	this.revolView.draw ();
};

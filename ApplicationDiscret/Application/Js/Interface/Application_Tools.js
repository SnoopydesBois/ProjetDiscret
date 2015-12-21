/// LICENCE ////////////////////////////////////////////////////////////////////

/* Copyright (juin 2015)
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

/* extrudeAdd () : void
 * extrudeRemove () : void
 * select () : void
 * translate () : void
 * rotate () : void
 * undo () : void
 * redo () : void
 * shortcut (event : HTMLEvent) : void
 * exportSVGFormValid () : void
 * exportSvgFormOpen () : void
 * fusionModelFormValid () : void
 * fusionModelFormOpen () : void
 * addModelFormValid () : void
 * addModelFormOpen () : void
 * removeModelFormValid () : void
 * removeModelFormOpen () : void
 * removeModelFormClose () : void
 * addModelFormClose () : void
 * exportSVGFormClose () : void
 * fusionModelFormClose () : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Enable or disable 2D and 3D functionalities when the active tool is 
 * "Extrusion Add".
 * @return {void}
 */
Application.prototype.extrudeAdd = function () {
	var f3dFunc = this.frame3D.getFunctionalities ();
	for (var i in f3dFunc) {
		switch (f3dFunc[i].getName()) {
		case "ControllerHover" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (true);
			break;
		case "ControllerSelect" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (true);
			break;
		case "ControllerRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCamera" :
			f3dFunc[i].activate ();
			break;
		case "ControllerTranslate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRotate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionAdd" :
			f3dFunc[i].activate ();
			break;
		case "ControllerExtrusionRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCopy" :
			f3dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.extrudeAdd : 3d functionality not " +
				"recognized !");
			console.log (f3dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	
	var f2dFunc = this.frame2D.getFunctionalities ();
	for (var i in f2dFunc) {
		switch (f2dFunc[i].getName()) {
		case "ControllerHover2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerSelect2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerAdd2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerRemove2D" :
			f2dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.extrudeAdd : 2d functionality not " +
				"recognized !");
			console.log (f2dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	this.activeToolButton("toolButton", "buttonExtrusionAddTool");
};


//==============================================================================
/**
 * Enable or disable 2D and 3D functionalities when the active tool is 
 * "Extrusion Remove".
 * @return {void}
 */
Application.prototype.extrudeRemove = function () {
	var f3dFunc = this.frame3D.getFunctionalities ();
	for (var i in f3dFunc) {
		switch (f3dFunc[i].getName()) {
		case "ControllerHover" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (false);
			break;
		case "ControllerSelect" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (true);
			break;
		case "ControllerRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCamera" :
			f3dFunc[i].activate ();
			break;
		case "ControllerTranslate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRotate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionAdd" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionRemove" :
			f3dFunc[i].activate ();
			break;
		case "ControllerCopy" :
			f3dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.extrudeRemove : 3d functionality not " +
				"recognized !");
			console.log (f3dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	
	var f2dFunc = this.frame2D.getFunctionalities ();
	for (var i in f2dFunc) {
		switch (f2dFunc[i].getName()) {
		case "ControllerHover2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerSelect2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerAdd2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerRemove2D" :
			f2dFunc[i].activate ();
			break;
		default :
			console.log ("Application.extrudeRemove : 2d functionality not " +
				"recognized !");
			console.log (f2dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	this.activeToolButton("toolButton", "buttonExtrusionRemoveTool");
};


//==============================================================================
/**
 * Enable or disable 2D and 3D functionalities when the active tool is 
 * "Selection".
 * @return {void}
 */
Application.prototype.select = function () {
	var f3dFunc = this.frame3D.getFunctionalities ();
	for (var i in f3dFunc) {
		switch (f3dFunc[i].getName()) {
		case "ControllerHover" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (false);
			break;
		case "ControllerSelect" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (true);
			break;
		case "ControllerRemove" :
			f3dFunc[i].activate ();
			break;
		case "ControllerCamera" :
			f3dFunc[i].activate ();
			break;
		case "ControllerTranslate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRotate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionAdd" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCopy" :
			f3dFunc[i].activate ();
			break;
		default :
			console.log ("Application.select : 3d functionality not " +
				"recognized !");
			console.log (f3dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	
	var f2dFunc = this.frame2D.getFunctionalities ();
	for (var i in f2dFunc) {
		switch (f2dFunc[i].getName()) {
		case "ControllerHover2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerSelect2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerAdd2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerRemove2D" :
			f2dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.select : 2d functionality not " +
				"recognized !");
			console.log (f2dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	this.activeToolButton("toolButton", "buttonSelectionTool");
};


//==============================================================================
/**
 * Enable or disable 2D and 3D functionalities when the active tool is 
 * "Translate".
 * @return {void}
 */
Application.prototype.translate = function () {
	var f3dFunc = this.frame3D.getFunctionalities ();
	for (var i in f3dFunc) {
		switch (f3dFunc[i].getName()) {
		case "ControllerHover" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (false);
			break;
		case "ControllerSelect" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCamera" :
			f3dFunc[i].activate ();
			break;
		case "ControllerTranslate" :
			f3dFunc[i].activate ();
			break;
		case "ControllerRotate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionAdd" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCopy" :
			f3dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.translate : 3d functionality not " +
				"recognized !");
			console.log (f3dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	
	var f2dFunc = this.frame2D.getFunctionalities ();
	for (var i in f2dFunc) {
		switch (f2dFunc[i].getName()) {
		case "ControllerHover2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerSelect2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerAdd2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerRemove2D" :
			f2dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.translate : 2d functionality not " +
				"recognized !");
			console.log (f2dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	this.activeToolButton("toolButton", "buttonTranslateTool");
};


//==============================================================================
/**
 * Enable or disable 2D and 3D functionalities when the active tool is 
 * "Rotation".
 * @return {void}
 */
Application.prototype.rotate = function () {
	var f3dFunc = this.frame3D.getFunctionalities ();
	for (var i in f3dFunc) {
		switch (f3dFunc[i].getName()) {
		case "ControllerHover" :
			f3dFunc[i].activate ();
			f3dFunc[i].setFace (false);
			break;
		case "ControllerSelect" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCamera" :
			f3dFunc[i].activate ();
			break;
		case "ControllerTranslate" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerRotate" :
			f3dFunc[i].activate ();
			break;
		case "ControllerExtrusionAdd" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerExtrusionRemove" :
			f3dFunc[i].disactivate ();
			break;
		case "ControllerCopy" :
			f3dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.rotate : 3d functionality not " +
				"recognized !");
			console.log (f3dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	
	var f2dFunc = this.frame2D.getFunctionalities ();
	for (var i in f2dFunc) {
		switch (f2dFunc[i].getName()) {
		case "ControllerHover2D" :
			f2dFunc[i].activate ();
			break;
		case "ControllerSelect2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerAdd2D" :
			f2dFunc[i].disactivate ();
			break;
		case "ControllerRemove2D" :
			f2dFunc[i].disactivate ();
			break;
		default :
			console.log ("Application.rotate : 2d functionality not " +
				"recognized !");
			console.log (f2dFunc[i]);
			console.trace ();
			break;
		}
	} // end for 3d functionalities
	this.activeToolButton("toolButton", "buttonRotationTool");
};


//==============================================================================
/**
 * Undo an action if it's possible.
 * @return {void}
 */
Application.prototype.undo = function () {
//	console.log ("Application.undo");

	if (this.listAction.hasUndoableAction()) {
		var action = this.listAction.nextUndoableAction ();
		this.getFunctionality (action.getControllerName()).undo (
			action.getAction ());
	}
	else
		this.showMessage ("Aucune action à défaire.", 4000);
	this.updateUndoRedoMenuItem ();
};



//==============================================================================
/**
 * Redo an action if it's possible.
 * @return {void}
 */
Application.prototype.redo = function () {
//	console.log ("Application.redo");

	if (this.listAction.hasRedoableAction ()) {	
		var action = this.listAction.nextRedoableAction ();
		this.getFunctionality (action.getControllerName()).redo (
			action.getAction ());
		
	}
	else
		this.showMessage ("Aucune action à refaire.", 4000);
	this.updateUndoRedoMenuItem ();
};



//==============================================================================
/**
 * Treat keyboard shortcut for main functionalities and tools.
 * @return {void}
 */
Application.prototype.shortcut = function (event) {
//	console.log ("Application.shortcut : keyCode = " + event.keyCode +
//		'_charCode = '+  event.charCode);
	switch (event.keyCode) {
	
	// tools
	case 82 : // R charCode 114
		this.select ();
		break;
	case 84 : // T charCode 116
		this.extrudeAdd ();
		break;
	case 89 : // Y charCode 121
		this.extrudeRemove ();
		break;
	case 85 : // U charCode 117
		this.translate ();
		break;
	case 73 : // I charCode 105
		this.rotate ();
		break;
	case 90 : // Z charCode 122
		if (event.metaKey === true || event.ctrlKey === true) {
			if (event.shiftKey == true) {
				this.redo();
			}
			else {
				this.undo();
			}
		}
		event.preventDefault();
		break;
	
	// view
	case 70 : // F charCode 102
		this.fullScreen3D ();
		break;
	case 71 : // G charCode 103
		this.bothView ();
		break;
	case 72 : // H charCode 104
		this.fullScreen2D ();
		break;
	
	// slice
	case 74 : // J charCode 106
		this.displaySlice (AxisEnum.Z);
		break;
	case 75 : // K charCode 107
		this.displaySlice (AxisEnum.Y);
		break;
	case 76 : // L charCode 108
		this.displaySlice (AxisEnum.X);
		break;
	default :
		switch (event.charCode) {
	
		// tools
		case 114 : // R charCode 114
			this.select ();
			break;
		case 116 : // T charCode 116
			this.extrudeAdd ();
			break;
		case 121 : // Y charCode 121
			this.extrudeRemove ();
			break;
		case 117 : // U charCode 117
			this.translate ();
			break;
		case 105 : // I charCode 105
			this.rotate ();
			break;
		case 122 : // Z charCode 122
			if (event.metaKey === true || event.ctrlKey === true) {
				this.undo();
			}
			event.preventDefault();
			break;
		case 90 : // P charCode 90
			if ((event.metaKey === true || event.ctrlKey === true)
				&& event.shiftKey == true)
			{
				this.redo();
				event.preventDefault();
			}
			event.preventDefault();
			break;
		
		// view
		case 102 : // F charCode 102
			this.fullScreen3D ();
			break;
		case 103 : // G charCode 103
			this.bothView ();
			break;
		case 104 : // H charCode 104
			this.fullScreen2D ();
			break;
		
		// slice
		case 106 : // J charCode 106
			this.displaySlice (AxisEnum.Z);
			break;
		case 107 : // K charCode 107
			this.displaySlice (AxisEnum.Y);
			break;
		case 108 : // L charCode 108
			this.displaySlice (AxisEnum.X);
			break;
		default :
			break;
		}
	}
};


//==============================================================================
/**
 * Check if the fields are correctly filled.
 * If they are then we call the exportSVG function in application
 * else it will do nothing.
 * @return {void}
 */
Application.prototype.exportSVGFormValid = function () {
//	console.log ("Application.exportSVGFormValid");
	var valid = this.checkRegexp($("#id"),/^[0-9]+$/,
		"L'identification doit être de la forme : 0-9");
	valid = valid && this.checkRegexp($("#size"),/^[0-9]+(\.[0-9])?[0-9]*$/,
		"Taille du cube doit être de la forme  : 0-9 ou 0-9.0-9");
	
	if (valid) {
		this.exportSVG($("#id").val(),$("#size").val());
		this.dialogSVG.dialog ("close");
	}
};


//==============================================================================
/**
 * Check if there is a model selected or not.
 * If there is, the dialog box will open
 * else it will not open and alert the user that there is no model selected.
 * @return {void}
 */
Application.prototype.exportSvgFormOpen = function () {
//	console.log ("Application.exportSvgFormOpen");
	if (this.selectedModel.length == 1) { 
		if (this.selectedModel[0].getId().length > 0) {
			$("#id").val(this.selectedModel[0].getId());
		}
		else {
			$("#id").val("");
		}
		$(".validateTips").html("Tous les champs sont obligatoires");
		this.dialogSVG.dialog ("open");
	}
	else if (this.selectedModel.length > 1) {
		alert ('Veuillez sélectionner un seul modèle.');
	}
	else {
		alert ('Veuillez sélectionner un modèle.');
	}
};


//==============================================================================
/**
 * Check if the fields are correctly filled.
 * If they are, then we call the fusionModel function in application
 * else it will do nothing.
 * @return {void}
 */
Application.prototype.fusionModelFormValid = function () {
//	console.log ("Application.fusionModelFormValid");
	var valid = this.isNotInModelList($("#name-fusion-model"),
			"Un modèle avec le même nom existe déjà.")
			&& this.checkRegexp($("#name-fusion-model"),
			/^[A-Za-z_][A-Za-z_0-9]*$/,
			"Le nom du modèle doit commencer par une lettre ou"
			+ " un '_' et ne doit contenir que des lettres,"
			+ " chiffes ou '_' .");
	
	if (valid) {
		var tab = this.frameList.fusionModel();
		if (tab != null) {
			this.addModel($("#name-fusion-model").val(),tab);
		}
		this.dialogFusionModel.dialog ("close");
	}
};


//==============================================================================
/**
 * The dialog to merge models.
 * @return {void}
 */
Application.prototype.fusionModelFormOpen = function () {
//	console.log ("Application.fusionModelFormOpen");
	if (this.selectedModel.length < 2) {
		this.alertMessage ("Pas de modèles à fusionner", 4000);
	}
	else {
		$("#name-fusion-model").val("");
		$(".validateTips").html ("Remplir le champ nom");
		this.dialogFusionModel.dialog ("open");
	}
};


//==============================================================================
/**
 * Check if the fields are correctly filled.
 * If they are, then we call the addModel function in application
 * else it will do nothing.
 * @return {void}
 */
Application.prototype.addModelFormValid = function () {
//	console.log ("Application.addModelFormValid");
	var valid = this.isNotInModelList($("#name-add-model"),
		"Un modèle avec le même nom existe déjà.")
		&& this.checkRegexp($("#name-add-model"),
		/^[A-Za-z_][A-Za-z_0-9]*$/,
		"Le nom du modèle doit commencer par une lettre ou"
		+" un '_' et ne doit contenir que des lettres,"
		+" chiffes ou '_' .");
	
	if (valid) {
		this.addModel($("#name-add-model").val());
		this.dialogAddModel.dialog ("close");
	}
};


//==============================================================================
/**
 * The dialog to add a model.
 * @return {void}
 */
Application.prototype.addModelFormOpen = function () {
//	console.log ("Application.addModelFormOpen");
	$("#name-add-model").val("");
	
	$(".validateTips").html("Remplir le champ nom");
	this.dialogAddModel.dialog ("open");
};


//==============================================================================
/**
 * Remove the selected model(s) and close the dialog.
 * @return {void}
 */
Application.prototype.removeModelFormValid = function () {
//	console.log ("Application.removeModelFormValid");
	this.removeModel($("#name-remove-model").val());
	this.dialogRemoveModel.dialog ("close");
};


//==============================================================================
/**
 * Check if there is a model selected or not.
 * If there is, the dialog box will open
 * else it will not open and alert the user that there is no model selected.
 * @return {void}
 */
Application.prototype.removeModelFormOpen = function () {
	if (this.listModel.length >= 1) { 
		for (var i= 0; i < this.listModel.length; i++) {
			// append an option tag for the array item
			$('#name-remove-model').append('<option>' + 
					this.listModel[i].getName() + '</option>');
		}
		$(".validateTips").html("Sélectionnez le modèle à enlever");
		this.dialogRemoveModel.dialog ("open");
	}
	else {
		alert ('Il n\'y a pas de modèle à enlever.');
	}
};


//==============================================================================
/**
 * To close the dialog.
 * @return {void}
 */
Application.prototype.removeModelFormClose = function () {
	this.dialogRemoveModel.dialog ("close");
};


//==============================================================================
/**
 * To close the dialog.
 * @return {void}
 */
Application.prototype.addModelFormClose = function () {
	this.dialogAddModel.dialog ("close");
};


//==============================================================================
/**
 * To close the dialog.
 * @return {void}
 */
Application.prototype.exportSVGFormClose = function () {
	this.dialogSVG.dialog ("close");
};


//==============================================================================
/**
 * To close the dialog.
 * @return {void}
 */
Application.prototype.fusionModelFormClose = function () {
	this.dialogFusionModel.dialog ("close");
};



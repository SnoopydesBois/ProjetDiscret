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

/* alertChange (signal : Signal) : void
 * property () : void
 * addModel (name : String,
 *           tabModel : tabModel,
 *           _modelCreator : String,
 *           _modelDescription : String,
 *           _modelCreationDate : String,
 *           _id : String) : void
 * removeModel (modelName : String) : void
 * getFrameList () : FrameList
 * getFrame3D () : Frame3D
 * getFrame2D () : Frame2D
 * getFrameForm () : FrameForm
 * save () : void
 * load (event : HTMLEvent) : void
 * validation () : void
 * addFunctionality (functionalityController : Controller) : void
 * getRotateTool () : ControllerRotate
 * addAction (action : Action) : void
 * getFunctionality (controllerName : String) : Controller
 * checkRegexp (o : HTMLElement, regexp : regexp, n : String) : bool
 * isNotInModelList (o : HTMLElement, n : String) : bool
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Function call by Frames to alert the application of modification
 * @param {Signal} signal - The type of modification 
 */
Application.prototype.alertChange = function (signal) {
	//console.log ("Application.alertChange")
	if (!instanceOf(signal, Signal)) {
		console.error (signal);
	}
	switch (signal.getType ()) {
	case SignalEnum.HOVER_CHANGE :
		//console.log ("Signal HOVER_CHANGE");
		this.getFrame2D().updateHover ();
		this.getFrame3D().updateHover ();
		break;
		
	case SignalEnum.SELECT_CHANGE :
		//console.log ("Signal SELECT_CHANGE");
		this.getFrame2D().updateSelect ();
		this.getFrame3D().updateSelect ();
		break;
		
	case SignalEnum.ADD_REMOVE_CUBES :
		//console.log ("Signal ADD/REMOVE_CUBES");
		// 2D view
		if (this.activeScreen != ViewEnum.VIEW3D) {
			var tmp = signal.getCubes();
			if (tmp.length == 0) {
				this.getFrame2D().update();
			}
			for (var j = 0; j < tmp.length; ++j) {
				this.getFrame2D().update(
					tmp[j].getCube().m[0],
					tmp[j].getCube().m[1],
					tmp[j].getCube().m[2]);
			}
		}
		// 3d view
		if (this.activeScreen != ViewEnum.VIEW2D)
			this.getFrame3D().update();

		break;
		
	case SignalEnum.LIST_MODEL_2D_CHANGE : 
		//console.log ("Signal LIST_MODEL_2D_CHANGE");
		if (this.activeScreen != ViewEnum.VIEW3D)
			this.getFrame2D().update();
		break;
		
	case SignalEnum.LIST_MODEL_3D_CHANGE :
		//console.log ("Signal LIST_MODEL_3D_CHANGE");
		if (this.activeScreen != ViewEnum.VIEW2D)
			this.getFrame3D().update();
		break;
		
	case SignalEnum.MODEL_EXTRUSION :
		//console.log ("Signal MODEL_EXTRUSION");
		if (this.activeScreen != ViewEnum.VIEW2D)
			this.getFrame3D().updateExtrud();
		break;
				
	default :
		console.log ("Application_Controller.alertChange Signal inconnue : " 
				+ signal.getType());
		break;	
	} // end switch
};


//==============================================================================
/**
 * Print the number of cube of the active model.
 */
Application.prototype.property = function () {
//	console.log ("Application.property");
	var model = this.selectedModel[0];
	if (model != null) {
		this.showMessage ("Nombre de Cube : " + model.getNbCube(), 10000);
	}
	else {
		this.alertMessage ("Pas de Modèle selectionné", 4000);
	}
};


//==============================================================================
/**
 * Add a model to the application.
 * @param {String} [name] - The name of the model to load.
 * @param {tabModel} [tabModel] - The structure of the model.
 * @param {String} [_modelCreator] - The creator of the structure.
 * @param {String} [_modelDescription] - The description of the model.
 * @param {String} [_modelCreationDate] - The date of the creation of the model.
 * @param {String} [_id] - The id of the model.
 */
Application.prototype.addModel = function (name, tabModel,_modelCreator,
		_modelDescription,_modelCreationDate,_id) {
//	console.log ("Application.addModel");

	this.select();
	//this.activeToolButton('toolButton', 'selectButton');
	if (name == undefined) {
		name = prompt ('Entrez le nom du modèle', '');
	}
	var patt1 = /[A-Za-z_][A-Za-z_$0-9]*/g;
	if (name == null) {
		this.alertMessage ("Nom vide");
		return;
	}
	if (name != name.match(patt1)) {
		appli.alertMessage ("Nom invalide", 4000);
		return;
	}
	
	var size; 
	var model;
	if (tabModel != undefined && tabModel != null) {
		size = new Vector (
			tabModel[0][0].length, 
			tabModel[0].length, 
			tabModel.length);
		var num = 0;
		for (var i in this.listModel) {
			var nameModel = this.listModel[i].getName();
			if (nameModel.contains(name)) {
				var offset = nameModel.substring(name.length, nameModel.length);
				var pattNum = /[0-9]+/g;
				if (offset == "") {
				 	num = num > 1 ? num : 1;
				}
				else if (offset.search(pattNum) != -1) {
					num = parseInt(offset,10) >= num ? parseInt(offset,10) + 1
						: num;
				}	
			}
		}
		var suffix = "";
		if (num != 0) {
			suffix += num;	
		}
		model = new ModelController (size, name + suffix,_modelCreator,
				_modelDescription,_modelCreationDate);
				model.setId(_id);
		var cubeModel = tabModel;
		for (var x = 0; x < cubeModel[0][0].length; x++) {
			for (var y = 0; y < cubeModel[0].length; y++) {
				for (var z = 0; z < cubeModel.length; z++) {
					if (cubeModel[z][y][x])
						model.getModel().addCube (x, y, z);
				} // end for z
			} // end for y
		} // end for x
	}
	else {
		size = new Vector (25, 25, 25); // 25 is the default size
		model = new ModelController (size, name,_modelCreator,
				_modelDescription,_modelCreationDate);
	}
	this.getFrameList().addModel (model);
};


//==============================================================================
/**
 * Remove a model by its name.
 * @param {String} modelName - the model name.
 */
Application.prototype.removeModel = function (modelName) {
//	console.log ("Application.removeModel");
	if (modelName == undefined || modelName == null) {
		var name = prompt ('Entrez le nom du modèle à enlenver', '');
	}
	else {
		var name = modelName;
	}
	
	/*for (var i in this.frames) {
		if (this.frames[i] instanceof FrameList) {
			this.frames[i].removeModel (name);
			break;
		}
	}*/
	this.getFrameList.removeModel (name);
};


//==============================================================================
/**
 * @return {FrameList} the model list frame.
 */
Application.prototype.getFrameList = function () {
//	console.log ("Application.getFrameList");
	return this.frameList;
};


//==============================================================================
/**
 * @return {Frame3D} the 3D frame.
 */
Application.prototype.getFrame3D = function () {
//	console.log ("Application.getFrame3D");
	return this.frame3D;
};


//==============================================================================
/**
 * @return {Frame2D} the 2D frame.
 */
Application.prototype.getFrame2D = function () {
//	console.log ("Application.Frame2D");
	return this.frame2D;
};


//==============================================================================
/**
 * @return {FrameForm} the save and load frame.
 */
Application.prototype.getFrameForm = function () {
//	console.log ("Application.getFrameForm");
	return this.frameForm;
};


//==============================================================================
/**
 * Save a model.
 * Load the FormFrame to enter the data.
 * @return {void}
 */
Application.prototype.save = function () {
//	console.log ("Application.save");
	if (this.selectedModel.length == 0) {
		this.alertMessage ("Veuillez sélectionner un modèle", 4000);
		return;
	}
	else if (this.selectedModel.length > 1) {
		this.alertMessage ("Vous ne pouvez enregistrer qu'un seul" 
				+ " modèle à la fois", 4000);
		return;
	}
	if (this.activeScreen == ViewEnum.VIEW2D) {
		this.bothView();
	}
	this.setActiveFrame (this.frameForm, WorkspaceEnum.LEFT);
	this.frameForm.setSelectedModel (this.selectedModel);
};



//==============================================================================
/**
 * Load a model. Create a model from the file selected event.
 * @param {change} event - the event.
 * @return {void}
 */
Application.prototype.load = function (event) {
//	console.log ("Application.load");
	var tmppath = URL.createObjectURL (event.target.files[0]);
	this.frameForm.loadModel (tmppath);
};


//==============================================================================
/**
 * Verify if a model is valid.
 * @return {void}
 */
Application.prototype.validation = function () {
//	console.log ("Application.load");
	var model = this.selectedModel[0];
	if (model != null && model.isValid()) {
		alert ("Ce modèle est valide");
	}
	else {
		if (model == null) {
			alert ("Il n'y a pas de modèle à tester");
		}
		else if (!model.isConnex()) {
			alert ("Ce modèle n'est pas connexe");
		}
		else if (!model.dimensionVerification()) {
			alert ("Ce modèle ne fait pas 25 de longueur");
		}
		else {
			alert ("Ce modèle n'est pas valide");
		}
	}
};


//==============================================================================
/**
 * Export slices to SVG format.
 * @param {String} id - model id.
 * @param {float} cubeSize - cube size in millimeter.
 * @return {void}
 */
Application.prototype.exportSVG = function (id, cubeSize) {
//	console.log ("Application.exportSVG");
	this.frameForm.setSelectedModel (this.selectedModel);
	this.frameForm.exportAsSvg (id, cubeSize);
};


//==============================================================================
/**
 * Store a functionality in the apllication. Allow to refind it when the user 
 * undo or redo an action.
 * @param {Controller} functionalityController - the functionality.
 * @return {void}
 */
Application.prototype.addFunctionality = function (functionalityController) {
//	console.log ("Application.addFuncionalitiy");
	if (!(functionalityController instanceof Controller)) {
		console.error ("Application.addFuncionalitiy : argument is not a "
			+ "Controller");
		return;
	}
	this.functionalities[functionalityController.getName()] = 
		functionalityController;
	if (functionalityController.getName() == "ControllerRotate")
		this.rotateFunctionality = functionalityController;
};



//==============================================================================
/**
 * @return {ControllerRotate} the rotate functionality.
 */
Application.prototype.getRotateTool = function () {
	//console.log ("Application.getRotateTool");
	return this.rotateFunctionality;
};


//==============================================================================
/**
 * Store an undoable action in the undo/redo list.
 * @param {Action} action - the undoable action.
 * @return {void}
 */
Application.prototype.addAction = function (action) {
//	console.log ("Application.addAction");
	if (!(action instanceof Action) || !action.isValidAction())
		console.error ("Application.addAction : argument is not an Action !");
	else 
		this.listAction.addAction (action);
	this.updateUndoRedoMenuItem ();
};


//==============================================================================
/**
 * @param {String} controllerName - the functionality controller name.
 * @return {Controller} the controller.
 */
Application.prototype.getFunctionality = function (controllerName) {
//	console.log ("Application.getFunctionality");
	for (var i in this.functionalities) {
		if (this.functionalities[i].getName() == controllerName)
			return this.functionalities[i];
	}
};


//==============================================================================
/**
 * Test if the value of the given field meet the regexp requirements
 * if true we remove the error message (if there is any) else we update the 
 * error messages.
 * @param {HTMLElement} o - field of a form
 * @param {regexp} regexp - regular expretion
 * @param {String} n - error message
 * @return {boolean}	
 */
Application.prototype.checkRegexp = function (o, regexp, n) {
//	console.log ("Application.checkRegexp");
	if (!(regexp.test(o.val()))) {
		o.addClass("ui-state-error");
		this.updateTips(n);
		return false;
	}
	else {
		o.removeClass("ui-state-error");
		return true;
	}
};


//==============================================================================
/**
 * Test if the value of the given field is not in the model list
 * if true we remove the error message (if there is any) else we update the 
 * error messages.
 * @param {HTMLElement} o - field of a form.
 * @param {String} n - error message.
 * @return {boolean}	
 */
Application.prototype.isNotInModelList = function (o, n) {
//	console.log ("Application.isNotInModelList");
	for (var i in appli.listModel) {
		if (appli.listModel[i].getName() == o.val()) {
			o.addClass("ui-state-error");
			this.updateTips(n);
			return false;
		}	
	}
	o.removeClass("ui-state-error");
	return true;
};



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


/* 
 * undo () : void
 * redo () : void
 * exportSVGFormValid () : void
 * exportSvgFormOpen () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Undo an action if it's possible.
 * 
 * @return {void}
 */
Application.prototype.undo = function () {

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
 * 
 * @return {void}
 */
Application.prototype.redo = function () {

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
 * Check if the fields are correctly filled.
 * If they are then we call the exportSVG function in application
 * else it will do nothing.
 * 
 * @return {void}
 */
Application.prototype.exportSVGFormValid = function () {
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
 * 
 * @return {void}
 */
Application.prototype.exportSvgFormOpen = function () {
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
	else if (this.selectedModel.length > 1)
		alert ('Veuillez sélectionner un seul modèle.');
	else
		alert ('Veuillez sélectionner un modèle.');
};


//==============================================================================
/**
 * Check if the fields are correctly filled.
 * If they are, then we call the fusionModel function in application
 * else it will do nothing.
 * 
 * @return {void}
 */
Application.prototype.fusionModelFormValid = function () {
	var valid = this.isNotInModelList($("#name-fusion-model"),
			"Un modèle avec le même nom existe déjà.")
			&& this.checkRegexp($("#name-fusion-model"),
			/^[A-Za-z_][A-Za-z_0-9]*$/,
			"Le nom du modèle doit commencer par une lettre ou"
			+ " un '_' et ne doit contenir que des lettres,"
			+ " chiffes ou '_' .");
	
	if (valid) {
		var tab = this.frameList.fusionModel();
		if (tab != null)
			this.addModel($("#name-fusion-model").val(),tab);
		this.dialogFusionModel.dialog ("close");
	}
};


//==============================================================================
/**
 * The dialog to merge models.
 * 
 * @return {void}
 */
Application.prototype.fusionModelFormOpen = function () {
	if (this.selectedModel.length < 2)
		this.alertMessage ("Pas de modèles à fusionner", 4000);
	else {
		$("#name-fusion-model").val("");
		$(".validateTips").html ("Remplir le champ nom");
		this.dialogFusionModel.dialog ("open");
	}
};



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


/* resizeInterface () : void
 * addMenuEntry (entry : Entry) : void
 * addMenuSplit (menu : MenuEntryEnum, index : int) : void
 * addToolsEntry (entry : Entry) : void
 * activeToolButton (className : String, id : String) : void
 * switchActive (element : HTMLElement) : void
 * setActiveClass (element : HTMLElement, active : bool) : void
 * updateUndoRedoMenuItem () : void
 * updateTips (t : String) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * TODO
 * 
 * @return {void}
 */
Application.prototype.resizeInterface = function () {
	/// resize interface
	$("#curvesView canvas").each (function (id, elem) {
		elem.style.width = $(elem).height () + "px";
	});
	$("#curvesView").width (
		$("#meridianParam").width () + $("#meridianCanvas").width ()
	);
	$("#surfaceView").width (
		$("#workspace").width () - $("#curvesView").width ()
	);
	
	/// set attributes
	$("canvas").each (function (id, elem) {
		elem.height = $(elem).height ();
		elem.width = $(elem).width ();
	});
	
	/// compute display
	this.surfaceView.onResize ();
	this.meridianView.onResize ();
	this.revolView.onResize ();
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.getMeridianCurveName = function () {
	return $("listMeridians");
};


//==============================================================================
/**
 * @param {Entry} entry - A new entry for the menu.
 * 
 * @return {void}
 */
Application.prototype.addMenuEntry = function (entry) {
	var listMenu = $("#" + MenuEntryEnum.properties[entry.getMenu()].htmlClass 
		+ " > ul > li").not (".split");
	var nbMenuEntry = listMenu.length;
	var element = "<li title=\"" + entry.getDescription() + "\" onclick=\"" 
		+ entry.getAction() + "; appli.showMessage('" 
		+ entry.getInitMessage() + "');\">" + entry.getNameEntry()
		+ "</li>";
	var effectiveIndex = entry.getIndexMenu();
	// negative index -> Start from the end
	if (entry.getIndexMenu() < 0)
		effectiveIndex = nbMenuEntry + 1 + entry.getIndexMenu();
	if (effectiveIndex < 0) 
		effectiveIndex = nbMenuEntry;
	
	/// insertion
	//	console.log ("Ajout de " + entry.getNameEntry () + " à l'index " 
	// 			+ effectiveIndex + " pour une liste de taille " + nbMenuEntry)
	if (nbMenuEntry == 0)
		$("#" + MenuEntryEnum.properties[entry.getMenu()].htmlClass 
		+ " > ul").append (element);
	else if (effectiveIndex < nbMenuEntry)
		listMenu.eq (effectiveIndex).before (element);
	else
		listMenu.eq (nbMenuEntry - 1).after (element);
};


//==============================================================================
/**
 * Add a split bar in a menu.
 * 
 * @param {MenuEntryEnum} menu - The menu.
 * @param {Number} index - The index in the menu. 0 for the first place, -1 for 
 * the last. Invalid number is equals to -1.
 * 
 * @return {void}
 */
Application.prototype.addMenuSplit = function (menu, index) {
	/// get list 
	var listMenu = $("#" + MenuEntryEnum.properties[menu].htmlClass 
		+ " > ul > li").not (".split");
	var nbMenuEntry = listMenu.length;
	
	/// new element
	var element = "<li class='split'><hr/></li>";
	var effectiveIndex = (typeof index == "number") ? index : -1;
	// Negative index -> Start from the end
	if (index < 0)
		effectiveIndex = nbMenuEntry + 1 + index;
	if (effectiveIndex < 0) 
		effectiveIndex = nbMenuEntry;
	
	/// insertion
	if (nbMenuEntry == 0)
		listMenu.append (element);
	else if (effectiveIndex < nbMenuEntry)
		listMenu.eq (effectiveIndex).before (element);
	else
		listMenu.eq (nbMenuEntry - 1).after (element);
};


//==============================================================================
/**
 * @param {Entry} entry - A new entry for the toolbar.
 * 
 * @return {void}
 */
Application.prototype.addToolsEntry = function (entry) {
	var toolsButton = $("#toolsButton li");
	var nbMenuEntry = toolsButton.length;
	var element = "<li><button class=\"tool " 
		+ ToolStateEnum.properties[entry.getInitState()] 
		+ "\" title=\"" + entry.getDescription() 
		+ "\" onclick=\"appli.showMessage('" + (entry.getInitMessage() || "") 
		+ "'); " + entry.getAction() 
		+ "\"><img src=\"" + entry.getImgPath() 
		+ "\" alt=\"" + entry.getImgAlternateText() 
		+ "\" width=\"24px\"" + " height=\"24px\"></button></li>";
	
	if (entry.getIndexTool() < 0 || entry.getIndexTool() >= nbMenuEntry)
		toolsButton.eq (nbMenuEntry - 1).after (element);
	else
		toolsButton.eq (entry.getIndexTool()).before (element);
};


//==============================================================================
/**
 * Enable a button in a specific class element and disable the activeted button.
 * 
 * @param {String} className - The class name of the element.
 * @param {String} id - The id of the element to enable.
 * 
 * @return {void}
 */
Application.prototype.activeToolButton = function (className, id) {
	$("." + className + ".active").removeClass ("active");
	$("#" + id).addClass ("active");
};


//==============================================================================
/**
 * Enable or disable an element. Add or remove the class attribute "active".
 * 
 * @param {HTMLElement} element - The element.
 * 
 * @return {void}
 */
Application.prototype.switchActive = function (element) {
	var elem = $(element);
	if (elem.hasClass ("active"))
		elem.removeClass ("active");
	else
		elem.addClass ("active");
};


//==============================================================================
/**
 * Enable or disable an element. Add or remove the class attribute "active".
 * 
 * @param {HTMLElement} element - The element.
 * @param {boolean} active - True for add "active" class, false for remove it.
 * 
 * @return {void}
 */
Application.prototype.setActiveClass = function (element, active) {
	var elem = $(element);
	if (active)
		elem.addClass ("active");
	else
		elem.removeClass ("active");
};


//==============================================================================
/**
 * Update class of the Undo/Redo menu item.
 * 
 * @return {void}
 */
Application.prototype.updateUndoRedoMenuItem = function () {
	if (typeof (undoItemMenu) == "undefined")
		undoItemMenu = $('#toolUndo');
	if (typeof (redoItemMenu) == "undefined")
		redoItemMenu = $('#toolRedo');
	
	// undo
	if (this.listAction.hasUndoableAction())
		undoItemMenu.removeClass ("inaccessible");
	else
		undoItemMenu.addClass ("inaccessible");
	
	// redo
	if (this.listAction.hasRedoableAction())
		redoItemMenu.removeClass ("inaccessible");
	else
		redoItemMenu.addClass ("inaccessible");
};


//==============================================================================
/**
 * Update the tips field in the dialogs windows.
 * 
 * @param {String} t - Error message.
 * 
 * @return {void}
 */
Application.prototype.updateTips = function (t) {
	$(".validateTips")
		.text (t)
		.addClass ("ui-state-highlight");
	setTimeout (function () {
		$(".validateTips").removeClass ("ui-state-highlight", 1500);
	}, 500);
};



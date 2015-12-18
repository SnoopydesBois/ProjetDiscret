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

/* resizeInterface () : void
 * addMenuEntry (entry : Entry) : void
 * addMenuSplit (menu : MenuEntryEnum, index : int) : void
 * addToolsEntry (entry : Entry) : void
 * addFrame (frame : Frame, ws : WorkspaceEnum) : void
 * setActiveFrame (frame : Frame, ws : WorkspaceEnum) : void
 * fullScreen2D () : void
 * fullScreen3D () : void
 * bothView () : void
 * displaySlice (axis : AxusEnum) : void
 * activeToolButton (className : String, id : String) : void
 * switchActive (element : HTMLElement) : void
 * setActiveClass (element : HTMLElement, active : bool) : void
 * updateUndoRedoMenuItem () : void
 * updateTips (t : String) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Define the size of the elements which cannot be defined in CSS
 * @return {void}
 */
Application.prototype.resizeInterface = function () {
//	console.log ("Application.resizeInterface");
	var windowsHeight = window.innerHeight;
	var headerHeight = parseInt ($('.header').height());
	var footerHeight = parseInt ($('.footer').height());
	/// Define the size of the .content blocs
	$('.content').height(windowsHeight - headerHeight - footerHeight);
	$('.content').css("top",headerHeight);
	/// Define the width of the workspace
	var wsWidth = parseInt ($('.header').width()) 
		- parseInt ($('#toolPanel').width());
	$('#workspace').width (wsWidth);

	/// Define the size of #toolSpace
	$('#toolSpace').height (windowsHeight - headerHeight 
		- parseInt ($('#buttonBar').height()) - footerHeight-1);
	this.workspaceWidth = parseInt($('#workspace').width());
	this.getFrame3D().update ();
	if (this.getFrameList().idIFrameContent != null) // a changé plus tard
		this.getFrameList().scrollWidthAdjust();
	if (this.getFrame2D().iBody != undefined) // a changé plus tard
		this.getFrame2D().onResize();
};


//==============================================================================
/**
 * @param {Entry} entry - A new entry for the menu.
 * @return {void}
 */
Application.prototype.addMenuEntry = function (entry) {
//	console.log ("Application.addMenuEntry");
	
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
 * @param {MenuEntryEnum} menu - the menu.
 * @param {Number} index - the index in the menu. 0 for the first place, -1 for 
 * the last. Invalid number is equals to -1.
 * @return {void}
 */
Application.prototype.addMenuSplit = function (menu, index) {
//	console.log ("Application.addMenuSplit");
	
	/// get list 
	var listMenu = $("#" + MenuEntryEnum.properties[menu].htmlClass 
		+ " > ul > li").not (".split");
	var nbMenuEntry = listMenu.length;
	
	/// new element
	var element = "<li class='split'><hr/></li>";
	var effectiveIndex = (index instanceof Number) ? index : -1;
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
 * @param {Entry} entry - a new entry for the toolbar.
 * @return {void}
 */
Application.prototype.addToolsEntry = function (entry) {
//	console.log ("Application.addToolsEntry");
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
	
//	console.log (element);
	if (entry.getIndexTool() < 0 || entry.getIndexTool() >= nbMenuEntry)
		toolsButton.eq (nbMenuEntry - 1).after (element);
	else
		toolsButton.eq (entry.getIndexTool()).before (element);
};



//==============================================================================
/**
 * Add a frame to this application.
 * @param {Frame} frame - a frame.
 * @param {WorkspaceEnum} [ws] - the iframe workspace. If it is empty or
 * null, the frame is just add to the application but not active.
 * @return {void}
 */
Application.prototype.addFrame = function (frame, ws) {
//	console.log ("Application.addFrame" + ws);
	if (!instanceOf (frame, Frame))
		throw "Application.addFrame() : frame is not an object !";
	
	this.frames.push (frame);
	if (ws != null) {
		this.nbFramePrepared ++;
		/*console.log ("Application.addFrame() : préparation dans " 
		+ WorkspaceEnum.properties[ws].htmlId);*/
		$('#' + WorkspaceEnum.properties[ws].htmlId).attr ("src", 
			frame.getHtmlSrc());
		waitReady (this, WorkspaceEnum.properties[ws].htmlId, frame);
	}
};


//==============================================================================
/**
 * Associate a frame to a workspace
 * @param {Frame} frame - The frame to associate
 * @param {WorkspaceEnum} ws - The workspace where to put the frame
 * @return {void}
 */
Application.prototype.setActiveFrame = function (frame, ws) {
//	console.log ("Application.setActiveFrame : " + ws);
	if (!instanceOf (frame, Frame)) {
		console.error ("Application.setActiveFrame : frame is not an object !");
		return;	
	}
	if (ws == null || ws == undefined) {
		console.error ("Application.setActiveFrame : ws is null or undefined");
		return;
	} 
	
	this.iframeReady[WorkspaceEnum.properties[ws].htmlId] = false;
	
	var iFrame = window.frames[WorkspaceEnum.properties[ws].htmlId];
	iFrame.src = frame.getHtmlSrc();
	waitReady(this, WorkspaceEnum.properties[ws].htmlId, frame);
	
};


//==============================================================================
/**
 * Display the 2D space in fullscreen.
 * @return {void}
 */
Application.prototype.fullScreen2D = function () {
//	console.log ("Application.fullScreen2D");
	if (this.activeScreen != ViewEnum.VIEW2D) {
		this.activeScreen = ViewEnum.VIEW2D;
		this.getFrame2D().setFullScreen (true);
		$('#leftWorkspaceWrapper').css ("display", "none");
		$('#rightWorkspaceWrapper').css ({
			"display": "block", 
			"width" : "100%", 
		});
		this.getFrame2D().onResize();
		$('#'+this.getFrame2D().getIdIFrame()).focus();
		this.activeToolButton("toolView", "buttonFullScreen2D");
	}
};


//==============================================================================
/**
 * Display the 3D space in fullscreen.
 * @return {void}
 */
Application.prototype.fullScreen3D = function () {
//	console.log ("Application.fullScreen3D");
	if (this.activeScreen != ViewEnum.VIEW3D) {
		this.activeScreen = ViewEnum.VIEW3D;
		$('#rightWorkspaceWrapper').css ("display", "none");
		$('#leftWorkspaceWrapper').css ({
			"display": "block", 
			"width" : "100%", 
		});
		this.getFrame3D().update ();
		$('#'+this.getFrame3D().getIdIFrame()).focus();
		this.activeToolButton("toolView", "buttonFullScreen3D");
	}
};


//==============================================================================
/**
 * Display the 3D and 2D view.
 * @return {void}
 */
Application.prototype.bothView = function () {
//	console.log ("Application.bothView");
	if (this.activeScreen != ViewEnum.BOTH) {
		this.activeScreen = ViewEnum.BOTH;
		this.getFrame2D().setFullScreen (false);
		$('#leftWorkspaceWrapper').css ({
			"display" : "block",
			"width" : "80%",
		});
		$('#rightWorkspaceWrapper').css ({
			"display": "block", 
			"width" : "20%", 
		});
		this.getFrame2D().onResize();
		this.getFrame3D().update ();
		$('#'+this.getFrame3D().getIdIFrame()).focus();
		this.activeToolButton("toolView", "buttonBothView");
	}
};


//==============================================================================
/**
 * Display slices coresponding to an axis.
 * @param {AxisEnum} axis - the axis.
 * @return {void}
 */
Application.prototype.displaySlice = function (axis) {
//	console.log ("Application.displaySlice");
	this.frame2D.displayTab (axis);
	switch (axis) {
	case AxisEnum.X :
		this.activeToolButton ("sliceView", "buttonYZ");
		break;
	case AxisEnum.Y :
		this.activeToolButton ("sliceView", "buttonXZ");
		break;
	case AxisEnum.Z :
		this.activeToolButton ("sliceView", "buttonXY");
		break;
	}
};


//==============================================================================
/**
 * Enable a button in a specific class element and disable the activeted button.
 * @param {String} className - the class name of the element.
 * @param {String} id - the id of the element to enable.
 * @return {void}
 */
Application.prototype.activeToolButton = function (className, id) {
//	console.log ("Application.activeButton : className = " + className + 
//		", id = " + id);
	$("." + className + ".active").removeClass ("active");
	$("#" + id).addClass ("active");
};


//==============================================================================
/**
 * Enable or disable an element. Add or remove the class attribute "active".
 * @param {HTMLElement} element - the element.
 * @return {void}
 */
Application.prototype.switchActive = function (element) {
//	console.log ("Application.switchActive");
	var elem = $(element);
	if (elem.hasClass ("active"))
		elem.removeClass ("active");
	else
		elem.addClass ("active");
};


//==============================================================================
/**
 * Enable or disable an element. Add or remove the class attribute "active".
 * @param {HTMLElement} element - the element.
 * @param {boolean} active - true for add "active" class, false for remove it.
 * @return {void}
 */
Application.prototype.setActiveClass = function (element, active) {
//	console.log ("Application.setActiveClass");
	var elem = $(element);
	if (active) {
		elem.addClass ("active");
	}
	else {
		elem.removeClass ("active");
	}
};


//==============================================================================
/**
 * Update class of the Undo/Redo menu item.
 * @return {void}
 */
Application.prototype.updateUndoRedoMenuItem = function () {
//	console.log ("Application.updateUndoRedoMenuItem");
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
 * @param {String} t - error message.
 * @return {void}
 */
Application.prototype.updateTips = function (t) {
//	console.log ("Application.updateTips");
	$(".validateTips")
		.text(t)
		.addClass("ui-state-highlight");
	setTimeout(function () {
		$(".validateTips").removeClass("ui-state-highlight", 1500);
	}, 500);
};



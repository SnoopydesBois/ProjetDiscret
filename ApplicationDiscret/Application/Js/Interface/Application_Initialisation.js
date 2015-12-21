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

/* initAppli () : void
 * initAppli () : void
 * initFunctionnalities () : void
 * initWindowEvent () : void
 * initDefaultFrame () : void
 * ready (idIFrame : String) : void
 * isReady (idIFrame : String) : bool
 * 
 * waitReady (appli : Application, idIFrame : String, frame : Frame) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Init all.
 * @return {void}
 */
Application.prototype.initAppli = function () {
//	console.log ("Application.initAppli");
	
	/// Application initialization
	for (var id in this.iframeID) {
		this.iframeReady[this.iframeID[id]] = false;
	}
	this.initDefaultFrame ();
	
	/// Interface initialization
	this.initWindowEvent ();
	$('.ui-resizable-e').bind ("mousedown", 
		function (event) {
			$('.iframeResizeFix').css ("display", "block");
		});
	// If the mouse move too fast, the resize is done anyway.
	this.resizeInterface ();
	if (!this.hasMessage ())
		this.showDefaultMessage ();
	
	/// Add functionalities
	this.initFunctionnalities ();
};


//==============================================================================
/**
 * Add the main functionalities.
 * @return {void}
 */
Application.prototype.initFunctionnalities = function () {
//	console.log ("Application.initFunctionnalities");
	this.select ();
};


//==============================================================================
/**
 * Init all window events.
 * @return {void}
 */
Application.prototype.initWindowEvent = function () {
//	console.log ("Application.initWindowEvent");
	wkLeft = document.getElementById ("leftWorkspaceWrapper");
	
	$("#leftWorkspaceWrapper").resizable ({
		handles: 'e', // e = est
		maxWidth: 10000, // i.e. pas de limite
		minWidth: 150,
		ghost : true,
		create: function (event, ui) {
			$(this).parent().on('resize', function (e) {
				e.stopPropagation();
			});
		},
		stop : function (event, ui) {
				$('.iframeResizeFix').css ("display", "none");
				var currentWidth = ui.size.width;
				// set the content panel width
				$("#rightWorkspaceWrapper").css ("width", ((appli.workspaceWidth 
					- currentWidth) / appli.workspaceWidth) * 100 + "%");
				$('#leftWorkspaceWrapper').css ("width", (100 * currentWidth 
					/ appli.workspaceWidth) + "%");
				$('#leftWorkspaceWrapper').css ("height", "100%"); // bug fix
				appli.frame3D.update (); // sale mais fonctionne
				appli.frame2D.onResize (); // idem...
			} // end fonction for stop attribute
	}); // end object for resiable()
};


//==============================================================================
/**
 * By default, 3D,2D and List frame are loaded.
 * @return {void}
 */
Application.prototype.initDefaultFrame = function () {
//	console.log ("Application.initDefaultFrame");
	/// frame 3d
	this.frame3D = new Frame3D (this);
	this.addFrame (this.frame3D, WorkspaceEnum.LEFT);
	
	/// frame 2d
	this.frame2D = new Frame2D (this);
	this.addFrame (this.frame2D, WorkspaceEnum.RIGHT);
	
	/// frame list model
	this.frameList = new FrameList (this);
	this.addFrame (this.frameList, WorkspaceEnum.TOOL);
	
	/// frame save form
	this.frameForm = new FrameForm (this.frame3D, this);
	this.addFrame(this.frameForm);
	
	this.frameList.setList (this.listModel);
	this.frameList.setSelectedModel (this.selectedModel);
	this.frame3D.setListModel (this.frameList.getListModelVisible3D());
	this.frame2D.setListModel (this.frameList.getListModelVisible2D());
};


//==============================================================================
/**
 * Set a frame to ready.
 * @param {String} idIFrame - the iframe tag id.
 * @return {void}
 */
Application.prototype.ready = function (idIFrame) {
//	console.log ("Application.ready");
	if (typeof (this.iframeReady[idIFrame]) != undefined) {
		this.iframeReady[idIFrame] = true;
	}
	else
		throw "Application.ready() : id\"" + idIFrame + "\" does not exist !";
};



//==============================================================================
/**
 * @param {String} idIFrame - the iframe tag id.
 * @return {boolean} true if the frame is ready, false otherwise.
 */
Application.prototype.isReady = function (idIFrame) {
//	console.log ("Application.isReady");
	if (this.iframeReady && typeof (this.iframeReady) != undefined
		&& typeof (this.iframeReady[idIFrame]) != undefined)
		return this.iframeReady[idIFrame];
	else
		throw "Application.isReady() : id \"" + idIFrame +"\" does not exist !";
};


//==============================================================================
/**
 * Wait until a frame is ready.
 * @param {Application} appli - The appli which must wait.
 * @param {String} idIFrame - id of the iFrame tag in which the frame is.
 * @param {Frame} frame - The frame to wait.
 * @return {void}
 */
function waitReady (appli, idIFrame, frame) {
//	console.log ("Appel de wait avec " + idIFrame)
	glob__iframeLoaded = appli.isReady (idIFrame);
	if (!glob__iframeLoaded) {
		//console.log (idIFrame + " en attente....")
		setTimeout (waitReady, 100, appli, idIFrame, frame);
	}
	else {
		//console.log (idIFrame + " chargé")
		frame.prepare (idIFrame, 
				document.getElementById (idIFrame).contentWindow.document);
		appli.nbFrameEndPrepared++;
		if (appli.nbFrameEndPrepared != appli.nbFramePrepared
				&& (appli.nbFrameEndPrepared / appli.nbFramePrepared)<=1) {
			appli.showMessage("Chargement " + Math.floor(
				100 * appli.nbFrameEndPrepared / appli.nbFramePrepared) + "%");
		} 
		else {
			appli.showDefaultMessage ();
			if (appli.nbFrameEndPrepared == appli.nbFramePrepared) {
				appli.initFunctionnalities ();
			}
		}
	}
};



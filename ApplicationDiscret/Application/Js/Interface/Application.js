// LICENCE ////////////////////////////////////////////////////////////////////

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

// INDEX //////////////////////////////////////////////////////////////////////

/* constructor ()
 */

// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc This class is the main controller of the application. It store and
 * manage all frame object.
 */

	  ///////////////////
	 // Constructor ///
	///////////////////


Application.prototype.constructor = Application;

/**
 *@constructor
 */
function Application () {
	// Licence
	console.log ('%c©2015 : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl\n'
	+'%c\n'
	+'benoist.thomas@hotmail.fr\n'
	+'biscui_86@hotmail.fr\n'
	+'tanguy.desplebain@gmail.com\n'
	+'lauret.karl@hotmail.fr\n'
	+'%c\n'
	+'Ce logiciel est un programme informatique servant à modéliser des '
	+'structures 3D voxellisées.\n'
	+'\n'
	+'Ce logiciel est régi par la licence CeCILL soumise au droit français et '
	+'respectant les principes de diffusion des logiciels libres.\nVous pouvez '
	+'utiliser, modifier et/ou redistribuer ce programme sous les conditions '
	+'de la licence CeCILL telle que diffusée par le CEA, le CNRS et l\'INRIA '
	+'sur le site %c"http://www.cecill.info"%c.\n'
	+'\n'
	+'En contrepartie de l\'accessibilité au code source et des droits de copie, '
	+'de modification et de redistribution accordés par cette licence, il n\'est '
	+'offert aux utilisateurs qu\'une garantie limitée.\nPour les mêmes raisons, '
	+'seule une responsabilité restreinte pèse sur l\'auteur du programme, le '
	+'titulaire des droits patrimoniaux et les concédants successifs.\n'
	+'\n'
	+'A cet égard  l\'attention de l\'utilisateur est attirée sur les risques '
	+'associés au chargement, à l\'utilisation, à la modification et/ou au '
	+'développement et à la reproduction du logiciel par l\'utilisateur étant\n'
	+'donné sa spécificité de logiciel libre, qui peut le rendre complexe à '
	+'manipuler et qui le réserve donc à des développeurs et des professionnels '
	+'avertis possédant  des  connaissances  informatiques approfondies.\nLes '
	+'utilisateurs sont donc invités à charger  et  tester  l\'adéquation  du '
	+'logiciel à leurs besoins dans des conditions permettant d\'assurer la '
	+'sécurité de leurs systèmes et ou de leurs données et, plus généralement,\n'
	+'à l\'utiliser et l\'exploiter dans les mêmes conditions de sécurité.\n'
	+'\n'
	+'Le fait que vous puissiez accéder à cet en-tête signifie que vous avez '
	+'pris connaissance de la licence CeCILL, et que vous en avez accepté les '
	+'termes\n'
	+'\n***********************************************************************'
	+'***********************************************************************\n'
	, 'color: #FF0000; font-weight:bold',
	'color: #FF0000; text-decoration: underline', 'color: #FF0000',
	'color: #FF0000; text-decoration: underline', 'color: #FF0000');
	
	
	
		// Attributes ///

	
	/**
	 * {ViewEnum} The active screen (3Dview, slices or both).
	 */
	this.activeScreen = ViewEnum.BOTH;
	
	/**
	 * Width of the #workspace in pixel. 
	 */
	this.workspaceWidth = parseInt($('#workspace').width());
	
	/**
	 * Height of the #workspace in pixel. 
	 */
	this.workspaceHeight = parseInt ($('.footer').css("top"))
		- parseInt ($('.header').css("top"))
		- $('.header').height();
	
	/**
	 * {String} The default message in the state bar.
	 */
	this.defaultMessage = "";
	
	/**
	 * {boolan[]} Defined which workspace is ready.
	 */
	this.iframeReady = [];
	
	/**
	 * {ListAction} The list of undoable/redoable action.
	 */
	this.listAction = new ListAction (25);
	
	/**
	 * {Controller[]} List of all functionalities.
	 */
	this.functionalities = [];
	
	/**
	 * {ControllerRotate} The rotate functionality controller. Provide a direct
	 * access to the rotation tool.
	 */
	this.rotateFunctionality;
	
	
		// Colors ///
	
	
	/**
	 * {float[4][]} The default RGBA color of each cube.
	 */
	this.cubeColors = [];
	for (var i = 0; i < CubeStateEnum.size; i++) {
		this.cubeColors.push (CubeStateEnum.color[i]);
	}
	
	/**
	 * {float[4]} The RGBA background color.
	 */
	this.backgroundColor = [0.1, 0.1, 0.1, 1.0];
	
	/**
	 * {float[4]} The RGBA strip leader on the background.
	 */
	this.leaderColor = [0.11, 0.15, 0.19, 1.0];
	
	/**
	 * {float[4]} The RGBA canvas color.
	 */
	this.canvasColor = [0.0, 0.0, 0.0, 1.0];
	
	
		//  Frame and Workspace ///
	
	
	/**
	 * {Frame[]} All frame loaded in the application.
	 */
	this.frames = [];
	
	/**
	 * {Frame3D} The 3D workspace.
	 */
	this.frame3D;
	
	/**
	 * {Frame2D} The 2D workspace.
	 */
	this.frame2D;
	
	/**
	 * {FrameList} The list model workspace.
	 */
	this.frameList;
	
	/**
	 * {FrameForm} The form to save model.
	 */
	this.frameSave;
	
	/**
	 * {ModelController[]} All model loaded in the application.
	 */
	this.listModel = [];
	
	/**
	 * {ModelController[]} The modelController selected.
	 */
	this.selectedModel = [];
	
	/**
	 * {int} Number of complete loaded frame.
	 */
	this.nbFrameEndPrepared = 0;
	
	/**
	 * {int} Number of frame.
	 */
	this.nbFramePrepared = 0;
	
	/**
	 * {jqueryDialog} Handle the dialog for the SVG export
	 */
	this.dialogSVG = $("#dialog-form-svg").dialog ({
		autoOpen : false,
		height : 350,
		width : 350,
		modal : true,
		buttons : {
			"Exporter en SVG": this.exportSVGFormValid.bind (this),
			"Annuler": this.exportSVGFormClose.bind (this),
		},
		close : function () {
			$('#dialog-form-svg input').removeClass("ui-state-error");
		}
	});

	// Handle the submit on the form
	this.dialogSVG.find("form").on("submit", function (event) {
		event.preventDefault();
	}).on("submit", this.exportSVGFormValid.bind (this));
	
	/**
	 * {jqueryObject} Handle the dialog to add a model
	 */
	this.dialogAddModel = $("#dialog-form-model").dialog ({
		autoOpen : false,
		height : 350,
		width : 350,
		modal : true,
		buttons : {
			"Ajouter un modèle": this.addModelFormValid.bind (this),
			"Annuler": this.addModelFormClose.bind (this),
		},
		close : function () {
			$('#dialog-form-model input').removeClass("ui-state-error");
		}
	});
	
	// Handle the submit on the form
	this.dialogAddModel.find("form").on("submit", function (event) {
		event.preventDefault();
	}).on("submit", this.addModelFormValid.bind (this));
		
		
	/**
	 * {jqueryObject} Handle the dialog to merge models
	 */
	this.dialogFusionModel = $("#dialog-form-fusion-model").dialog ({
		autoOpen : false,
		height : 350,
		width : 350,
		modal : true,
		buttons : {
			"Ajouter un modèle": this.fusionModelFormValid.bind (this),
			"Annuler": this.fusionModelFormClose.bind (this),
		},
		close : function () {
			$('#dialog-form-fusion-model input').removeClass("ui-state-error");
		}
	});
	
	// Handle the submit on the form
	this.dialogFusionModel.find("form").on("submit", function (event) {
		event.preventDefault();
	}).on("submit", this.fusionModelFormValid.bind (this));


	
	/**
	 * {jqueryObject} Handle the dialog to remove a model
	 */	
	this.dialogRemoveModel = $("#dialog-form-remove-model").dialog ({
		autoOpen : false,
		height : 350,
		width : 350,
		modal : true,
		buttons : {
			"Enlever un modèle": this.removeModelFormValid.bind (this),
			"Annuler": this.removeModelFormClose.bind (this),
		},
		close : function () {
			$('#name-remove-model').empty();
		}
	});
};

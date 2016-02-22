// LICENCE /////////////////////////////////////////////////////////////////////


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


// INDEX ///////////////////////////////////////////////////////////////////////


/* Application ()
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @classdesc This class is the main controller of the application.
 */
Application.prototype.constructor = Application;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Application () {

		// Licence

	/*
	console.log ('%c©2015 : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl\n'
	+'%c\n'
	+'benoist.thomas@hotmail.fr\n'
	+'biscui_86@hotmail.fr\n'
	+'tanguy.desplebain@gmail.com\n'
	+'lauret.karl@hotmail.fr\n'
	+'%c\n'
	+'Ce logiciel est un programme informatique servant à modéliser des'
	+'structures 3D voxellisées.\n'
	+'\n'
	+'Ce logiciel est régi par la licence CeCILL soumise au droit français et'
	+'respectant les principes de diffusion des logiciels libres.\nVous pouvez'
	+'utiliser, modifier et/ou redistribuer ce programme sous les conditions'
	+'de la licence CeCILL telle que diffusée par le CEA, le CNRS et l\'INRIA'
	+'sur le site %c"http://www.cecill.info"%c.\n'
	+'\n'
	+'En contrepartie de l\'accessibilité au code source et des droits de copie,'
	+'de modification et de redistribution accordés par cette licence, il n\'est'
	+'offert aux utilisateurs qu\'une garantie limitée.\nPour les mêmes raisons,'
	+'seule une responsabilité restreinte pèse sur l\'auteur du programme, le'
	+'titulaire des droits patrimoniaux et les concédants successifs.\n'
	+'\n'
	+'A cet égard  l\'attention de l\'utilisateur est attirée sur les risques'
	+'associés au chargement, à l\'utilisation, à la modification et/ou au'
	+'développement et à la reproduction du logiciel par l\'utilisateur étant\n'
	+'donné sa spécificité de logiciel libre, qui peut le rendre complexe à'
	+'manipuler et qui le réserve donc à des développeurs et des professionnels'
	+'avertis possédant  des  connaissances  informatiques approfondies.\nLes'
	+'utilisateurs sont donc invités à charger  et  tester  l\'adéquation  du'
	+'logiciel à leurs besoins dans des conditions permettant d\'assurer la'
	+'sécurité de leurs systèmes et ou de leurs données et, plus généralement,\n'
	+'à l\'utiliser et l\'exploiter dans les mêmes conditions de sécurité.\n'
	+'\n'
	+'Le fait que vous puissiez accéder à cet en-tête signifie que vous avez'
	+'pris connaissance de la licence CeCILL, et que vous en avez accepté les'
	+'termes\n'
	+'\n***********************************************************************'
	+'***********************************************************************\n'
	, 'color: #FF0000; font-weight:bold',
	'color: #FF0000; text-decoration: underline', 'color: #FF0000',
	'color: #FF0000; text-decoration: underline', 'color: #FF0000');
	*/



		/// Surface ///

	/**
	 * {SurfaceViewer} TODO
	 */
	this.surfaceView = new SurfaceViewer (
		document.getElementById ("surfaceCanvas")
	);

	/**
	 * {Controller3D} TODO
	 */
	this.surfaceController = new Controller3D (new Vector (31, 31, 31));


		/// Meridian ///


	/**
	 * {Controller2DMeridian} TODO
	 */
	this.meridianController = new Controller2DMeridian (-1, 1, -1, 1);


	/**
	 * {CurveViewer} TODO
	 */
	this.meridianView = new CurveViewer (
		document.getElementById ("meridianCanvas"),
		this.meridianController
	);

	/**
	 * {ParameterViewer} TODO
	 */
	this.meridianParameters = new ParameterViewer (
		'#meridianParam', this.meridianController
	);

	/**
	 * {Function} TODO
	 */
	this.drawMeridian = null;

	/**
	 * {Function} TODO
	 */
	this.getRangeMeridian = null;


		/// Revolution ///


	/**
	 * {Controller2D} TODO
	 */
	this.revolController = new Controller2D (-1.1, 1.1, -1.1, 1.1,
		DrawModeEnum.EQUATION);

	/**
	 * {CurveViewer} TODO
	 */
	this.revolView = new CurveViewer (
		document.getElementById ("revolCanvas"),
		this.revolController
	);

	/**
	 * {ParameterViewer} TODO
	 */
	this.revolutionParameters = new ParameterViewer (
		'#revolParam', this.revolController
	);

	/**
	 * {Function} TODO
	 */
	this.drawRevolution = null;

	/**
	 * {Function} TODO
	 */
	this.getRangeRevolution = null;


		/// Other ///


	/**
	 * {ControllerExport} TODO
	 */
	this.exportController = new ControllerExport("surfaceCanvas", "meridianCanvas2", "revolCanvas2");


	/**
	 * {String} The default message in the state bar.
	 */
	this.defaultMessage = "";

	/**
	 * {ListUndoRedoAction} The list of undoable/redoable action.
	 */
	this.listAction = new ListUndoRedoAction (25);
}


// FIXME virer les méthodes suivantes de ce fichier
//==============================================================================
/**
 * This function calls itself again every second in a different thread until the
 * computation is finished. Then it redraws the scene.
 *
 * @return {void}
 */
Application.prototype.computationFinished = function () {
	if (this.surfaceController.newVoxels()){
		//this.surfaceController.voxelsRead();
		//this.surfaceView.show ();
	}
	if (! this.surfaceController.isAlgoFinished ()) {
		setTimeout (this.computationFinished.bind (this), 1000);
	}
	else {
		if(this.surfaceController.isAlgoFinished () != "error"){
			this.validMessage ("Finished", 0);
		}
		this.stopLoading ();
		this.surfaceView.show (true);
	}
};


//==============================================================================
/**
 * This function is called by the generate button. Calls the algorithm and draws
 * the resulting surface.
 *
 * @return {void}
 */
Application.prototype.generateAndDraw = function (mode) {
	this.showMessage ("Computing...", 0, "#04E");
	var dimX = document.getElementById ("dimx").value;
	var dimY = document.getElementById ("dimy").value;
	var dimZ = document.getElementById ("dimz").value;


	this.surfaceController.setDimension ([
		dimX,dimY,dimZ
	]);
	this.surfaceView.container.getObjectByName ("boundingBox").setDimension ([
		dimX,dimY,dimZ
	]);

	this.surfaceController.generate (mode);
	catch(e){
		this.errorMessage ("Aborted", 0);
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
	this.changeValueSlider ("#slider-rangeX", 0, parseInt (dimX));
	this.changeValueSlider ("#slider-rangeY", 0, parseInt (dimY));
	this.changeValueSlider ("#slider-rangeZ", 0, parseInt (dimZ));
};


//==============================================================================
/**
 * TODO
 *
 * @param {boolean} forcePrepare - TODO
 * @see {@link SurfaceViewer.show}
 *
 * @return {void}
 */
Application.prototype.show = function (forcePrepare) {
	this.surfaceView.show (forcePrepare);
};

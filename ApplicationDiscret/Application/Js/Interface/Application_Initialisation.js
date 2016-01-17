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

/* initAppli () : void
 * initFunctionnalities () : void
 * initWindowEvent () : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Init all.
 * 
 * @return {void}
 */
Application.prototype.initAppli = function () {
	/// Application initialization
	this.resizeInterface ();
	this.surfaceView.showScene ();
	
	/// Interface initialization
//	this.initWindowEvent ();
//	$('.ui-resizable-e').bind ("mousedown", 
//		function (event) {
//			$('.resizeFix').css ("display", "block");
//		});
//	// If the mouse move too fast, the resize is done anyway.
//	this.resizeInterface ();
	if (!this.hasMessage ())
		this.showDefaultMessage ();
};


//==============================================================================
/**
 * Init the main functionalities.
 * 
 * @return {void}
 */
Application.prototype.initFunctionnalities = function () {
	//
};


//==============================================================================
/**
 * Init all window events.
 * 
 * @return {void}
 */
Application.prototype.initWindowEvent = function () {
//	$("#curvesView").resizable ({
//		handles: 'e', // e = east
//		maxWidth: 10000, // i.e. no limit
//		minWidth: 150,
//		ghost : true,
//		create: function (event, ui) {
//			$(this).parent().on('resize', function (e) {
//				e.stopPropagation();
//			});
//		},
//		stop : function (event, ui) {
//				$('.resizeFix').css ("display", "none");
//				var currentWidth = ui.size.width;
//				// set the content panel width
//				$("#surfaceView").css ("width", ((appli.workspaceWidth 
//					- currentWidth) / appli.workspaceWidth) * 100 + "%");
//				$('#curvesView').css ("width", (100 * currentWidth 
//					/ appli.workspaceWidth) + "%");
////				$('#curvesView').css ("height", "100%"); // bug fix
//			} // end fonction for stop attribute
//	}); // end object for resiable()
};





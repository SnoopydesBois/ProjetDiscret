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
 * initControllers () : void
 * initWindowEvent () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Init all the application (controller, event, interface).
 *
 * @return {void}
 */
Application.prototype.initAppli = function () {
	/// Application initialization
	this.initControllers ();

	this.meridianController.setActive ("Line");
	this.revolController.setActive ("Circle");

	this.meridianParameters.setController (this.meridianController);
	this.meridianParameters.displayParameter (this.drawMeridian,
		this.getRangeMeridian);

	this.revolutionParameters.setController (this.revolController);
	this.revolutionParameters.displayParameter (this.drawRevolution,
		this.getRangeRevolution);

	// Sale
	var dimX = document.getElementById ("dimx").value;
	var dimY = document.getElementById ("dimy").value;
	var dimZ = document.getElementById ("dimz").value;
	// Double slider creation
	this.createSlider ("#slider-rangeX", 0, dimX);
	this.createSlider ("#slider-rangeY", 0, dimY);
	this.createSlider ("#slider-rangeZ", 0, dimZ);


	/// Interface initialization
	$(".buttonGroup").buttonset ();
	$(".buttonGroup button")
		.removeClass("ui-button ui-widget ui-state-default ui-button-text-only")
		.removeAttr ("role")
		.unbind ();

	this.resizeInterface ();
	this.initWindowEvent ();
	this.showDefaultMessage ();
	this.changeMeridianMode ();
};


//==============================================================================
/**
 * Init the main functionalities.
 *
 * @return {void}
 */
Application.prototype.initControllers = function () {
	/// add curve for meridian
	this.meridianController.addCurve ("Line", Line);
	this.meridianController.addCurve ("Sinusoid", Sinusoid);

	/// add curve for revolution
	this.revolController.addCurve ("Circle", Circle);
	this.revolController.addCurve ("Heart", Heart);
	this.revolController.addCurve ("Triangle", Triangle);
	this.revolController.addCurve ("Lemniscate", Lemniscate);
	this.revolController.addCurve ("Curve1", Curve1);
	this.revolController.addCurve ("Curve2", Curve2);
	this.revolController.addCurve ("Curve3", Curve3);
	this.revolController.addCurve ("Curve4", Curve4);
	this.revolController.addCurve ("Hyperbol", Hyperbol);
	this.revolController.addCurve ("Curve6", Curve6);
	this.revolController.addCurve ("Curve7", Curve7);
	this.revolController.addCurve ("Curve8", Curve8);
	this.revolController.addCurve ("Curve9", Curve9);
	this.revolController.addCurve ("Curve10", Curve10);

//	this.revolController.addCurve ("eq", eq);
	
	/// bind generation with active curve
	this.surfaceController.setGetCurveRevolution (
		this.revolController.getActiveCurve.bind (this.revolController)
	);
	this.surfaceController.setGetMeridian (
		this.meridianController.getActiveCurve.bind (this.meridianController)
	);

	this.drawMeridian = this.meridianView.draw.bind (this.meridianView);
	this.drawRevolution = this.revolView.draw.bind (this.revolView);

	this.getRangeMeridian = this.meridianController.getParametersRange
		.bind (this.meridianController);
	this.getRangeRevolution = this.revolController.getParametersRange
		.bind (this.revolController);
};


//==============================================================================
/**
 * Init all window events.
 *
 * @return {void}
 */
Application.prototype.initWindowEvent = function () {
	window.addEventListener ("resize", this.resizeInterface.bind (this));
};


//==============================================================================
/**
 * TODO
 */
Application.prototype.createSlider = function (id, min, max) {
	// Slider creation
	$(id).slider ({
		range : true,
		min : min,
		max : max,
		values: [min, max],
		slide: function (event, ui) {
			// 20 => pixel size of a selector
			if ((ui.values[0]) >= ui.values[1]) {
				return false;
			}
			$("#amountMin" + $(id).attr ("name")).val (ui.values[0]);
			$("#amountMax" + $(id).attr ("name")).val (ui.values[1]);
		},
		stop : function(event, ui){
			appli.show (true)
		}
	});

	// Text input initialisation
	$("#amountMin" + $(id).attr ("name")).val ($(id).slider ('values', 0));
	$("#amountMax" + $(id).attr ("name")).val ($(id).slider ('values', 1));
};

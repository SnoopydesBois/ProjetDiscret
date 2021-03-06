/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
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
 * changeValueSlider (idSlider : String, draw : boolean) : void
 * resetSlider (idSlider : String, draw : boolean) : void
 * clearDraw () : void
 * loading () : void
 * stopLoading () : void
 * abort () : void
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Resizes the curve and the surface views and set the 'width' and 'height' attributes for
 * each canvas.
 *
 * @return {void}
 */
Application.prototype.resizeInterface = function () {
	/// resize interface
	var canvasWidth = $("#revolCanvas2").height (); // 70% of curveView width
	$("#curvesView").width (canvasWidth * 10 / 7);
	$("#surfaceView").width (
		$("#workspace").width () - $("#curvesView").width () - 1
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
 * Changes min and max value of a slider and resets it or changes just a value of
 * a slider with the value of a HTMLInputElement.
 * 
 * @param {(HTMLDivElement | String)} idSlider - The slider (i.e. the div
 * element) or its id.
 * @param {boolean} draw - True if you want to force the redraw of the surface,
 * false otherwise.
 * @param {(String | int)} argument[2] - Id of the HTMLInputElement (if
 * there are 3 arguments) or value of the left bound (if there are 4
 * arguments).
 * @param {int} [argument[3]] - Value of the right bound.
 * 
 * @return {void}
 * @throws {String} If number of parameters is not 3 nor 4.
 */
Application.prototype.changeValueSlider = function (idSlider, draw) {
	var slider, arg1, arg2;
	switch (arguments.length) {
		case 3 :
			slider = idSlider;
			arg1 = arguments[2];

			if (arg1.search ("Min") != -1 &&
				(parseInt ($(arg1).val ())
				< parseInt ($(arg1.replace ("Min", "Max")).val ())))
			{
				$(slider).slider ('values', 0, $(arg1).val ());
			}
			else if (arg1.search ("Max") != -1 &&
				(parseInt ($(arg1).val ())
				> parseInt ($(arg1.replace ("Max", "Min")).val ())))
			{
				$(slider).slider ('values', 1, $(arg1).val ());
			}
			break;
		case 4 :
			slider = idSlider;
			arg1 = arguments[2];
			arg2 = arguments[3];

			$(slider).slider ("option", "max", arg2);
			$(slider).slider ('values', 0, arg1);
			$(slider).slider ('values', 1, arg2);

			$("#amountMin" + $(slider).attr ("name")).val (arg1);
			$("#amountMax" + $(slider).attr ("name")).val (arg2);

			break;
		default :
			throw "Application.changeValueSlider.ErrorArgumentsLength";
			break;
	}
	if (draw){
		this.show (true);
	}
};


//==============================================================================
/**
 * Resets a slider. Redraws the scene if necessary.
 * 
 * @param {String} idSlider - Id of the slider.
 * @param {boolean} draw - True if you want to redraw the scene, false
 * otherwise.
 * 
 * @return {void}
 */
Application.prototype.resetSlider = function (idSlider, draw) {
	var $slider = $("#" + idSlider);
	var max = $slider.slider ("option", "max"),
		min = $slider.slider ("option", "min");
	$slider.slider ("values", 0, min)
	$slider.slider ("values", 1, max)
	$("#amountMin" + $slider.attr ("name")).val (min);
	$("#amountMax" + $slider.attr ("name")).val (max);
	if (draw){
		this.show (true);
	}
};


//==============================================================================
/**
 * Clears the drawn curve on the meridian canvas.
 *
 * @return {void}
 */
Application.prototype.clearDraw = function () {
	this.meridianView.clearDraw ();
};


//==============================================================================
/**
 * Shows the loading image on the 3D view.
 *
 * @return {void}
 */
Application.prototype.loading = function () {
	document.getElementById ("loadingImg").style = "";
};


//==============================================================================
/**
 * Hides the loading image on the 3D view.
 *
 * @return {void}
 */
Application.prototype.stopLoading = function () {
	document.getElementById ("loadingImg").style = "display: none";
};


//==============================================================================
/**
 * Shows the aborted message on the 3D view.
 *
 * @return {void}
 */
Application.prototype.abort = function () {
	this.stopLoading ();
	document.getElementById ("abortMessage").style = "";
	setTimeout (function () {
		document.getElementById ("abortMessage").style = "display: none";
	}, 2500);
};



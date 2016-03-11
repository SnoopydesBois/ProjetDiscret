// LICENCE /////////////////////////////////////////////////////////////////////


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


// INDEX ///////////////////////////////////////////////////////////////////////


/* container : HTMLUlElement
 * controller : Controller2D
 * 
 * ParameterViewer (idContainer : Controller2D)
 * 
 * setController (controller : Controller2D) : void
 * displayParameter (draw : Function, getRange : Function) : void
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends GenericViewer
 * @classdesc TODO
 */
ParameterViewer.prototype.constructor = ParameterViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * Construct a viewer for a parameter list.
 * 
 * @param {String} idContainer - Id of the associated controller. If the first
 * character is a '#', it is ignored. XXX vérifier anglais
 */
function ParameterViewer (idContainer) {

	/**
	 * {HTMLUlElement} The list which contain the ui parameters.
	 */
	this.container = null;
	if (idContainer.charAt (0) !== '#')
		this.container = $('#' + idContainer);
	else
		this.container = $(idContainer);

	/**
	 * {Controller2D} The associated controller. Use to get all parameter of a
	 * curve.
	 * @see {@link displayParameter}
	 */
	this.controller = null;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @param {Controller2D} controller - The controller the parameterView is going
 * to use.
 *
 * @return {void}
 */
ParameterViewer.prototype.setController = function (controller) {
	this.controller = controller;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Fill the list parameter (avoid it before). 
 *
 * @param {Function} draw - A function to redraw the curve. Use to add an event
 * on the input to redraw the curve when changing. XXX vérifier anglais
 * @param {Function} getRange - A function to get the range of a parameter. 
 *
 * @return {void}
 */
ParameterViewer.prototype.displayParameter = function (draw, getRange) {

	this.container.empty ();

	var listParameter = this.controller.getAllParameters ();
	var id = this.container.attr ("id");
	var that = this;

	var range;
	for (var param in listParameter) {
		range = getRange (param);

		var li = $("<li></li>");

		li.append ("<p class='titleParam'>&nbsp; " + param + "</p>");
		var input = $("<input type='range' name='" + param
			+ "' id='" + id + param
			+ "' class='rangeParam' value='" + listParameter[param]
			+ "' min='" + range.getMin ()
			+ "' max='" + range.getMax ()
			+ "'/>"
		);

		input.change (function () {
			that.controller.setParameter ($(this).attr ("name"),
				parseInt ($(this).val ())
			);
			draw ();
		});
		li.append (input);
		this.container.append (li);
	} // end for each param
};



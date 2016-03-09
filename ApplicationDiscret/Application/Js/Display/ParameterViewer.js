// LICENCE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
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



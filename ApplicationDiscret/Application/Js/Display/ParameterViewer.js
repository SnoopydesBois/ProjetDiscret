// LICENCE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// INDEX ///////////////////////////////////////////////////////////////////////


/* Application ()
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
 */
function ParameterViewer (idContainer) {
	// console.log("ParameterViewer.constructor : " + idContainer);
	this.container = null;
	if (idContainer.charAt(0) !== '#'){
		this.container = $('#' + idContainer);
	}
	else{
		this.container = $(idContainer);
	}
	this.controller = null;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################
//
//
/**
 * @param {Controller2D} controller - The controller the parameterView is going
 * to use.
 */
ParameterViewer.prototype.setController = function (controller) {
	this.controller = controller;
}


//==============================================================================
/**
 * @param {Function} draw - The function to redraw the curve.
 */
ParameterViewer.prototype.displayParameter = function (draw, getRange) {

	this.container.empty ();

	var listParameter = this.controller.getAllParameters();
	var id = this.container.attr ("id");
	var that = this;

	var range;
	for (var param in listParameter) {
		range = getRange (param);
		// this.container.append ("<span class='titleParam'>" + param + "</span><br/>");
		// this.container.append ("<input type='range' name='" + param + "' id='" + id + param + "' class='rangeParam' value='" + listParameter[param] + "' min='" + range.getMin() + "' max='" + range.getMax() + "'/>");
		// $("#" + id + param).change (function() {
		// 	that.controller.setParameter ($(this).attr("name") , parseInt($(this).val()));
		// 	draw ();
		// });
		// this.container.append ("<hr/>");
		var li = $("<li></li>");
		/* &#9108; hexagon
		 * &#9187; hexagon with circle inside
		 * &#8227; triangle
		 * &bull; dot
		 */
		li.append ("<p class='titleParam'>&#9187; " + param + "</p>");
		var input = $("<input type='range' name='" + param + "' id='" + id + param
			+ "' class='rangeParam' value='" + listParameter[param] + "' min='"
			+ range.getMin() + "' max='" + range.getMax() + "'/>");
		input.change (function() {
			that.controller.setParameter ($(this).attr ("name"),
				parseInt($(this).val()));
			draw ();
		});
		li.append (input);
		this.container.append (li);
	}
};

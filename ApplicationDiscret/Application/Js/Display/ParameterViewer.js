/**
 * @license TODO
 */


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
	if(idContainer.charAt(0) !== '#'){
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
/**
 * @param {Controller2D} controller - The controller the parameterView is going to use
 */
ParameterViewer.prototype.setController = function(controller){
	this.controller = controller;
}


//==============================================================================
/**
 * @param {Function} draw - The function to redraw the curve.
 */
ParameterViewer.prototype.displayParameter = function(draw){
	this.container.empty();
	var listParameter = this.controller.getAllParameters();
	for(var param in listParameter){
		this.container.append("<span>" + param + "</span><br/>"); 
		this.container.append("<input type='range' id='" + param + "' value='" + listParameter[param] + "' min='0' max='100'/>");
		var that = this;
		$("#" + param).change(function() {
			that.controller.setParameter($(this).attr("id") , parseInt($(this).val()));
			draw();
		});			
		this.container.append("<hr/>");
	}	
}

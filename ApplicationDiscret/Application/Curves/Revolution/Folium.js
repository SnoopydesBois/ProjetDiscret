// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Folium.prototype = new ImplicitCurve;
Folium.prototype.constructor = Folium;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function Folium () {
	//8 x^3 + 8 y^3 - 12 x y
	var equation = new Equation ("8 x^3 + 8 y^3 - 12 x y");

	ImplicitCurve.call(this, equation);
}

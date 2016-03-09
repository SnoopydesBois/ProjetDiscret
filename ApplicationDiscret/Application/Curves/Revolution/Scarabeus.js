// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc TODO
 */
Scarabeus.prototype = new ImplicitCurve;
Scarabeus.prototype.constructor = Scarabeus;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * TODO desc
 */
function Scarabeus () {
	// -4 ((1 - 2.14286 x)^2 - 4.59184 y^2)^2
	// + 9 (0.714286 x - 1.53061 x^2 - 1.53061 y^2)^2
	// * ((1 - 2.14286 x)^2 + 4.59184 y^2)
	var equation = new Equation (
		"-4 ((1 - 2.14286 x)^2 - 4.59184 y^2)^2"
		+ "+ 9 (0.714286 x - 1.53061 x^2 - 1.53061 y^2)^2"
		+ "* ((1 - 2.14286 x)^2 + 4.59184 y^2)"
	);

	ImplicitCurve.call (this, equation);
}

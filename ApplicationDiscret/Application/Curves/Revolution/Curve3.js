// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ImplicitCurve
 * @classdesc Predefined curve
 */
Curve3.prototype = new ImplicitCurve;
Curve3.prototype.constructor = Curve3;



//##############################################################################
//	Constructor
//##############################################################################





//==============================================================================
/**
 * @constructor
 */
function Curve3 () {
	 // x^2 + y^2 - (0.9 + 0.1*Abs[Cos[5*th]])^2]
	 // -> th angle entre vecteur {1,0} et {x,y}
	var equation = new Equation (
		"x^2 + y^2 - (0.9 + 0.2 * abs (cos (5 * (acos ("
		+ "1 * x / sqrt (x^2 + y^2))))^2))"
	);

	ImplicitCurve.call (this, equation);
};

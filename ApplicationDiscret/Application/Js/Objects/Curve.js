/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* 
 * Curve ()
 * computePoints (ranX, ranY)
 * setParameter (parameter, value)
 * getAllParameters ()
 * getParameter (name)
 * getParametersRange (name)
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc A curve used in the 2D space. Can be a generatrix or a directrix.
 * Abstract class, the curves used must inherit from this class.
 */
Curve.prototype.constructor = Curve;



//##############################################################################
//	Constructor
//##############################################################################



function Curve () {}



//##############################################################################
//	Compute method
//##############################################################################



/**
 * @abstract
 */
Curve.prototype.computePoints = function (ranX, ranY) {
	throw "Curve.computePoints.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.setParameter = function (parameter, value) {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getAllParameters = function () {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getParameter = function (name) {
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
};


//==============================================================================
/**
 * @abstract
 */
Curve.prototype.getParametersRange = function (name) {
	throw "Curve.getParametersRange.ErrorNotImplementedInAbstractClass";
};



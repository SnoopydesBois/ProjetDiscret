// TODO



Curve.prototype.constructor = Curve;

function Curve () {}


//==============================================================================
Curve.prototype.computePoints = function (ranX, ranY){
	throw "Curve.computePoints.ErrorNotImplementedInAbstractClass";
};

//==============================================================================
/**
 * @param {String} parameter - The parameter to modify.
 * @param {Number} value - The value to set.
 */
Curve.prototype.setParameter = function(parameter, value){
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
}


//==============================================================================
/**
 * Return all the parameters of a curve.
 * @return {Map<String, Number>} A map composed of the name of a parameter (the key) and its value (the value).
 */
Curve.prototype.getAllParameters = function(){
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
}

//==============================================================================
/**
 *
 */
Curve.prototype.getParameter = function(name){
	throw "Curve.setParameter.ErrorNotImplementedInAbstractClass";
}

//==============================================================================
/**
 *
 */
Curve.prototype.getParametersRange = function(name){
	throw "Curve.getParametersRange.ErrorNotImplementedInAbstractClass";
};
/**
 * DrawnCurve.js
 * 
 * author : abisutti
 * created : Wed, 20 Jan 2016 09:23:38 +0100
 * modified : Wed, 20 Jan 2016 09:23:38 +0100
 */


/**
 * @classdesc 
 */



DrawnCurve.prototype.constructor = DrawnCurve;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 */
function DrawnCurve () {
	
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################

DrawnCurve.prototype.getMaxT = function(){
};

DrawnCurve.prototype.getX = function(t){
	if (t = Math.floor(t)){
		return this.tabX[t];
	}
	else{
		return interpol(t, this.tabX);
	}
};

DrawnCurve.prototype.getY = function(t){
	//cf getX
};




//##############################################################################
//	Other methods
//##############################################################################


//==============================================================================
DrawnCurve.prototype.setParameter = function(parameter, value){
	throw "DrawnCurve.setParameter.ErrorCannotModifyParameterOnDrawnCurve";
};


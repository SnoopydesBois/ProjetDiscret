Curve.prototype.constructor = Curve;

function Curve(){
	
}

//==============================================================================
/**
*
*/
Curve.prototype.setActive = fucntion(nom){
	
}


//==============================================================================
/**
*
*/
Curve.prototype.getPoints = function(dim){

}

//==============================================================================
/**
*
*/
Curve.prototype.startfreehand = function(dim){
}

//==============================================================================
/**
*
*/
Curve.prototype.newFreeHand = function(dim, coord){
}

//==============================================================================
/**
*
*/
Curve.prototype.addPoint = function(coord, dim){
}

//==============================================================================
/**
*
*/
Curve.prototype.drawLastSegment = function(){
}

//==============================================================================
/**
*
*/
Curve.prototype.parseImplicit = function(eq){
}

//==============================================================================
/**
*
*/
Curve.prototype.parseParametric = function(eqX, eqY){
}

//==============================================================================
/**
*
*/
Curve.prototype.parseExplicit = function(eq){
}

//==============================================================================
Curve.prototype.computePoints = function(){
	throw "Curve.computePoints.ErrorNotImplementedInAbstractClass";
};
eq.prototype = new ImplicitCurve;
eq.prototype.constructor = eq;


//==============================================================================
/**
* @constructor {Equation} the equation of the curve
*/


var c = $(document).ready (function () {
    // onclick behavior
    $('.eq').click (function () {
        var eq = $(this).attr ('id'); // obtenir l'identifiant obtain language id
      
    });
});

function eq(c) {
		
	var equation = new Equation(c);
		
	ImplicitCurve.call(this, equation);

}
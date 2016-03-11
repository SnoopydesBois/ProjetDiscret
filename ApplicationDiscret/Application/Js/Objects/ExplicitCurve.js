/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
 * Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
 *
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * tanguy.desplebain@gmail.com
 * lauret.karl@hotmail.fr
 *
 * Ce logiciel est un programme informatique servant à modéliser des
 * structures 3D voxellisées.
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* 
 * ExplicitCurve (equation : Equation)
 * computePoints (ranX : Range, ranY : Range) : Point[][]
 * computeRange () : Range
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc A FormulaCurve defined by an equation of type f(x) = .
 */
ExplicitCurve.prototype = new FormulaCurve();
ExplicitCurve.prototype.constructor = ExplicitCurve;


//==============================================================================
/**
* @constructor 
* @param {Equation} equation - The equation of the curve.
*/
function ExplicitCurve(equation) {
	FormulaCurve.call(this, equation);
};


//==============================================================================
/**
 * Computes the points of the curve based on its equation
 * 
 * @param {Range} ranX - The x-axis range on which to compute the points
 * @param {Range} ranX - The y-axis range on which to compute the points
 * 
 * @return {Point[][]} An array composed of list of points to represent the curve
 * (for example, 1/x will create two list of points)
 * @throw {String} The equation is not defined or the parameters are not of type Range
 */
ExplicitCurve.prototype.computePoints = function (ranX, ranY) {
	if (! ranX instanceof Range || ! ranY instanceof Range) {
		throw "ExplicitCurve.computePoints.ErrorNotARange";
	} else if (!this.equation.check) {
		throw "ExplicitCurve.computePoints.ErrorEquationNotDefined";
	}
	
	var result = [];
	
	var points = [];
	
	var xMin = ranX.getMin();
	var xMax = ranX.getMax();
	
	var step = this.computeStep();
	
	for(var x = xMin; x <= xMax; x += step){	
		var y = this.equation.compute([x]);
		
		/* 
		 * If the point is within the display range,
		 * we add that point to the current connex part of the curve
		 */
		if(ranY.isIn(y)){
			points.push(new Point(x,y));
		}
		/* 
		 * Else, we push into the result array the current connex curve computed
		 * and we start a new connex part.
		 */
		else if(points.length > 0){
			result.push(points.slice(0));
			points = [];
		}
	}
	
	/* 
	 * Pushing into result the last connex part computed of the curve
	 */
	if(points.length > 0){
		result.push(points.slice(0));
	}
	return result;

};

//==============================================================================
/**
 * Compute the range of the explicite curve depending on it's equation.
 * Currently return a range [-10, 10]
 *
 * @return {Range} the optimal Range.
 */
ExplicitCurve.prototype.computeRange = function(){
	return new Range(-10,10);
};
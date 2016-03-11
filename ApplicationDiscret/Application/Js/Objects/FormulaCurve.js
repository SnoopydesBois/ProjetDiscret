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
 * FormulaCurve (equation : Equation)
 * getEquation () : Equation
 * getEquationNoParameter () : String
 * getParameterRange (name : String) : Number
 * setEquation (equation : Equation) : String
 * computeStep (ranX : Range, ranY : Range) : float
 * setParameter (parameter : String, value : float) : void
 * getAllParameters () : Map<String, Number>
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Subclass of Curve, A curve defined by a function
 */
FormulaCurve.prototype = new Curve;
FormulaCurve.prototype.constructor = FormulaCurve;

//==============================================================================
/**
 * @constructor
 * @param {Equation | String} equation - Either a string of an equation or an 
 * equation
 */
function FormulaCurve (equation) {
	if (arguments.length === 0) {
		this.equation = undefined;
	}
	else if (typeof equation == "string") {
		this.equation = new Equation (equation);
	}
	else if (equation instanceof Equation) {
		this.equation = equation;
	}
	else {
		this.equation = undefined;
	}
	
	this.parametersRange = [];
};


//==============================================================================
/**
 * @return {Equation} the equation of the curve
 */
FormulaCurve.prototype.getEquation = function(){
	return this.equation;
};


//==============================================================================
/**
 * @return {String} the equation of the curve
 */
FormulaCurve.prototype.getEquationNoParameter = function(){
	return this.equation.toStringNoParam();
};


//==============================================================================
/**
 * @param {String} name - The name of the parameter we want to retrieve
 *
 * @return {Number} The value of the indexed parameter 
 */
FormulaCurve.prototype.getParametersRange = function (name) {
	return this.parametersRange[name];
};


//==============================================================================
/**
 * @param {Equation | String} equation - Set a new equation to the curve
 * if the parameter is a String, a new equation is created, else the parameter 
 * is set as the equation of the curve
 *
 * @throw {String} The parameter is not of expected type.
 */
FormulaCurve.prototype.setEquation = function (equation) {
	if (typeof equation == "string") {
		this.equation = new Equation (equation)
	}
	else if (equation instanceof Equation) {
		this.equation = equation
	}
	else {
		throw "FormulaCurve.setEquation.ErrorNotAnEquation";
	}
};


//==============================================================================
/**
 * Compute the optimal step for the given ranges
 * Currently return 0.1 automatically.
 * 
 * @param {Range} ranX - The x-Range of the equation.
 * @param {Range} ranY - The y-Range of the equation.
 *
 * @return {float} The optimal step.
 */
FormulaCurve.prototype.computeStep = function (ranX, ranY) {
	return 0.1;
};


//==============================================================================
/**
 * @inheritdoc
 */
FormulaCurve.prototype.setParameter = function (parameter, value) {
	this.equation.setParameter (parameter, value);
};


//==============================================================================
/**
 * @inheritdoc
 */
FormulaCurve.prototype.getAllParameters = function () {
	return this.equation.getAllParameters ();
};



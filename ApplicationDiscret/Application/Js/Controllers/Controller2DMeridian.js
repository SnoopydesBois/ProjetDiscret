/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
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


/* constructor ()
 * setActive(name : (Curve | String), type : (EquationTypeEnum)
 * getActiveCurve()
 * newCurve()
 * closeCurve()
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc This class inherit from Controller2D and is used to communicate with a modelCurve or a ModelDraw
 */
Controller2DMeridian.prototype = new Controller2D;
Controller2DMeridian.prototype.constructor = Controller2DMeridian;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 *
 * @param {Number} imageMin - The lower bound of the output range.
 * @param {Number} imageMax - The upper bound of the output range.
 * @param {Number} antecedantMin - The lower bound of the input range.
 * @param {Number} antecedantMax - The upper bound of the input range.
 * @param {DrawModeEnum} mode - The drawing method used.
 */
function Controller2DMeridian (imageMin, imageMax, antecedantMin, antecedantMax,
	mode)
{
	// Call to mother constructor
	Controller2D.call (this, imageMin, imageMax, antecedantMin, antecedantMax,
		DrawModeEnum.HAND_FREE);

	/**
	 * {ModelDraw} The model to handle the drawn curve
	 */
	this.modelDraw = new ModelDraw ();

	/**
	 * {HTMLSelectElement} The current curve mode.
	 */
	this.mode = document.getElementById ("meridianType");
};



//##############################################################################
//	Curve methods
//##############################################################################

/**
 * Set an active curve depending of the active mode
 * @param {(Curve | String)} name - If of type curve, it is the new curve to set to the model
 * if of type String, it is the name of a predefined curve to set as active
 * @param {(EquationTypeEnum)} type - If name is of type Curve, the model needs to know the
 * type of this new curve
 * @return {void}
 */
Controller2DMeridian.prototype.setActive = function (name, type) {
	var mode = document.forms["meridianType"]["meridianTypeValue"].value
	var curve;
	// List of curves mode
	if (mode === "meridianPrimitive") {
		curve = this.modelCurve.setActive (name, type);
		this.modelParameter.setCurve(curve);
	}
	// Draw mode
	else if (mode === "meridianFreeHand") {
		curve = this.newCurve ();
	}
	// Formula mode
	else if (mode === "meridianFormula") {
		curve = this.modelCurve.setActive(name, EquationTypeEnum.EXPLICIT);
		this.modelParameter.setCurve(curve);
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode: " + mode);
	}
};

//==============================================================================
/**
 * @return {Curve} The current curve.
 */
Controller2DMeridian.prototype.getActiveCurve = function () {
	var mode = document.forms["meridianType"]["meridianTypeValue"].value;
	if (mode === "meridianPrimitive") {
		return this.modelCurve.getActiveCurve ();
	}
	else if (mode === "meridianFreeHand") {
		return this.modelDraw.getActiveCurve ();
	}
	else if (mode === "meridianFormula") {
		return this.modelCurve.getActiveCurve ();
	}
	else {
		console.error ("Controller2DMeridian.getActiveCurve: unknown drawing "
			+ "mode: " + mode);
		return null;
	}
};


//==============================================================================
/**
 * Ask the modelDraw to create a new Curve
 */
Controller2DMeridian.prototype.newCurve = function () {
	this.modelDraw.newCurve ();
};


//==============================================================================
/**
 * Closes the active drawn curve.
 *
 * @return {Point} The added point (null if not exist or already added).
 */
Controller2DMeridian.prototype.closeCurve = function () {
	return this.modelDraw.closeCurve ();
};

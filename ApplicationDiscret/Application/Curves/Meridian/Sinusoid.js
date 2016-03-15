// LICENSE /////////////////////////////////////////////////////////////////////


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


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @extends ExplicitCurve
 * @classdesc Predefined curve
 */
Sinusoid.prototype = new ExplicitCurve;
Sinusoid.prototype.constructor = Sinusoid;



//##############################################################################
//	Constructor
//##############################################################################



/**
* @constructor {Equation} the equation of the curve
*/
function Sinusoid () {
	var equation = new Equation (
		"amplitude * sin(2 * 3.14159265359 * (1 / period) * x + phase_shift)"
		+ " + amplitude + horizontal_shift"
	);

	equation.setParameter ('amplitude', 7);
	equation.setParameter ('period', 10);
	equation.setParameter ('phase_shift', 0);
	equation.setParameter ('horizontal_shift', 2);

	ExplicitCurve.call (this, equation);

	this.parametersRange['amplitude'] = new Range (2.0, 50);
	this.parametersRange['period'] = new Range (10, 30);
	this.parametersRange['phase_shift'] = new Range (0, 2 * 3.14159265359);
	this.parametersRange['horizontal_shift'] = new Range (1, 50);
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * That function compute the adequate range for the 2D rendering.
 *
 * @return {Range} - The most appropriate range for the sin wave.
 */
Sinusoid.prototype.computeRange = function () {
	var phase = Math.PI / this.equation.getParameter ('period');
	var amp = this.equation.getParameter ('amplitude');
	var décalage = Math.abs (
		amp + this.equation.getParameter ('horizontal_shift'));
	var rangeX = new Range (-(amp + décalage), amp + décalage);
	var rangeY = new Range (-phase, phase);
	if (rangeX.length () >= rangeY.length ())
		return rangeX;
	else
		return rangeY;
};

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


/* hasMessage () : bool
 * showMessage (msg : String, duration : int, color : String) : void
 * showDefaultMessage () : void
 * alertMessage (msg : String, duration : int) : void
 * validMessage (msg : String, duration : int) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @return {boolean} True if there is a message in the state bar different 
 * than the default message or empty.
 */
Application.prototype.hasMessage = function () {
	var p = $('#stateBar p').html ();
	return (p != "" && p != this.defaultMessage);
};


//==============================================================================
/**
 * Display a message in the status bar with a color.
 * 
 * @param {String} msg - The message.
 * @param {int} duration - Duration of the display of the message in millisecond
 * (0 for infinity).
 * @param {float[]} color - The color in CSS format.
 * 
 * @return {void}
 */
Application.prototype.showMessage = function (msg, duration, color) {
	var p = $('#stateBar p').html (msg);
	if (typeof duration == "number" && duration > 0)
		setTimeout (this.showMessage, duration, this.defaultMessage)
	if (!color)
		color = "black";
	p.css ("color", color);
};


//==============================================================================
/**
 * Display the default message in the status bar.
 * 
 * @return {void}
 */
Application.prototype.showDefaultMessage = function () {
	this.showMessage (this.defaultMessage);
};


//==============================================================================
/**
 * Display an alert message in red in the status bar.
 * 
 * @param {String} msg - The message.
 * @param {int} duration - Duration of the display of the message in millisecond
 * (0 for infinity).
 * 
 * @return {void}
 */
Application.prototype.alertMessage = function (msg, duration) {
	this.showMessage (msg, duration, "red");
};


//==============================================================================
/**
 * Display a validation message in green in the status bar.
 * 
 * @param {String} msg - The message.
 * @param {int} duration - Duration of the display of the message in millisecond
 * (0 for infinity).
 * 
 * @return {void}
 */
Application.prototype.validMessage = function (msg, duration) {
	this.showMessage (msg, duration, "#0c0");
};



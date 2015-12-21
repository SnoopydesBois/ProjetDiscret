/// LICENCE ////////////////////////////////////////////////////////////////////

/* Copyright (juin 2015)
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

/* active : boolean
 * frame : Frame
 * name : String
 * appli : Application
 * 
 * constructor (frame : Frame, name : String, application : Application)
 * isactive () : bool
 * setactive (active : bool) : void
 * activate () : void
 * disactivate () : void
 * pressKey (event : WindowEvent) : void
 * mouseDown (event : WindowEvent) : void
 * mouseUp (event : WindowEvent) : void
 * mouseMouv (event : WindowEvent) : void
 * scroll (event : WindowEvent) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



Controller.prototype.constructor = Controller;

/**
 * @constructor
 * @param {Frame} frame - The frame using the controller.
 * @param {String} name - The name of the controller.
 * @param {Application} application - The application 
 */
function Controller () {
//	console.log ("Controller.constructor");
	// --------------------------------------
	
	/**
	 * {boolean} true if the feature is active, false otherwise.
	 */
	this.active = false;
};


//==============================================================================
/**
 * State feature activation.
 * @return {boolean} true if the feature is active, false otherwise.
 */
Controller.prototype.isactive = function () {
//	console.log ("Controller.isactive");
	return this.active;
};


//==============================================================================
/**
 * Edit the feature activation status.
 * @param {boolean} active - The new status.
 * @return {void}
 */
Controller.prototype.setactive = function (active) {
//	console.log ("Controller.setactive");
	if (typeof active != "boolean") {
		console.error ("ERROR - Controller.setactive : bad type of parameter");
	}
	// --------------------------------------
	this.active = active;
};


//==============================================================================
/**
 * Edit the feature activation status (To on).
 * @return {void}
 * sometimes performs processing in certain functionality
 */
Controller.prototype.activate = function () {
//	console.log ("Controller.activate");
	// --------------------------------------
	this.setactive (true);
};


//==============================================================================
/**
 * Edit the feature activation status (To off)
 * @return {void}
 * sometimes performs processing in certain functionality
 */
Controller.prototype.disactivate = function () {
//	console.log ("Controller.disactivate");
	// --------------------------------------
	this.setactive (false);
};


//==============================================================================
/**
 * Button of the keyboard has been activated.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.pressKey = function (event) {
	//console.log ("Controller.pressKey");
	if (typeof event != "object") {
		console.error ("ERROR - Controller.pressKey : bad type of parameter");
	}
};


//==============================================================================
/**
 * Press the mouse button.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @param {Cube} cube - cube over which the mouse is.
 * @return {void}
 */
Controller.prototype.mouseDown = function (event, cube) {
//	console.log ("Controller.mouseDown");
	if (typeof event != "object") {
		console.error ("ERROR - Controller.mouseDown : bad type of parameter");
	}
};


//==============================================================================
/**
 * Release the mouse button.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @param {Cube} cube - cube over which the mouse is.
 * @return {void}
 */
Controller.prototype.mouseUp = function (event, cube) {
//	console.log ("Controller.mouseUp");
	if (typeof event != "object") {
		console.error ("ERROR - Controller.mouseUp : bad type of parameter");
	}
};


//==============================================================================
/**
 * Move the mouse.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @param {Cube} cube - cube over which the mouse is.
 * @return {void}
 */
Controller.prototype.mouseMouv = function (event, cube) {
//	console.log ("Controller.mouseMouv");
	if (typeof event != "object") {
		console.error ("ERROR - Controller.mouseMouv : bad type of parameter");
	}
};


//==============================================================================
/**
 * Scroll the midel button of the mouse.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @param {Cube} cube - cube over which the mouse is.
 * @return {void}
 */
Controller.prototype.scroll = function (event, cube) {
//	console.log ("Controller.scroll");
	if (typeof event != "object") {
		console.error ("ERROR - Controller.scroll : bad type of parameter");
	}
};



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
/*
 * 
 * constructor ()
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
};


//==============================================================================
/**
 * Button of the keyboard has been activated.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.pressKey = function (event) {
	throw "Controller.presskey, not implemented in abstract class";
};


//==============================================================================
/**
 * Press the mouse button.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.mouseDown = function (event) {
	throw "Controller.presskey, not implemented in abstract class";
};


//==============================================================================
/**
 * Release the mouse button.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.mouseUp = function (event) {
	throw "Controller.presskey, not implemented in abstract class";
};


//==============================================================================
/**
 * Move the mouse.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.mouseMouv = function (event) {
	throw "Controller.presskey, not implemented in abstract class";
};


//==============================================================================
/**
 * Scroll the midel button of the mouse.
 * To redefined in children classes
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
Controller.prototype.scroll = function (event) {
	throw "Controller.presskey, not implemented in abstract class";
};
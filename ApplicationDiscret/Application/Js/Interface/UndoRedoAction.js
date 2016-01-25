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


/* constructor (controllerName : String, action : *)
 * getControllerName () : String
 * getAction () : *
 * isValidAction () : boolean
 * dump () : void
 * toString () : String
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


UndoRedoAction.prototype.constructor = UndoRedoAction;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor Build an action with the name of the controller which create 
 * this action and an object which contain the data action. 
 * 
 * @param {String} controllerName - The controller name.
 * @param {*} action - Data action.
 */
function UndoRedoAction (controllerName, action) {
	if (controllerName === "" || action === null) {
		console.error ("UndoRedoAction.constructor: bad type(s) of "
			+ "parameter(s)");
		return;
	}
	
	/**
	 * {String} The controller name which execute this action.
	 */
	this.controllerName = controllerName;
	
	/**
	 * {*} The action. It's an object writen by the controller. Only it can
	 * read this action.
	 */
	this.action = action;
};



//##############################################################################
//	Accessors
//##############################################################################



/**
 * @return {String} The controller name.
 */
UndoRedoAction.prototype.getControllerName = function () {
	return this.controllerName;
};



//==============================================================================
/**
 * @return {*} The action.
 */
UndoRedoAction.prototype.getAction = function () {
	return this.action;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Check if the action was correctly constructed.
 * 
 * @return {boolean} True if valid, false otherwise.
 */
UndoRedoAction.prototype.isValidAction = function () {
	return (this.controllerName != undefined && this.action != undefined);
};



//==============================================================================
/**
 * Dump all members in the console.
 * 
 * @return {void}
 */
UndoRedoAction.prototype.dump = function () {
	console.log ("------- UndoRedoAction.dump -------");
	console.log ("controller name : " + this.controllerName);
	console.log ("action : vvv");
	console.log (this.action);
	console.log ("---------------------------");
};



//==============================================================================
/**
 * @return {String} A string representation of the action.
 */
UndoRedoAction.prototype.toString = function () {
	return "UndoRedoAction : " + this.controllerName + ", " + this.action;
};



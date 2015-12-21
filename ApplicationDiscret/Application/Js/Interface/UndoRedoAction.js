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

/* constructor (controllerName : String, UndoRedoAction : mixed)
 * getControllerName () : String
 * getUndoRedoAction () : mixed
 * isValidUndoRedoAction () : boolean
 * dump () : void
 * toString () : String
 */

/// CODE ///////////////////////////////////////////////////////////////////////



	  ///////////////////
	 /// Constructor ///
	///////////////////


UndoRedoAction.prototype.constructor = UndoRedoAction;

/**
 * @constructor Build an UndoRedoAction with the name of the controller which create 
 * this UndoRedoAction and an object which contain the data UndoRedoAction. 
 * @param {String} controllerName - the controller name.
 * @param {mixed} UndoRedoAction - data UndoRedoAction.
 */
function UndoRedoAction (controllerName, UndoRedoAction) {
//	console.log ("UndoRedoAction.constructor")
	
	if (controllerName === "" || UndoRedoAction === null) {
		console.error ("UndoRedoAction.constructor : bad parameter in constructor");
		return;
	}
	
	/**
	 * {String} The controller name which execute this UndoRedoAction.
	 */
	this.controllerName = controllerName;
	
	/**
	 * {mixed} The UndoRedoAction. It's an object writen by the controller. Only it can
	 * read this UndoRedoAction.
	 */
	this.UndoRedoAction = UndoRedoAction;
	
};


	  /////////////////
	 /// Accessors ///
	/////////////////



/**
 * @return {String} the controller name.
 */
UndoRedoAction.prototype.getControllerName = function () {
//	console.log ("UndoRedoAction.getControllerName");
	return this.controllerName;
};



//==============================================================================
/**
 * @return {mixed} the UndoRedoAction.
 */
UndoRedoAction.prototype.getUndoRedoAction = function () {
//	console.log ("UndoRedoAction.getUndoRedoAction");
	return this.UndoRedoAction;
};


	  /////////////////////
	 /// Other methods ///
	/////////////////////


/**
 * Check if the UndoRedoAction was correctly constructed.
 * @return {boolean} true if valid, false otherwise.
 */
UndoRedoAction.prototype.isValidUndoRedoAction = function () {
//	console.log ("UndoRedoAction.isValidUndoRedoAction");
	return (this.controllerName != undefined && this.UndoRedoAction != undefined);
};



//==============================================================================
/**
 * Dump all members in the console.
 * @return {void}
 */
UndoRedoAction.prototype.dump = function () {
//	console.log ("UndoRedoAction.dump");
	console.log ("------- UndoRedoAction.dump -------");
	console.log ("controller name : " + this.controllerName);
	console.log ("UndoRedoAction : vvv");
	console.log (this.UndoRedoAction);
	console.log ("---------------------------");
};



//==============================================================================
/**
 * @return {String} a string representation of the UndoRedoAction.
 */
UndoRedoAction.prototype.toString = function () {
//	console.log ("UndoRedoAction.toString");
	return "UndoRedoAction : " + this.controllerName + ", " + this.UndoRedoAction;
};



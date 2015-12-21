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

/* constructor (size : int)
 * addAction (action : UndoRedoAction) : String
 * hasUndoableAction () : boolean
 * nextUndoableAction () : UndoRedoAction
 * hasRedoableAction () : boolean
 * nextRedoableAction () : UndoRedoAction
 */


	  ///////////////////
	 /// Constructor ///
	///////////////////



ListUndoRedoAction.prototype.constructor = ListUndoRedoAction;


/**
 * @constructor
 * @param {Number} size - the maximum number of stored action.
 */
function ListUndoRedoAction (size) {
//	console.log ("ListUndoRedoAction.constructor");
	
	if (size === Number.Infinity) {
		console.error (
			"ListUndoRedoAction.constructor : size must be a finite number");
		return null;
	}
	
	/**
	 * {Number} Maximun number of undoable action.
	 */
	this.size = size;
	
	/**
	 * {UndoRedoAction[]} List of action.
	 */
	this.list = new Array (this.size);
	
	/**
	 * {Number} Index of the current undoable action.
	 */
	this.currentOffset = 0;
	
	/**
	 * {Number} Number of undoable action in the list.
	 */
	this.undoableAction = 0;
	
	/**
	 * {Number} Number of redoable action in the list.
	 */
	this.redoableAction = 0;
};



	  ///////////////
	 /// Methods ///
	///////////////



/**
 * Add an action.
 * @param {UndoRedoAction} action - The added action.
 * @return {String} The action added.
 */
ListUndoRedoAction.prototype.addAction = function (action) {
//	console.log ("ListUndoRedoAction.addAction");
	
	/// check argument
	if (action == undefined || action == null || ! action.isValidAction()) {
		console.error (
			"ListUndoRedoAction.addAction : the added action is not valid !");
		return;
	}
	
	/// addition
	this.currentOffset = (this.currentOffset + 1) % this.size;
	this.list[this.currentOffset] = action;
	this.undoableAction += (this.undoableAction == this.size) ? 0 : 1;
	if (this.redoableAction)
		this.redoableAction = 0;
	
	return "ajouté : " + action.toString();
};


//==============================================================================
/**
 * @return {boolean} true if there are undoable action, false otherwise.
 */
ListUndoRedoAction.prototype.hasUndoableAction = function () {
//	console.log ("ListUndoRedoAction.hasUndoableAction");
	return this.undoableAction != 0;
};


//==============================================================================
/**
 * @return {UndoRedoAction} the next undoable action if there is one, null 
 * otherwise.
 */
ListUndoRedoAction.prototype.nextUndoableAction = function () {
//	console.log ("ListUndoRedoAction.nextUndoableAction");
	var res = null;
	if (this.undoableAction) {
		res = this.list[this.currentOffset];
		this.currentOffset += (this.currentOffset == 0) ? this.size - 1 : -1;
		this.undoableAction--;
		this.redoableAction++;
	}
	return res;
};


//==============================================================================
/**
 * @return {boolean} true if there are redoable action, false otherwise.
 */
ListUndoRedoAction.prototype.hasRedoableAction = function () {
//	console.log ("ListUndoRedoAction.hasRedoableAction");
	return this.redoableAction != 0;
};


//==============================================================================
/**
 * @return {UndoRedoAction} the next redoable action if there is one, null 
 * otherwise.
 */
ListUndoRedoAction.prototype.nextRedoableAction = function () {
//	console.log ("ListUndoRedoAction.nextRedoableAction");
	var res = null;
	if (this.redoableAction) {
		this.currentOffset += (this.currentOffset == this.size - 1) ? 
			- this.size + 1 : 1;
		res = this.list[this.currentOffset];
		this.undoableAction++;
		this.redoableAction--;
	}
	return res;
};



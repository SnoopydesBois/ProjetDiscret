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


/* addAction (action : UndoRedoAction) : void
 * changeMeridian (name : String) : void
 * changeRevol (name : String) : void
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Store an undoable action in the undo/redo list.
 * 
 * @param {UndoRedoAction} action - The undoable action.
 * 
 * @return {void}
 */
Application.prototype.addAction = function (action) {
	if (!(action instanceof UndoRedoAction) || ! action.isValidAction ())
		console.error ("Application.addAction: argument is not an Action !");
	else 
		this.listAction.addAction (action);
	this.updateUndoRedoMenuItem ();
};


//==============================================================================
/**
 * TODO
 * @see {@link Controller2D.setActive}
 * 
 * @param {String} name - The name of the new meridian curve.
 * 
 * @return {void}
 */
Application.prototype.changeMeridian = function (name) {
	/// parameter verification
	if (! checkType (arguments, "string")) {
		throw "Application.changeMeridian: given parameter is not a string";
	}
	
	/// let's change
	this.meridianController.setActive (name);
	this.meridianView.draw ();
	
	this.meridianParameters.displayParameter(this.drawMeridian);
};


//==============================================================================
/**
 * TODO
 * @see {@link Controller2D.setActive}
 * 
 * @param {String} name - The name of the new revolution curve.
 * 
 * @return {void}
 */
Application.prototype.changeRevol = function (name) {
	/// parameter verification
	if (! checkType (arguments, "string")) {
		throw "Application.changeRevol: given parameter is not a string";
	}
	
	/// let's change
	this.revolController.setActive (name);
	this.revolView.draw ();

	this.revolutionParameters.displayParameter(this.drawRevolution);
};


//==============================================================================
Application.prototype.getAllParameters = function (name) {
	if(name === 'meridian'){
		this.meridianController.getAllParameters();
	}
	else if(name === 'revolution'){
		this.revolController.getAllParameters();
	}
};


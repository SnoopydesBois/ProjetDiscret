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


/* constructor (nameEntry : String,
 *              description : String,
 *              action : String,
 *              initState : ToolStateEnum)
 * getNameEntry () : String
 * setNameEntry (nameEntry: String) : void
 * getDescription () : String
 * setDescription (description: String) : void
 * getAction () : String
 * setAction (action: String) : void
 * getImgPath () : String
 * setImgPath (imgPath: String) : void
 * getInitMessage () : String
 * setInitMessage (initMessage: String) : void
 * getMenu () : MenuEntryEnum
 * setMenu (menu : MenuEntryEnum) : void
 * getIndexMenu () : int
 * setIndexMenu (indexMenu : int) : void
 * getIndexTool () : int
 * setIndexTool (indexTool : int) : void
 * getImgAlternateText () : String
 * setImgAlternateText (imgAlternateText: String) : void
 * getValidMessage () : String
 * setValidMessage (validMessage: String) : void
 * getWarningMessage () : String
 * setWarningMessage (warningMessage: String) : void
 * getErrorMessage () : String
 * setErrorMessage (errorMessage: String) : void
 * getInitState () : ToolStateEnum
 * setInitState (initState : ToolStateEnum) : void
 * dump () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */


EntryData.prototype.constructor = EntryData;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * @param {String} nameEntry - The name of the entry.
 * @param {String} description - The description of the entry.
 * @param {String} action - The action the entry will do.
 * @param {ToolStateEnum} initState - The state of the entryData.
 */
function EntryData (nameEntry, description, action, initState) {
//	console.log ("EntryData.constructor");
	
		/// General ///
	
	/**
	 * {String} The name of this EntryData display in menu.
	 */
	this.nameEntry = nameEntry;
	
	/**
	 * {String} A short description for title attribute.
	 */
	this.description = description;
	
	/**
	 * {String} A string for onclick attribute.
	 */
	this.action = action;
	
	/**
	 * {ToolStateEnum} The current state of this entry.
	 */
	this.initState = initState || ToolStateEnum.ACCESSIBLE;
	
	
		/// State messages ///
	
	/**
	 * {String} A message which is displayed in the state bar when this
	 * EntryData is selected.
	 */
	this.initMessage = this.nameEntry + " chargé.";
	
	/**
	 * {String} A message which is displayed in the state bar when this
	 * EntryData action is valid.
	 */
	this.validMessage = this.nameEntry + " : valide.";
	
	/**
	 * {String} A message which is displayed in the state bar when this
	 * EntryData action send a warning.
	 */
	this.warningMessage = this.nameEntry + " : attention !";
	
	/**
	 * {String} A message which is displayed in the state bar when this
	 * EntryData action send an error.
	 */
	this.errorMessage = this.nameEntry + " : erreur.";
	
	
		/// Button specification ///
	
	/**
	 * {String} A path to an image to display on a button.
	 */
	this.imgPath = "";
	
	/**
	 * {String} The alternate text for the image button.
	 */
	this.imgAlternateText = "";
	
	/**
	 * {int} The index in the tool bar. A negative or to large value places the
	 * button at the last index.
	 */
	this.indexTool = -1;
	
	
		/// menu specification ///
	
	/**
	 * {MenuEntryEnum} The menu where the option will be. TOOLS by default.
	 */
	this.menu = MenuEntryEnum.TOOLS;
	
	/**
	 * {int} The index in the tool bar. A negative or to large value places the
	 * button at the last index.
	 */
	 this.indexMenu = -1;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {String} The name EntryData.
 */
EntryData.prototype.getNameEntry = function () {
	return this.nameEntry;
};


//==============================================================================
/**
 * @param {String} nameEntry - The new name for the entry.
 * 
 * @return {void}
 */
EntryData.prototype.setNameEntry = function (nameEntry) {
	this.nameEntry = nameEntry;
};


//==============================================================================
/**
 * @return {String} the description.
 */
EntryData.prototype.getDescription = function () {
	return this.description;
};


//==============================================================================
/**
 * @param {String} description - The new description for the entry.
 * 
 * @return {void}
 */
EntryData.prototype.setDescription = function (description) {
	this.description = description;
};


//==============================================================================
/**
 * @return {String} The action associated with the entry.
 */
EntryData.prototype.getAction = function () {
	return this.action;
};


//==============================================================================
/**
 * @param {String} action - The new action.
 * 
 * @return {void}
 */
EntryData.prototype.setAction = function (action) {
	this.action = action;
};


//==============================================================================
/**
 * @return {String} The image path.
 */
EntryData.prototype.getImgPath = function () {
	return this.imgPath;
};


//==============================================================================
/**
 * @param {String} imgPath - The path of the new image.
 * 
 * @return {void}
 */
EntryData.prototype.setImgPath = function (imgPath) {
	this.imgPath = imgPath;
};


//==============================================================================
/**
 * @return {String} The message displayed when the entry is selected.
 */
EntryData.prototype.getInitMessage = function () {
	return this.initMessage;
};


//==============================================================================
/**
 * @param {String} initMessage - The new message displayed when the entry is 
 * selected.
 * 
 * @return {void}
 */
EntryData.prototype.setInitMessage = function (initMessage) {
	this.initMessage = initMessage;
};


//==============================================================================
/**
 * @return {MenuEntryEnum} The menu where to insert this EntryData.
 */
EntryData.prototype.getMenu = function () {
	return this.menu;
};


//==============================================================================
/**
 * Set the menu where to insert this EntryData.
 * 
 * @param {MenuEntryEnum} menu - The menu.
 * 
 * @return {void}
 */
EntryData.prototype.setMenu = function (menu) {
	this.menu = menu;
};


//==============================================================================
/**
 * @return {int} the index in the menu where to insert this EntryData.
 */
EntryData.prototype.getIndexMenu = function () {
	return this.indexMenu;
};


//==============================================================================
/**
 * Set the index in the menu where insert this EntryData. If it's negative or 
 * greater than the number of menu item, it will be put at the end of the menu.
 * 
 * @param {int} indexMenu - The index.
 * 
 * @return {void}
 */
EntryData.prototype.setIndexMenu = function (indexMenu) {
	var index = indexMenu;
	if (!(typeof(index) == "number")){
		throw "EntryData.setIndexMenu: index is not a number !"
	}
	if (isNaN (index)) {
		console.warn ("EntryData.setIndexMenu: index is NaN")
		index = -1;
	}
	this.indexMenu = index;
};


//==============================================================================
/**
 * @return {int} The index of the entry in the toolbar.
 */
EntryData.prototype.getIndexTool = function () {
	return this.indexTool;
};


//==============================================================================
/**
 * @param {int} indexTool - The index where to set the entry in the toolbar.
 * 
 * @return {void}
 */
EntryData.prototype.setIndexTool = function (indexTool) {
	var index = indexTool;
	if (!(typeof(index) == "number"))
		throw "EntryData.setIndexTool: index is not a number !"
	if (isNaN (index)) {
		console.warn ("EntryData.setIndexTool: index is NaN")
		index = -1;
	}
	this.indexTool = index;
};


//==============================================================================
/**
 * @return {String} The alternate text.
 */
EntryData.prototype.getImgAlternateText = function () {
	return this.imgAlternateText;
};


//==============================================================================
/**
 * @param {String} imgAlternateText - The new alternate text.
 * 
 * @return {void}
 */
EntryData.prototype.setImgAlternateText = function (imgAlternateText) {
	this.imgAlternateText = imgAlternateText;
};


//==============================================================================
/**
 * @return {String} the message associated to a valid action.
 */
EntryData.prototype.getValidMessage = function () {
	return this.validMessage;
};


//==============================================================================
/**
 * @param {String} validMessage - The message associated to a valid action.
 * 
 * @return {void}
 */
EntryData.prototype.setValidMessage = function (validMessage) {
	this.validMessage = validMessage;
};


//==============================================================================
/**
 * @return {String} The message when the action send a warning.
 */
EntryData.prototype.getWarningMessage = function () {
	return this.warningMessage;
};


//==============================================================================
/**
 * @param {String} warningMessage - The warning message.
 * 
 * @return {void}
 */
EntryData.prototype.setWarningMessage = function (warningMessage) {
	this.warningMessage = warningMessage;
};


//==============================================================================
/**
 * @return {String} The error message.
 */
EntryData.prototype.getErrorMessage = function () {
	return this.errorMessage;
};


//==============================================================================
/**
 * @param {String} errorMessage - The error message.
 * 
 * @return {void}
 */
EntryData.prototype.setErrorMessage = function (errorMessage) {
	this.errorMessage = errorMessage;
};


//==============================================================================
/**
 * @return {ToolStateEnum} The state of the entry.
 */
EntryData.prototype.getInitState = function () {
	return this.initState;
};


//==============================================================================
/**
 * @param {ToolStateEnum} initState - The state of the entry.
 * 
 * @return {void}
 */
EntryData.prototype.setInitState = function (initState) {
	this.initState = initState;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Dump some attributes on the console.
 * 
 * @return {void}
 */
EntryData.prototype.dump = function () {
	console.log ("name : " + this.nameEntry);
	console.log ("description : " + this.description);
	console.log ("action : " + this.action);
	console.log ("image path : " + this.imgPath);
	console.log ("state bar message : " + this.stateBarMessage);
};



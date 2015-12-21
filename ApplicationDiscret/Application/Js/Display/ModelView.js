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


/* modelController : ModelController
 *
 * ModelView(modelController : ModelController, name : string, shader : Shader)
 * prepare(gl : GLContext) : void
 * draw(gl : GLContext) : void
 * prepareSelection(gl : GLContext) : void
 * prepareHover(gl : GLContext) : void
 * backBufferDraw(gl : GLContext) : void
 * getModelController() : ModelController
 */

/// CODE ///////////////////////////////////////////////////////////////////////



ModelView.prototype = new GenericStructure();
ModelView.prototype.constructor = ModelView;

/**
 * @constructor
 * @param {ModelController} modelController - the model to display.
 * @param {String} name - the name of the model.
 * @param {Shader} shader - a shader for display.
 */
function ModelView(modelController, name, shader) {
	//console.log ("ModelView.constructor ");
	if (arguments.length!=0 && (typeof modelController != "object"
			|| typeof name != "string"
			|| typeof shader != "object")) {
		console.error ("ERROR - ModelView.constructor : bad type of parameter");
	}
	// --------------------------------------
	this.modelController = modelController;
	GenericStructure.call(this, name, shader);
};


//==============================================================================
/**
 * Prepare the model (create the triangles).
 * @param {GLContext} gl - the gl context.
 * @param {int} nb - number of buffer to prepare
 * (if undefined then all buffer are prepared).
 * @return {void}
 */
ModelView.prototype.prepare = function (gl, nb) {
	//console.log ("ModelView.prepare");
	if (typeof gl != "object"
			|| (typeof nb != "number" && typeof nb != "undefined")) {
		console.error ("ERROR - ModelView.prepare : bad type of parameter");
	}
	// --------------------------------------
	this.prepareSelection(gl, nb);
	this.prepareHover(gl, nb);
};


//==============================================================================
/**
 * To overload.
 * Draw the model (draw the triangles).
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView.prototype.draw = function (gl) {
	//console.log ("ModelView.draw");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView.draw : bad type of parameter");
	}
};


//==============================================================================
/**
 * Prepare the selection of model (create the triangles).
 * To overload.
 * @param {GLContext} gl - the gl context
 * @param {int} nb - number of buffer to prepare 
 * (if undefined then all buffet are prepared)
 * @return {void}
 */
ModelView.prototype.prepareSelection = function (gl, nb) {
	//console.log ("ModelView.prepareSelection");
	if (typeof gl != "object"
			|| (typeof nb != "number" && typeof nb != "undefined")) {
		console.error ("ERROR - ModelView.prepareSelection : bad type of "
			+ "parameter");
	}
};


//==============================================================================
/**
 * Prepare the hover of model (create the triangles).
 * To overload.
 * @param {GLContext} gl - the gl context.
 * @param {int} nb - number of buffer to prepare
 * (if undefined then all buffer are prepared).
 * @return {void}
 */
ModelView.prototype.prepareHover = function (gl, nb) {
	//console.log ("ModelView.prepareHover");
	if (typeof gl != "object"
			|| (typeof nb != "number" && typeof nb != "undefined")) {
		console.error ("ERROR - ModelView.prepareHover : bad type of parameter");
	}
};


//==============================================================================
/**
 * Draw the model for picking.
 * To overload.
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView.prototype.backBufferDraw = function (gl) {
	//console.log ("ModelView.backBufferDraw");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView.backBufferDraw : bad type of "
			+ "parameter");
	}
};


//==============================================================================
/**
 * @return {ModelController} the model controller.
 */
ModelView.prototype.getModelController = function () {
	//console.log ("ModelView3D.getModelController");
	// --------------------------------------
	return this.modelController;
};



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


/* name : String
 * matrix : Matrix
 * shader : Shader
 * isDisplayable : bool
 *
 * constructor (name : String, shader : Shader)
 *
 * getName () : String
 * setName (aName : String) : void
 * getMatrix () : Matrix
 * setMatrix (aMatrix : Matrix) : void
 * getShader () : Shader
 * setShader (aShader : Shader) : void
 * setDisplay (isDisplayable : bool) : void
 * displayMe () : bool
 * prepare (gl; glContext) : void
 * hoverPrepare (gl; glContext) : void
 * draw (gl; glContext, scn : Scene) : void
 * backDraw (gl; glContext, scn : Scene) : void
 * addAPoint (data : Array, X : float, Y : float, Z : float) : int
 * addAColor (data : Array, R : float, G : float, B : float, A : float) : int
 * addANormal (data : Array, X : float, Y : float, Z : float) : int
 * addATangent (data : Array, X : float, Y : float, Z : float) : int
 * addABitangent (data : Array, X : float, Y : float, Z : float) : int
 * addABitangent (data : Array, U : float, V : float) : int	
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Class to manage an object (you must inherit from this class).
 */



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {String} name - The name of the structure.
 * @param {Shader} shader - The shader used to draw the structure.
 */
function GenericStructure (name, shader) {
	
	if (arguments.length !== 0 // GenericStructure is a super class.
		&& !(typeof name === "string"
		&& shader instanceof Shader)) 
	{
		console.error ("GenericStructure.constructor : bad type(s) of " + 
			"parameter(s)");
		showType (name, shader);
		return;
	}
	
	/**
	 * {String} Name of object to use.
	 */
	this.structureName = name;
	
	/**
	 * {Matrix} Current object matrix. FIXME compléter.
	 */
	this.matrix = new Matrix ();
	
	/**
	 * {Shader} Shader to use to render the current object.
	 */
	this.shader = shader; 
	
	/**
	 * {boolean} Indicate if the structure is displayable. True by default.
	 */
	this.isDisplayable = true;
	
	/**
	 * {boolean} Indicate if the structure is pickable. True by default.
	 */
	this.isPickable = true;
	
	/**
	 * TODO
	 */
	this.glVertexBuffer = [];
	
	/**
	 * TODO
	 */
	this.glBackBuffer = [];
	
	/**
	 * TODO
	 */
	this.glIndicesBuffer = [];
	
	/**
	 * {boolean} TODO
	 */
	this.prepared = false;
}



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Controller} the model controller.
 */
GenericStructure.prototype.getModelController = function () {
	return this.modelController;
};


//==============================================================================
/**
 * Set the model controller.
 * 
 * @param {Controller} newController - The new model controller.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setModelController = function (newController) {
	if (newController instanceof Controller)
		this.modelController = newController;
	else
		throw "GenericStructure.setModelController: argument is not a " 
			+ "Controller";
};


//==============================================================================
/**
 * @return {String} the name of the structure.
 */
GenericStructure.prototype.getName = function () {
	return this.structureName;
};


//==============================================================================
/**
 * Set name of current structure.
 * 
 * @param {String} aName - the new name of the structure.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setName = function (aName) {
	if (typeof aName === "string")
		this.structureName = aName;
	else
		throw "GenericStructure.setName: argument is not a String";
};


//==============================================================================
/**
 * @return {Matrix} the structure matrix.
 */
GenericStructure.prototype.getMatrix = function () {
	return this.matrix;
};


//==============================================================================
/**
 * Set ModelMatrix.
 * 
 * @param {Matrix} aMatrix - the new matrix for the structure.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setMatrix = function (aMatrix) {
	if (aMatrix instanceof Matrix)
		this.matrix = aMatrix;
	else
		throw "GenericStructure.setMatrix: argument is not a Matrix";
};


//==============================================================================
/**
 * @return {Shader} the structure shader.
 */
GenericStructure.prototype.getShader = function () {
	return this.shader; 
};


//==============================================================================
/**
 * Set the shader.
 * 
 * @param {Shader} aShader - the new shader for the structure.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setShader = function (aShader) {
	if (aShader instanceof Shader)
		this.shader = aShader;
	else
		throw "GenericStructure.setShader: argument is not a Shader";
};


//==============================================================================
/**
 * @return {boolean} true if the structure should be displayed, false otherwise.
 */
GenericStructure.prototype.displayMe = function () {
	return this.isDisplayable;
};


//==============================================================================
/**
 * Set if the structure should be display.
 * 
 * @param {boolean} isDisplayable - true if the structure should be displayed,
 * false otherwise.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setDisplay = function (isDisplayable) {
	if (typeof (isDisplayable) === "boolean")
		this.isDisplayable = isDisplayable;
	else
		throw "GenericStructure.setDisplay: argument is not a boolean";
};


//==============================================================================
/**
 * @return {boolean} True if the structure is pickable, false otherwise.
 */
GenericStructure.prototype.isPickable = function () {
	return this.isPickable;
};


//==============================================================================
/**
 * Set if the structure is pickable.
 * 
 * @param {boolean} isDisplayable - True if the structure is pickable, false
 * otherwise.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
GenericStructure.prototype.setPickable = function (isPickable) {
	if (typeof (isPickable) === "boolean")
		this.isPickable = isPickable;
	else
		throw "GenericStructure.setPickable: parameter is not a boolean";
};


//==============================================================================
/**
 * @return {boolean} True if this object is already prepared, false otherwise.
 */
GenericStructure.prototype.isPrepared = function () {
	return this.prepared;
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * @abstract
 * Warning : In order to use the shader, you need to ask it about the attributes
 * it needs ...
 * @param {glContext} gl - The webGl context.
 * 
 * @return {void}
 */
GenericStructure.prototype.prepare = function (gl) {};


//==============================================================================
/**
 * @abstract
 * Draw an object.
 * 
 * @param {glContext} gl - The webGl context.
 * 
 * @return {void}
 */
GenericStructure.prototype.draw = function (gl) {};


//==============================================================================
/**
 * @abstract
 * Draw an objects with differents color to implements the picking.
 * 
 * @param {glContext} gl - The webGl context.
 * 
 * @return {void}
 */
GenericStructure.prototype.drawBackBuffer = function (gl) {};


//==============================================================================
///**
// * Show the model. Prepare the model and draw it. Prepare and draw the picking.
// * 
// * @return {void}
// */
//GenericStructure.prototype.show = function () {
//	this.prepare ();
//	this.draw ();
//	this.drawBackBuffer ();
//};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Add a position into an array of data.
 * 
 * @param {Array} data - The array to push position's coordinate into.
 * @param {(float | float[3])} X - The X coordinate (if it is a float value) or
 * all coordinates (if it is an array) of the point.
 * @param {float} [Y] - The Y coordinate of the point. Mandatory if X is a float
 * value.
 * @param {float} [Z] - The Z coordinate of the point. Mandatory if X is a float
 * value.
 * 
 * @return {int} 0 if the shader doesn't accept position, 3 otherwise.
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addAPoint = function (data, X, Y, Z) {
	if (! this.shader.hasAttribute (AttributeEnum.position)) {
		return 0;
	}
	
	if (X instanceof Array) { // If X is an Array
		data.push (X[0], X[1], X[2]);
	}
	else if (Z === undefined) { // If one parameter is missing
		throw "GenericObject.addAPoint: missing parameter (typeof X: "
				+ typeof X + ")";
	}
	else { // X, Y, Z are 3 coordinates
		data.push (X, Y, Z);
	}
	
	return 3;
};


//==============================================================================
/**
 * Add a color into an array of data.
 * 
 * @param {Array} data - The array to push color's component into.
 * @param {(flaot | float[4])} R - The Red value (if it is a float value) or the
 * four color component (if it is an array) to push into data.
 * @param {float} [G] - The Green value to push into data. Mandatory if R is a
 * float value.
 * @param {float} [B] - The Blue value to push into data. Mandatory if R is a
 * float value.
 * @param {float} [A] - The Alpha value to push into data. Mandatory if R is a
 * float value.
 * 
 * @return {int} 0 if the shader doesn't accept color, 4 otherwise 
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addAColor = function (data, R, G, B, A) {
	if (! this.shader.hasAttribute (AttributeEnum.color)) {
		return 0;
	}
	
	if (R instanceof Array) { // If R is an array
		data.push (R[0], R[1], R[2], R[3]);
	}
	else if (A === undefined) { // If one parameter is missing
		throw "GenericObject.addAColor: missing parameter (typeof R: "
				+ typeof R + ")";
	}
	else { // R, G, B, A are 4 values
		data.push (R, G, B, A);
	}
	return 4;
};


//==============================================================================
/**
 * Add a normal into an array of data.
 * 
 * @param {Array} data - The array to push normal's coordinate into.
 * @param {(float | float[3])} X - The X coordinate (if it is a float value) or
 * all coordinates (if it is an array) of the normal.
 * @param {float} [Y] - The Y coordinate of the normal. Mandatory if X is a
 * float value.
 * @param {float} [Z] - The Z coordinate of the normal. Mandatory if X is a
 * float value.
 * 
 * @return {int} 0 if the shader doesn't accept normal, 3 otherwise.
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addANormal = function (data, X, Y, Z) {
	if (! this.shader.hasAttribute (AttributeEnum.normal)) {
		return 0;
	}
	
	if (X instanceof Array) { // If X is an array
		data.push (X[0], X[1], X[2]);
	}
	else if (Z === undefined) { // If one parameter is missing
		throw "GenericObject.addANormal: missing parameter (typeof X: "
				+ typeof X + ")";
	}
	else { // X,Y,Z are 3 values
		data.push (X, Y, Z);
	}
	return 3;
};


//==============================================================================
/**
 * Add a tangent into an array of data.
 * 
 * @param {Array} data - The array to push tangent's coordinate into.
 * @param {(float | float[3])} X - The X coordinate (if it is a float value) or
 * all coordinates (if it is an array) of the tangent.
 * @param {float} [Y] - The Y coordinate of the tangent. Mandatory if X is a
 * float value.
 * @param {float} [Z] - The Z coordinate of the tangent. Mandatory if X is a
 * float value.
 * 
 * @return {int} 0 if the shader doesn't accept tangent, 3 otherwise.
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addATangent = function (data, X, Y, Z) {
	if (! this.shader.hasAttribute (AttributeEnum.tangent)) {
		return 0;
	}
	
	if (X instanceof Array) { // If X is an array
		data.push (X[0], X[1], X[2]);
	}
	else if (Z === undefined) { // If one parameter is missing
		throw "GenericObject.addATangent: missing parameter (typeof X: "
				+ (typeof X) + ")";
	}
	else { // X, Y, Z are 3 values
		data.push (X, Y, Z);
	}
	return 3;
};


//==============================================================================
/**
 * Add a bitangent into an array of data.
 * 
 * @param {Array} data - The array to push bitangent's coordinate into.
 * @param {(float | float[3])} X - The X coordinate (if it is a float value) or
 * all coordinates (if it is an array) of the normal.
 * @param {float} [Y] - The Y coordinate of the normal. Mandatory if X is a
 * float value.
 * @param {float} [Z] - The Z coordinate of the normal. Mandatory if X is a
 * float value.
 * 
 * @return {int} 0 if the shader doesn't accept tangent, 3 otherwise.
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addABitangent = function (data, X, Y, Z) {
	if (! this.shader.hasAttribute (AttributeEnum.bitangent)) {
		return 0;
	}
	
	if (X instanceof Array) { // If X is an array
		data.push (X[0], X[1], X[2]);
	}
	else if (Z === undefined) { // If one parameter is missing
		throw "GenericObject.addABitangent: missing parameter (typeof X: "
				+ typeof X + ")";
	}
	else { // X,Y,Z are 3 values
		data.push (X, Y, Z);
	}
	return 3;
};


//==============================================================================
/**
 * Add texture coordinates into an array of data.
 * 
 * @param {Array} data - the array to push texture coordinates into.
 * @param {(float | float[3])} U - The U texture coordinate (if it is a float
 * value) or all coordinates (if it is an array) of the texture coordinates.
 * @param {float} [V] - The V texture coordinate. Mandatory if X is a float
 * value.
 * 
 * @return {int} 0 if the shader doesn't accept textureCoordinates, 2 otherwise.
 * FIXME expliquer le valeur de retour, les changer si besion
 */
GenericStructure.prototype.addTextureCoordinates = function (data, U, V) {
	if (! this.shader.hasAttribute (AttributeEnum.texcoord)) {
		return 0;
	}
	
	if (U instanceof Array) { // If U is an array
		data.push (U[0], U[1]);
	}
	else if (V === undefined) { // If one parameter is missing
		throw "GenericObject.addTextureCoordinates: missing parameter " +
				+ "(typeof U: " + typeof U + ")";
	}
	else { // U, V are 2 values
		data.push (U, V);
	}
	return 2;
};



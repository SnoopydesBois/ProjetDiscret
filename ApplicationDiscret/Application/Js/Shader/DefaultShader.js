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


/* constructor (gl : glContext)
 * setMode (mode : int) : void
 * getMode () : int
 * setAttributes (gl : glContext, vbo : buffer) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends Shader
 * @classdesc TODO
 */
DefaultShader.prototype = new Shader;
DefaultShader.prototype.constructor = DefaultShader;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {glContext} gl - The gl context.
 */
function DefaultShader (gl) {
//	console.log ("DefaultShader.constructor");
	Shader.call (this, "default",
		"./Js/Shader/default.vs",
		"./Js/Shader/default.fs",
		gl,
		DefaultShader.prototype.attributes
	);
	
	/**
	 * TODO
	 */
	this.mode = 2;
};


//==============================================================================
/**
 * Define the attributes used by the shader
 */
DefaultShader.prototype.attributes = [
	AttributeEnum.position,
	AttributeEnum.color
];


//==============================================================================
/**
 * Set a mode for the shader to use to render.
 * @param {int} mode - The mode to set.
 * @return {void}
 */
DefaultShader.prototype.setMode = function (mode) {
//	console.log ("DefaultShader.setMode");
	this.mode = mode;
};


//==============================================================================
/**
 * @return {int} The mode used to render by the shader.
 */
DefaultShader.prototype.getMode = function () {
//	console.log ("DefaultShader.getMode");
	return this.mode;
};


//==============================================================================
/**
 * Set the attributes for the shader.
 * @param {glContext} gl - the gl context.
 * @param {buffer} vbo - the buffer data.
 * @return {void}
 */
DefaultShader.prototype.setAttributes = function (gl, vbo) {
//	console.log ("DefaultShader.setAttributes");
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	
	// Get Position attribute
	var attrPos = this.getAttributeLocation ("aPosition");
	
	// Get Color attribute
	var attrCol = this.getAttributeLocation ("aColor");
	
	// Activate Attribute
	gl.enableVertexAttribArray (attrPos);
	gl.enableVertexAttribArray (attrCol);
	
	// Fill all parameters for rendering
	gl.vertexAttribPointer (attrPos, 3, gl.FLOAT, false, 28, 0);
	gl.vertexAttribPointer (attrCol, 4, gl.FLOAT, false, 28, 12);
	
	var uloc = this.getUniformLocation ("uMode");
	this.glContext.uniform1i (uloc, this.mode);
};



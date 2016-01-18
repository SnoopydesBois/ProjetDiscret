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


/* constructor (glContext : glContext)
 * setMode (mode : int) : void
 * getMode () : int
 * setAttributes (glContext : glContext, vbo : buffer) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends Shader
 * @classdesc TODO
 */
DefaultShader.prototype = new Shader;
DefaultShader.prototype.constructor = DefaultShader;



//##############################################################################
//	Static attributes
//##############################################################################



/**
 * @static
 * 
 * Define the attributes used by the shader
 */
DefaultShader.prototype.attributes = [
	AttributeEnum.position,
	AttributeEnum.color
];


//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * webGl context.
 */
function DefaultShader (glContext) {
	Shader.call (this,
		"default",
		"./Js/Shader/default.vs",
		"./Js/Shader/default.fs",
		glContext,
		DefaultShader.prototype.attributes
	);
	
	/**
	 * {RenderingModeEnum} The current rendering mode.
	 */
	this.renderingMode = RenderingModeEnum.NORMAL;
};



//##############################################################################
//	Accessors and mutators
//##############################################################################



/**
 * Set the rendering mode for the shader. If the mode is not correct, nothing 
 * happend. TODO vérifier anglais.
 * @see {@link RenderingModeEnum}
 * 
 * @param {int} mode - The mode to set.
 * 
 * @return {void}
 */
// Anciennement nommé setMode 
DefaultShader.prototype.setRenderingMode = function (mode) {
	if (! isValueOfEnum (RenderingModeEnum, mode))
		console.error ("DefaultShader.setRenderingMode : give a correct mode");
	else
		this.renderingMode = mode;
};
DefaultShader.prototype.setMode = function (m) {
	this.setRenderingMode (m);
	console.error ("Cette methode à été renommé, il faut utiliser DefaultShader.setRenderingMode");
}


//==============================================================================
/**
 * @return {RenderingModeEnum} The mode used to render by the shader.
 */
DefaultShader.prototype.getRenderingMode = function () {
	return this.renderingMode;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Set the attributes for the shader.
 * 
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * webGl context.
 * @param {buffer} vertexBuffer - The buffer data. FIXME bad type
 * 
 * @return {void}
 */
DefaultShader.prototype.setAttributes = function (glContext, vertexBuffer) {
	glContext.bindBuffer (glContext.ARRAY_BUFFER, vertexBuffer);
	
	// Get attribute
	var attrPos = this.getAttributeLocation ("aPosition");
	var attrCol = this.getAttributeLocation ("aColor");
	
	// Activate Attribute
	glContext.enableVertexAttribArray (attrPos);
	glContext.enableVertexAttribArray (attrCol);
	
	// Fill all parameters for rendering
	glContext.vertexAttribPointer (attrPos, 3, glContext.FLOAT, false, 28, 0);
	glContext.vertexAttribPointer (attrCol, 4, glContext.FLOAT, false, 28, 12);
	
	var attrMode = this.getUniformLocation ("uMode");
	this.glContext.uniform1i (attrMode, this.renderingMode);
};



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
 * TODO
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* renderingMode : RenderingModeEnum
 * 
 * DefaultShader ()
 * 
 * setRenderingMode (mode : RenderingModeEnum) : void
 * getRenderingMode () : RenderingModeEnum
 * setAttributes (
 *     glContext : WebGLRenderingContext,
 *     vertexBuffer : WebGLBuffer,
 *     viewMode : int,
 *     radius : float
 * ) : void
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends Shader
 * @classdesc Default shader for the application. Set all uniform and attribute
 * variable of the shader.
 */
DefaultShader.prototype = new Shader;
DefaultShader.prototype.constructor = DefaultShader;



//##############################################################################
//	Static attributes
//##############################################################################



/**
 * @static
 * 
 * {AttributeEnum[]} Defines the attributes used by the shader
 */
DefaultShader.attributes = [
	AttributeEnum.position,
	AttributeEnum.color
];



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {WebGLRenderingContext} glContext - The webGl context.
 */
function DefaultShader (glContext) {
	Shader.call (this,
		"default",
		vertSrc,
		fragSrc,
		glContext,
		DefaultShader.attributes
	);
	
	/**
	 * {RenderingModeEnum} The current rendering mode.
	 */
	this.renderingMode = RenderingModeEnum.NORMAL;
}



//##############################################################################
//	Accessors and mutators
//##############################################################################



/**
 * Sets the rendering mode for the shader. If the mode is not correct, nothing 
 * happens.
 * @see {@link RenderingModeEnum}
 * 
 * @param {RenderingModeEnum} mode - The new mode.
 * 
 * @return {void}
 */
DefaultShader.prototype.setRenderingMode = function (mode) {
	if (! isValueOfEnum (RenderingModeEnum, mode))
		console.error ("DefaultShader.setRenderingMode : give a correct mode");
	else
		this.renderingMode = mode;
};


//==============================================================================
/**
 * @return {RenderingModeEnum} The current mode.
 */
DefaultShader.prototype.getRenderingMode = function () {
	return this.renderingMode;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Sets attributes of the shader.
 * 
 * @param {WebGLRenderingContext} glContext - The webGl context.
 * @param {WebGLBuffer} vertexBuffer - The buffer data.
 * @param {int} viewMode - 1 for perspective or 0 for orthographic.
 * @param {float} radius - Cubes' radius (i.e. voxels' radius).
 * 
 * @return {void}
 */
DefaultShader.prototype.setAttributes = function (glContext, vertexBuffer,
	viewMode, radius) 
{
	/// parameters verification
	if (! checkType (arguments, WebGLRenderingContext, WebGLBuffer, "number")) {
		console.trace ();
		throw "DefaultShader.setAttributes: bad type(s) of parameter(s)"
	}
	glContext.bindBuffer (glContext.ARRAY_BUFFER, vertexBuffer);
	
	// Get attribute
	var attrPos = this.getAttributeLocation ("aPosition");
	var attrCol = this.getAttributeLocation ("aColor");
	var attrMode = this.getUniformLocation ("uMode");
	var attrVMode = this.getUniformLocation ("uViewMode");
	var attrRadius = this.getUniformLocation ("uRadius");
	
	// Activate Attribute
	glContext.enableVertexAttribArray (attrPos);
	glContext.enableVertexAttribArray (attrCol);
	
	// Fill all parameters for rendering
	glContext.vertexAttribPointer (attrPos, 3, glContext.FLOAT, false, 28, 0);
	glContext.vertexAttribPointer (attrCol, 4, glContext.FLOAT, false, 28, 12);
	
	glContext.uniform1i (attrMode, this.renderingMode);
	glContext.uniform1i (attrVMode, viewMode);
	glContext.uniform1f (attrRadius, radius);
};



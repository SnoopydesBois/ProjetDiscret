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


/* constructor (name : String,
 *              vertexSourceText : String,
 *              fragmentSourceText : String,
 *              gl : glContext,
 *              attributes : Attribute)
 * reload () : void
 * prepareShader () : void
 * setActive () : void
 * getName () : String
 * getUniformLocation (aName : String) : WebGLUniformLocation
 * getAttributeLocation (aName : String) : int
 * getAttribute (attrib : Object) : boolean
 */


/// CODE ///////////////////////////////////////////////////////////////////////



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * Class for managing shaders.
 * 
 * @param {String} name - Name of the shader.
 * @param {String} vertexSource - The vertex shader source code.
 * @param {String} fragmentSource - The fragment shader source code.
 * @param {(CanvasRenderingContext2D | WebGLRenderingContext)} glContext - The
 * webGl context.
 * @param {AttributeEnum[]} attributes - attributes of the shader.
 */
function Shader (name, vertexSource, fragmentSource, glContext, 
	attributes) 
{
	
	/**
	 * {String} The name of the shader.
	 */
	this.shaderName = name;
	
	/**
	 * {String} The vertex shader source code.
	 */
	this.vertexShaderSource = vertexSource;
	
	/**
	 * {String} The fragment shader source code.
	 */
	this.fragmentShaderSource = fragmentSource;
	
	/**
	 * {AttributeEnum[]} A list of attributes for the shader. FIXME mal exprimé, mal expliqué
	 */
	this.attributes = attributes;
	
	/**
	 * {WebGLProgram} The webGl program.
	 */
	this.program = null;
	
	/**
	 * {WebGLShader} The gl vertex shader.
	 */
	this.vertexShad = null;
	
	/**
	 * {WebGLShader} The gl fragment shader.
	 */
	this.fragmentShad = null; 
	
	/**
	 * {(CanvasRenderingContext2D | WebGLRenderingContext)} A reference to the
	 * using gl context.
	 */
	this.glContext = glContext; 
	
	// Compile shader
	if (this.glContext)
		this.reload ();
};



//##############################################################################
//	Accessors
//##############################################################################



/**
 * @return {String} The name the shader.

 */
Shader.prototype.getName = function () {
	return this.shaderName;
};



//##############################################################################
//	Gl program
//##############################################################################



/**
 * Load/reload the shaders.
 * 
 * @return {void}
 * @throws {String} TODO
 */
Shader.prototype.reload = function () {
	var gl = this.glContext;
	
	if (gl !== undefined) {
		gl.clear (gl.COLOR_BUFFER_BIT);
		this.prepareShader ();
	}
	else
		throw "Shader.reload: gl context does not exist !";
};


//==============================================================================
/**
 * Compile and link shader.
 * 
 * @return {void}
 */
Shader.prototype.prepareShader = function () {
	var gl = this.glContext; 
	
	/// Vertex shader
	this.vertexShad = createShader (
		gl, 
		gl.VERTEX_SHADER,
		this.vertexShaderSource
	);
	
	/// Fragment shader
	this.fragmentShad = createShader (
		gl,
		gl.FRAGMENT_SHADER,
		this.fragmentShaderSource
	);
	
	if (this.vertexShad === null || this.fragmentShad === null) {
		console.error ("Shader.prepareShader: shader creation failed");
		return;
	}
	
	/// Program
	this.program = createProgram (gl, this.vertexShad, this.fragmentShad);
};


//==============================================================================
/**
 * Make shader active.
 * 
 * @return {void}
 */
Shader.prototype.activate = function () {
	this.glContext.useProgram (this.program); 
};

Shader.prototype.setActive = function () {
	console.error ("Cette methode à été renommé, il faut utiliser Shader.activate"); 
	this.activate ();
};


//==============================================================================
/**
 * Get uniform location given a name.
 * !!!!! Shader must be active before using this function !
 * @see activate()
 * 
 * @param {String} aName - The name of the uniformLocation.
 * 
 * @return {WebGLUniformLocation} The uniformLocation from the program.
 */
Shader.prototype.getUniformLocation = function (aName) {
	if (typeof aName !== "string") {
		console.error ("Shader.getUniformLocation: the given name is not a "
			+ "string !");
		return;
	}
	return this.glContext.getUniformLocation (this.program, aName);
};


//==============================================================================
/**
 * Get attribute location given a name.
 * !!!!! Shader must be active before using this function !
 * @see activate()
 * 
 * @param {String} aName - The name of the attribute.
 * 
 * @return {int} The attribLocation from the program.
 */
Shader.prototype.getAttributeLocation = function (aName) {
	if (typeof aName !== "string") {
		console.error ("Shader.getAttributeLocation: the given name is not a "
			+ "string !");
		return;
	}
	return this.glContext.getAttribLocation (this.program, aName);
};


//==============================================================================
/**
 * Get the attribute list, necessary to construct the vertex buffer.
 * 
 * @param {AttributeEnum} attrib - An attribute.
 * 
 * @return {boolean} True if the attribute exist, false otherwise.
 */
Shader.prototype.hasAttribute = function (attrib) {
	var len = this.attributes.length;
	
	for (var i = 0; i < len; ++i) {
		if (this.attributes[i] === attrib)
			return true;
	}
	return false;
};
Shader.prototype.getAttribute = function (attrib) {
	console.error ("Cette methode à été renommé, il faut utiliser Shader.hasAttribute"); 
	this.hasAttribute (attrib);
};



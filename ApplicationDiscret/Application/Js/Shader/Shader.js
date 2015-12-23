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



/**
 * Class for managing shaders.
 * @constructor
 * @param {String} name - name of the shader.
 * @param {String} vertexSourceText - the name of the file containing the
 * vertex shader.
 * @param {String} fragmentSourceText - the name of the file containing the
 * fragment shader.
 * @param {glContext} gl - the gl context.
 * @param {Attribute} attributes - the attributes of the shader.
 */
function Shader (name, vertexSourceText, fragmentSourceText,
	gl, attributes)
{
//	console.log ("Shader.constructor");
	this.shaderName = name; 
	this.vertexShaderName = vertexSourceText;
	this.fragmentShaderName = fragmentSourceText;
	this.attributes = attributes;

	this.program = null;
	this.vertexShad = null;
	this.fragmentShad = null; 
	
	// Keep gl context 
	this.glContext = gl; 
	
	// Compile shader 
	this.reload();
};


//==============================================================================
/**
 * Load/reload the shaders.
 * @return {void}
 */
Shader.prototype.reload = function () {
	if (this.glContext !== undefined) {
		this.prepareShader();
	}
}


//==============================================================================
/**
 * Compile and link shader.
 * @return {void}
 */
Shader.prototype.prepareShader = function () {
//	console.log ("Shader.prepareShader");
	this.vertexSourceText = LoadFileSync(this.vertexShaderName);
	this.fragmentSourceText = LoadFileSync(this.fragmentShaderName);
	
	var gl = this.glContext; 
	
	// Create vertex shader 
	this.vertexShad = gl.createShader (gl.VERTEX_SHADER);
	
	// Compile vertex shader 
	gl.shaderSource (this.vertexShad, this.vertexSourceText);
	gl.compileShader (this.vertexShad);
	
	if (!gl.getShaderParameter (this.vertexShad, gl.COMPILE_STATUS)) {
		console.log ("Vertex shader: " + gl.getShaderInfoLog(this.vertexShad));
	}
	
	// Create fragment shader 
	this.fragmentShad = gl.createShader (gl.FRAGMENT_SHADER); 
	gl.shaderSource (this.fragmentShad, this.fragmentSourceText);
	gl.compileShader (this.fragmentShad);
	
	if (!gl.getShaderParameter (this.fragmentShad, gl.COMPILE_STATUS)) {
		console.log (gl.getShaderInfoLog(this.fragmentShad));
	}
	
	// Compile and link program
	this.program = gl.createProgram();
	gl.attachShader (this.program, this.vertexShad);
	gl.attachShader (this.program, this.fragmentShad);
	gl.linkProgram (this.program);
	
	if (! gl.getProgramParameter (this.program, gl.LINK_STATUS)) {
		console.error ("Could not initialise shaders");
	}
};


//==============================================================================
/**
 * Make shader active 
 * @return {void}
 */
Shader.prototype.setActive = function () {
	this.glContext.useProgram (this.program); 
};


//==============================================================================
/**
 * @return {String} the name the shader
 */
Shader.prototype.getName = function () {
	return this.shaderName;
};


//==============================================================================
/**
 * Get uniform location given a name.
 * !!!!! Shader must be active before using this function !
 * @param {String} aName - the name of the uniformLocation.
 * @return {WebGLUniformLocation} the uniformLocation from the program.
 */
Shader.prototype.getUniformLocation = function (aName) {
	return this.glContext.getUniformLocation (this.program, aName);
};


//==============================================================================
/**
 * Get attribute location given a name.
 * !!!!! Shader must be active before using this function !
 * @param {String} aName - the name of the attribute.
 * @return {int} the attribLocation from the program.
 */
Shader.prototype.getAttributeLocation = function (aName) {
	return this.glContext.getAttribLocation (this.program, aName);
};


//==============================================================================
/**
 * Get the attribute list, necessary to construct the VBO.
 * @param {Object} attrib - the list of attribute.
 * @return {boolean} true if the attribute exist, false otherwise.
 */
Shader.prototype.getAttribute = function (attrib) {
	for (var i = 0; i < this.attributes.length; ++i) {
		if (this.attributes[i] == attrib) {
			return true;
		}
	}
	return false;
};



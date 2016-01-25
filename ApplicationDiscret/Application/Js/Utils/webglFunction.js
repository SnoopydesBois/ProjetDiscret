/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 */


/// INDEX //////////////////////////////////////////////////////////////////////


// TODO


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * TODO description du module 
 */


/**
 * Get a 3D gl context. Set the context viewport dimension with the canvas
 * dimension.
 * 
 * @param {HTMLCanvasElement} canvas - A canvas.
 * 
 * @return {WebGLRenderingContext} The 3D gl context if exist or null.
 */
function get3DGlContext (canvas) {
	var gl = null;
	try {
		gl = canvas.getContext ("webgl") 
			|| canvas.getContext ("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} 
	catch (e) {
		console.error ("HTMLCanvasElement.getContext() FAILED !");
	}
	return gl;
}


//==============================================================================
/**
 * Create a shader with its source code and compile it.
 * 
 * @param {!WebGLRenderingContext} glContext - The gl context.
 * @param {!Number} type - The type of the shader. This value is the parameter to 
 * WebGLRenderingContext.createShader(). 
 * @param {!String} source - The source code of the shader.
 * TODO vérifier le type 2.
 * 
 * @return {WebGLShader} The created shader or null.
 */
function createShader (glContext, type, source) {
	/// Type verification
	if (! (glContext instanceof WebGLRenderingContext
		&& typeof source === "string")) 
	{
		// TODO vérifier le paramètre 2
		console.error ("createShader: bad type(s) of parameter(s) !");
		return null;
	}
	
	/// Variables initialisation
	var shader = null;
	
	/// Shader creation and compilation
	shader = glContext.createShader (type);
	glContext.shaderSource (shader, source);
	glContext.compileShader (shader);
	
	/// Shader verification
	if (! glContext.getShaderParameter (shader, glContext.COMPILE_STATUS)) {
		console.error ("Error compiling shader:", 
			glContext.getShaderInfoLog (shader));
		glContext.deleteShader (shader);
		shader = null;
	}
	
	return shader;
}


//==============================================================================
/**
 * Create a gl program and link given shaders.
 * 
 * @param {!WebGLRenderingContext} glContext - The gl context.
 * @param {...WebGLShader} A compiled shader.
 * @see {@link cerateShader ()}
 * 
 * @return {WebGLProgram} A gl program or null.
 */
function createProgram (glContext) {
	var argLen = arguments.length;
	
	/// Type verification
	if (! (glContext instanceof WebGLRenderingContext)) {
		console.error ("createProgram: give a corect gl context !");
		return null;
	}
	for (var i = 1; i < argLen; ++i)
		if (! arguments[i] instanceof WebGLShader) {
			console.error ("createProgram: one of parameter is not a "
				+ "WebGLShader");
			return null;
		}
	
	/// Variables initialisation
	var program = glContext.createProgram ();
	
	/// Link shaders
	if (argLen > 1) {
		for (var i = 1; i < argLen; ++i)
			glContext.attachShader (program, arguments[i]);
		glContext.linkProgram (program);
	}
	
	/// Link verification
	if (! glContext.getProgramParameter (program, glContext.LINK_STATUS)) {
		console.error ("createProgram: failed to attach shaders");
		program = null;
	}
	
	return program;
}



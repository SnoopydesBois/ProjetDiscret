/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 */


/// INDEX //////////////////////////////////////////////////////////////////////


// TODO


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * Gets a 3D gl context. Sets the context viewport dimensions to be the same as 
 * the canvas dimensions.
 * 
 * @param {HTMLCanvasElement} canvas - A canvas.
 * 
 * @return {WebGLRenderingContext} The 3D gl context if it exists, null otherwise.
 */
function get3DGlContext (canvas) {
	var gl = null;
	try {
		gl = canvas.getContext ("webgl", {preserveDrawingBuffer: true})
			|| canvas.getContext (
				"experimental-webgl", 
				{preserveDrawingBuffer: true}
			);
		gl.drawingBufferWidth = canvas.width;
		gl.drawingBufferHeight = canvas.height;
	} 
	catch (e) {
		console.error ("HTMLCanvasElement.getContext() FAILED !");
	}
	return gl;
};


//==============================================================================
/**
 * Creates a shader with its source code and compiles it.
 * 
 * @param {!WebGLRenderingContext} glContext - The gl context.
 * @param {!Number} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER. This value is the parameter
 * given to WebGLRenderingContext.createShader().
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
};


//==============================================================================
/**
 * Creates a gl program and links the given shaders.
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
};


//==============================================================================
/**
 * Erases everything in a canvas. Fills it with a color ("white" by default).
 * 
 * @param {CanvasRenderingContext2D} ctx - The gl context.
 * @param {String} [color] - A CSS color.
 * 
 * @return {void}
 */
function clear2DCanvas (ctx, color) {
	if (! ctx instanceof CanvasRenderingContext2D) {
		throw "clear2DCanvas: bad given context";
	}
	
	color || (color = "white");
	var currentColor = ctx.strokeStyle;
	ctx.strokeStyle = color;
	ctx.strokeRect (0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.strokeStyle = currentColor;
};



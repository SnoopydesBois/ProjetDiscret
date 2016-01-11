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
 * termes
 */

/// CODE ///////////////////////////////////////////////////////////////////////

/*
 * Function usefull in all the program
 */



//##############################################################################
//	Mathematics
//##############################################################################



/**
 * Clamp the number between mini and maxi.
 * 
 * @param {float} mini - the minimum limit
 * @param {float} maxi - the maximum limit
 * @param {float} number - the number to clamp between mini and maxi
 * 
 * @return {float} number if it is between mini et maxi, else maxi or mini
 */
function clamp (mini, maxi, number) {
	return Math.min (maxi, Math.max (mini, number));
}



//##############################################################################
//	HTML Event
//##############################################################################



/**
 * Add ab event to an element
 * @param {Object} elem - The elem to which we add the event
 * @param {type} type - TODO
 * @param {Event} evenHandle - Then handler of the event 
 */
function addEvent (elem, type, eventHandle) {
	if (elem == null || typeof (elem) == 'undefined') 
		return;
	
	if (elem.addEventListener) {
		elem.addEventListener (type, eventHandle, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent ("on" + type, eventHandle);
	}
	else {
		elem["on"+type] = eventHandle;
	}
}



//##############################################################################
//	Types and values
//##############################################################################



/**
 * @param {Object} obj - The object to test.
 * 
 * @return {String} The "obj" class name.
 */
function type (obj) {
	return (obj === undefined || obj === null) ? "(no object)" : 
		((typeof obj === "object") ? obj.constructor.name : typeof obj);
}



//==============================================================================
/**
 * Print a list of type of each arguments.
 * 
 * @see {@link type}
 */
function showType () {
	var types = "";
	for (var i in arguments)
		types += type (arguments[i]) + "; ";
	console.log (types);
}


//==============================================================================
/**
 * Search if a value is in an enumeration.
 * 
 * @param {Object} enumeration - An enumeration-like build with an object. It
 * is like {KEY_1: NUMBER, KEY_N: NUMBER}.
 * @param {(Number | String)} value - The value to test.
 */
function isValueOfEnum (enumeration, value) {
	for (var i in enumeration)
		if (value == enumeration[i])
			return true;
	return false;
}



//##############################################################################
//	WebGL
//##############################################################################



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
	if (! glContext.getShaderParameter (shader, gl.COMPILE_STATUS)) {
		console.error ("Error compiling shader:", 
			glContext.getShaderInfoLog (shader));
		glContext.deleteShader (shader);
		shader = null;
	}
	
	console.trace ("gl.createShader, gl.shaderSource, gl.compileShader");
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
	console.trace ("gl.createProgram, [gl.attachShader, gl.linkProgram]");
	return program;
}



//##############################################################################
//	Others
//##############################################################################



/**
 * Switch images.
 * 
 * @param {String} imgTag - The path to the image.
 */
function switchImage (imgTag) {
	var preffix = imgTag.src.slice (0, imgTag.src.lastIndexOf ("/") + 1);
	var extention = imgTag.src.slice (imgTag.src.lastIndexOf ("."), imgTag.src.length);
	var name = imgTag.src.slice (preffix.length, imgTag.src.lastIndexOf ("."));
	var newSrc;
	if (name.lastIndexOf ("_") == -1) {
		// select
		newSrc = "Img/" + name + "_Select" + extention;
	}
	else {
		// unselect
		newSrc = "Img/" + name.slice (0, name.indexOf ("_Select")) + extention;
	}
	imgTag.src = newSrc;
}



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
 * @param {Number} mini - The minimum limit.
 * @param {Number} maxi - The maximum limit.
 * @param {Number} number - The number to clamp between mini and maxi.
 *
 * @return {Number} 'number' if it is between 'mini' and 'maxi', else 'maxi' or
 * 'mini'.
 */
function clamp (mini, maxi, number) {
	return Math.min (maxi, Math.max (mini, number));
};


//==============================================================================
/**
 * Compute polar angle of a 2D point (in radian).
 *
 * @param {Number} x - X coordinate.
 * @param {Number} y - Y coordinate.
 *
 * @return {Number} The angle of the vector in radian.
 */
function angle (x, y) {
	var len = Math.sqrt (x * x + y * y),
		xNorm = x / len;
	return (y < 0) ? Math.acos (-xNorm) + Math.PI : Math.acos (xNorm);
};


//==============================================================================
/**
 * Compute azymuthal angle of a 3D point with a given origin.
 * 
 * @param {Vector} point - A point.
 * @param {Vector} origin - The origin.
 * 
 * @return {Number} The azimuth angle of 'point' spheric coordinate (with the 
 * specified origin). XXX vérifier anglais
 */
function getAzimuth (point, origin) {
	var pos = new Vector (point).sub (origin);
	return angle (pos.x, pos.y);
};


//==============================================================================
/**
 * Compute altitude angle of a 3D point with a given origin.
 * 
 * @param {Vector} point - A point.
 * @param {Vector} origin - The origin.
 * 
 * @return {Number} The altitude angle of 'point' spheric coordinate (with the 
 * specified origin). XXX vérifier anglais
 */
function getAltitude (point, origin) {
	var pos = new Vector (point).sub (origin);
	return Math.asin (pos.z / pos.getLength ());
};



//##############################################################################
//	Convertion
//##############################################################################



/**
 * Transform a face position into a color.
 *
 * @param {Voxel} voxel - The voxel.
 * @param {DirectionEnum} direction - The direction of the face in the voxel.
 * @param {Vector} universSize - Size of the 3D model.
 *
 * @return {float[4]} The RGBA color corresponding to the position of the face.
 * Each component is a value between 0.0 and 1.0.
 */
function posToColor (voxel, direction, universSize) {
	return [
		voxel.getPosition().x / universSize.x, // red
		voxel.getPosition().y / universSize.y, // green
		voxel.getPosition().z / universSize.z, // blue
		1.0 - direction / 100 // alpha
	];
};


//==============================================================================
/**
 * Transform a face position into a color.
 *
 * @param {float[4]} color - A color.
 * @param {Vector} universSize - Size of the 3D model.
 *
 * @return {Facet} The corresponding facet.
 */
function colorToPos (color, universSize) {
	return new Facet (
		new Vector (
			Math.round (color[0] * universSize.x / 256), // red   -> x
			Math.round (color[1] * universSize.y / 256), // green -> y
			Math.round (color[2] * universSize.z / 256)  // blue  -> z
		),
		Math.round ((1.0 - color[3] / 256) * 100) // alpha -> direction
	);
};



//##############################################################################
//	HTML Event
//##############################################################################



/**
 * Add ab event to an element. Do nothing if the given element is null or
 * undefined.
 * 
 * @param {HTMLElement} elem - The elem to which we add the event.
 * @param {Sting} type - The kind of event.
 * @param {Function} eventHandle - Then handler of the event.
 * 
 * @return {void}
 */
function addEvent (elem, type, eventHandle) {
	if (elem == null || typeof (elem) == 'undefined')
		return;

	if (elem.addEventListener)
		elem.addEventListener (type, eventHandle, false);
	else if (elem.attachEvent)
		elem.attachEvent ("on" + type, eventHandle);
	}
	else {
		elem["on"+type] = eventHandle;
	}
};




//##############################################################################
//	Types and values
//##############################################################################



/**
 * @param {*} obj - The object to test.
 *
 * @return {String} The 'obj' class name or type if 'obj' is not an object.
 */
function type (obj) {
	switch (obj) {
	case undefined :
		return "undefined";
	case null :
		return "null";
	default :
		return ((typeof obj == "object") || (typeof obj == "function") ?
			obj.constructor.name :
			typeof obj
		);
	}
};


//==============================================================================
/**
 * Print a list of type of each arguments (print with console.log()).
 * @see {@link type}
 * 
 * @param {...*} Variable to test.
 *
 * @return {void}
 */
function showType () {
	var types = "";
	for (var i in arguments)
		types += type (arguments[i]) + "; ";
	console.log (types);
};


//==============================================================================
/**
 * Check if a variable have the expected type.
 *
 * @param {*} variable - An object.
 * @param {(String | Function)} expectedType - The expected type of argument.
 *
 * @return {boolean} True if 'variable' have the good type, false otherwise.
 */
function isA (variable, expectedType) {
	if (expectedType === null)
		return variable === null;
	else if (expectedType === undefined)
		return variable === undefined;
	else if (typeof expectedType == "string")
		return typeof variable == expectedType;
	else
		return variable instanceof expectedType;
};


//==============================================================================
/**
 * Check if a list of variables have expected type(s). The N variable in
 * 'args' is test with N + 1 type in the argument list. If the test type is an
 * array, the value is test with all type type in the array. XXX vérifier anglais.
 *
 * @param {Array} args - The list of argument.
 * @param {...(String | Function | (String | Function)[])} Expected type(s) of
 * argument.
 *
 * @return {boolean} True if all items in 'args' have the expected type, false
 * otherwise.
 */
function checkType (args) {
	var nbTest = Math.min (args.length, arguments.length - 1);

	var i = 0;
	var goodArgs = true;
	while (goodArgs && i < nbTest) {
		if (arguments[i + 1] instanceof Array) {
			var goodType = false, nbType =  arguments[i + 1].length, j = 0;
			while (!goodType && j < nbType) {
				goodType = goodType || (isA (args[i], arguments[i + 1][j]));
				++j;
			}
		}
		else
			goodArgs = goodArgs && (isA (args[i], arguments[i + 1]));
		++i;
	} // end while
	return goodArgs;
};


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
};



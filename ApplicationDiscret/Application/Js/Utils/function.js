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

/* TODO marqueur jsDoc
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
		return ((typeof obj === "object") || (typeof obj === "function") ? 
			obj.constructor.name : 
			typeof obj
		);
	}
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
}



//==============================================================================
/**
 * TODO
 * 
 * @param {Array} args - The list of argument.
 * @param {...(String | Function)} The expected type of argument.
 * 
 * @return {boolean} True if all items in 'args' have the good type, false
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



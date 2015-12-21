/// LICENCE ////////////////////////////////////////////////////////////////////

/*
 *	Copyright (juin 2015)
 *	Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
 *
 *	benoist.thomas@hotmail.fr
 *	biscui_86@hotmail.fr
 *	tanguy.desplebain@gmail.com
 *	lauret.karl@hotmail.fr
 *
 *	Ce logiciel est un programme informatique servant à modéliser des
 *	structures 3D voxellisées. 
 *
 *	Ce logiciel est régi par la licence CeCILL soumise au droit français et
 *	respectant les principes de diffusion des logiciels libres. Vous pouvez
 *	utiliser, modifier et/ou redistribuer ce programme sous les conditions
 *	de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA 
 *	sur le site "http://www.cecill.info".
 *
 *	En contrepartie de l'accessibilité au code source et des droits de copie,
 *	de modification et de redistribution accordés par cette licence, il n'est
 *	offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 *	seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 *	titulaire des droits patrimoniaux et les concédants successifs.
 *
 *	A cet égard  l'attention de l'utilisateur est attirée sur les risques
 *	associés au chargement,  à l'utilisation,  à la modification et/ou au
 *	développement et à la reproduction du logiciel par l'utilisateur étant 
 *	donné sa spécificité de logiciel libre, qui peut le rendre complexe à 
 *	manipuler et qui le réserve donc à des développeurs et des professionnels
 *	avertis possédant  des  connaissances  informatiques approfondies.  Les
 *	utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 *	logiciel à leurs besoins dans des conditions permettant d'assurer la
 *	sécurité de leurs systèmes et ou de leurs données et, plus généralement, 
 *	à l'utiliser et l'exploiter dans les mêmes conditions de sécurité. 
 *
 *	Le fait que vous puissiez accéder à cet en-tête signifie que vous avez 
 *	pris connaissance de la licence CeCILL, et que vous en avez accepté les
 *	termes
 */

/// CODE ///////////////////////////////////////////////////////////////////////

/*
 * fonction.js
 * 
 * author : abisutti
 * created : Wed, 20 May 2015 10:57:29 +0200
 * modified : Wed, 20 May 2015 10:57:29 +0200
 * 
 * Function usefull in all the program
 */



/**
 * Clamp the number between mini and maxi
 * @param {float} mini : the minimum limit
 * @param {float} maxi : the maximum limit
 * @param {float} number : the number to clamp between mini and maxi
 * @return {float} number if it is between mini et maxi, else maxi or mini
 */
function clamp (mini, maxi, number) {
	return Math.min (maxi, Math.max (mini, number));
}



//==============================================================================
/**
 * Add ab event to an element
 * @param {Object} elem - The elem to which we add the event
 * @param {type} type
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



//==============================================================================
/**
 * @param {Object} object - the object to test.
 * 
 * @return {String} the name of the classe.
 */
function type (obj) {
	return (object === undefined || obj === null) ? "" : 
		((typeof obj === "object") ? obj.constructor.name : typeof obj);
}



//==============================================================================
/**
 * Switch images
 * @param {String} imgTag - The path to the image
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



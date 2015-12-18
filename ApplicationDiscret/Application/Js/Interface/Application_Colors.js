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

/* getColor (state : CubeStateEnum, axis : AxisEnum) : float[]
 * setColor (state : CubeStateEnum, color : float[]) : void
 * getBackgroundColor () : float[]
 * setBackgroundColor (color : float[]) : void
 * getLeaderColor () : float[]
 * setLeaderColor (color : float []) : void
 * getCanvasColor () : float[]
 * setCanvasColor (color : float[]) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @param {AxisEnum} axis - the normal axis.
 * @param {CubeStateEnum} state - the model/cube/facet's state. 
 * @return {float[]} a reference to a RGBA color.
 */
Application.prototype.getColor = function (state, axis) {
//	console.log ("Application.getColor");
	if (!axis)
		throw "Application.getColor() : give an axis !";
	var color = [];
	for (var i = 0; i < 3; ++i)
		color[i] = clamp (0.0, 1.0, 
			this.cubeColors[state][i] + axis.colorOffset);
	return color;
};


//==============================================================================
/**
 * Set and ajust a color.
 * @param {CubeStateEnum} state - the state cube.
 * @param {float[]} color - an RGBA array of the new color.
 */
Application.prototype.setColor = function (state, color) {
//	console.log ("Application.setColor");
	var tmp = [];
	for (var i = 0; i < 3; ++i)
		tmp[i] = clamp (0.0, 1.0, color[i]);
	this.cubeColors[state] = tmp;
};


//==============================================================================
/**
 * @return {float[]} a reference to the RGBA background color.
 */
Application.prototype.getBackgroundColor = function () {
//	console.log ("Application.getBackgroundColor");
	return this.backgroundColor;
};


//==============================================================================
/**
 * Set and adjust the background color.
 * @param {float[]} color - an RGBA array of the new color.
 */
Application.prototype.setBackgroundColor = function (color) {
//	console.log ("Application.setBackgroundColor");
	var tmp = [];
	for (var i = 0; i < 3; ++i)
		tmp[i] = clamp (0.0, 1.0, color[i]);
	this.backgroundColor = tmp;
};


//==============================================================================
/**
 * @return {float[]} a reference to the RGBA leader color.
 */
Application.prototype.getLeaderColor = function () {
//	console.log ("Application.getLeaderColor");
	return this.leaderColor;
};


//==============================================================================
/**
 * Set and adjust the leader color.
 * @param {float[]} color an RGBA array of the new color.
 */
Application.prototype.setLeaderColor = function (color) {
//	console.log ("Application.setLeaderColor");
	var tmp = [];
	for (var i = 0; i < 3; ++i)
		tmp[i] = clamp (0.0, 1.0, color[i]);
	this.leaderColor = tmp;
};


//==============================================================================
/**
 * @return {float[]} a reference to the RGBA canvas color.
 */
Application.prototype.getCanvasColor = function () {
//	console.log ("Application.getCanvasColor");
	return this.canvasColor;
};



//==============================================================================
/**
 * Set and adjust the canvas color.
 * @param {float[]} color - an RGBA array of the new color.
 */
Application.prototype.setCanvasColor = function (color) {
//	console.log ("Application.setCanvasColor");
	var tmp = [];
	for (var i = 0; i < 3; ++i)
		tmp[i] = clamp (0.0, 1.0, color[i]);
	this.canvasColor = tmp;
};



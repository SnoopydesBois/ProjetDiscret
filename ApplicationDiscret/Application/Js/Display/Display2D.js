// TODO refactoring

/// LICENCE ////////////////////////////////////////////////////////////////////

/*
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

/// INDEX //////////////////////////////////////////////////////////////////////

/* 
 *	container : HTMLElement
 * funcs : Array
 * models : Array
 * modelSize : Vector
 * htmlSrc : String
 * oldSelect : Array
 * oldHover : Array
 *
 * Display2D ()
 * gridsInit () : void
 * TODO remplir la suite
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Handle the 2D display of a model
 */


	  ///////////////////
	 /// Constructor ///
	///////////////////


Display2D.prototype = new Display ();
Display2D.prototype.constructor = Display2D;

/** 
 * @constructor
 */
function Display2D () {
	Display.call (this);
	
	this.init ();
};


	  //////////////////
	 /// Initiation ///
	//////////////////


/**
 * Initialize the canvas and draw a grid.
 * @return {void}
 */	
Display2D.prototype.init = function () {
	throw "Display2D.init : NOT YET IMPLEMENTED !";
};




	  //////////////////////
	 /// Draw the grids ///
	//////////////////////


/**
 * Draw the grids, if width given it will take it,
 * else it will be the default width
 * @param {float} w - width of the grids 
 * @return {void}
 */	
Display2D.prototype.drawGrid = function (w) {

	this.totalH = this.totalW;
	this.caseWidth = this.totalW / this.numberOfBLocks;
	for (var axis = 0; axis < this.numberOfAxis; axis++) {
		for (var g = 0; g < this.numberOfGrids; g++) {
			var c =  this.container.getElementById ("Axis" + axis + "g" + g);
			c.width  = this.totalW;
			c.height = this.totalH;
			var gridOptions = {
				minorLines: {
					separation : this.caseWidth,
					color : '#d3d3d3',
					width : 2
				},
				majorLines : {
					separation : this.caseWidth * 5,
					color : '#666666',
					width : 2
				}
			};
			var ctx = c.getContext ('2d');
			ctx.clearRect (0, 0, this.totalW, this.totalH);
			this.drawGridLines (c, gridOptions.minorLines);
			this.drawGridLines (c, gridOptions.majorLines);
		}
	}	
	
};


//==============================================================================
/**
 * Draw the lines on the grid depending on the lineOptions
 * @param {lineOptions} lineOptions 
 * @param {HTMLElement} canvas
 * @return {void}
 */	
Display2D.prototype.drawGridLines = function (canvas, lineOptions) {

	var iWidth = canvas.width;
	var iHeight = canvas.height;
	
	var context = canvas.getContext ('2d');

	context.strokeStyle = lineOptions.color;
	context.strokeWidth = lineOptions.width;

	context.beginPath();
	
	var iCount = null;
	var i = null;
	var x = null;
	var y = null;
	
	var iCount = Math.floor (iWidth / lineOptions.separation);
	for (i = 0; i <= iCount; ++i) {
		x = (i * lineOptions.separation);
		context.moveTo (x, 0);
		context.lineTo (x, iHeight);
		context.stroke ();
	}
	
	var iCount = Math.floor (iHeight / lineOptions.separation);
	for (i = 0; i <= iCount; ++i) {
		y = (i * lineOptions.separation);
		context.moveTo (0, y);
		context.lineTo (iWidth, y);
		context.stroke ();
	}
	
	context.closePath();
};


	  /////////////////////
	 /// Fill the grid ///
	/////////////////////



/**
 * Fill a block with a given color.
 * @param {int} row - the block's row.
 * @param {int} block
 * @param {CanvasRenderingContext2D} context
 * @return {float[]} color given by the enum
 */
Display2D.prototype.fillBlockColor = function (row, block, context, color) {
	context.beginPath();
	context.rect (
		(row * this.caseWidth) + 1, 
		(block * this.caseWidth) + 1,
		this.caseWidth - 2, 
		this.caseWidth - 2
	);
	context.fillStyle = this.rgbToHex (
		color[0] * 255, 
		color[1] * 255,
		color[2] * 255
	);
	context.fill();
	context.closePath();
};


//==============================================================================
/**
 * FIXME rien a faire ici !!!
 * Convert the color of the current enum into hexColor
 * @param {float} r - red color of the color to convert.
 * @param {float} g - green color of the color to convert.
 * @param {float} b - blue color of the color to convert.
 * @return {String} hex color
 */
Display2D.prototype.rgbToHex = function (r, g, b) {
	var hexColor = ((1 << 24) + (r << 16) + 
		(g << 8) + b).toString(16).substr(1);
	return "#" + hexColor[0] + hexColor[1] + hexColor[2] + hexColor[3] 
		+ hexColor[4] + hexColor[5];
};


	  //////////////////////
	 /// Other function ///
	//////////////////////



/**
 * Prepare for drawing.
 * @return {void}
 */
Display2D.prototype.prepare = function () {
	throw "Display2D.prepare : NOT YET IMPLEMENTED";
}


//==============================================================================
/**
 * TODO
 * @return {void}
 */
Display2D.prototype.update = function () {
	throw "Display2D.update : NOT YET IMPLEMENTED";
};


//==============================================================================
/**
 * To call when the size of the IDisplay is changed to update the grid sizes.
 * @return {void}
 */
Display2D.prototype.onResize = function () {
	throw "Display2D.onResize : NOT YET IMPLEMENTED";
};








	  ////////////////////////
	 /// Getter && setter ///
	////////////////////////


///**
// * Add a functionality.
// * @param {Function} func - a fonctionality.
// * @return {void}
// */	
//Display2D.prototype.addFunc = function (func) {
////	console.log ("Display2D.addFunc");
//	if (func != undefined) {
//		this.funcs.push (func);
//	}
//};


//==============================================================================
/**
// * Remove a function.
// * @param {String} funcId - name of the function to remove
// * @return {void}
// */	
//Display2D.prototype.removeFunc = function (funcId) {
////	console.log ("Display2D.removeFunc");
//	
//	for (var i = 0;i < this.funcs.length; i++) {
//		if (this.funcs[i].getName() == funcId) {
//			this.funcs.splice (i, 1);
//		}
//	}
//};


//==============================================================================
/**
// * @return {Function[]} the list of all functionalities.
// */
//Display2D.prototype.getFunctionalities = function () {
////	console.log ("Display2D.getFunctionalities");
//	return this.funcs;
//};



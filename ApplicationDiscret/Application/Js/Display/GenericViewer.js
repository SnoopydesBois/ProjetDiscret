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


/* constructor (name : String, number : int, callback : Function)
 * getName () : String
 * getNumber () : int
 * reload () : void
 * setDimension (width : int, height : int) : void
 * setMouse (x : int, y : int) : void
 * addTranslateX (x : float) : void
 * addTranslateY (x : float) : void
 * multScale (x : float) : void
 * onMousePressRight (event : MouseEvent) : void
 * onMouseUpRight (event : MouseEvent) : void
 * mouv (event : MouseEvent) : void
 * interval () : void
 * onKeyPress (event : KeyEvent) : void
 * prepare (gl : glContext) : void
 * draw (gl : glContext) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */
GenericViewer.prototype.constructor = GenericViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor Class to manage an Object (you must inherit from this class).
 * 
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 * @param {String} glContextType - The type of webGl context for drawing. The
 * value is one of "2d", "3d".
 */
function GenericViewer (canvas, glContextType) {
	if (arguments.length != 0 && // GenericViewer is a superclass
		!checkType (arguments, HTMLCanvasElement, "string"))
	{
		console.error ("GenericViewer.constructor : bad type(s) of " 
			+ "parameter(s)");
		showType (canvas, glContextType);
		return;
	}
	
	/**
	 * {GenericContainer} The container of all objects.
	 */
	this.container;
	
	/**
	 * {HTMLCanvasElement} The associated canvas where the model is drawn.
	 */
	this.canvas = canvas;
	
	/**
	 * {(CanvasRenderingContext2D | WebGLRenderingContext)} The webGl context.
	 */
	this.glContext;
	switch (glContextType) {
		case "2d" :
			this.glContext = this.canvas.getContext ("2d");
			break;
		case "3d" :
			this.glContext = get3DGlContext (this.canvas);
			break;
		case undefined :
			// constructor call for inheritance
			// do nothing
			break;
		default :
			this.glContext = null;
			console.error ("ModelView.GenericViewer : unknow value for "
				+ "glContextType parameter : " + glContextType);
			return;
	}
};



//##############################################################################
//	Accessors and mutators
//##############################################################################



/**
 * @return {(CanvasRenderingContext2D | WebGLRenderingContext)} The gl context.
 */
GenericViewer.prototype.getGLContext = function () {
	return this.glContext;
};



//##############################################################################
//	Draw
//##############################################################################


/**
 * Show all objects in the container (prepare it and draw it).
 * 
 * @return {void}
 */
GenericViewer.prototype.show = function () {};


//==============================================================================
/**
 * Prepare all objects in the container.
 * 
 * @return {void}
 */
GenericViewer.prototype.prepare = function () {};


//==============================================================================
/**
 * Draw all objects in the container.
 * 
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
GenericViewer.prototype.draw = function (backBuffer) {};



//##############################################################################
//	Event
//##############################################################################



/** 
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onMouseDown = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onMouseUp = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onMouseOver = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onMouseOut = function (event) {};


//==============================================================================
/**

 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}

 */
GenericViewer.prototype.onMouseMove = function (event) {};


//==============================================================================
/**

 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}

 */
GenericViewer.prototype.onWheel = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onClick = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {MouseEvent} event - The mouse event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onDblClick = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {KeyboardEvent} event - The keyboard event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onKeyPress = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {KeyboardEvent} event - The keyboard event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onKeyDown = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {KeyboardEvent} event - The keyboard event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onKeyUp = function (event) {};


//==============================================================================
/**
 * @abstract
 * 
 * @param {WindowEvent} event - The window event.
 * 
 * @return {void}
 */
GenericViewer.prototype.onResize = function (event) {};



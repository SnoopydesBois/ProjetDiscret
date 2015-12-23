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
 * @constructor Class to manage an Object (you must inherit from this class).
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 * @param {String} glContextType - The type of webGl context for drawing. The
 * value is one of "2d", "3d".
 */
function GenericObject (canvas, glContextType) {
	if (!((canvas instanceof HTMLCanvasElement) 
		&& (typeof glContextType === "string")))
	{
		console.error ("GenericObject.constructor : bad type(s) of parameter(s)");
		return;
	}
	
	/**
	 * {Scene} The scene which containt all objects.
	 */
	this.scene = new Scene ();
	
	/**
	 * {HTMLCanvasElement} The associated canvas FIXME où le dessin du modèle
	 * est effectué.
	 */
	this.canvas = canvas;
	
	/**
	 * {CanvasRenderingContext2D | WebGLRenderingContext} The webGl context.
	 */
	this.glContext;
	switch (glContextType) {
		case "2d" :
			this.glContext = this.canvas.getContext ("2d");
			break;
		case "3d" :
			this.glContext = this.canvas.getContext ("webgl") 
				|| this.canvas.getContext ("experimental-webgl");
			break;
		default :
			this.glContext = null;
			console.error ("ModelView.constructor : unknow value for "
				+ "glContextType parameter : " + glContextType);
			return;
	}
};



//##############################################################################
//	Accessors and mutators
//##############################################################################



/**
 * Change dimensions ... can be overloaded.
 * @param {int} width - the scene width.
 * @param {int} height - the scene height.
 * @return {void}
 */
GenericObject.prototype.setDimension = function (width, height) {
	if (this.scene !== null) {
		this.scene.setWidth (width);
		this.scene.setHeight (height);
	}
};


//==============================================================================
/**
 * Change the mouse position .. can be overloaded.
 * @param {int} x - the mouse position along the x axis.
 * @param {int} y - the mouse position along the y axis.
 * @return {void}
 */
GenericObject.prototype.setMouse = function (x, y) {
	if (this.scene !== null)
		this.scene.setMouse (x, y);
};



//##############################################################################
//	Draw
//##############################################################################


/**
 * Reload the scene.
 * @return {void}
 */
GenericObject.prototype.reload = function () {
	if (!(this.scene instanceof Scene))
		console.error ("GenericObject.reload : scene does not exist !");
	else
		this.scene.reload ();
};


//==============================================================================
/**
 * Show the scene (prepare it and draw it).
 * @return {void}
 */
GenericObject.prototype.show = function () {
	this.prepare ();
	this.draw ();
};


//==============================================================================
/**
 * Overload this function in order to compute additionnal items before drawing.
 * You should at least specify links between renderTargets and the scene ...
 * FIXME doc
 * @return {void}
 */
GenericObject.prototype.prepare = function () {};


//==============================================================================
/**
 * Overload this method in order to draw something.
 * @return {void}
 */
GenericObject.prototype.draw = function () {};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Translation along the x axis.
 * @param {float} x - how much do we translate.
 * @return {void}
 */
GenericObject.prototype.addTranslateX = function (x) {
	if (this.scene !== null)
		this.scene.addTranslateX(x);
};


//==============================================================================
/**
 * Translation along the y axis.
 * @param {float} x - how much do we translate.
 * @return {void}
 */
GenericObject.prototype.addTranslateY = function (x) {
	if (this.scene !== null)
		this.scene.addTranslateY(x);
};


//==============================================================================
/**
 * Scaling.
 * @param {float} x - how much do we scale.
 * @return {void}
 */
GenericObject.prototype.multScale = function (x) {
	if (this.scene != null)
		this.scene.multScale(x);
};



//##############################################################################
//	Event
//##############################################################################


// FIXME chager les noms et ajouter celles manquantes.
//onblur
//onclick
//ondbclick
//onfocus
//onkeydown
//onkeypress
//onkeyup
//onmousedown
//onmousemove
//onmouseout
//onmouseover
//onmouseup

/** 
 * user actions: you should overload it !
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
GenericObject.prototype.onMousePressRight = function (event) {};


//==============================================================================
/**
 * user actions: you should overload it !
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
GenericObject.prototype.onMouseUpRight = function (event) {};


//==============================================================================
/**
 * user actions: you should overload it!
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
GenericObject.prototype.mouv = function (event) {};


//==============================================================================
/**
 * @deprecated
 * @return {void}
 */
GenericObject.prototype.interval = function () {};


//==============================================================================
/**
 * user actions: you should overload it!
 * @param {KeyboardEvent} event - the keyboard event.
 * @return {void}
 */
GenericObject.prototype.onKeyPress = function (event) {};




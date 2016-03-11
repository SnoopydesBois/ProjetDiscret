/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * TODO
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @enum
 * Rendering Mode.
 *
 * NORMAL : Draws a cube's face with a darker border.
 * DOTTED : Draws a cube's face with a darker border and a small dot.
 * PICKING : Draws a cube's face for picking. The face's color is 
 * of the given color.
 */
var RenderingModeEnum = {
	NORMAL  : 0,
	DOTTED  : 1,
	PICKING : 2,
};



if (Object.freeze){
	RenderingModeEnum = Object.freeze (RenderingModeEnum);
}


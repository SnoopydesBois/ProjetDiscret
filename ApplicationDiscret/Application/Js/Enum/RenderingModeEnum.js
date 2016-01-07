/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @enum
 * Rendering Mode. TODO traduire
 * 
 * NORMAL : Dessine la face d'un cube avec un cadre plus foncé.
 * DOTTED : Dessine la face d'un cube avec un cadre plus foncé en petit trait.
 * PICKING : Dessine la face d'un cube pour le picking. Toute la face est de la
 * couleur transmise.
 */
var RenderingModeEnum = {
	NORMAL : 0,
	DOTTED : 1,
	PICKING : 2,
};


/**
 * Allows the enumeration to be constant.
 */
if (Object.freeze)
	Object.freeze (RenderingModeEnum);



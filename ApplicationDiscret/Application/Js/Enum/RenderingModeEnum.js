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
 * NORMAL : Dessine la face d'un cube avec un cadre plus foncé.
 * DOTTED : Dessine la face d'un cube avec un cadre plus foncé en petit trait.
 * PICKING : Dessine la face d'un cube pour le picking. Toute la face est de la
 * couleur transmise.
 * FIXME traduire
 */
var RenderingModeEnum = {
	NORMAL  : 0,
	DOTTED  : 1,
	PICKING : 2,
};



if (Object.freeze){
	RenderingModeEnum = Object.freeze (RenderingModeEnum);
}


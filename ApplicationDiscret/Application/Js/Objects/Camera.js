/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
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


/* eyePos           : Vector
 * centerPos        : Vector
 * up               : Vector
 * width            : int
 * height           : int
 * fov              : float
 * near             : float
 * far              : float
 * viewMatrix       : Matrix
 * projectionMatrix : Matrix
 * constProjection  : float
 *
 * Camera (eyePos : Vector,
 *         centerPos : Vector,
 *         up : Vector,
 *         width : int,
 *         height : int,
 *         fov : float,
 *         near : float,
 *         far : float)
 * getViewMatrix () : Matrix
 * getProjectionMatrix () : Matrix
 * setFov (aFov : float) : void
 * setProjection (nb : float) : void
 * getProjection () : float
 * computeMatrices () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */
Camera.prototype.constructor = Camera;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor Perspective camera class.
 *
 * @param {Vector} eyePos - Position of the camera.
 * @param {Vector} centerPos - Position of the center where the camera look at.
 * @param {Vector} up - Perpendicular vector (going up) to centerPos vector.
 * @param {int} width - Width of the camera.
 * @param {int} height - Height of the camera.
 * @param {float} fov - Field of view of the camera.
 * @param {float} near - Nearest point of the camera.
 * @param {float} far - The farthest point of the camera.
 */
function Camera (eyePos, centerPos, up, width, height, fov, near, far) {

	/**
	 * {Vector} Position of the camera.
	 */
	this.eyePos = eyePos;

	/**
	 * {Vector} Point where the camera look at.
	 */
	this.centerPos = centerPos;

	/**
	 * {Vector} Perpendicular vector (going up) to centerPos vector.
	 */
	this.up = up;

	/**
	 * {int} Width of the camera. Should be the canvas width.
	 */
	this.width = width;

	/**
	 * {int} Height of the camera. Should be the canvas height.
	 */
	this.height = height;

	/**
	 * {float} Field of view of the camera. Angle in degrees.
	 */
	this.fov = fov || 45;

	/**
	 * {float} Nearest point of the camera.
	 */
	this.near = near || 0.1;

	/**
	 * {float} Farest point of the camera.
	 */
	this.far = far || 1000.0;

	/**
	 * {Matrix} TODO
	 */
	this.viewMatrix = null;

	/**
	 * {Matrix} TODO
	 */
	this.perspectiveProjectionMatrix = null;

	/**
	 * {Matrix} TODO
	 */
	this.orthographicProjectionMatrix = null;

	/**
	 * {float} Allow to modify the zoom.
	 */
	this.constProjection = 2.5;

	/// Matrix calcul
	this.computeMatrices ();
}



//##############################################################################
//	Accessors and Mutators
//##############################################################################


/**
 * @return {Vector} The eye position of the camera.
 */
Camera.prototype.getPosition = function () {
	return this.eyePos;
};


//==============================================================================
/**
 * @return {Vector} The look at position of the camera.
 */
Camera.prototype.getLookAtPosition = function () {
	return this.centerPos;
};


//==============================================================================
/**
 * @return {Vector} The up direction of the camera.
 */
Camera.prototype.getUpDirection = function () {
	return this.up;
};


//==============================================================================
/**
 * Get view matrix.
 *
 * @return {Matrix} The view matrix.
 */
Camera.prototype.getViewMatrix = function () {
	return this.viewMatrix;
};


//==============================================================================
/**
 * @return {Matrix} The perspective projection matrix.
 */
Camera.prototype.getPerspectiveProjectionMatrix = function () {
	return this.perspectiveProjectionMatrix;
};


//==============================================================================
/**
 * @return {Matrix} The orthographic projection matrix.
 */
Camera.prototype.getOrthographicProjectionMatrix = function () {
	return this.orthographicProjectionMatrix;
};


//==============================================================================
/**
 * Set current field of view.
 *
 * @param {float} aFov - The new field of view.
 *
 * @return {void}
 */
Camera.prototype.setFov = function (aFov) {
	if (typeof aFov == "number") {
		this.fov = aFov;
		this.computeMatrices ();
	}
	else
		throw "Camera.setFov: parameter is not a number";
};


//==============================================================================
/**
 * @return {float} The zoom.
 */
Camera.prototype.getProjection = function () {
	return this.constProjection;
};


//==============================================================================
/**
 * Set the orthographic zoom.
 *
 * @param {float} [nb] - Zoom.
 *
 * @return {void}
 */
Camera.prototype.setProjection = function (nb) {
	if (typeof nb == "undefined") {
		this.constProjection = 2.5;
		this.computeMatrices ();
	}
	else if (0 < nb) {
		this.constProjection = nb;
		this.computeMatrices ();
	}
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Compute view and projections matrices.
 *
 * @return {void}
 */
Camera.prototype.computeMatrices = function () {
	// View matrix
	this.viewMatrix = new Matrix (this.eyePos, this.centerPos, this.up);

	// Perspective matrix
	this.perspectiveProjectionMatrix = new Matrix (
		this.fov * Math.PI / 180,
		this.width / this.height,
		this.near,
		this.far
	);

	// Orthographic matrix
	var factor = Math.min (this.height, this.width);
	this.orthographicProjectionMatrix = new Matrix (
		-this.constProjection * this.width / factor,
		 this.constProjection * this.width / factor,
		-this.constProjection * this.height / factor,
		 this.constProjection * this.height / factor,
		this.near,
		this.far
	);
};


//==============================================================================
/**
 * Camera zoom.
 *
 * @param {Number} factor - Zoom factor.
 *
 * @return {void}
 */
Camera.prototype.zoom = function (factor) {
	// orthographic zoom
	this.setProjection (this.getProjection () + factor);
	// perspective zoom
	var normPos = new Vector (this.getPosition ())
		.sub (this.getLookAtPosition ())
		.normalize ();
	this.eyePos.x += normPos.x * factor;
	this.eyePos.y += normPos.y * factor;
	this.eyePos.z += normPos.z * factor;
	this.computeMatrices ();
};


//==============================================================================
/**
 * Camera zoom in.
 *
 * @return {void}
 */
Camera.prototype.zoomIn = function () {
	var factor = -(0.1 + this.constProjection * 0.05)
	if ((this.eyePos.x - this.centerPos.x)
		* (this.eyePos.x + factor - this.centerPos.x)
		+ (this.eyePos.y - this.centerPos.y)
		* (this.eyePos.y + factor - this.centerPos.y)
		+ (this.eyePos.z - this.centerPos.z)
		* (this.eyePos.z + factor - this.centerPos.z) >= 0)
	{
		this.zoom (factor);
	}
};


//==============================================================================
/**
 * Camera zoom out.
 *
 * @return {void}
 */
Camera.prototype.zoomOut = function () {
	if (this.constProjection < 24)
		this.zoom (0.1 + this.constProjection * 0.05);
};


//==============================================================================
/**
 * Dump all attributes (except matrices) on the console.
 *
 * @return {void}
 */
Camera.prototype.toConsole = function () {
	console.log ("pos:", this.eyePos.toString (),
		", look at:", this.centerPos.toString (), ", up:", this.up.toString (),
		", WxH: " + this.width + "x" + this.height, ", fov:", this.fov,
		", near:", this.near, ", far: ", this.far
	);
};

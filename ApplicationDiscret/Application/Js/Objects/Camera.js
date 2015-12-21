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
 * computeMatrices () : void
 * getViewMatrix () : Matrix
 * getProjectionMatrix () : Matrix
 * setFov (aFov : float) : void
 * setProjection (nb : float) : void
 * getProjection () : float
 */

/// CODE ///////////////////////////////////////////////////////////////////////



Camera.prototype.constructor = Camera;

/**
 * @constructor Perspective camera class.
 * @param {Vector} eyePos - position of the camera.
 * @param {Vector} centerPos - position of the center where the camera look at.
 * @param {Vector} up - perpendicular vector (going up) to centerPos vector.
 * @param {int} width - width of the camera.
 * @param {int} height - height of the camera.
 * @param {float} fov - field of view of the camera.
 * @param {float} near - nearest point of the camera.
 * @param {float} far - the farthest point of the camera.
 */
function Camera(eyePos, centerPos, up, width, height, fov, near, far) {
	this.eyePos = eyePos;
	this.centerPos = centerPos;
	this.up = up;
	this.width = width;
	this.height = height;
	this.fov = fov || 45;
	this.near = near || 0.1;
	this.far = far || 1000.0;
	
	this.viewMatrix = null;
	this.projectionMatrix = null;
	this.constProjection = 2.5; // Allow to modify the zoom
	
	this.computeMatrices(); // Matrix calcul
};


//==============================================================================
/**
 * Compute View and Projection Matrix.
 * @return {void}
 */
Camera.prototype.computeMatrices = function () {
//	console.log ("Camera.computeMatrices");
	this.viewMatrix = new Matrix(this.eyePos, this.centerPos, this.up);
	// Orthogonal Matrix
	this.projectionMatrix = new Matrix (- this.constProjection,
			this.constProjection, -this.constProjection, this.constProjection, 
			this.near, this.far);
};


//==============================================================================
/**
 * Get view matrix.
 * @return {Matrix} the view matrix.
 */
Camera.prototype.getViewMatrix = function () {
//	console.log ("Camera.getViewMatrix");
	return this.viewMatrix;
};


//==============================================================================
/**
 * Get projection matrix.
 * @return {Matrix} the projection matrix.
 */
Camera.prototype.getProjectionMatrix = function () {
//	console.log ("Camera.getProjectionMatrix");
	return this.projectionMatrix;
};


//==============================================================================
/**
 * Set current field of view.
 * @param {float} aFov - the new field of view.
 * @return {void}
 */
Camera.prototype.setFov = function (aFov) {
//	console.log ("Camera.setFov");
	this.fov = aFov;
	this.computeMatrices();
};


//==============================================================================
/** 
 * Set the zoom
 * @param {float} nb - zoom.
 * @return {void}
 */
Camera.prototype.setProjection = function (nb) {
//	console.log ("Camera.setProjection");
	if (typeof nb == "undefined") {
		this.constProjection = 2.5;
	}
	else {
		if (nb > 0.25 && nb < 7.0) {
			this.constProjection = nb;
		}
	}
};


//==============================================================================
/**
 * @return {float} the zoom.
 */
Camera.prototype.getProjection = function () {
//	console.log ("Camera.getProjection");
	return this.constProjection;
};



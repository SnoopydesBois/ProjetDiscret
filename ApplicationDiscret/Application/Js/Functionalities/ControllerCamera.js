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

/*
 *	distanceCamera : float
 *	hauteurMax : float
 *	posMouse : float[2]
 *	rotate : boolean
 *
 *	ControllerCamera (frame : Frame, name : string)
 *	pressKey (event : WindowEvent) : void
 *	mouseDown (event : WindowEvent, cube : Cube) : void
 *	mouseUp (event : WindowEvent, cube : Cube) : void
 *	mouseMouv (event : WindowEvent, cube : Cube) : void
 *	scroll (event : WindowEvent, cube : Cube) : void
 *	mouvementCamera (mouv : float[]) : void
 *	pythagore (cam : int) : void
 *	pythagore3D (cam1 : int, cam2 : int) : void
 *	zoom (distance : float) : void
 *	reinit () : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



ControllerCamera.prototype = new Controller ();
ControllerCamera.prototype.constructor = ControllerCamera;

/**
 * @constructor
 * @param {Scene} scene - The scene containing all the 3D objects
 */
function ControllerCamera (scene) {
	Controller.call(this);
	
	/**
  	 * {Scene} The scene containing all the 3D objects
 	 */
	this.scene = scene;
	
	/**
	 * {float} 
	 */
	this.distanceCamera = 3.5;
	
	/**
	 * {float} 
	 */
	this.hauteurMax = 0.001;
	
	/**
	 * {float[2]} 
	 */
	this.posMouse = [0.0, 0.0];
	
	/**
	 * {boolean} 
	 */
	this.rotate = false;
};


//==============================================================================
/**
 *	Button of the keyboard has been activated
 *	@param {WindowEvent} event - event captured by the window
 *	@return {void}
 */
ControllerCamera.prototype.pressKey = function (event) {
	if (typeof event !== "object") {
		console.error ("ERROR - ControllerCamera.pressKey : bad type of " 
				+ "parameter");
	}
	if (this.actif) {
		var mouv = [0.0, 0.0];
		if (event.key === 'z') { // Upward rotation
			// movement [float,float] float => [0..1]
			mouv = [0.0, 1.0/15.0];
			this.mouvementCamera(mouv);
		} else if (event.key === 's') { // Downward rotation
			mouv = [0.0, -1.0/15.0];
			this.mouvementCamera(mouv);
		} else if (event.key === 'q') { // Left-hand rotation
			mouv = [1.0/15.0, 0.0];
			this.mouvementCamera(mouv);
		} else if (event.key === 'd') { // Right-hand Rotation
			mouv = [-1.0/15.0, 0.0];
			this.mouvementCamera(mouv);
		} else if (event.key === '-') {
			this.zoom(0.5);
		} else if (event.key === '+') {
			this.zoom(-0.5);
		} else if (event.key === '0' || event.charCode === 32) {
			this.reinit();
		}
	}
};


//==============================================================================
/**
 *	Press the mouse button
 *	@param {WindowEvent} event - event captured by the window
 *	@param {Cube} cube - cube over which the mouse is.
 *	@return {void}
 */
ControllerCamera.prototype.mouseDown = function (event, cube) {
	if (typeof event !== "object") {
		console.error ("ERROR - ControllerCamera.mouseDown : bad type of " 
				+ "parameter");
	}
	// --------------------------------------
	if (event.button === 2) {
		this.rotate = true;
	}
};


//==============================================================================
/**
 *	Release the mouse button
 *	@param {WindowEvent} event - event captured by the window
 *	@param {Cube} cube - cube overwhich the mouse is
 *	@return {void}
 */
ControllerCamera.prototype.mouseUp = function (event, cube) {
	if (typeof event !== "object") {
		console.error ("ERROR - ControllerCamera.mouseUp : bad type of" 
				+ " parameter");
	}
	// --------------------------------------
	this.rotate = false;
};


//==============================================================================
/**
 *	Move the mouse
 *	@param {WindowEvent} event - event captured by the window
 *	@param {Cube} cube - cube over which the mouse is
 *	@return {void}
 */
ControllerCamera.prototype.mouseMouv = function (event, cube) {
	if (typeof event !== "object") {
		console.error ("ERROR - ControllerCamera.mouseMouv : bad type of" 
				+ " parameter");
	}
	// --------------------------------------
	if ((event.altKey || this.rotate) && this.actif) {
		var w = this.scene.getWidth();
		var h = this.scene.getHeight();
		
		// Movement [float,float]  float => [0..1]
		var mouv = [(event.clientX - this.posMouse[0]) / w,
				(event.clientY - this.posMouse[1]) / h];
		this.mouvementCamera(mouv);
		// We store the current mouse position

	}
	this.posMouse[0] = event.clientX;
	this.posMouse[1] = event.clientY;
};


//==============================================================================
/**
 *	@param {WindowEvent} event - event captured by the window
 *	@param {Cube} cube - cube over which the mouse is
 *	@return {void}
 */
ControllerCamera.prototype.scroll = function (event, cube) {
	if (typeof event !== "object") {
		console.error ("ERROR - ControllerCamera.scroll : bad type of" 
				+ " parameter");
	}
	if (this.actif) {
		var delta = Math.max(-1, Math.min(1, (event.wheelDelta || event.detail)
				));
		this.zoom(delta / 4);
	}
};


//==============================================================================
/**
 *	The camera manipulation function.
 *	@param {float[]} mouv -	[float,float] float => [0..1] (1 = 180°, 0 = 0°)
 *	@return {void}
 */
ControllerCamera.prototype.mouvementCamera = function (mouv) {
	
	var cameraAt = this.scene.getCamera().getCameraAt();
	
	var limit = this.distanceCamera - this.hauteurMax;
	if (mouv[1] > 0.0 || mouv[1] < 0.0) { // Upward or downward mouvement
		cameraAt.m[2] = cameraAt.m[2] 
				+ mouv[1] *	this.distanceCamera *	2.0;
		var limit = this.distanceCamera - this.hauteurMax;
		// 1 = 180° : movement throughout all the screen
		// If the mouvement exceed the limit it is repositionned
		if (cameraAt.m[2] > limit 
			 || cameraAt.m[2] <= -limit) {
			cameraAt.m[2] = limit*Math.sign(
											cameraAt.m[2]
										);
		}
		// if x = y = 0 : crash (if no zoom, we do not enter this if)
		if (cameraAt.m[0] === 0.0 
				&& cameraAt.m[1] === 0.0) {
			cameraAt.m[0] = 0.1;
			cameraAt.m[2] = limit;
		} 
		else if (cameraAt.m[0] === 0.0) { // Particular case
			this.pythagore(cameraAt, 1);
		} 
		else if (cameraAt.m[1] === 0.0) { // Particular case
			this.pythagore(cameraAt, 0);
		} 
		else {
			this.pythagore3D(cameraAt, 0,1);
		}
	} 
	if (mouv[0] > 0.0 || mouv[0] < 0.0) { // Right-hand or Left-hand movement
		var tmp = cameraAt.rotateZ(-mouv[0] * Math.PI);
		// 180° : movement throughout all the screen 
		cameraAt.m[0] = tmp.m[0];
		cameraAt.m[1] = tmp.m[1];
		cameraAt.m[2] = tmp.m[2];
	}
	// Camera's matrix calcul
	this.scene.getCamera().computeMatrices();
	//XXX this.frame.draw();
};


//==============================================================================
/**
* Pythagore calcul.
* @param {Vector} cameraAt - The vector containing the coordinate of the point 
* where the camere must look at
* @param {int} index - the indice of the camera's coordinate we want to modify
* @return {void}
*/
ControllerCamera.prototype.pythagore = function (cameraAt, index) {
	var value = Math.sqrt(this.distanceCamera * this.distanceCamera
					- cameraAt.m[2] * cameraAt.m[2]);
	if (cameraAt.m[index] > 0.0) {
		cameraAt.m[index] = value;
	}
	else {
		cameraAt.m[index] = -value;
	}
}


//==============================================================================
/**
* Pythagore calcul in 3D.
* @param {Vector} cameraAt - The vector containing the coordinate of the point 
* where the camere must look at
* @param {int} index1 - the indice of the camera's coordinate we want to modify
* 			This camera is modify using pythagore
* @param {int} index2 - the indice of the camera's coordinate we want to modify
* 			This camera is modify using the new value of 
* 			the camera indexed by cam1
* @return {void}
*/
ControllerCamera.prototype.pythagore3D = function (cameraAt, index1, index2) {
	var a = cameraAt.m[index2] / cameraAt.m[index1]; // a = y/x

	var squareDistanceCam = this.distanceCamera * this.distanceCamera;
	var squareCamAt = cameraAt.m[2] * cameraAt.m[2];
	
	var value = Math.sqrt((squareDistanceCam - squareCamAt) 
			/ (1.0 + a * a));
				 
	if (cameraAt.m[index1] > 0.0) {
		cameraAt.m[index1] = value;
	} else {
		cameraAt.m[index1] = -value
	}
	cameraAt.m[index2] = cameraAt.m[index1] * a;
}


//==============================================================================
/**
 *	Zoom into the 3D space
 *	@param {float} distance - How much do we zoom (in or out)
 * @return {void}
 */
ControllerCamera.prototype.zoom = function (distance) {
	this.scene.getCamera().setProjection (
			this.scene.getCamera().getProjection() + distance);
	// Camera's matrix calcul
	this.scene.getCamera().computeMatrices();
	//XXX this.frame.draw();
};


//==============================================================================
/**
 *	Recenter the camera
 * @return {void}
 */
ControllerCamera.prototype.reinit = function () {
	var cameraAt = this.scene.getCamera().getCameraAt();

	// -Math.sqrt(((3.5 * 3.5) - (3.5 / 2.0) * (3.5 / 2.0)) / 2.0);
	// => -Math.sqrt(9.1875);
	var val = 3,0310889132455352636730310976353; 
	cameraAt.m[0] = val;
	cameraAt.m[1] = val;
	
	cameraAt.m[2] = 1.75;
	this.scene.getCamera ().setProjection ();
	// Camera's matrix calcul
	this.scene.getCamera().computeMatrices();
	//XXX this.frame.draw();
};

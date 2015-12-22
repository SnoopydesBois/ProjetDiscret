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
 * Controller3D(dimension : Dimension)
 * generate() : Surface
 * setGetMeridian(meridian : Function) : void
 * setGetCurveRevolution(curveRevolution : Function) : void
 * getSurface() : Surface
 * getVoxel(position : Vector) : Voxel
 */

/// CODE ///////////////////////////////////////////////////////////////////////

Controller3D.prototype = new Controller;
Controller3D.prototype.constructor = Controller3D;

/**
 * @constructor 
 * @param {Vector} dimension - Vector to define the dimension of the 3D space.
 */ 
function Controller3D (dimension)
{
//	console.log ("Controller3D.constructor");
	if (!(dimension instanceof "Vector")) {
		console.error ("ERROR - Controller3D.constructor : "
				+ "bad type of parameter");
	}
	// --------------------------------------
	Controller.call (this);
	
	/**
	 * {modelGen} The model which can generate the surface.
	 */
	this.modelGen = new modelGen (dimension);
	
	/**
	 * {Function} A function that provide a frozen reference to the meridian
	 */
	this.getMeridian = null;
	 
	/**
	 * {Function} A function that provide a frozen reference to the curve of revolution
	 */
	this.getCurveRevolution = null;
}

//==============================================================================
/**
 * Function that start the generation of the surface from the meridian and the curbe of revolution
 * @return {Surface} The surface surfaceed by the meridian and the curve of revolution
 */
Controller3D.prototype.generate = function() {
	if(!(this.getMeridian instanceof Function) 
		|| !(this.getCurveRevolution instanceof Function)){
		throw "The meridian or the curve of revolution are not functions."
	}
	else{
		meridian = this.getMeridian();
		curveRevolution = this.getCurveRevolution();
		return this.modelGen.generate(meridian, curveRevolution);
	}
}


//==============================================================================
/**
 * @return {Surface} the surface.
 */
Controller3D.prototype.getSurface = function () {
//	console.log ("Controller3D.getsurface");
	// --------------------------------------
	return this.modelGen.getSurface();
};


//==============================================================================
/**
 * @param {Vector} position - The coordinates of the voxel
 * @return {Voxel} the voxel at the x, y, z coordinates
 */
Controller3D.prototype.getVoxel = function (position) {
	if(!(position instanceof Vector)){
		throw "position is not a Vector"
	}
	// --------------------------------------
	return this.modelGen.getVoxel (position);
};


//==============================================================================
/**
 * Get the nth selected cube.
 * @return {Voxel} the selected voxel.
 */
Controller3D.prototype.getSelectedVoxel = function () {
	return this.modelGen.getSelectedVoxel();
};


//==============================================================================
/**
 * @return {Vector} the dimension of the surface.
 */
Controller3D.prototype.getDimension = function () {
//	console.log ("Controller3D.getDimension");
	// --------------------------------------
	return this.modelGen.getDimension();
};


//==============================================================================
/**
 * Is this cube selected.
 * @param {Vector} position - The coordinates of the voxel to test
 * @return {boolean} true if the voxel is selected, false otherwise.
 */
Controller3D.prototype.isSelectedVoxel = function (position) {
	if(!(position instanceof Vector)){
		throw "position is not a Vector"
	}
	// -------------------------------------
	return this.modelGen.isSelectedVoxel(position);
};


//==============================================================================
/**
 * @param {Function} meridian - The function that allows this controller to obtain a frozen reference to the meridian
 */
Controller3D.prototype.setGetMeridian = function(meridian){
	this.getMeridian = meridian();
}


//==============================================================================
/**
 * @param {Function} curveRevolution - The function that allows this controller to obtain a frozen reference to the curve of revolution
 */
Controller3D.prototype.setGetCurveRevolution = function(curveRevolution){
	this.getCurveRevolution = curveRevolution();
}


//==============================================================================
/**
 * Action when a mouse button is pressed.
 * @param {WindowEvent} event - event captured by the window.
 * @param {Vector} position - The coordinates of the click
 * @return {void}
 */
ControllerSelect.prototype.mouseDown = function (event, position) {
//	console.log ("ControllerSelect.mouseDown");
	if (!(event instanceof WindowEvent)){ // A vérifier
		throw "event is not a WindowEvent";
	}
	else if(!(position instanceof Vector)) {
		throw "position is not a Vector"
	}
	// --------------------------------------
	if (event.button === 0) {		
		if (this.modelGen !== undefined) {
			this.modelGen.selectVoxel(position);
		}
	}
};
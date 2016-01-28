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


/* 
 * Controller3D(dimension : Dimension)
 * generate() : Surface
 * setGetMeridian(meridian : Function) : void
 * setGetCurveRevolution(curveRevolution : Function) : void
 * getSurface() : Surface
 * getVoxel(position : Vector) : Voxel
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends Controller
 * @classdesc TODO
 */
Controller3D.prototype = new Controller;
Controller3D.prototype.constructor = Controller3D;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Vector} dimension - Vector to define the dimension of the 3D space.
 */ 
function Controller3D (dimension) {
	/// parameter verification
	if (!(dimension instanceof Vector)) {
		console.error ("Controller3D.constructor: "
				+ "given parameter is not a Vector");
	}
	
	Controller.call (this);
	
	/**
	 * {modelGen} The model which can generate the surface.
	 */
	this.modelGen = new ModelGen (dimension);
	
	/**
	 * {Function} A function that provide a frozen reference to the meridian
	 */
	this.getMeridian = null;
	 
	/**
	 * {Function} A function that provide a frozen reference to the curve of
	 * revolution
	 */
	this.getCurveRevolution = null;
}



//==============================================================================
/**
 * Function that start the generation of the surface from the meridian and the
 * curbe of revolution.
 * 
 * @param {###} mode - 
 * 
 * @return {void}
 * @throws {String} ###
 */
Controller3D.prototype.generate = function (mode) {
	/// verification
	if (! checkType ([this.getMeridian, this.getCurveRevolution], Function,
		Function))
	{
		throw "Controller3D.generate: The meridian and/or the curve revolution "
			+ "are not functions."
		// FIXME trouver une meilleur phrase pour cette exception
	}
	
	var meridian = this.getMeridian ();
	var curveRevolution = this.getCurveRevolution ();
	this.modelGen.generate (meridian, curveRevolution, mode);
};


//==============================================================================
/**

 * @return {Surface} The surface.
 */
Controller3D.prototype.getSurface = function () {
	return this.modelGen.getSurface ();
};


//==============================================================================
/**
 * @param {(Vector | Number[3] | Number)} position - The position of the voxel
 * (if it is a vector or an array) or the X coordinate of the voxel.
 * @param {Number} [y] - Y coordinate of the voxel.
 * @param {Number} [z] - Z coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel at 'position' is visible, false
 * otherwise.
 */
Controller3D.prototype.isVoxelVisible = function (position, y, z) {
	if (typeof position == "number") {
		return this.modelGen.getSurface ().isVoxelVisible (
			new Vector (position, y, z));
	}
	else {
		return this.modelGen.getSurface ().isVoxelVisible (
			new Vector (position));
	}
};


//==============================================================================
/**
 * @param {(Number | Vector)} x - The X coordinate (if it is a number) or all
 * coordinates (if it is a Vector) of the voxel.
 * @param {Number} [y] - The Y coordinate of the voxel.
 * @param {Number} [z] - The Z coordinate of the voxel.
 * 
 * @return {Voxel} The voxel at the x, y, z coordinates.
 * @throws {String} TODO
 */
Controller3D.prototype.getVoxel = function (x, y, z) {
	switch (arguments.length) {
		case 1 :
			if (!(x instanceof Vector)) {
				throw "Controller3D.getVoxel.ErrorNotAVector";
			}
			return this.modelGen.getVoxel (x);
			break;
		case 3 :
			if (! checkType (arguments, "number", "number", "number")) {
				throw "Controller3D.getVoxel.ErrorNotANumber";
			}
			return this.modelGen.getVoxel (new Vector (x, y, z));
			break;
		default :
			throw "Controller3D.getVoxel.ErrorLengthArguments";
	}
};


//==============================================================================
/**
 * TODO
 * 
 * @param {(Number | Vector)} x - The X coordinate (if it is a number) or all coordinates
 * (if it is a Vector) of the voxel.
 * @param {Number} [y] - The Y coordinate of the voxel.
 * @param {Number} [z] - The Z coordinate of the voxel.
 * 
 * @return {boolean} True if the voxel is a voxel of the surface, false
 * otherwise.
 */
Controller3D.prototype.hasVoxel = function (x, y, z) {
	switch (arguments.length) {
		case 1 :
			if (!(x instanceof Vector)){
				throw "Controller3D.getVoxel.ErrorNotAVector";
			}
			return this.modelGen.getVoxel (x) !== null;
			break;
		case 3 :
			if (typeof x !== "number"
				|| typeof y !== "number"
				|| typeof z !== "number"){
				throw "Controller3D.getVoxel.ErrorNotANumber";
			}
			return this.modelGen.getVoxel (new Vector (x, y, z)) !== null;
			break;
		default :
			throw "Controller3D.getVoxel.ErrorLengthArguments";
	}
};


//==============================================================================
/**
 * Get the selected cube.
 * 
 * @return {Voxel} The selected voxel.
 */
Controller3D.prototype.getSelectedVoxel = function () {
	return this.modelGen.getSelectedVoxel ();
};


//==============================================================================
/**
 * @return {Vector} The dimension of the surface.
 */
Controller3D.prototype.getDimension = function () {
	return this.modelGen.getDimension ();
};


//==============================================================================
/**
 * Set the dimension of the surface.
 * @see {@link ModelGen.setDimension}
 * 
 * @param {(Vector | Array]} dimension - The new dimension of the surface.
 * 
 * @return {void}
 */
Controller3D.prototype.setDimension = function (dimension) {
	/// parameter verification
	if (! checkType (arguments, [Vector, Array])) {
		showType (dimension)
		console.trace ()
		throw "Controller3D.setDimension: given parameter is not a Vector";
	}
	
	/// return dimension
	return this.modelGen.setDimension (dimension);
};


//==============================================================================
/**
 * Is this cube selected.
 * 
 * @param {Vector} position - The coordinates of the voxel to test
 * 
 * @return {boolean} True if the voxel is selected, false otherwise.
 */
Controller3D.prototype.isSelectedVoxel = function (position) {
	/// parameter verification
	if (! (position instanceof Vector)){
		throw "Controller3D.isSelectedVoxel: given parameter is not a Vector"
	}
	
	/// return
	return this.modelGen.isSelectedVoxel (position);
};


//==============================================================================
/**
 * @param {Function} meridian - The function that allows this controller to
 * obtain a frozen reference to the meridian.
 * 
 * @return {void}
 * @throws {String} If the given parameter is not a Function.
 */
Controller3D.prototype.setGetMeridian = function (meridian) {
	/// parameter verification
	if (! checkType (arguments, Function)) {
		throw "Controller3D.setGetMeridian: given parameter is not a Function";
	}
	
	/// set the function
	this.getMeridian = meridian;
};


//==============================================================================
/**
 * @param {Function} curveRevolution - The function that allows this controller
 * to obtain a frozen reference to the curve of revolution.
 * 
 * @return {void}
 * @throws {String} If the given parameter is not a Function.
 */
Controller3D.prototype.setGetCurveRevolution = function (curveRevolution) {
	/// parameter verification
	if (! checkType (arguments, Function)) {
		throw "Controller3D.setGetCurveRevolution: given parameter is not a "
			+ "Function";
	}
	
	/// set the function
	this.getCurveRevolution = curveRevolution;
};


//==============================================================================
/**
 * Action when a mouse button is pressed. TODO This action is ...
 * 
 * @param {WindowEvent} event - Event captured by the window.
 * @param {Vector} position - The coordinates of the click.
 * 
 * FIXME 'position' ne sert a rien, la position du click est déja dans
 * event.layerX et event.layerY.
 * 
 * @return {void}
 * @throws {String} TODO
 */
Controller3D.prototype.mouseDown = function (event, position) {
	if (!(event instanceof WindowEvent)){ // A vérifier
		throw "event is not a WindowEvent";
	}
	else if (!(position instanceof Vector)) {
		throw "position is not a Vector"
	}
	
	if (event.button === 0) { // FIXME ça veut dire quoi 0 ?
		if (this.modelGen !== undefined) {
			this.modelGen.selectVoxel (position);
		}
	}
};


//==============================================================================
/**
 * This function return whether the algorithm finished his computations.
 * @see {@link ModelGen.isAlgoFinished}
 * 
 * @return {boolean} Whether the algorithm finished his computations.
 */
Controller3D.prototype.isAlgoFinished = function (){
	return this.modelGen.isAlgoFinished ();
};


//==============================================================================
/**
 * TODO
 * @see {@link ModelGen.newVoxels}
 * 
 * @return {TODO} 
 */
Controller3D.prototype.newVoxels = function () {
	return this.modelGen.newVoxels ();
};


//==============================================================================
/**
 * TODO
 * @see {@link ModelGen.voxelsRead}
 * 
 * @return {TODO} 
 */
Controller3D.prototype.voxelsRead = function () {
	this.modelGen.voxelsRead ();
};



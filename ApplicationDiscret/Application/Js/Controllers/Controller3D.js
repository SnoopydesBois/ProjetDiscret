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
 * @classdesc A class used to communicate between the application and the modelGen
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
	 * {modelGen} The model which generates the surface.
	 */
	this.modelGen = new ModelGen (dimension);
	
	/**
	 * {Function} A function that provides a frozen reference to the generatrix
	 */
	this.getMeridian = null;
	 
	/**
	 * {Function} A function that provides a frozen reference to the directrix
	 */
	this.getCurveRevolution = null;
}



//==============================================================================
/**
 * Function that start the generation of the surface from the meridian and the
 * curbe of revolution.
 * 
 * @param {int} mode - wether the surface should be generated using an 
 * incrementalor a brute force method
 * 
 * @return {void}
 * @throws {String} Controller3D.generate: The meridian and/or the curve revolution 
			are not functions.
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
 * @return {Surface} The current surface of the model.
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
 * @see {@link Surface.isVoxelVisible}
 * 
 * @return {boolean} True if the voxel at 'position' is visible, false
 * otherwise.
 */
Controller3D.prototype.isVoxelVisible = function (position, y, z) {
	return this.modelGen.getSurface ().isVoxelVisible (position, y, z);
};


//==============================================================================
/**
 * @param {(Number | Vector)} x - The X coordinate (if it is a number) or all
 * coordinates (if it is a Vector) of the voxel.
 * @param {Number} [y] - The Y coordinate of the voxel.
 * @param {Number} [z] - The Z coordinate of the voxel.
 * 
 * @return {Voxel} The voxel at the x, y, z coordinates.
 * @throws {String} Controller3D.getVoxel.ErrorLengthArguments - Wrong number of arguments.
 * @throws {String} Controller3D.getVoxel.ErrorNotAVector - There is only one argument but it's not a vector.
 * @throws {String} Controller3D.getVoxel.ErrorNotANumber - There are three arguments but at least one of them is not a number.
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
 * @throws {String} Controller3D.hasVoxel.ErrorLengthArguments - Wrong number of arguments.
 * @throws {String} Controller3D.hasVoxel.ErrorNotAVector - There is only one argument but it's not a vector.
 * @throws {String} Controller3D.hasVoxel.ErrorNotANumber - There are three arguments but at least one of them is not a number.
 * 
 * @return {boolean} True if the voxel is a voxel of the surface, false
 * otherwise.
 */
Controller3D.prototype.hasVoxel = function (x, y, z) {
	switch (arguments.length) {
		case 1 :
			if (!(x instanceof Vector)){
				throw "Controller3D.hasVoxel.ErrorNotAVector";
			}
			return this.modelGen.getVoxel (x) !== null;
			break;
		case 3 :
			if (typeof x !== "number"
				|| typeof y !== "number"
				|| typeof z !== "number"){
				throw "Controller3D.hasVoxel.ErrorNotANumber";
			}
			return this.modelGen.getVoxel (new Vector (x, y, z)) !== null;
			break;
		default :
			throw "Controller3D.hasVoxel.ErrorLengthArguments";
	}
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
 * @throws Controller3D.setDimension: given parameter is not a Vector
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
 * @param {Function} meridian - The function that allows this controller to
 * obtain a frozen reference to the meridian.
 * 
 * @return {void}
 * @throws Controller3D.setGetMeridian: given parameter is not a Function
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
 * @throws {String} Controller3D.setGetCurveRevolution: given parameter is not a
			Function
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
 * This function returns whether the algorithm has finished his computations.
 * @see {@link ModelGen.isAlgoFinished}
 * 
 * @return {boolean} Whether the algorithm has finished his computations.
 */
Controller3D.prototype.isAlgoFinished = function (){
	return this.modelGen.isAlgoFinished ();
};



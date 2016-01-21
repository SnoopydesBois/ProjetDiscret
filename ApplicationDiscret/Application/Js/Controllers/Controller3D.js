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
	if (!(dimension instanceof Vector)) {
		console.error ("Controller3D.constructor : "
				+ "bad type of parameter");
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
 */
Controller3D.prototype.generate = function () {
	if (!(this.getMeridian instanceof Function) 
		|| !(this.getCurveRevolution instanceof Function)){
		throw "Controller3D.generate : The meridian or the curve of revolution is not a function."
	}
	else {
		var meridian = this.getMeridian ();
		var curveRevolution = this.getCurveRevolution ();
		this.modelGen.generate (meridian, curveRevolution);
	}
};


//==============================================================================
/**
 * @return {Surface} the surface.
 */
Controller3D.prototype.getSurface = function () {
	return this.modelGen.getSurface();
};


//==============================================================================
/**
 * @param {Vector} position - The coordinates of the voxel.
 * 
 * @return {Voxel} The voxel at the x, y, z coordinates.
 */
Controller3D.prototype.getVoxel = function (x, y, z) {
	switch (arguments.length) {
		case 1 :
			if (!(x instanceof Vector)){
				throw "Controller3D.getVoxel.ErrorNotAVector";
			}
			return this.modelGen.getVoxel (x);
			break;
		case 3 :
			if (typeof x !== "number"
				|| typeof y !== "number"
				|| typeof z !== "number"){
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
 * @param {Vector} position - The coordinates of the voxel.
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
 * Get the nth selected cube.
 * 
 * @return {Voxel} the selected voxel.
 */
Controller3D.prototype.getSelectedVoxel = function () {
	return this.modelGen.getSelectedVoxel();
};


//==============================================================================
/**
 * @return {Vector} The dimension of the surface.
 */
Controller3D.prototype.getDimension = function () {
	return this.modelGen.getDimension();
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
	if(!(position instanceof Vector)){
		throw "position is not a Vector"
	}
	return this.modelGen.isSelectedVoxel(position);
};


//==============================================================================
/**
 * @param {Function} meridian - The function that allows this controller to
 * obtain a frozen reference to the meridian.
 * 
 * @return {void}
 */
Controller3D.prototype.setGetMeridian = function (meridian) {
	this.getMeridian = meridian;
};


//==============================================================================
/**
 * @param {Function} curveRevolution - The function that allows this controller
 * to obtain a frozen reference to the curve of revolution.
 * 
 * @return {void}
 */
Controller3D.prototype.setGetCurveRevolution = function (curveRevolution) {
	this.getCurveRevolution = curveRevolution;
};


//==============================================================================
/**
 * Action when a mouse button is pressed.
 * 
 * @param {WindowEvent} event - Event captured by the window.
 * @param {Vector} position - The coordinates of the click.
 * 
 * @return {void}
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
 * This function return whether the algorithm finished his computations
 * @return {boolean} whether the algorithm finished his computations
 */
Controller3D.prototype.isAlgoFinished = function (){
	return this.modelGen.isAlgoFinished();
}
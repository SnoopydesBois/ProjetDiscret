/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * Copyright BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy,
 * LAURET Karl, (juin 2015)
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
 * termes
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 *
 * select (modelContr : ModelController,
 *         face : Facet,
 *         multiple : boolean) : void
 * cube (modelContr : ModelController) : void
 * face (modelContr : ModelController) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



ModelGen.prototype.constructor = ModelGen;

/**
 * @constructor
 *
 * @param {Vector} dimension - The dimension of the 3D space.
 */
function ModelGen (dimension) {

	/**
	 * {Vector} The dimension of the 3D space.
	 */
	this.dimension = dimension;
	
	/**
	 * {Surface} The surface of the 3D space, there is no surface by default.
	 */
	this.surface = undefined;
}


//==============================================================================
/**
 * @param {Vector} position - the voxel's coordinates
 * @return {Voxel} the voxel at the x, y, z coordinates or null if it doesnt
 * exist
 */
ModelGen.prototype.getVoxel = function (position) {
	return this.surface.getVoxel (position);
}


//==============================================================================
/**
 * @return {Voxel} the voxel selected
 */
ModelGen.prototype.getSelectedVoxel = function () {
	if(this.surface === undefined){
		throw "the surface is not generated";
	}

	return this.surface.getSelectedVoxel();
}


//==============================================================================
/**
 * @return {Surface} The surface to model.
 */
ModelGen.prototype.getSurface = function () {
	return this.surface;
};


//==============================================================================
/**
 * @return {Vector} The dimensions of the 3D space.
 */
ModelGen.prototype.getDimension = function () {
	return this.dimension;
};


//==============================================================================
/**
 * Set the dimension of the generate surface.
 *
 * @param {(Vector | Number[3] | Number} dimension - The dimensions of the 3D
 * space (@see {@link Vector}).
 *
 * @return {void}
 * @throws {String} TODO
 */
ModelGen.prototype.setDimension = function (dimension) {
	/// parameter verification
	if (! checkType (arguments, [Vector, Array, "number"])) {
		throw "ModelGen.setDimension: bad type of parameter";
	}

	/// set value
	this.dimension = new Vector (dimension);
};


//==============================================================================
/**
 * This function generate the surface.
 *
 * @param {Curve} meridian - The meridian to use to model.
 * @param {Curve} curveRevolution - The curve of revolution to use to model.
 *
 * @return {Surface} The surface modeled using the meridian and the curve
 * of revolution.
 * @throws {String} "ModelGen.generate.ErrorBadCurveType" - The meridian must
 * be explicit or parametric and the revolution curve must be implicit.
 */
ModelGen.prototype.generate = function (meridian, curveRevolution, mode) {
	if (meridian instanceof ExplicitCurve
			&& curveRevolution instanceof ImplicitCurve)
	{
		this.algoExplicit(meridian, curveRevolution, mode);
	}
	else if (meridian instanceof DrawnCurve
			&& curveRevolution instanceof ImplicitCurve)
	{
		this.algoParametric (meridian, curveRevolution);
	}
	else {
		throw "ModelGen.generate.ErrorBadCurveType";
	}
	return this.surface;
}


//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions
 * @param {Curve} meridian - the meridian to use to model
 * @param {Curve} curveRevolution - the curve of revolution to use to model
 */
ModelGen.prototype.algoExplicit = function (meridian, curveRevolution, mode){
	var dim = this.getDimension ();
	this.surface = new Surface (dim);
	var fMeridian = meridian.getEquation ();
	var fRevol = curveRevolution.getEquation ();
	if(mode === 0) {
		this.worker = new ExplicitAlgo2Worker (fMeridian, fRevol, dim,
			this.surface);
	}
	else {
		this.worker = new ExplicitAlgo1Worker (fMeridian, fRevol, dim,
			this.surface);
	}
};


//==============================================================================
/**
 * This function return whether the algorithm finished his computations.
 *
 * @return {boolean} Whether the algorithm finished his computations.
 */
ModelGen.prototype.isAlgoFinished = function () {
	return this.worker.finished;
};


//==============================================================================
/**
 * @return {} TODO
 */
ModelGen.prototype.newVoxels = function () {
	return this.worker.newVoxels;
};


//==============================================================================
/**
 * TODO
 *
 * @return {void}
 */
ModelGen.prototype.voxelsRead = function () {
	this.worker.newVoxels = false;
};

//==============================================================================
/**
 * This function generate the surface using the algorithm for parametric
 * functions.
 *
 * @param {Curve} meridian - The meridian to use to model.
 * @param {Curve} curveRevolution - The curve of revolution to use to model.
 *
 * @return {Surface} The surface modeled using the meridian and the curve
 * of revolution.
 */
ModelGen.prototype.algoParametric = function (meridian, curveRevolution, mode){	
	var dim = this.getDimension ();
	this.surface = new Surface (dim);
	// !!! test !!!
	var fMeridian = new DrawnCurve();
	fMeridian.addPoint(1,1);
	fMeridian.addPoint(5,1);
	fMeridian.addPoint(10,1);
	var fRevol = curveRevolution.getEquation ();
	if(mode === 0)
		this.worker = new ParametricAlgo1Worker(fMeridian, fRevol, dim, this.surface);
	else
		this.worker = new ParametricAlgo1Worker(fMeridian, fRevol, dim, this.surface);
//	return this.surface;
};


//==============================================================================
/**
 * TODO description
 *
 * @param {Vector} position - The position of the voxel to select.
 *
 * @return {void}
 * @throws {String}
 */
ModelGen.prototype.selectVoxel = function (position) {
	if (!(position instanceof Vector)){
		throw "ModelGen.selectVoxel: position is not a Vector";
	}
	else if (this.surface === undefined){
		throw "ModelGen.selectVoxel: the surface is not generated";
	}

	if (this.surface.isVoxel (position)){
		this.surface.select (position); // Select
	}
	else {
		this.surface.select (null); // Unselect
	}
};


//==============================================================================
/**
 * TODO description
 *
 * @param {Vector} position - The position of the voxel to select.
 *
 * @return {boolean} True if the voxel is selected, false otherwise.
 * @throws {String} TODO
 */
ModelGen.prototype.isSelectedVoxel = function (position) {
	if (!(position instanceof Vector)) {
		throw "ModelGen.isSelectedVoxel: position is not a Vector";
	}
	else if (this.surface === undefined) {
		throw "ModelGen.isSelectedVoxel: the surface is not generated";
	}

	return this.surface.getSelectedVoxel().getCoordinates().equals (position);
};

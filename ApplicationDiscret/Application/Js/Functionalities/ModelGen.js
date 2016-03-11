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


/* dimension : Vector
 * surface : Surface 
 * 
 * ModelGen (dimension : Vector)
 *
 * getVoxel (position : Vector) : Voxel
 * getSurface () : Surface
 * getDimension () : Vector
 * setDimension (dimension : Vector) : void
 * generate (meridian : Curve, curveRevolution : Curve, mode : int) : Surface
 * algoExplicit (
 *     meridian : ExplicitCurve,
 *     curveRevolution : ImplicitCurve,
 *     mode : int
 * ) : void
 * isAlgoFinished () : boolean
 * algoParametric (
 *     meridian : DrawnCurve,
 *     curveRevolution : ImplicitCurve,
 *     mode : int
 * ) : void
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Manage the generation of the surface.
 */
ModelGen.prototype.constructor = ModelGen;



//##############################################################################
//	Constructor
//##############################################################################



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
	
	/**
	 * {AlgoWorker} The worker (i.e. threads) which
	 */
	this.worker = null;
}



//##############################################################################
//	Other methods
//##############################################################################



/**
 * @param {Vector} position - The voxel's coordinates.
 * 
 * @return {Voxel} The voxel at the x, y, z coordinates or null if it doesn't
 * exist.
 */
ModelGen.prototype.getVoxel = function (position) {
	return this.surface.getVoxel (position);
};


//==============================================================================
/**
 * @return {Surface} The surface of the model.
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
 * @param {(Vector | Number[3] | Number)} dimension - The dimensions of the 3D
 * space.
 * @see {@link Vector}
 *
 * @return {void}
 * @throws {String} The dimension is not of type Vector, Array or Number
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
		this.algoExplicit (meridian, curveRevolution, mode);
	}
	else if (meridian instanceof DrawnCurve
			&& curveRevolution instanceof ImplicitCurve)
	{
		this.algoParametric (meridian, curveRevolution, mode);
	}
	else {
		throw "ModelGen.generate.ErrorBadCurveType";
	}
	return this.surface;
};


//==============================================================================
/**
 * This function generate the surface using the algorithm for explicit
 * functions.
 * 
 * @param {ExplicitCurve} meridian - The meridian to use to model.
 * @param {ImplicitCurve} curveRevolution - The curve of revolution to use to
 * model.
 * @param {int} mode - 0 or incremental generation and 1 for brute-force.
 * 
 * @return {void}
 */
ModelGen.prototype.algoExplicit = function (meridian, curveRevolution, mode) {
	var dim = this.getDimension ();
	this.surface = new Surface (dim);
	var fMeridian = meridian.getEquation ();
	var fRevol = curveRevolution.getEquation ();
	if (mode === 0) {
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
 * @return {boolean} True when algorithm finished, false otherwise.
 */
ModelGen.prototype.isAlgoFinished = function () {
	return this.worker.finished;
};


//==============================================================================
/**
 * This function generate the surface using the algorithm for parametric
 * functions.
 *
 * @param {DrawnCurve} meridian - The meridian to use to model.
 * @param {ImplicitCurve} curveRevolution - The curve of revolution to use to
 * model.
 * @param {int} mode - 0 or incremental generation and 1 for brute-force.
 *
 * @return {void}
 */
ModelGen.prototype.algoParametric = function (meridian, curveRevolution, mode) {	
	var dim = this.getDimension ();
	this.surface = new Surface (dim);
	var fRevol = curveRevolution.getEquation ();
	if (mode === 0) {
		this.worker = new ParametricAlgo2Worker (meridian, fRevol, dim, 
			this.surface);
	}
	else {
		this.worker = new ParametricAlgo1Worker (meridian, fRevol, dim, 
			this.surface);
	}
};



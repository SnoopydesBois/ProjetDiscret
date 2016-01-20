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
	 *
	 */
	this.dimension = dimension;
	/**
	 * {Surface} The surface of the 3D space, there is no surface by default
	 */
	this.surface = undefined;
}


//==============================================================================
/**
 * @param {Vector} position - the voxel's coordinates
 * @return {Voxel} the voxel at the x, y, z coordinates or null if it doesnt
 * exist
 */
ModelGen.prototype.getVoxel = function(position) {
	return this.surface.getVoxel (position);
}


//==============================================================================
/**
 * @return {Voxel} the voxel selected
 */
ModelGen.prototype.getSelectedVoxel = function(){
	if(this.surface === undefined){
		throw "the surface is not generated";
	}

	return this.surface.getSelectedVoxel();
}


//==============================================================================
/**
 * @return {Surface} the surface to model
 */
ModelGen.prototype.getSurface = function(){
	return this.surface;
};


//==============================================================================
/**
 * @return {Vector} the dimensions of the 3D space
 */
ModelGen.prototype.getDimension = function () {
	return this.dimension;
//	return this.repere.getDimension ();
};


//==============================================================================
/**
 * This function generate the surface
 * @param {Curve} meridian - the meridian to use to model.
 * @param {Curve} curveRevolution - the curve of revolution to use to model.
 * @throws {String} "ModelGen.generate.ErrorBadCurveType" - The meridian must
 * be explicit or parametric and the revolution curve must be implicit.
 * @return {Surface} the surface modeled using the meridian and the curve
 * of revolution
 */
ModelGen.prototype.generate = function (meridian, curveRevolution){
	if (meridian instanceof ExplicitCurve
			&& curveRevolution instanceof ImplicitCurve) {
		this.algoExplicit(meridian, curveRevolution);
	} else if (meridian instanceof ParametricCurve
			&& curveRevolution instanceof ImplicitCurve)
	{
		this.algoParametric(meridian, curveRevolution);
	} else {
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
ModelGen.prototype.algoExplicit = function (meridian, curveRevolution){
	var dim = this.getDimension ();
	this.surface = new Surface (dim);
	var fMeridian = meridian.getEquation ();
	var fRevol = curveRevolution.getEquation ();
	var dimx = dim.x;
	var dimy = dim.y;
	var dimz = dim.z;
	var maxx = Math.trunc(dimx / 2);
	var maxy = Math.trunc(dimy / 2);
	for (var z = 0; z < dimz; ++z) {
		var rz = fMeridian.compute([z]);
		var rz1 = fMeridian.compute([z - 0.5]);
		var rz2 = fMeridian.compute([z + 0.5]);
		for (var y = 0; y < dimy; y++){
			for (var x = 0; x < dimx; x++){
				if (check26Connex(fRevol, x - maxx, y - maxy, [rz, rz1, rz2])){
					this.surface.addVoxel(new Vector(x,y,z), ConnexityEnum.c26);
				} else if (check18Connex(fRevol, x - maxx, y - maxy, [rz, rz1, rz2])) {
					this.surface.addVoxel(new Vector(x,y,z), ConnexityEnum.c18);
				} else if (check6Connex(fRevol, x - maxx, y - maxy, [rz1, rz2])){
					this.surface.addVoxel(new Vector(x,y,z), ConnexityEnum.c6);
				}
			} // end for x
		} // end for y
	} // end for z
	//for( var i = 0; i < 5; i++)
		//this.surface.addVoxel(new Vector(i,i,i), ConnexityEnum.c26);
//	this.surface = n64.modelController.modelGen.surface;
};


//==============================================================================
/**
 * Return true if the array has positives AND negative values else return false.
 * @param {float[]} tab - The array to be tested.
 */
function arrayPosNeg (tab){
	var length = tab.length;
	var neg = false;
	var pos = false;
	for (var i = 0; i < length; i++){
		neg = neg || tab[i] <= 0;
		pos = pos || tab[i] >= 0;
	}
	return neg && pos;
};


//==============================================================================
/**
 * Check whether a voxel is part of the 26 connexe revolution surface.
 * @param {Equation} fRevol - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} z - z array containing f(z), f(z-0.5), f(z+0.5), f being
 * the equation of the meridian and z the coordinate of the voxel.
 */
function check26Connex (fRevol, x, y, z){
	var values = [];
	values[0] = fRevol.compute([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[1] = fRevol.compute([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[2] = fRevol.compute([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[3] = fRevol.compute([(x-0.5)/z[0], (y-0.5)/z[0]]);
	values[4] = fRevol.compute([(x+0.5)/z[1], (y)/z[1]]);
	values[5] = fRevol.compute([(x-0.5)/z[1], (y)/z[1]]);
	values[6] = fRevol.compute([(x)/z[1], (y+0.5)/z[1]]);
	values[7] = fRevol.compute([(x)/z[1], (y-0.5)/z[1]]);
	values[8] = fRevol.compute([(x+0.5)/z[2], (y)/z[2]]);
	values[9] = fRevol.compute([(x-0.5)/z[2], (y)/z[2]]);
	values[10] = fRevol.compute([(x)/z[2], (y+0.5)/z[2]]);
	values[11] = fRevol.compute([(x)/z[2], (y-0.5)/z[2]]);

	return arrayPosNeg (values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 18 connexe revolution surface.
 * @param {Equation} fRevol - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[3]} - z array containing f(z), f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 */
function check18Connex(fRevol, x, y, z){
	var values = [];
	values[0] = fRevol.compute([(x+0.5)/z[0], (y)/z[0]]);
	values[1] = fRevol.compute([(x-0.5)/z[0], (y)/z[0]]);
	values[2] = fRevol.compute([(x)/z[0], (y+0.5)/z[0]]);
	values[3] = fRevol.compute([(x)/z[0], (y-0.5)/z[0]]);
	values[4] = fRevol.compute([(x)/z[1], (y)/z[1]]);
	values[5] = fRevol.compute([(x)/z[2], (y)/z[2]]);

	return arrayPosNeg(values);
}


//==============================================================================
/**
 * Check whether a voxel is part of the 6 connexe revolution surface.
 * @param {Equation} fRevol - The equation for the revolution curve.
 * @param {int} x - x coordinate of the voxel
 * @param {int} y - y coordinate of the voxel
 * @param {float[2]} - z array containing f(z-0.5), f(z+0.5), f being the
 * equation of the meridian and z the coordinate of the voxel.
 */
function check6Connex(fRevol, x, y, z){
	var values = [];
	values[0] = fRevol.compute([(x+0.5)/z[1], (y+0.5)/z[1]]);
	values[1] = fRevol.compute([(x-0.5)/z[1], (y+0.5)/z[1]]);
	values[2] = fRevol.compute([(x+0.5)/z[1], (y-0.5)/z[1]]);
	values[3] = fRevol.compute([(x-0.5)/z[1], (y-0.5)/z[1]]);
	values[4] = fRevol.compute([(x+0.5)/z[0], (y+0.5)/z[0]]);
	values[5] = fRevol.compute([(x-0.5)/z[0], (y+0.5)/z[0]]);
	values[6] = fRevol.compute([(x+0.5)/z[0], (y-0.5)/z[0]]);
	values[7] = fRevol.compute([(x-0.5)/z[0], (y-0.5)/z[0]]);
	return arrayPosNeg(values);
}


//==============================================================================
/**
 * This function generate the surface using the algorithm for parametric
 * functions
 * @param {Curve} meridian - the meridian to use to model
 * @param {Curve} curveRevolution - the curve of revolution to use to model
 * @return {Surface} the surface modeled using the meridian and the curve
 * of revolution
 */
ModelGen.prototype.algoParametric = function (meridian, curveRevolution){
	throw "ModelGen.algoParametric.NotImplementedYet";
//	return this.surface;
};


//==============================================================================
/**
 * @param {Vector} position - The position of the voxel to select.
 * @return {void}
 */
ModelGen.prototype.selectVoxel = function (position) {
	if (!(position instanceof Vector)){
		throw "position is not a Vector";
	} else if(this.surface === undefined){
		throw "the surface is not generated";
	}

	if (this.surface.isVoxel (position)){
		this.surface.select (position); // Select
	} else {
		this.surface.select (null); // Unselect
	}
};


//==============================================================================
/**
 * @param {Vector} position - The position of the voxel to select.
 * @return {boolean} true if the voxel is selected, else false
 */
ModelGen.prototype.isSelectedVoxel = function (position) {
	if (!(position instanceof Vector)) {
		throw "position is not a Vector";
	} else if (this.surface === undefined) {
		throw "the surface is not generated";
	}

	return this.surface.getSelectedVoxel().getCoordinates().equals (position);
};



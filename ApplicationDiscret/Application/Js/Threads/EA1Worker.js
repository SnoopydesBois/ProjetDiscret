/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
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


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @module EA1Worker
 */



//##############################################################################
//	Script import
//##############################################################################



importScripts ("WorkersUtil.js");



//##############################################################################
//	Global variables
//##############################################################################



/*
 * Impossible de faire une classe pour un worker donc toutes les variables 
 * suivantes sont globales
 */
 
/**
 * {int} The id of the worker.
 */ 
var id;
/**
 * {Vector} The dimensions of the 3D space.
 */
var dimension;
/**
 * {Equation} The equation for the directrix.
 */
var implicit_curve;
/**
 * {Equation} The curve for the generatrix.
 */
var explicit_curve;
/**
 * {Int} The minimum value of z this worker has to work with.
 */
var zMin;
/**
 * {Int} The maximum value of z this worker has to work with.
 */
var zMax;



//##############################################################################
//	Functions
//##############################################################################



/**
 * This function generate the surface using the algorithm for explicit
 * functions whith no optimisation.
 * 
 * @return {void}
 */
function algo () {
	var dimx = dimension.x;
	var dimy = dimension.y;
	var dimz = dimension.z;
	var maxx = Math.trunc (dimx / 2);
	var maxy = Math.trunc (dimy / 2);
	zMax = Math.min (zMax, dimz);
	for (var z = zMin; z < zMax; ++z) {
		var rz = explicit_curve.compute ([z]);
		if (rz == 0)
			rz += 0.01;
		var rz1 = explicit_curve.compute ([z - 0.5]);
		if (rz1 == 0)
			rz1 += 0.01;
		var rz2 = explicit_curve.compute ([z + 0.5]);
		if (rz2 == 0)
			rz2 += 0.01;
		var buffer = [];
		var bufferSize = 0;
		for (var y = 0; y < dimy; y++) {
			for (var x = 0; x < dimx; x++) {
				connexity = checkVoxel (implicit_curve, x - maxx, y - maxy,
					[rz, rz1, rz2]);
				if (connexity != 0) {
					buffer.push([x,y,z,connexity]);
					bufferSize ++;
				}
			} // end for x
		} // end for y
		if (bufferSize !=0)
			postMessage ([buffer, bufferSize]);
	} // end for z
}


//==============================================================================
/**
 * Receive the meridian, revolution curve and dimension, then launch algorithm
 * and ask for termination.
 * 
 * @param {Event} e - e.data contains the message received.
 * 
 * @return {void}
 */
onmessage = function (e) {
	id = e.data[0];
	explicit_curve = new Equation (e.data[1]);
	implicit_curve = new Equation (e.data[2]);
	dimension = new Vector (e.data[3]);
	zMin = e.data[4];
	zMax = e.data[5];
	try {
		algo ();
	}
	catch (e) {
		postMessage (["Abort"]);
	}
	postMessage (["Terminate", id]);
};



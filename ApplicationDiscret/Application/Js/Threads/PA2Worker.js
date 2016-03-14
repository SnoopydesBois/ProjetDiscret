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
 * @module PA2Worker
 */



//##############################################################################
//	Script import
//##############################################################################



importScripts ("WorkersUtil.js");
importScripts ("../Objects/Curve.js");
importScripts ("../Objects/DrawnCurve.js");



//##############################################################################
//	Global variables
//##############################################################################



/*
 * Impossible de faire une classe pour un worker donc toutes les variables 
 * suivantes sont globales
 */

/**
 * {Equation} implicit_curve - the equation for the directrix
 */
var implicit_curve;
/**
 * {Equation} explicit_curve - the equation for the generatrix
 */
var explicit_curve;
/**
 * {boolean[x][y][z]} implicit_curve - the equation for the directrix
 */
var checked = [];
/**
 * {int} dimx - the size for x dimension
 */
var dimx;
/**
 * {int} dimy - the size for x dimension
 */
var dimy;
/**
 * {int} dimz - the size for x dimension
 */
var dimz;
/**
 * {float[n][3]} pile - the pile of voxels to check
 */
var pile = [];



//##############################################################################
//	Functions
//##############################################################################



/**
 * This function generate the surface using the algorithm for explicit
 * functions.
 * 
 * @return {void}
 */
function algo () {
	var maxx = Math.trunc (dimx / 2);
	var maxy = Math.trunc (dimy / 2);
	var buffer = [];
	var bufferSize = 0;
	var tValues = [];
	var connexity = "";
	var x, y, t, z;
	//find first voxel
	for (t = 0; t < dimt && bufferSize === 0; ++z) {
		tValues[t] = [];
		tValues[t][0] = parametric_curve.getX (t);
		if (tValues[t][0] === 0)
			tValues[t][0] = 0.001;
		tValues[t][1] = parametric_curve.getX (t - 0.5);
		if (tValues[t][1] === 0)
			tValues[t][1] = 0.001;
		tValues[t][2] = parametric_curve.getX (t + 0.5);
		if (tValues[t][2] === 0)
			tValues[t][2] = 0.001;
		z = Math.floor (parametric_curve.getY (t) + 0.5);
		for (y = 0; y < dimy && bufferSize === 0; ++y) {
			for (x = 0; x < dimx && bufferSize === 0; ++x) {
				connexity = checkVoxel (implicit_curve, x - maxx, y - maxy,
					tValues[t]);
				if (connexity !== 0){
					buffer.push([x, y, z, connexity]);
					bufferSize++;
					addNeighboursToPile (x, y, t, pile, checked, dimx, dimy,
						dimt);
				}
				checked[x][y][t] = true;
			} // end for x
		} // end for y
	} // end for z
	//Incrementation
	var voxel;
	while (pile.length > 0) {
		if (bufferSize >= 1000) {
			postMessage ([buffer, bufferSize]);
			buffer = [];
			bufferSize = 0;
		}
		voxel = pile.pop ();
		checked[voxel[0]][voxel[1]][voxel[2]] = true;
		//postMessage(["checkedVoxels"], checked);
		if(tValues[voxel[2]] == undefined){
			tValues[voxel[2]] = [];
			tValues[voxel[2]][0] = parametric_curve.getX([voxel[2]]);
			if (tValues[voxel[2]][0] == 0)
				tValues[voxel[2]][0] = 0.01;
			tValues[voxel[2]][1] = parametric_curve.getX([voxel[2] - 0.5]);
			if (tValues[voxel[2]][1] == 0)
				tValues[voxel[2]][1] = 0.01;
			tValues[voxel[2]][2] = parametric_curve.getX([voxel[2] + 0.5]);
			if (tValues[voxel[2]][2] == 0)
				tValues[voxel[2]][2] = 0.01;
		}
		connexity = checkVoxel (implicit_curve, voxel[0] - maxx,
			voxel[1] - maxy, tValues[voxel[2]]);
		if (connexity !== 0){
			buffer.push ([voxel[0], voxel[1], 
				Math.floor(parametric_curve.getY (voxel[2]) + 0.5), connexity]);
			bufferSize++;
			addNeighboursToPile (voxel[0], voxel[1], voxel[2], pile, checked,
				dimx, dimy, dimt);
		}
	}
	//post last buffer
	postMessage ([buffer, bufferSize,"Terminate"]);
}


//==============================================================================
function init (e) {
	parametric_curve = new DrawnCurve ();
	parametric_curve.xList = e.data[0][0];
	parametric_curve.yList = e.data[0][1];
	implicit_curve = new Equation (e.data[1]);
	var dimension = new Vector(e.data[2]);
	dimx = dimension.x;
	dimy = dimension.y;
	dimt = parametric_curve.getMaxT();
	var x, y, t;
	for (x = 0; x < dimx; ++x) {
		checked[x] = [];
		for (y = 0; y < dimy; ++y) {
			checked[x][y] = [];
			for (t = 0; t < dimt; ++t) {
				checked[x][y][t] = false;
			}
		}
	}
	try {
		algo ();
	}
	catch (e) {
		console.log (e);
		postMessage ([[], 0,"Abort"]);
		postMessage ([[], 0,"Terminate"]);
	}
}


//==============================================================================
/**
 * Receive the meridian, revolution curve and dimension, then launch algorithm
 * and ask for termination
 * 
 * @param {Event} e - e.data contains the message received.
 * 
 * @return {void}
 */
onmessage = function (e) {
	if(e.data[0] === "init") {
		e.data.splice(0,1);
		init(e);
	}
	else if (e.data[0] === "checkedVoxels") {
		checkedVoxels = e.data[1];
	}
	else if (e.data[0] === "pile") {
		pile = e.data[1];
	}
};



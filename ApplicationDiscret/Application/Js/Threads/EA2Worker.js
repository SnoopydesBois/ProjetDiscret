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
 * @module EA2Worker
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
 * {Equation} The equation for the directrix
 */
var implicit_curve;
/**
 * {Equation} The equation for the generatrix
 */
var explicit_curve;
/**
 * {boolean[][][]} The equation for the directrix
 */
var checked = [];
/**
 * {int} The size for x dimension
 */
var dimx;
/**
 * {int} The size for x dimension
 */
var dimy;
/**
 * {int} The size for x dimension
 */
var dimz;
/**
 * {float[n][3]} The pile of voxels to check
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
	var zValues = [];
	var connexity = "";
	var x, y, z;
	//find first voxel
	for (z = 0; z < dimz && bufferSize === 0; ++z) {
		zValues[z] = [];
		zValues[z][0] = explicit_curve.compute ([z]);
		if (zValues[z][0] === 0)
			zValues[z][0]=0.001;
		zValues[z][1] = explicit_curve.compute ([z - 0.5]);
		if (zValues[z][1] === 0)
			zValues[z][1]=0.001;
		zValues[z][2] = explicit_curve.compute ([z + 0.5]);
		if (zValues[z][2] === 0)
			zValues[z][2]=0.001;
		for (y = 0; y < dimy && bufferSize === 0; ++y){
			for (x = 0; x < dimx && bufferSize === 0; ++x){
				connexity = checkVoxel (implicit_curve, x - maxx, y - maxy, 
					zValues[z]);
				if (connexity !== 0) {
					buffer.push([x, y, z, connexity]);
					bufferSize++;
					addNeighboursToPile (x, y, z, pile, checked, dimx, dimy,
						dimz);
				}
				checked[x][y][z] = true;
			} // end for x
		} // end for y
	} // end for z

	//Incrementation
	var voxel;
	while (pile.length > 0) {
		if (bufferSize >= 1000) {
			postMessage([buffer, bufferSize]);
			buffer = [];
			bufferSize = 0;
		}
		voxel = pile.pop ();
		checked[voxel[0]][voxel[1]][voxel[2]] = true;
		//postMessage(["checkedVoxels"], checked);
		if(zValues[voxel[2]] == undefined){
			zValues[voxel[2]] = [];
			zValues[voxel[2]][0] = explicit_curve.compute([voxel[2]]);
			if (zValues[voxel[2]][0] == 0)
				zValues[voxel[2]][0]=0.01;
			zValues[voxel[2]][1] = explicit_curve.compute([voxel[2] - 0.5]);
			if (zValues[voxel[2]][1] == 0)
				zValues[voxel[2]][1]=0.01;
			zValues[voxel[2]][2] = explicit_curve.compute([voxel[2] + 0.5]);
			if (zValues[voxel[2]][2] == 0)
				zValues[voxel[2]][2]=0.01;
		}
		connexity = checkVoxel (implicit_curve, voxel[0] - maxx,
			voxel[1] - maxy, zValues[voxel[2]]);
		if (connexity !== 0) {
			buffer.push([voxel[0], voxel[1], voxel[2], connexity]);
			bufferSize++;
			addNeighboursToPile(voxel[0], voxel[1], voxel[2], pile, checked,
				dimx, dimy, dimz);
		}
	}
	//post last buffer
	postMessage ([buffer, bufferSize,"Terminate"]);
}


//==============================================================================
function init (e) {
	explicit_curve = new Equation (e.data[0]);
	implicit_curve = new Equation (e.data[1]);
	var dimension = new Vector (e.data[2]);
	dimx = dimension.x;
	dimy = dimension.y;
	dimz = dimension.z;
	var x, y, z;
	for (x = 0; x < dimx; ++x) {
		checked[x] = [];
		for (y = 0; y < dimy; ++y) {
			checked[x][y] = [];
			for (z = 0; z < dimz; ++z) {
				checked[x][y][z] = false;
			}
		}
	}
	try {
		algo ();
	}
	catch (e) {
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
	if (e.data[0] === "init") {
		e.data.splice (0,1);
		init (e);
	}
	else if (e.data[0] === "checkedVoxels") {
		checkedVoxels = e.data[1];
	}
	else if (e.data[0] === "pile") {
		pile = e.data[1];
	}
};



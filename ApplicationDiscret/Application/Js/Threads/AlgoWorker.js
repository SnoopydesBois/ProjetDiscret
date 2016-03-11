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


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @abstract
 * @classdesc An AlgoWorker contains a number of workers that will compute the surface.
 * This class is abstract and the algorithm used shall be defined in the
 * subclasses.
 */
AlgoWorker.prototype.constructor = AlgoWorker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A AlgoWorker contains a number of workers that will compute the surface.
 * This class is abstract and the algorithm used shall be defined in the
 * subclass.
 * 
 * @param {(Equation | DrawnCurve)} meridianCurve - The equation for the
 * meridian.
 * @param {Equation} revolutionCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function AlgoWorker (meridianCurve, revolutionCurve, dimension, surface) {
	/**
	 * {Surface} The surface to draw.
	 */
	this.surface = surface;
	
	/**
	 * {boolean} whether the algorithm has finished
	 */
	this.finished = false;
	
	/**
	 * {int} nb of workers that are still active
	 */
	this.activeWorkers = 0;
	
	/**
	 * {Array} TODO FIXME transformer type en "type[]"
	 */
	this.worker = [];
	
	/**
	 * {(Stirng | Number[][2])} TODO
	 */
	this.meridianCurve = null;
	if (meridianCurve instanceof Equation) {
		this.meridianCurve = meridianCurve.toStringNoParam ();
	}
	else if (meridianCurve instanceof DrawnCurve) {
		this.meridianCurve = [meridianCurve.xList, meridianCurve.yList];
	}
	
	this.revolutionCurve = 
		(revolutionCurve ? revolutionCurve.toStringNoParam() : "");
	
	/**
	 * {float[3]} The dimension of the 3D space.
	 */
	this.dim = (dimension ? dimension.m : null);
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * This method add the voxels contained in a buffer every time a new message
 * is received from a worker.
 * 
 * @param {Number[4][]} buffer - A buffer containing voxel. Each voxel is an
 * array: [x, y, z, connexity]
 * @param {int} size - Size of the buffer.
 * 
 * @return {void}
 */
AlgoWorker.prototype.readBuffer = function (buffer, size) {
	for (var i = 0; i < size; ++i){
		var voxel = buffer[i];
		try {
			this.surface.addVoxel (new Vector (voxel[0], voxel[1], voxel[2]),
				voxel[3]);
		}
		catch (e) {
			appli.alertMessage ("Somevoxels were out of the bounds and will "
				+ "not be dispalyed");
			console.log ("Some voxels are out of the bounds");
		}
	}
};



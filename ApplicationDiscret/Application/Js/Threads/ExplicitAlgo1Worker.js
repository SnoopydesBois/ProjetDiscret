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
 * @extends AlgoWorker
 * @classdesc 
 * A ExplicitAlgo1Worker contains a number of workers that will
 * compute the surface with the Explicit algo with no optimization.
 */


ExplicitAlgo1Worker.prototype = new AlgoWorker;
ExplicitAlgo1Worker.prototype.constructor = ExplicitAlgo1Worker;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * A ExplicitAlgo1Worker contains a number of workers that will
 * compute the surface with the Explicit algo with no optimization.
 * 
 * @param {Equation} explicitCurve - The equation for the meridian.
 * @param {Equation} implicitCurve - The equation for the revolution curve.
 * @param {Vector} dimension - The space dimensions.
 * @param {Surface} surface - The surface to draw.
 */
function ExplicitAlgo1Worker (explicitCurve, implicitCurve, dimension, surface){
	AlgoWorker.call(this, explicitCurve, implicitCurve, dimension, surface);
	for (var i = 0; i < 8; ++i){
		this.worker[i] = new Worker ("Js/Threads/EA1Worker.js");
		this.activeWorkers++;
		var that = this
		this.worker[i].onmessage = function(e){
			if (e.data[0] === "Abort") {
				that.finished = "error"
				appli.alertMessage("Aborted");
			}
			else if (e.data[0] === "Terminate") {
				that.worker[e.data[1]].terminate();
				that.worker[e.data[1]] = undefined;
				--that.activeWorkers;
				if (that.activeWorkers == 0 && that.finished != "error"){
					that.finished = true;
				}
			} else {
				that.readBuffer(e.data[0], e.data[1]);
			}
		};
		this.worker[i].postMessage([i, this.meridianCurve,
			this.revolutionCurve, this.dim,
			i * Math.floor ((this.dim[2] + 7) / 8),
			(i + 1) * Math.floor ((this.dim[2] + 7) / 8)
		]);
	}
};







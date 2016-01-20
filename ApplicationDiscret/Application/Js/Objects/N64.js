/**
 * N64.js
 * 
 * author : biscui
 * created : Mon, 18 Jan 2016 19:49:46 +0100
 * modified : Mon, 18 Jan 2016 19:49:46 +0100
 */


/**
 * @classdesc 
 */



N64.prototype= new SurfaceRenderer;
N64.prototype.constructor = N64;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function N64 (gl, width, space) {
	var epaisseur = width || 6, espacement = space || 13;
	var dim = 2 * epaisseur + espacement;
	var s = new Surface (dim);
	/// colonnes
	for (var x = 0; x < epaisseur; ++x) {
		for (var y = 0; y < epaisseur; ++y) {
			for (var z = 0; z < dim; ++z) {
				if (x < epaisseur && y < epaisseur) {
					s.addVoxel (new Vector (x, y, z));
					s.addVoxel (new Vector (dim - 1 - x, y, z));
					s.addVoxel (new Vector (x, dim - 1 - y, z));
					s.addVoxel (new Vector (dim - 1 - x, dim - 1 - y, z));
				}
			}
		}
	}
	/// diagonal
	for (var x = epaisseur; x < epaisseur + espacement; ++x) {
		for (var i = 0; i < epaisseur; ++i) {
			for (var j = 0; j < epaisseur; ++j) {
				s.addVoxel (new Vector (x, i, dim - 1 - x + j));
				s.addVoxel (new Vector (dim - 1 - x, dim - 1 - i, dim - 1 - x + j));
				s.addVoxel (new Vector (i, x, x + j));
				s.addVoxel (new Vector (dim - 1 - i, dim - 1 - x, x + j));
			}
		}
	}
	
	var forme = new Controller3D (new Vector (dim));
	forme.modelGen.surface = s;
	SurfaceRenderer.call (this, forme, gl);
	this.structureName = "n64";
};




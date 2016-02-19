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
function N64 (gl) {
	var dim = 1;
	var s = new Surface (dim);
	s.addVoxel (new Vector (0, 0, 0), ConnexityEnum.C6);
	var forme = new Controller3D (new Vector (dim));
	forme.modelGen.surface = s;
	SurfaceRenderer.call (this, forme, gl);
	this.structureName = "n64";
};




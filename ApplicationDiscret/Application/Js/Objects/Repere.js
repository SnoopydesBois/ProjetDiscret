/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
 * Auteur : BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy, LAURET Karl
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
 * termes.
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * Repere(glContext : WebGLRenderingContext)
 * getDimension () : Vector
 * getMatrix (camera : Camera) : Matrix
 * prepare (glContext : WebGLRenderingContext) : void
 * draw (glContext : WebGLRenderingContext) : void
 * drawBackBuffer () : void
 * unprepare () : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @extends GenericStructure
 * @classdesc A 3D object representing each axis and their direction for each rendered
 * frame. It is always displayed at the bottom-left corner of the camera.
 * @see Repere.getMatrix
 */
Repere.prototype = new GenericStructure;
Repere.prototype.constructor = Repere;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 *
 * @param {WebGLRenderingContext} glContext - The gl context (used by the
 * shader).
 */
function Repere (glContext) {
	GenericStructure.call (this, "repere", new DefaultShader (glContext));

	/**
	 * {Vector} The dimension of the 3D space in voxel.
	 */
	this.dimension = new Vector (1, 1, 1);

	/**
	 * @inheritdoc
	 * An user cannot select the repere.
	 */
	this.isPickable = false;


	this.matrix.scale (0.01);
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Vector} The dimensions of the box/3Dspace.
 */
Repere.prototype.getDimension = function () {
	return this.dimension;
};


//==============================================================================
/**
 * @override
 * Computes and gets the model matrix. The repere is translated to the image
 * bottom-left corner to the given camera.
 *
 * @param {Camera} camera - The active camera.
 *
 * @return {Matrix} The model matrix.
 * @throws {String} The provided parameter is not of type Camera.
 */
Repere.prototype.getMatrix = function (camera) {
	/// parameter verification
	if (! checkType (arguments, Camera))
		throw "Repere.getMatrix: Given parameter is not a Camera";

	var base = new Matrix ()
		.rotateZ (getAzimuth (
			camera.getPosition (), 
			camera.getLookAtPosition ()
		))
	base.rotate (
		getAltitude (camera.getPosition (), camera.getLookAtPosition ()),
		base.getYVector ()
	);
	/// compute and return the matrix
	var coef = 0.083 / camera.height;
//	var coef = 2.0 / camera.height;
	var t = new Vector (camera.getPosition ())
		.sub (camera.getLookAtPosition ())
		.normalize ();
	var ty = base.getYVector ().mul (- camera.width * coef);
	var tz = base.getZVector ().mul (- camera.height * coef)
	t = new Vector (camera.getPosition ())
		.sub (t.mul (0.2))
		.add (ty).sub (new Vector (ty).mul (0.12))
		.add (tz).sub (new Vector (tz).mul (0.12));
	
	return new Matrix (this.matrix).translate (t);
};



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * @override
 *
 * @param {WebGLRenderingContext} glContext - The gl context.
 * 
 * @return {void}
 */
Repere.prototype.prepare = function (glContext) {
	/// Vertex and color buffers
	var vertexBuffer = [ // the vertex of the box which serves as repere
		// X axis
		[0.1,  0.0   ,  0.095 ],
		[0.7,  0.0   ,  0.095 ],
		[0.7, -0.1   ,  0.195 ],
		[1.0,  0.0495,  0.0495],
		[0.7,  0.195 , -0.1   ],
		[0.7,  0.095 ,  0.0   ],
		[0.1,  0.095 ,  0.0   ],
		// Y axis
		[ 0.095 , 0.1,  0.0   ],
		[ 0.095 , 0.7,  0.0   ],
		[ 0.195 , 0.7, -0.1   ],
		[ 0.0495, 1.0,  0.0495],
		[-0.1   , 0.7,  0.195 ],
		[ 0.0   , 0.7,  0.095 ],
		[ 0.0   , 0.1,  0.095 ],
		// Z axis
		[ 0.0   ,  0.095 , 0.1],
		[ 0.0   ,  0.095 , 0.7],
		[-0.1   ,  0.195 , 0.7],
		[ 0.0495,  0.0495, 1.0],
		[ 0.195 , -0.1   , 0.7],
		[ 0.095 ,  0.0   , 0.7],
		[ 0.095 ,  0.0   , 0.1]
	];

	var vertexBufferLength = vertexBuffer.length; // 8
	// Color of each vertex, lines are white


	/// Vertex Buffer
	this.glVertexBuffer = glContext.createBuffer ();
	this.glVertexBuffer.numItems = vertexBufferLength;

	var data = [];
	for (var vertice = 0; vertice < vertexBufferLength; ++vertice) {
		this.addAPoint (data, vertexBuffer[vertice]);
		if (vertice < 7)
			this.addAColor (data, [0.9, 0.0, 0.0, 1.0]);
		else if (vertice < 14)
			this.addAColor (data, [0.0, 0.9, 0.0, 1.0]);
		else
			this.addAColor (data, [0.0, 0.0, 0.9, 1.0]);
	}
	glContext.bindBuffer (glContext.ARRAY_BUFFER, this.glVertexBuffer);
	glContext.bufferData (glContext.ARRAY_BUFFER, new Float32Array (data),
		glContext.STATIC_DRAW);


	/// Finish, tell it
	this.prepared = true;
};


//==============================================================================
/**
 * @override
 *
 * @param {WebGLRenderingContext} glContext - The gl context.
 *
 * @return {void}
 */
Repere.prototype.draw = function (glContext) {
	/// Parameter verification
	if (!(glContext instanceof WebGLRenderingContext)) {
		console.error ("Repere.draw: glContext is not a WebGLRenderingContext");
		return;
	}

	/// Buffers verification
	if (this.glVertexBuffer === undefined) {
		console.error ("Repere.draw: prepare the repere BEFORE drawing it !");
		return;
	}

	// Let's the shader prepare its attributes
	this.shader.setAttributes (glContext, this.glVertexBuffer, 1);

	// Let's render !
	glContext.drawArrays (glContext.LINE_LOOP, 0, this.glVertexBuffer.numItems);
};


//==============================================================================
/**
 * @override
 *
 * Always throws an error. The repere is not pickable.
 *
 * @return {void}
 * @throws {String} The repere is not pickable.
 */
Repere.prototype.drawBackBuffer = function () {
	throw "Repere is not pickable !"
};


//==============================================================================
/**
 * @override
 *
 * Nothing to do. The repere never change, so it is always prepared.
 *
 * @return {void}
 */
Repere.prototype.unprepare = function () {};



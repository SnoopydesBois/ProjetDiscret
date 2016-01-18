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


/* nbBuffer : int
 * vbo : Array(Buffer)
 * bbo : Array(Buffer)
 * ibo : Array(Buffer)
 * selectvbo : Array(Buffer)
 * selectibo : Array(Buffer)
 * hovervbo : Buffer
 * hoveribo : Buffer
 *
 * ModelView (modelController : ModelController, name : String, shader : Shader)
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @extends GenericStructure
 * @classdesc TODO traduire Cette clase permet d'afficher une et une seule 
 * surface.
 */
SurfaceRenderer.prototype = new GenericStructure;
SurfaceRenderer.prototype.constructor = SurfaceRenderer;



//##############################################################################
//	Static variable
//##############################################################################


/**
 * {int} The number of created surface. Increased for each new SurfaceRenderer.
 */
SurfaceRenderer.prototype.counter = 0;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {Controller3D} surfaceController - Le controller de la surface à 
 * afficher. TODO traduire
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
function SurfaceRenderer (surfaceController, glContext) {
	/// Parameters verification
	if (! (surfaceController instanceof Controller3D)) {
		console.error ("SurfaceRenderer.constructor: bad type(s) of "
			+ "parameter(s)");
		showType (surfaceController, glContext);
		return;
	}
	
	
	++SurfaceRenderer.prototype.counter;
	GenericStructure.call (this,
		"surface" + SurfaceRenderer.prototype.counter,
		new DefaultShader (glContext)
	);
	
	
	/**
	 * {Controller} The model controller which contain the model to draw. FIXME vérifier anglais
	 */
	this.modelController = surfaceController;
	
	/**
	 * TODO
	 */
	this.nbGlBuffer = 0;
	
	/// Initialisation 
	this.shader.setRenderingMode (RenderingModeEnum.PICKING);
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################


/**
 * Set the model controller.
 * 
 * @param {Controller} newController - The new model controller.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
SurfaceRenderer.prototype.setModelController = function (newController) {
	throw "SurfaceRenderer.setModelController: the modelController is not "
		+ "mutable";
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * Prepare the model (create the triangles).
 * 
 * @param {WebGLRenderingContext} gl - The gl context.
 * 
 * @return {void}
 * @throws FIXME compléter
 */
SurfaceRenderer.prototype.prepare = function (gl) {
	if (!(gl instanceof WebGLRenderingContext))
		throw"SurfaceRenderer.prepare: argument is not a WebGLRenderingContext";
	
	var size = this.modelController.getDimension ();
//	this.nbGlBuffer = size.m[0] / 5; // FIXME trouver une meilleur façon
	this.nbGlBuffer = 1

	var vertexBuffer = [];
	var indicesBuffer = [];
	var colorBuffer = [];
	var normalBuffer = [];
	var backColorBuffer = [];
	var data = [];
	var bdata = [];

	var tmp;
	
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		/* On large models, the indices are > a 2^16 bits and the display 
		 * won't work correctly.
		 * To fix that, we cut in 5 the buffer along the X axis.
		 * There are optimization possible for the rendering
		 */
		vertexBuffer.push ([]);
		indicesBuffer.push ([]);
		colorBuffer.push ([]);
		normalBuffer.push ([]);
		backColorBuffer.push ([]);
		data.push ([]);
		bdata.push ([]);
//		this.glVertexBuffer.push ([]);
//		this.glBackBuffer.push ([]);
//		this.glIndicesBuffer.push ([]);
	}
	// 2 triangles per faces
	// No triangles strips because there are a lot of degenerated triangles
	for (var x = 0; x < size.x; ++x) {
		for (var y = 0; y < size.y; ++y) {
			for (var z = 0; z < size.z; ++z) {
				if (this.modelController.hasVoxel (x, y, z)) {
					this.prepareVoxel (
						this.modelController.getVoxel (x, y, z),
						0,
//						vertexBuffer[Math.floor (x / this.nbGlBuffer)], 
//						indicesBuffer[Math.floor (x / this.nbGlBuffer)], 
//						colorBuffer[Math.floor (x / this.nbGlBuffer)],
//						normalBuffer[Math.floor (x / this.nbGlBuffer)],
//						backColorBuffer[Math.floor (x / this.nbGlBuffer)],
						vertexBuffer[0], 
						indicesBuffer[0], 
						colorBuffer[0],
						normalBuffer[0],
						backColorBuffer[0],
						[0.8, 0.8, 0.8, 1.0], // FIXME mettre la bonne couleur
						size
					);
				} // end if
			} // end for z
		} // end for y
	} // end for x

	// Create vertex buffer 
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		this.glVertexBuffer[tmp] = gl.createBuffer();
		this.glVertexBuffer[tmp].numItems = vertexBuffer[tmp].length / 3.0;
		for (var i = 0; i < colorBuffer[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				this.addAPoint (data[tmp], 
					vertexBuffer[tmp][offset],
					vertexBuffer[tmp][offset + 1], 
					vertexBuffer[tmp][offset + 2]
				);
				this.addAColor (data[tmp], colorBuffer[tmp][i]);
				this.addANormal (data[tmp], normalBuffer[tmp][i]);
			} // end for j
		} // en for i
		gl.bindBuffer (gl.ARRAY_BUFFER, this.glVertexBuffer[tmp]);
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (data[tmp]),
			gl.STATIC_DRAW);
	}

	// Create the "backbuffer" used for the picking
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		this.glBackBuffer[tmp] = gl.createBuffer ();
		this.glBackBuffer[tmp].numItems = vertexBuffer[tmp].length / 3.0;
		for (var i = 0; i < colorBuffer[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				this.addAPoint (bdata[tmp], 
					vertexBuffer[tmp][offset],
					vertexBuffer[tmp][offset + 1], 
					vertexBuffer[tmp][offset + 2]
				);
				this.addAColor (bdata[tmp], backColorBuffer[tmp][i]);
				this.addANormal (bdata[tmp], normalBuffer[tmp][i]);
			} // end for j
		} // end for i
		gl.bindBuffer (gl.ARRAY_BUFFER, this.glBackBuffer[tmp]);
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (bdata[tmp]), 
				gl.STATIC_DRAW);
	}

	// Create index buffer
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		this.glIndicesBuffer[tmp] = gl.createBuffer ();
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffer[tmp]);
		gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint16Array (
			indicesBuffer[tmp]), 
			gl.STATIC_DRAW
		);
		this.glIndicesBuffer[tmp].numItems = indicesBuffer[tmp].length;
	}
};


//==============================================================================
/**
 * Prepare each face of the voxel for rendering.
 * 
 * @param {Voxel} voxel - The current voxel.
 * @param {float} offset - An offset to draw the face.
 * @param {Array} vertexBuffer - The vertex buffer which contains 3-tuple
 * coordinates of each point.
 * @param {Array} indicesBuffer - The indices buffer which contains the order
 * (the indices) to draw all points.
 * @param {Array} colorBuffer - The color buffer which contains the color of 
 * each point.
 * @param {Array} normalBuffer - The normal buffer which contains the normal of
 * each triangle.
 * @param {Array} backColorBuffer - The normal buffer which contains the normal
 * of each face.
 * @param {float[4]} colorVoxel - The color of the face to draw.
 * @param {Vector} universSize - The size of the univers.
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.prepareVoxel = function (
	voxel,
	offset,
	vertexBuffer, 
	indicesBuffer,
	colorBuffer, 
	backColorBuffer, 
	normalBuffer,
	colorVoxel,
	universSize
) {
	if (!(voxel instanceof Voxel && typeof offset === "number"
			&& vertexBuffer instanceof Array
			&& indicesBuffer instanceof Array
			&& colorBuffer instanceof Array
			&& backColorBuffer instanceof Array
			&& normalBuffer instanceof Array
			&& colorVoxel instanceof Array
			&& universSize instanceof Vector))
	{
		console.error ("SurfaceRenderer.prepareVoxel: bad type(s) of" 
				+ " parameter(s)");
		showType (voxel, offset, vertexBuffer, indicesBuffer, 
			colorBuffer, normalBuffer, backColorBuffer, colorVoxel,
			universSize);
		return;
	}
	var color;
	for (var i = 0; i < DirectionEnum.size; ++i) {
		if (voxel.hasFacet (i)) {
			switch (DirectionEnum.properties[i].axis) {
			case AxisEnum.X :
				color = [0.9, 0.0, 0.0, 1.0];
				break;	
			case AxisEnum.Y :
				color = [0.0, 0.9, 0.0, 1.0];
				break;	
			case AxisEnum.Z :
				color = [0.0, 0.0, 0.9, 1.0];
				break;	
			}
			this.prepareFace (
				voxel, 
				i, 
				offset, 
				vertexBuffer, 
				indicesBuffer, 
				colorBuffer, 
				normalBuffer, 
				backColorBuffer, 
//				colorVoxel, // FIXME en fonction de la direction
				color,
				universSize
			);
		}
	} // end for each direction
};


//==============================================================================
/**
 * {float[6][4][3]} TODO écrire une petite explication sur la variable suivante
 */
var offsetVertexInCube = [
	// Top
	[[0.0, 0.0, 1.0], [1.0, 0.0, 1.0], [0.0, 1.0, 1.0], [1.0, 1.0, 1.0]],
	// Bottom
	[[0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [1.0, 1.0, 0.0]], 
	// Right
	[[1.0, 0.0, 0.0], [1.0, 1.0, 0.0], [1.0, 0.0, 1.0], [1.0, 1.0, 1.0]], 
	// Left
	[[0.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0], [0.0, 1.0, 1.0]], 
	// Front
	[[0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0], [1.0, 0.0, 1.0]], 
	// Back
	[[0.0, 1.0, 0.0], [1.0, 1.0, 0.0], [0.0, 1.0 ,1.0], [1.0, 1.0, 1.0]]
];


//==============================================================================
/**
 * Prepare a face of a cube. Fill all the buffers (vertex, indices, color, 
 * normal and backColor).
 * 
 * @param {Voxel} voxel - The current voxel.
 * @param {DirectionEnum} direction - The direction of the face to prepare.
 * @param {float} offset - an offset to draw the face.
 * @param {Array} vertexBuffer - The vertex buffer which contains 3-tuple
 * coordinates of each point.
 * @param {Array} indicesBuffer - The indices buffer which contains the order
 * (the indices) to draw all points.
 * @param {Array} colorBuffer - The color buffer which contains the color of 
 * each point.
 * @param {Array} normalBuffer - The normal buffer which contains the normal of
 * each triangle.
 * @param {Array} backColorBuffer - The normal buffer which contains the normal
 * of each face.
 * @param {Array[4]} colorFace - The color of the face to draw.
 * @param {Vector} universSize - The size of the univers.
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.prepareFace = function (
	voxel,
	direction, 
	offset,
	vertexBuffer,
	indicesBuffer,
	colorBuffer,
	normalBuffer,
	backColorBuffer,
	colorFace,
	universSize
) {
	if (!(voxel instanceof Voxel && typeof offset == "number" 
			&& typeof direction == "number"
			&& vertexBuffer instanceof Array
			&& indicesBuffer instanceof Array
			&& colorBuffer instanceof Array
			&& backColorBuffer instanceof Array
			&& normalBuffer instanceof Array
			&& colorFace instanceof Array
			&& universSize instanceof Vector
	)) {
		console.error (	
			"SurfaceRenderer.prepareFace: bad type(s) of parameter(s) !");
		showType (voxel, direction, offset, vertexBuffer, indicesBuffer, 
			colorBuffer, normalBuffer, backColorBuffer, colorFace, universSize);
		return;
	}
	
	// Creation of the 4 points of the face
	var vertexBufferize = vertexBuffer.length / 3; // 3 points per vertexBuffer
	for (var i = 0; i < 4; ++i) { 
		// for each point of a face
		var vertex = new Vector (
			DirectionEnum.properties[direction].x * offset,
			DirectionEnum.properties[direction].y * offset,
			DirectionEnum.properties[direction].z * offset
		);
		vertex.add (addVector (voxel.getPosition (), 
			offsetVertexInCube[direction][i]));
		this.addVertexBuffer2 (vertexBuffer, vertex, universSize);
	}

	
	switch (direction) {
	
	case DirectionEnum.TOP :
	case DirectionEnum.RIGHT :
	case DirectionEnum.FRONT :
		indicesBuffer.push (vertexBufferize, vertexBufferize + 3, 
			vertexBufferize + 1);
		indicesBuffer.push (vertexBufferize, vertexBufferize + 2, 
			vertexBufferize + 3);
	break;
	
	case DirectionEnum.BOTTOM :
	case DirectionEnum.LEFT :
	case DirectionEnum.BACK :
		indicesBuffer.push (vertexBufferize, vertexBufferize + 1, 
			vertexBufferize + 3);
		indicesBuffer.push (vertexBufferize, vertexBufferize + 3, 
			vertexBufferize + 2);
	break;
	
	case DirectionEnum.ALL :
		for (var i = 0; i < DirectionEnum.size; ++i) {
			if (voxel.hasFacet (i)) {
				// for each existing facet
				this.prepareFace (
					voxel,
					i,
					offset,
					vertexBuffer,
					indicesBuffer,
					colorBuffer,
					normalBuffer,
					backColorBuffer,
					colorFace,
					universSize
				);
			} // end if
		} // end for each direction
	break;
	
	default :
		// direction == DirectionEnum.NONE 
		// voxel exists but it does not have any visible facet so
		// -> DO NOTHING
	break;
	}
	
	colorBuffer.push (colorFace);
	if (normalBuffer != undefined && normalBuffer != null)
		normalBuffer.push ([
			DirectionEnum.properties[direction].x,
			DirectionEnum.properties[direction].y,
			DirectionEnum.properties[direction].z
		]);
	
	// The color used by the picking according to the facet position
	if (backColorBuffer != undefined && backColorBuffer != null)
		backColorBuffer.push (this.posToColor (voxel, direction));
};


//==============================================================================
/**
 * Draw the model (draw the triangles).
 * 
 * @param {WebGLRenderingContext} gl - The gl context.
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.draw = function (gl) {
	if (! gl instanceof WebGLRenderingContext) {
		console.error ("SurfaceRenderer.draw: parameter is not a "
			+ "WebGLRenderingContext");
		return;
	}
	
	this.shader.setRenderingMode (RenderingModeEnum.NORMAL);
	for (var tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		// Let's the shader prepare its attributes
		this.shader.setAttributes (gl, this.glVertexBuffer[tmp]);
		// Let's render !
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffer[tmp]);
		gl.drawElements (gl.TRIANGLES, this.glIndicesBuffer[tmp].numItems,
			gl.UNSIGNED_SHORT, 0);

		// Let's the shader prepare its attributes
//		this.shader.setAttributes (gl, this.selectvbo[tmp]);
		// Let's render !
//		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.selectibo[tmp]);
//		gl.drawElements (gl.TRIANGLES, this.selectibo[tmp].numItems,
//			gl.UNSIGNED_SHORT, 0);
	}
};


//==============================================================================
/**
 * Draw the model for picking.
 * 
 * @param {WebGLRenderingContext} gl - The gl context.
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.drawBackBuffer = function (gl) {
	if (! gl instanceof WebGLRenderingContext) {
		console.error ("SurfaceRenderer.drawBackBuffer: parameter is not a "
			+ "WebGLRenderingContext");
		return;
	}
	
	this.shader.setMode (RenderingModeEnum.PICKING);
	for (var tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		// Let's the shader prepare its attributes
		this.shader.setAttributes (gl, this.glBackBuffer[tmp]);
		// Let's render !
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndicesBuffer[tmp]);
		gl.drawElements (gl.TRIANGLES, this.glIndicesBuffer[tmp].numItems, 
			gl.UNSIGNED_SHORT, 0);
	}
};


//==============================================================================
/**
 * Add a vertex into a buffer. Transform all coordinates beetween -1.0 and +1.0.
 * 
 * @param {Array} dataVertexBuffer - The vertex buffer.
 * @param {int} x - The x coordinate of the vertex.
 * @param {int} y - The y coordinate of the vertex.
 * @param {int} z - The z coordinate of the vertex.
 * @param {Vector} limit - Maximum quantity of voxel on each dimension. Each 
 * vertex coordinates is in [0, limit[i]].
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.addVertexBuffer = function (dataVertexBuffer, x, y, z, 
	limit) 
{
	if (!(dataVertexBuffer instanceof Array)
			|| typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number"
			|| ! (limit instanceof Vector)) {
		console.error ("SurfaceRenderer.addVertexBuffer : bad type(s) of "
				+ "parameter(s)");
	}
	// --------------------------------------
	dataVertexBuffer.push ((x / limit.x) * 2.0 - 1.0,
			(y / limit.y) * 2.0 - 1.0,
			(z / limit.z) * 2.0 - 1.0);
};


//==============================================================================
/**
 * FIXME chager de nom
 * Add a vertex into a buffer. Transform all coordinates beetween -1.0 and +1.0.
 * 
 * @param {Array} dataVertexBuffer - The vertex buffer.
 * @param {Vector} vertex - A vertex.
 * @param {Vector} limit - Maximum quantity of voxel on each dimension. Each 
 * vertex coordinates is in [0, limit[i]].
 * 
 * @return {void}
 */
SurfaceRenderer.prototype.addVertexBuffer2 = function (dataVertexBuffer, vertex, 
	limit) 
{
	this.addVertexBuffer (dataVertexBuffer, vertex.x, vertex.y, vertex.z, 
		limit);
};


//==============================================================================
/**
 * Transform a face position into a color. 
 * 
 * @param {Voxel} voxel - The voxel's face.
 * @param {DirectionEnum} direction - The direction of the face in the voxel.
 * 
 * @return {Array[4]} The RGBA color corresponding to the position of the face.
 */
SurfaceRenderer.prototype.posToColor = function (voxel, direction) {
	return [
		((voxel.getPosition().x + 1) * 10 + direction) / 255, // red
		((voxel.getPosition().y + 1) * 10) / 255, // green
		((voxel.getPosition().z + 1) * 10) / 255, // blue
		1.0 // alpha
	];
};




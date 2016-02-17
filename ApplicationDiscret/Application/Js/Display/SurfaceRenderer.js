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
 * @classdesc This class display one surface only
 */
SurfaceRenderer.prototype = new GenericStructure;
SurfaceRenderer.prototype.constructor = SurfaceRenderer;



//##############################################################################
//	Static
//##############################################################################


/**
 * {int} The number of created surface. Increased for each new SurfaceRenderer.
 */
SurfaceRenderer.counter = -2;


//==============================================================================
/**
 *
 */
SurfaceRenderer.getLastSurfaceName = function () {
	return "surface" + (SurfaceRenderer.counter - 1);
};
SurfaceRenderer.prototype.getLastSurfaceName = function () {
	console.error ("method renommer ! utilisez \"SurfaceRenderer.getLastSurfaceName() (-> static)\"");
}


//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 *
 * @param {Controller3D} surfaceController - The controller of the surface to
 * display.
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
function SurfaceRenderer (surfaceController, glContext) {
	/// Parameters verification
//	if (! (surfaceController instanceof Controller3D)) {
//		console.error ("SurfaceRenderer.constructor: bad type(s) of "
//			+ "parameter(s)");
//		showType (surfaceController, glContext);
//		return;
//	}


	++SurfaceRenderer.counter;
	GenericStructure.call (this,
		"surface" + SurfaceRenderer.counter,
		new DefaultShader (glContext)
	);


	/**
	 * {Controller} The model controller which contain the model to draw. FIXME vérifier anglais
	 */
	this.modelController = surfaceController;

	/**
	 * {int} Number of needed gl buffer to draw the object. Set by 'prepare'
	 * method, use by 'prepare' an 'draw' methods.
	 */
	this.nbGlBuffer = 0;

	/**
	 * {TODO} Array of gl vertex buffer. Fill by 'prepare' method. The length of
	 * this array is 'this.nbGlBuffer'.
	 */
	this.glVertexBuffer = [];

	/**
	 * {TODO} Array of gl vertex color buffer for picking. Fill by 'prepare'
	 * method. The length of this array is 'this.nbGlBuffer'.
	 */
	this.glBackBuffer = [];

	/**
	 * {TODO} Array of gl indices buffer. Fill by 'prepare' method. The length
	 * of this array is 'this.nbGlBuffer'.
	 */
	this.glIndiciesBuffer = [];

	/// Initialisation
	this.shader.setRenderingMode (RenderingModeEnum.NORMAL);
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


//==============================================================================
/**
 * Get the model controller.
 *
 * @return {Controller}
 */
SurfaceRenderer.prototype.getModelController = function () {
	return this.modelController;
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * Prepare the model (create the triangles).
 *
 * @param {WebGLRenderingContext} gl - The gl context.
 * @param {ConnexityEnum} connexity - Which connexity is displayed.
 * @param {float} radius - The radius of the cube (distance beetween the cube
 * center end a face center).
 *
 * @return {void}
 * @throws {String} If a parameter doesn't have the excepted type.
 */
SurfaceRenderer.prototype.prepare = function (gl, connexity, radius) {
	/// parameters verification
	if (! checkType (arguments, WebGLRenderingContext, "number", "number")) {
		throw "SurfaceRenderer.prepare: bad type(s) of parameter(s)";
	}
	console.log ("Prepare de " + this.structureName);
	this.cptPreparedVertex = 0;

	/// prepare
	radius || (radius = 0.5);
	var size = this.modelController.getDimension ();

	/* In the indices buffer, there are at the most 4*6 number. One number is a
	 * short (2 bytes) so for one voxel there are 4*6*2 = 48 bytes.
	 * We limit the size at 32,768+16,384 = 49,152 bytes so 1024 voxel per
	 * buffer. FIXME
	 */
	this.nbGlBuffer = Math.ceil (
		this.modelController.getSurface ().getNbVoxel () / 2048
	);

	var vertexBuffer = [];
	var indicesBuffer = [];
	var colorBuffer = [];
	var backColorBuffer = [];
	var data = [];
	var bdata = [];

	var tmp;

	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		vertexBuffer.push ([]); // float[][]
		indicesBuffer.push ([]);
		colorBuffer.push ([]);
		backColorBuffer.push ([]);
		data.push ([]);
		bdata.push ([]);
		this.glVertexBuffer.push ([]);
		this.glBackBuffer.push ([]);
		this.glIndiciesBuffer.push ([]);
	}
	// 2 triangles per faces
	// No triangles strips because there are a lot of degenerated triangles
	var cptPreparedVoxel = 0, idx;
	var surface = this.modelController.getSurface ();
	for (var x = 0; x < size.x; ++x) {
		for (var y = 0; y < size.y; ++y) {
			for (var z = 0; z < size.z; ++z) {
				voxel = surface.getVoxel (x, y, z);
				if (voxel != null && voxel.isVisible (connexity)
					&& (radius != 0.5 || !voxel.isHidden (connexity)))
				{
					// 1024 -> see above, this.nbGlBuffer computes FIXME
					idx = Math.trunc (cptPreparedVoxel / 2048);
					this.prepareVoxel (
						voxel,
						connexity,
						radius,
						vertexBuffer[idx],
						indicesBuffer[idx],
						colorBuffer[idx],
						backColorBuffer[idx],
						[0.8, 0.8, 0.8, 1],
						size
					);
					++cptPreparedVoxel;
				} // end if
			} // end for z
		} // end for y
	} // end for x
	// Create vertex buffer
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		// create
		this.glVertexBuffer[tmp] = gl.createBuffer ();
		this.glBackBuffer[tmp]   = gl.createBuffer ();
		nbItem = vertexBuffer[tmp].length / 3.0;
		this.glVertexBuffer[tmp].numItems = nbItem;
		this.glBackBuffer[tmp].numItems  = nbItem;
		// fill
		for (var i = 0; i < colorBuffer[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				// vertex buffer
				this.addAPoint (data[tmp],
					vertexBuffer[tmp][offset],
					vertexBuffer[tmp][offset + 1],
					vertexBuffer[tmp][offset + 2]
				);
				this.addAColor (data[tmp], colorBuffer[tmp][i]);
				// back buffer
				this.addAPoint (bdata[tmp],
					vertexBuffer[tmp][offset],
					vertexBuffer[tmp][offset + 1],
					vertexBuffer[tmp][offset + 2]
				);
				this.addAColor (bdata[tmp], backColorBuffer[tmp][i]);
			} // end for j
		} // en for i
		gl.bindBuffer (gl.ARRAY_BUFFER, this.glVertexBuffer[tmp]);
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (data[tmp]),
			gl.STATIC_DRAW);
		gl.bindBuffer (gl.ARRAY_BUFFER, this.glBackBuffer[tmp]);
		gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (bdata[tmp]),
			gl.STATIC_DRAW);
	}

	// Create index buffer
	for (tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		this.glIndiciesBuffer[tmp] = gl.createBuffer ();
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer[tmp]);
		gl.bufferData (
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array (indicesBuffer[tmp]),
			gl.STATIC_DRAW
		);
		this.glIndiciesBuffer[tmp].numItems = indicesBuffer[tmp].length;
	}

	/// Finish, tell it
	this.prepared = true; // FIXME
};


//==============================================================================
/**
 * Prepare each face (compute its color) of the voxel for rendering.
 *
 * @param {Surface} surface - The current surface.
 * @param {Vector} voxelPosition - The position of the current voxel.
 * @param {ConnexityEnum} connexity - The displayed connexity.
 * @param {float} radius - The radius of the cube (distance beetween the cube
 * center end a face center).
 * @param {float[]} vertexBuffer - The vertex buffer which contains 3-tuple
 * coordinates of each point.
 * @param {int[]} indicesBuffer - The indices buffer which contains the order
 * (the indices) to draw all points.
 * @param {float[][4]} colorBuffer - The color buffer which contains the color
 * of each point.
 * @param {float[][4]} backColorBuffer - TODO
 * @param {float[4]} colorVoxel - The color of the face to draw.
 * @param {Vector} universSize - The size of the univers.
 *
 * @return {void}
 */
SurfaceRenderer.prototype.prepareVoxel = function (
	voxel,
	connexity,
	radius,
	vertexBuffer,
	indicesBuffer,
	colorBuffer,
	backColorBuffer,
	colorVoxel,
	universSize
) {
	if (! checkType (arguments, Voxel, "number", "number", Array,
		Array, Array, Array, Array, Vector))
	{
		console.error ("SurfaceRenderer.prepareVoxel: bad type(s) of"
				+ " parameter(s)");
		showType (voxel, connexity, radius, vertexBuffer, indicesBuffer,
			colorBuffer, backColorBuffer, colorVoxel, universSize);
		return;
	}
	for (var i = 0; i < DirectionEnum.size; ++i) {
		if (radius != 0.5 || voxel.hasFacet (i, connexity)) {
			var color = [0, 0, 0, 1];
			if (globalParam.cubeColorDebug) {
				switch (i) {
				case DirectionEnum.RIGHT :
				case DirectionEnum.LEFT :
					color = [0.9, 0, 0, 1];
					break;
				case DirectionEnum.BACK :
				case DirectionEnum.FRONT :
					color = [0, 0.9, 0, 1];
					break;
				case DirectionEnum.TOP :
				case DirectionEnum.BOTTOM :
					color = [0, 0, 0.9, 1];
					break;

//				case DirectionEnum.LEFT :
//					color = [0.9, 0, 0.9, 1];
//					break;
//				case DirectionEnum.FRONT :
//					color = [0.9, 0.9, 0, 1];
//					break;
//				case DirectionEnum.BOTTOM :
//					color = [0, 0.9, 0.9, 1];
//					break;
				}
			}
			else {
				for (var a = 0; a < 3; ++a)
					color[a] = colorVoxel[a]
						+ DirectionEnum.properties[i].axis.colorOffset;
			}
			this.prepareFace (
				voxel,
				i,
				radius,
				vertexBuffer,
				indicesBuffer,
				colorBuffer,
				backColorBuffer,
				color,
				universSize
			);
		}
	} // end for each direction
};


//==============================================================================
/**
 * {Number[6][4][3]} The coordinates of four vertex per direction of a cube. TODO vérifier anglais
 */
var offsetVertexInCube = [
	// Top
	[[-1, -1,  1], [ 1, -1,  1], [-1,  1,  1], [ 1,  1,  1]],
	// Bottom
	[[-1, -1, -1], [ 1, -1, -1], [-1,  1, -1], [ 1,  1, -1]],
	// Right
	[[ 1, -1, -1], [ 1,  1, -1], [ 1, -1,  1], [ 1,  1,  1]],
	// Left
	[[-1, -1, -1], [-1,  1, -1], [-1, -1,  1], [-1,  1,  1]],
	// Front
	[[-1, -1, -1], [ 1, -1, -1], [-1, -1,  1], [ 1, -1,  1]],
	// Back
	[[-1,  1, -1], [ 1,  1, -1], [-1,  1 , 1], [ 1,  1,  1]]
];


//==============================================================================
/**
 * Prepare a face of a cube. Fill all the buffers (vertex, indices, color, and
 * backColor).
 *
 * @param {Voxel} voxel - The current voxel.
 * @param {DirectionEnum} direction - The direction of the face to prepare.
 * @param {float} radius - The radius of the cube (distance beetween the cube
 * center end a face center).
 * @param {float[]} vertexBuffer - The vertex buffer which contains 3-tuple
 * coordinates of each point.
 * @param {int[]} indicesBuffer - The indices buffer which contains the order
 * (the indices) to draw all points.
 * @param {float[][4]} colorBuffer - The color buffer which contains the color
 * of each point.
 * @param {float[][4]} backColorBuffer - TODO
 * @param {float[4]} colorFace - The color of the face to draw.
 * @param {Vector} universSize - The size of the univers.
 *
 * @return {void}
 */
SurfaceRenderer.prototype.prepareFace = function (
	voxel,
	direction,
	radius,
	vertexBuffer,
	indicesBuffer,
	colorBuffer,
	backColorBuffer,
	colorFace,
	universSize
) {
	if (! checkType (arguments, Voxel, "number", "number", Array, Array, Array,
		Array, Array, Vector))
	{
		console.error (
			"SurfaceRenderer.prepareFace: bad type(s) of parameter(s) !");
		showType (voxel, direction, radius, vertexBuffer, indicesBuffer,
			colorBuffer, backColorBuffer, colorFace, universSize);
		return;
	}

	// Creation of the 4 points of the face
	var nbVertex = vertexBuffer.length / 3; // 3 points per vertexBuffer
	for (var i = 0; i < 4; ++i) {
		// for each point of a face
		var vertex = new Vector (offsetVertexInCube[direction][i])
			.mul (radius)
			.add (voxel.getPosition ());
		this.addVertexBuffer (vertexBuffer, universSize, vertex);
	}

	switch (direction) {

	case DirectionEnum.TOP :
	case DirectionEnum.RIGHT :
	case DirectionEnum.FRONT :
		indicesBuffer.push (nbVertex, nbVertex + 3, nbVertex + 1);
		indicesBuffer.push (nbVertex, nbVertex + 2, nbVertex + 3);
	break;

	case DirectionEnum.BOTTOM :
	case DirectionEnum.LEFT :
	case DirectionEnum.BACK :
		indicesBuffer.push (nbVertex, nbVertex + 1, nbVertex + 3);
		indicesBuffer.push (nbVertex, nbVertex + 3, nbVertex + 2);
	break;

	case DirectionEnum.ALL :
		for (var i = 0; i < DirectionEnum.size; ++i) {
			if (voxel.hasFacet (i)) {
				// for each existing facet
				this.prepareFace (
					voxel,
					i,
					radius,
					vertexBuffer,
					indicesBuffer,
					colorBuffer,
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

	// The color used by the picking according to the facet position
	if (backColorBuffer != undefined && backColorBuffer != null)
		backColorBuffer.push (posToColor (voxel, direction, universSize));
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
		this.shader.setAttributes (gl, this.glVertexBuffer[tmp],
			globalParam.perspectiveView ? 1 : 0);
		// Let's render !
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer[tmp]);
		gl.drawElements (gl.TRIANGLES, this.glIndiciesBuffer[tmp].numItems,
			gl.UNSIGNED_SHORT, 0);

		// Let's the shader prepare its attributes
//		this.shader.setAttributes (gl, this.selectvbo[tmp],
//			globalParam.perspectiveView ? 1 : 0);
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

	this.shader.setRenderingMode (RenderingModeEnum.PICKING);
	for (var tmp = 0; tmp < this.nbGlBuffer; ++tmp) {
		// Let's the shader prepare its attributes
		this.shader.setAttributes (gl, this.glBackBuffer[tmp],
			globalParam.perspectiveView ? 1 : 0);
		// Let's render !
		gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer[tmp]);
		gl.drawElements (gl.TRIANGLES, this.glIndiciesBuffer[tmp].numItems,
			gl.UNSIGNED_SHORT, 0);
	}
};


//==============================================================================
/**
 * Add a vertex into a buffer. Transform all coordinates to a value into
 * [-1.0; +1.0].
 *
 * @param {Array} vertexBuffer - The vertex buffer.
 * @param {Vector} limit - Maximum quantity of voxel on each dimension. Each
 * vertex coordinates is in [0, limit[i] - 1].
 * @param {Array} vertexPos - The vertex position.
 *
 * @return {void}
 * @throws {String} If given parameter are not the expected type.
 */
SurfaceRenderer.prototype.addVertexBuffer = function (vertexBuffer, limit,
	vertexPos)
{
	/// parameters verification
	if (! checkType (arguments, Array, Vector, Vector)) {
		showType (vertexBuffer, limit, vertexPos);
		throw "SurfaceRenderer.addVertexBuffer: bad type(s) of parameter(s)";
	}

	/// compute
	var m = Math.max (limit.x, limit.y, limit.z) / 2;
	vertexBuffer.push (
		(vertexPos.x + 0.5 - limit.x / 2) / m,
		(vertexPos.y + 0.5 - limit.y / 2) / m,
		(vertexPos.z + 0.5 - limit.z / 2) / m
	);
	++this.cptPreparedVertex;
};



//##############################################################################
//	Other method
//##############################################################################


/**
 * @return {Vector} The dimension of the surface.
 */
SurfaceRenderer.prototype.getDimension = function () {
	return this.getModelController ().getDimension ();
};



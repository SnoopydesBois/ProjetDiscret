/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
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


/* origin : Vector
 * size : int
 * frame3D : Frame3D
 *
 * BoundingBox(name : String, shader : DefaultShader, frame3D : Frame3D)
 * prepare(glContext : glContext) : void
 * addVertice(stripVertices : Array, x : int, y : int, z : int) : void
 * draw(glContext : glContext) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @extends GenericStructure
 * @classdesc TODO
 */
BoundingBox.prototype = new GenericStructure;
BoundingBox.prototype.constructor = BoundingBox;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * Create a bounding box.
 * 
 * @param {Vector} dimension - The dimensions of the 3D space.
 * @param {WebGLRenderingContext} glContext - The gl context (used by the
 * shader).
 */
function BoundingBox (dimension, glContext) {
	GenericStructure.call (this, "boundingBox", new DefaultShader (glContext));
		
	/**
	 * {Vector} The dimension of the 3D space in voxel.
	 */
	this.dimension = dimension;
	
	/**
	 * @inheritdoc
	 * An user cannot select the box.
	 */
	this.isPickable = false;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Vector} The dimensions of the box/3Dspace.
 */
BoundingBox.prototype.getDimension = function () {
	return this.dimension;
};


//==============================================================================
/**
 * Set the dimension of the generate surface.
 * 
 * @param {(Vector | Number[3] | Number} dimension - The dimensions of the 3D
 * space (@see {@link Vector}).
 * 
 * @return {void}
 * @throws {String} TODO
 */
BoundingBox.prototype.setDimension = function (dimension) {
	/// parameter verification 
	if (! checkType (arguments, [Vector, Array, "number"])) {
		throw "BoundingBox.setDimension: bad type of parameter";
	}
	
	/// set value
	this.dimension = new Vector (dimension);
	this.prepared = false;
};



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * @override
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
BoundingBox.prototype.prepare = function (glContext) {
	var halfDimBox = (new Vector (this.dimension)).mul (
		1.01 / Math.max (this.dimension.x, this.dimension.y, this.dimension.z));
	
	/// Vertex and color buffers
	var vertexBuffer = [
		[-halfDimBox.x, -halfDimBox.y, -halfDimBox.z],
		[-halfDimBox.x,  halfDimBox.y, -halfDimBox.z],
		[ halfDimBox.x, -halfDimBox.y, -halfDimBox.z],
		[ halfDimBox.x,  halfDimBox.y, -halfDimBox.z],
		[-halfDimBox.x, -halfDimBox.y,  halfDimBox.z],
		[-halfDimBox.x,  halfDimBox.y,  halfDimBox.z],
		[ halfDimBox.x, -halfDimBox.y,  halfDimBox.z],
		[ halfDimBox.x,  halfDimBox.y,  halfDimBox.z],
	];

	var vertexBufferLength = vertexBuffer.length; // 8
	// Color of each vertices, lines are white
	var color = [0.7, 0.7, 0.7, 1.0];


	/// Vertex Buffer
	this.glVertexBuffer = glContext.createBuffer ();
	this.glVertexBuffer.numItems = vertexBufferLength; 
	
	var data = [];
	for (var vertice = 0; vertice < vertexBufferLength; ++vertice) {
		this.addAPoint (data, vertexBuffer[vertice]);
		this.addAColor (data, color);
	}
	glContext.bindBuffer (glContext.ARRAY_BUFFER, this.glVertexBuffer); 
	glContext.bufferData (glContext.ARRAY_BUFFER, new Float32Array (data), 
		glContext.STATIC_DRAW);
	
	
	/// Indices Buffer
	/*    5-------7   Y Z
	 *   /|      /|   |/
	 *  / |     / |   *--X
	 * 1-------3  |
	 * |  4----|--6  back face (4, 5, 7, 6)
	 * | /     | /
	 * |/      |/
	 * 0-------2  front face (0, 1, 3, 2)
	 */
	var indicesBuffer = [
		0, 2,  2, 3,  3, 1,  1, 0, // Front
		0, 4,  2, 6,  3, 7,  1, 5, // Middle
		4, 6,  6, 7,  7, 5,  5, 4  // Back
		
	];
	this.glIndiciesBuffer = glContext.createBuffer();
	this.glIndiciesBuffer.numItems = indicesBuffer.length;
	glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer);
	glContext.bufferData (
		glContext.ELEMENT_ARRAY_BUFFER,
		new Uint16Array (indicesBuffer), 
		glContext.STATIC_DRAW
	);
	
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
BoundingBox.prototype.draw = function (glContext) {
	/// Parameter verification
	if (!(glContext instanceof WebGLRenderingContext)) {
		console.error ("BoundingBox.draw: glContext is not a "
			+ "WebGLRenderingContext");
		return;
	}
	
	/// Buffers verification
	if (this.glVertexBuffer === undefined 
		|| this.glIndiciesBuffer === undefined)
	{
		console.error ("BoundingBox.draw: prepare the box BEFORE drawing it !");
		return;
	}
		
	/// Set shader parameters
	this.shader.setRenderingMode (RenderingModeEnum.PICKING);
	// Let's the shader prepare its attributes
	this.shader.setAttributes (glContext, this.glVertexBuffer,
		globalParam.perspectiveView ? 1 : 0);
	
	// Let's render !
	glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer);
	glContext.drawElements (
		glContext.LINES, 
		this.glIndiciesBuffer.numItems, 
		glContext.UNSIGNED_SHORT,
		0
	);
};


//==============================================================================
/**
 * @override
 * 
 * Always throw an error. The box is not pickable.
 * 
 * @throws {String}
 */
BoundingBox.prototype.drawBackBuffer = function () {
	throw "BoundingBox is not pickable !"
};



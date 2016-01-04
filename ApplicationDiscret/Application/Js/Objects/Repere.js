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


/* origin : Vector
 * size : int
 * frame3D : Frame3D
 *
 * Repere(name : String, shader : DefaultShader, frame3D : Frame3D)
 * prepare(glContext : glContextContext) : void
 * addVertice(stripVertices : Array, x : int, y : int, z : int) : void
 * hoverPrepare(glContext : glContextContext) : void
 * draw(glContext : glContextContext) : void
 * setFrame(frame3D : Frame3D) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @extends GenericStructure
 * @classdesc TODO
 */
Repere.prototype = new GenericStructure;
Repere.prototype.constructor = Repere;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor 
 * Create a Repere given an origin and a size
 * 
 * @param {Vector} dimension - The dimensions of the 3D space.
 * @param {WebGLRenderingContext} glContext - The gl context (used by the
 * shader) TODO vérifier anglais
 */
function Repere (dimension, glContext) {
	GenericStructure.call (this, "repere", null, new DefaultShader (glContext));
//	if (shader.getAttribute(AttributeEnum.normal) 
//			|| shader.getAttribute(AttributeEnum.tangent) 
//			|| shader.getAttribute(AttributeEnum.bitangent) 
//			|| shader.getAttribute(AttributeEnum.texcoord)) 
//	{
//		console.error ("Repere created with bad shader <" 
//			+ shader.GetName() + ">");
//	}
	
	/**
	 * {Vector} The dimension of the 3D space in voxel.
	 */
	this.dimension = dimension;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Vector} The dimensions of the repere/3Dspace.
 */
Repere.prototype.getDimension = function () {
	return this.dimension;
};



//##############################################################################
//	Draw
//##############################################################################



/**
 * @override
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
Repere.prototype.prepare = function (glContext) {
	var halfDimBox = (new Vector (this.dimension)).mul (
		1.0 / Math.max (this.dimension.x, this.dimension.y, this.dimension.z));
	var vertexBuffer = [ // the vertex of the box which serve as repere
		[-0.2, -0.2, -0.2],
		[-0.2,  0.2, -0.2],
		[ 0.2, -0.2, -0.2],
		[ 0.2,  0.2, -0.2],
		[-0.2, -0.2,  0.2],
		[-0.2,  0.2,  0.2],
		[ 0.2, -0.2,  0.2],
		[ 0.2,  0.2,  0.2]
//		[-halfDimBox.x, -halfDimBox.y, -halfDimBox.z],
//		[-halfDimBox.x,  halfDimBox.y, -halfDimBox.z],
//		[ halfDimBox.x, -halfDimBox.y, -halfDimBox.z],
//		[ halfDimBox.x,  halfDimBox.y, -halfDimBox.z],
//		[-halfDimBox.x, -halfDimBox.y,  halfDimBox.z],
//		[-halfDimBox.x,  halfDimBox.y,  halfDimBox.z],
//		[ halfDimBox.x, -halfDimBox.y,  halfDimBox.z],
//		[ halfDimBox.x,  halfDimBox.y,  halfDimBox.z],

//		[origin.x,            origin.y,            origin.z],
//		[origin.x,            origin.y + dimBox.y, origin.z],
//		[origin.x + dimBox.x, origin.y,            origin.z],
//		[origin.x + dimBox.x, origin.y + dimBox.y, origin.z],
//		[origin.x,            origin.y,            origin.z + dimBox.z],
//		[origin.x,            origin.y + dimBox.y, origin.z + dimBox.z],
//		[origin.x + dimBox.x, origin.y,            origin.z + dimBox.z],
//		[origin.x + dimBox.x, origin.y + dimBox.y, origin.z + dimBox.z],
	];

	// Color of each vertices, the box is black
	var colorBuffer = [];
	var vertexBufferLength = vertexBuffer.length;
	for (var i = 0; i < vertexBufferLength; ++i)
		colorBuffer.push ([0.9, 0.1, 0.1, 1.0]);

	// Indices to draw the box
	var indicesBuffer = [
		0, 1, 2, 3, // BOTTOM
		6, 7,       // RIGHT
		4, 5,       // TOP
		0, 1,       // LEFT
		1, 0,
		0, 2, 4, 6, // FRONT
		6, 3,
		3, 1, 7, 5  // BACK
	];

	/// Vertex Buffer
	this.glVertexBuffer = glContext.createBuffer ();
	this.glVertexBuffer.numItems = vertexBufferLength; 
	
	var data = [];
	for (var vert = 0; vert < vertexBufferLength; ++vert) {
		this.addAPoint (data, vertexBuffer[vert]); 
		this.addAColor (data, colorBuffer[vert]);
	}
	
	glContext.bindBuffer (glContext.ARRAY_BUFFER, this.glVertexBuffer); 
	glContext.bufferData (glContext.ARRAY_BUFFER, new Float32Array (data), 
		glContext.STATIC_DRAW);
	
	
	/// Indices Buffer
	this.glIndiciesBuffer = glContext.createBuffer();
	glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer);
	
	glContext.bufferData (glContext.ELEMENT_ARRAY_BUFFER,
		new Uint16Array (indicesBuffer), glContext.STATIC_DRAW);
	this.glIndiciesBuffer.numItems = indicesBuffer.length;
};


//==============================================================================
///**
// * Fill the vertices for the repere.
// * @param {float[]} stripVertices - Array to fill with coordinates.
// * @param {float} x - X coordinates of hovered cube.
// * @param {float} y - Y coordinates of hovered cube.
// * @param {float} z - Z coordinates of hovered cube.
// */
//Repere.prototype.addVertice = function (stripVertices, x, y, z) {
//	// Allows some lisibility
//	// Origin point
//	var originX = this.origin.m[0];
//	var originY = this.origin.m[1];
//	var originZ = this.origin.m[2];

//	// Coordinate in X and Coordinate in X next to the last point
//	var offsetSizeX = [this.size * x /25, this.size * (x+1)/25];

//	// Coordinate in y and Coordinate in y next to the last point
//	var offsetSizeY = [this.size * y /25, this.size * (y+1)/25];

//	// Coordinate in Z and Coordinate in Z next to the last point
//	var offsetSizeZ = [this.size * z /25, this.size * (z+1)/25];

//	var tmp = 0.001;

//	// Factorize
//	// Ring 1
//	for (var i=0; i<2; ++i) {
//		stripVertices.push([originX + offsetSizeX[i], 
//				originY + tmp, originZ + tmp]);
//		stripVertices.push([originX + offsetSizeX[i],
//				originY + tmp, originZ + this.size - tmp]);
//		stripVertices.push([originX + offsetSizeX[i], 
//				originY + this.size - tmp, originZ + this.size - tmp]);
//		stripVertices.push([originX + offsetSizeX[i], 
//				originY + this.size - tmp, originZ + tmp]);
//	}

//	// Ring 2
//	for (var i=0; i<2; ++i) {
//		stripVertices.push([originX + tmp, 
//				originY + offsetSizeY[i], originZ + tmp]);
//		stripVertices.push([originX + this.size - tmp, 
//				originY + offsetSizeY[i], originZ + tmp]);
//		stripVertices.push([originX + this.size - tmp, 
//				originY + offsetSizeY[i], originZ + this.size - tmp]);
//		stripVertices.push([originX + tmp, 
//				originY + offsetSizeY[i], originZ + this.size - tmp]);
//	}

//	// Ring 3
//	for (var i=0; i<2; ++i) {
//		stripVertices.push([originX + tmp, 
//				originY + tmp, originZ + offsetSizeZ[i]]);
//		stripVertices.push([originX + tmp, 
//				originY + this.size - tmp, originZ + offsetSizeZ[i]]);
//		stripVertices.push([originX + this.size - tmp, 
//				originY + this.size - tmp, originZ + offsetSizeZ[i]]);
//		stripVertices.push([originX + this.size - tmp, 
//				originY + tmp, originZ + offsetSizeZ[i]]);
//	}
//};


//==============================================================================
/**
 * @override
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
Repere.prototype.draw = function (glContext) {
	if (!(glContext instanceof WebGLRenderingContext)) {
		console.error("Repere.draw : glContext is not a WebGLRenderingContext");
		return;
	}
	
	if (this.glVertexBuffer === undefined 
		|| this.glIndiciesBuffer === undefined)
	{
		console.error ("Repere.draw : prepare the repere BEFORE draw it !"); // TODO vérifer anglais
		return;
	}
	
	this.shader.setMode(0);
	// Let's the shader prepare its attributes
	this.shader.setAttributes (glContext, this.glVertexBuffer);
	
	// Let's render !
	glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.glIndiciesBuffer);
	glContext.drawElements (glContext.TRIANGLE_STRIP, 
		this.glIndiciesBuffer.numItems, 
		glContext.UNSIGNED_SHORT, 0);
	
//	if (this.stripIbo === undefined || this.stripVbo === undefined)
//		return;
//	
//	// Draw the stripes
//	this.shader.setAttributes(glContext, this.stripVbo);
//	glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.stripIbo);
//	glContext.drawElements(glContext.TRIANGLE_STRIP, 
//			this.stripIbo.numItems, glContext.UNSIGNED_SHORT, 0);
};




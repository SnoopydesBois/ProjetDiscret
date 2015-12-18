/// LICENCE ////////////////////////////////////////////////////////////////////


/* Copyright (juin 2015)
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
 * ModelView(modelController : ModelController, name : String, shader : Shader)
 * prepare(gl : GLContext) : void
 * draw(gl : GLContext) : void
 * prepareSelection(gl : GLContext) : void
 * prepareHover(gl : GLContext) : void
 * backBufferDraw(gl : GLContext) : void
 * prepareCubeNormal(cube : Cube, vertices : Array, indices : Array,
 *    color : Array, backColor : Array, normal : Array) : void
 * addVertices(dataVertices : Array, x : int, y : int, z : int, size : Vector) 
 *    : void
 * prepareFaceHover(face : Facet, vertices : Array, indices : Array,
 *     color : Array, normal : Array) : void
 * prepareFaceSelect(face : Facet, vertices : Array, indices : Array,
 *     color : Array, normal : Array) : void
 * clearHover() : void
 * clearSelect() : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////

ModelView3D.prototype = new ModelView();
ModelView3D.prototype.constructor = ModelView3D;


/**
 * @constructor
 * @param {ModelController} modelController - the model to display.
 * @param {String} name - the name of the model.
 * @param {Shader} shader - shader for display.
 */
function ModelView3D(modelController, name, shader) {
	//console.log ("ModelView3D.constructor");
	if (typeof modelController != "object"
			|| typeof name != "string"
			|| typeof shader != "object") {
		console.error ("ERROR - ModelView3D.constructor : bad type of "
				+ "parameter");
	}
	// --------------------------------------
	ModelView.call(this, modelController, name, shader);
	this.selectvbo = [];
	this.selectibo = [];
};


//==============================================================================
/**
 * Prepare the model (create the triangles).
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.prepare = function (gl) {
	//console.log ("ModelView3D.prepare nb= "+nb);
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView3D.prepare : bad type of parameter");
	}
	// --------------------------------------
	var size = this.modelController.getModel().getSize();
	this.nbBuffer = size.m[0]/5;

	var vertices = [];
	var indices = [];
	var color = [];
	var normal = [];
	var backColor = [];
	var data = [];
	var bdata = [];

	this.vbo = [];
	this.bbo = [];
	this.ibo = [];

	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		/* On large models, the indices are > a 2^16 bits and the display 
		 won't work correctly.
		 To fix that, we cut in 5 the buffer along the X axis.
		 There are optimization possible for the rendering*/
		vertices.push([]);
		indices.push([]);
		color.push([]);
		normal.push([]);
		backColor.push([]);
		data.push([]);
		bdata.push([]);
		this.vbo.push([]);
		this.bbo.push([]);
		this.ibo.push([]);
	}
	// 2 triangles per faces
	// No triangles strips because there are a lot of degenerated triangles
	for (var x = 0; x < size.m[0]; ++x) {
		for (var y = 0; y < size.m[1]; ++y) {
			for (var z = 0; z < size.m[2]; ++z) {
				if (this.modelController.getModel().getCube(x,y,z) != null) {
					this.prepareCubeNormal(
							this.modelController.getModel().getCube(x,y,z),
							vertices[Math.floor(x/this.nbBuffer)], 
							indices[Math.floor(x/this.nbBuffer)], 
							color[Math.floor(x/this.nbBuffer)],
							backColor[Math.floor(x/this.nbBuffer)],
							normal[Math.floor(x/this.nbBuffer)]);
				}
			}
		}
	}

	// Create vertex buffer 
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.vbo[tmp] = gl.createBuffer();
		this.vbo[tmp].numItems = vertices[tmp].length / 3.0;
		for (var i = 0; i < color[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				this.addAPoint(data[tmp], vertices[tmp][offset],
							vertices[tmp][offset + 1], 
							vertices[tmp][offset + 2]);
				this.addAColor(data[tmp], color[tmp][i]);
				this.addANormal(data[tmp], normal[tmp][i]);
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[tmp]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data[tmp]),
				gl.STATIC_DRAW);
	}

	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.bbo[tmp] = gl.createBuffer();
		this.bbo[tmp].numItems = vertices[tmp].length / 3.0;
		for (var i = 0; i < color[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				this.addAPoint(bdata[tmp], vertices[tmp][offset],
						vertices[tmp][offset + 1], 
						vertices[tmp][offset + 2]);
				this.addAColor(bdata[tmp], backColor[tmp][i]);
				this.addANormal(bdata[tmp], normal[tmp][i]);
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bbo[tmp]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bdata[tmp]), 
				gl.STATIC_DRAW);
	}

	// Create index buffer
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.ibo[tmp] = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo[tmp]);

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices[tmp]), 
		gl.STATIC_DRAW);
		this.ibo[tmp].numItems = indices[tmp].length;
	}
};


//==============================================================================
/**
 * Draw the model (draw the triangles).
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.draw = function (gl) {
	//console.log ("ModelView3D.draw");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView3D.draw : bad type of parameter");
	}
	// --------------------------------------
	this.shader.setMode(2);
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		// Let's the shader prepare its attributes
		this.shader.setAttributes(gl, this.vbo[tmp]);
		// Let's render !
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo[tmp]);
		gl.drawElements(gl.TRIANGLES, this.ibo[tmp].numItems,
		gl.UNSIGNED_SHORT, 0);

		// Let's the shader prepare its attributes
		this.shader.setAttributes(gl, this.selectvbo[tmp]);
		// Let's render !
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.selectibo[tmp]);
		gl.drawElements(gl.TRIANGLES, this.selectibo[tmp].numItems,
		gl.UNSIGNED_SHORT, 0);
	}
	// Let's the shader prepare its attributes
	this.shader.setAttributes(gl, this.hovervbo);
	// Let's render !
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.hoveribo);
	gl.drawElements(gl.TRIANGLES, this.hoveribo.numItems,
	gl.UNSIGNED_SHORT, 0);
};


//==============================================================================
/**
 * Prepare the selection of model (create the triangles).
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.prepareSelection = function (gl) {
	//console.log ("ModelView3D.prepareSelection");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView3D.prepareSelection : bad type of "
				+ "parameter");
	}
	// --------------------------------------
	var vertices = [];
	var indices = [];
	var color = [];
	var normal = [];
	var backColor = [];
	var data = [];
	var bdata = [];
	this.selectvbo = [];
	this.selectibo = [];

	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		/* On large models, the indices are > a 2^16 bits and the display 
		 won't work correctly.
		 To fix that, we cut in 5 the buffer along the X axis.
		 There are optimization possible for the rendering*/
		vertices.push([]);
		indices.push([]);
		color.push([]);
		normal.push([]);
		data.push([]);
		this.selectvbo.push([]);
		this.selectibo.push([]);
	}
	// 2 triangles per faces
	// No triangles strips because there are a lot of degenerated triangles
	for (var i=0; i<this.modelController.getNbSelectedFacet(); ++i) {
		var face = this.modelController.getSelectedFacet(i);
		this.prepareFaceSelect(face,
				vertices[Math.floor(face.getCube().m[0]/this.nbBuffer)],
				indices[Math.floor(face.getCube().m[0]/this.nbBuffer)],
				color[Math.floor(face.getCube().m[0]/this.nbBuffer)],
				normal[Math.floor(face.getCube().m[0]/this.nbBuffer)]);
	}


   	// Create vertex buffer 
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.selectvbo[tmp] = gl.createBuffer();
		this.selectvbo[tmp].numItems = vertices[tmp].length / 3.0;
		for (var i = 0; i < color[tmp].length; ++i) {
			for (var j = 0; j < 4; ++j) {
				var offset = i * 12 + j * 3;
				this.addAPoint(data[tmp], vertices[tmp][offset],
							vertices[tmp][offset + 1],
							vertices[tmp][offset + 2]);
				this.addAColor(data[tmp], color[tmp][i]);
				this.addANormal(data[tmp], normal[tmp][i]);
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.selectvbo[tmp]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data[tmp]),
				gl.STATIC_DRAW);
	}

	// Create index buffer
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.selectibo[tmp] = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.selectibo[tmp]);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices[tmp]),
		gl.STATIC_DRAW);
		this.selectibo[tmp].numItems = indices[tmp].length;
	}
};


//==============================================================================
/**
 * Prepare the hover of model (create the triangles).
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.prepareHover = function (gl) {
	//console.log ("ModelView3D.prepareHover");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView3D.prepareHover : bad type of "
				+ "parameter");
	}
	// --------------------------------------
	var vertices = [];
	var indices = [];
	var color = [];
	var normal = [];
	var data = [];


	// 2 triangles per faces
	// No triangles strips because there are a lot of degenerated triangles
	if (this.modelController.isHoverFacet()) {
		var face = this.modelController.getHoverFacet();
		this.prepareFaceHover(face,
				vertices, indices, color,
				normal);
	}

	// Create vertex buffer 
	this.hovervbo = gl.createBuffer();
	this.hovervbo.numItems = vertices.length / 3.0;
	for (var i = 0; i < color.length; ++i) {
		for (var j = 0; j < 4; ++j) {
			var offset = i * 12 + j * 3;
			this.addAPoint(data, vertices[offset],
						vertices[offset + 1], vertices[offset + 2]);
			this.addAColor(data, color[i]);
			this.addANormal(data, normal[i]);
		}
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, this.hovervbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

	// Create index buffer
	this.hoveribo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.hoveribo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices),
			gl.STATIC_DRAW);
	this.hoveribo.numItems = indices.length;
};


//==============================================================================
/**
 * Draw the model for picking.
 * @param {GLContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.backBufferDraw = function (gl) {
	//console.log ("ModelView3D.backBufferDraw");
	if (typeof gl != "object") {
		console.error ("ERROR - ModelView3D.backBufferDraw : bad type of "
				+"parameter");
	}
	// --------------------------------------
	this.shader.setMode (1);
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		// Let's the shader prepare its attributes
		this.shader.setAttributes(gl, this.bbo[tmp]);
		// Let's render !
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo[tmp]);
		gl.drawElements(gl.TRIANGLES, this.ibo[tmp].numItems, gl.UNSIGNED_SHORT,
				0);
	}
};


//==============================================================================
/**
 * Prepare each face of the cube for rendering.
 * @param {Array} vertices - Array to fill with vertex position.
 * @param {Array} indices - Array to fill with indices for the drawing.
 * @param {Array} color - Array to with color depending of the face.
 * @param {Array} backColor - Array to with color of each vertex for picking.
 * @param {Array} normal - Array to fill with the normal of each face.
 * @return {void}
 */
ModelView3D.prototype.prepareCubeNormal = function (cube, vertices, indices,
		color, backColor, normal)
{
	//console.log (ModelView3D.prepareCubeNormal);
	if (typeof cube != "object"
			|| typeof vertices != "object"
			|| typeof indices != "object"
			|| typeof color != "object"
			|| typeof backColor != "object"
			|| typeof normal != "object") {
		console.error ("ERROR - ModelView3D.prepareCubeNormal : bad type of" 
				+ " parameter");
	}
	// --------------------------------------
	var size = this.modelController.getModel().getSize();
//	console.log ("size", size, size.toString());
	// Preparation of each face
///// XXX modif
	
//	console.log ("cube -> voxel", cube);
//	console.log ("vertice -> vertexBuffer", vertices);
//	console.log ("indices -> indicesBuffer", indices);
//	console.log ("color -> colorBuffer", color);
//	console.log ("normal -> normalBuffer", normal);
//	console.log ("backColor -> backColorBuffer", backColor);
//	console.log ("size -> universSize", size);
	
	for (var i = 0; i < DirectionEnum.size; i++) {
		if (cube.hasFacet(i)) {
//			console.log ("COLOR", appli.getColor (
//					CubeStateEnum.NORMAL, DirectionEnum.properties[i].axis));
			this.prepareFace (cube, i, 0, vertices, indices, color, 
				normal, 
				backColor, 
//				[0.3, 0.8, 0.5, 1.0],
				appli.getColor (
					CubeStateEnum.NORMAL, DirectionEnum.properties[i].axis
				),
				size
			);
		}
////// XXX end modif 
//	for (var i = 0; i < DirectionEnum.size; i++) {
//		var verticeSize = vertices.length/3; // 3 points per vertices
//		if (cube.hasFacet(i)) { // If the cube got a facet in this direction
//			switch (i) {
//				case DirectionEnum.TOP : // TOP
//					// Creation of the 4 points of the face
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					
//					// To draw the 2 triangles
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//				break;
//				case DirectionEnum.BOTTOM : // BOTTOM
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);

//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//				break;
//				case DirectionEnum.RIGHT : // RIGHT
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//				break;
//				case DirectionEnum.LEFT : // LEFT
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//				break;
//				case DirectionEnum.FRONT : // FRONT
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//				break;
//				case DirectionEnum.BACK : // BACK
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);

//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//				break;
//				
//			} // end switch facet
//			color.push(appli.getColor(CubeStateEnum.NORMAL,
//					DirectionEnum.properties[i].axis));
//			normal.push([DirectionEnum.properties[i].x,
//					DirectionEnum.properties[i].y,
//					DirectionEnum.properties[i].z]);
//			// The color used by the picking according to the facet position
////			backColor.push([((cube.getPosition().m[0]+1.0)*10+i) / 255,
////					((cube.getPosition().m[1]+1.0)*10) / 255,
////					((cube.getPosition().m[2]+1.0)*10) / 255, 1]);
//			backColor.push (this.posToColor (cube, i));
//		} // end if facet exist
	} // end for each direction
};


//==============================================================================
/**
 * Add a vertex to an array.
 * it allows us to calculate the coordinate from the matrix to a [-1..1] cube.
 * @param {Array} dataVertices - Array to fill with the vertex position.
 * @param {int} x - the x coordinate of the vertex.
 * @param {int} y - the y coordinate of the vertex.
 * @param {int} z - the z coordinate of the vertex.
 * @param {Vector} size - maximum quantity of cube on each dimension.
 * @return {void}
 */
ModelView3D.prototype.addVertices = function (dataVertices, x, y, z, size) {
	//console.log ("ModelView3D.addVertices x= "+x+" y= "+y+" z= "+z);
	if (typeof dataVertices != "object"
			|| typeof x != "number"
			|| typeof y != "number"
			|| typeof z != "number"
			|| typeof size != "object") {
		console.error ("ERROR - ModelView3D.addVertices : bad type of "
				+ "parameter");
	}
	// --------------------------------------
	dataVertices.push((x / size.m[0]) * 2.0 - 1.0,
			(y / size.m[1]) * 2.0 - 1.0,
			(z / size.m[2]) * 2.0 - 1.0);
};


//==============================================================================
/**
 * Prepare each face of the cube Hover for rendering.
 * @param {Facet} face - The hovered face.
 * @param {Array} vertices - Array to fill with vertex position.
 * @param {Array} indices - Array to fill with indices for the drawing.
 * @param {Array} color - Array to with color depending of the face.
 * @param {Array} normal - Array to fill with the normal of each face.
 * @return {void}
 */
ModelView3D.prototype.prepareFaceHover = function (face, vertices, indices,
		color, normal)
{
	//console.log ("ModelView3D.prepareFaceHover");
	if (typeof face != "object"
			|| typeof vertices != "object"
			|| typeof indices != "object"
			|| typeof color != "object"
			|| typeof normal != "object") {
		console.error ("ERROR - ModelView3D.prepareFaceHover : bad type of"
				+ " parameter");
	}
	// --------------------------------------
	var size = this.modelController.getModel().getSize();

	// Preparation of each face
	var cube = this.modelController.getModel().getCube(face.getCube().m[0],
			face.getCube().m[1], face.getCube().m[2]);
/////// XXX modif
	
	if (cube != null && cube.hasFacet (face.getDirection ())) {
		this.prepareFace (
			cube, 
			face.getDirection (), 
			0.002,
			vertices, 
			indices, 
			color, 
			normal, 
			null, 
			appli.getColor (CubeStateEnum.HOVER,
				DirectionEnum.properties[face.getDirection()].axis), 
			size);
	}
/////// XXX end modif
//	var offset = 0.002;
//	var verticeSize = vertices.length/3; // 3 points per vertices
//	// If the cube got a facet in this direction	
//	if (cube!=null
//		&& ((face!=DirectionEnum.ALL && cube.hasFacet(face.getDirection()))
//			|| face.getDirection()==DirectionEnum.ALL)) {
//		switch (face.getDirection()) {
//			case DirectionEnum.TOP : // TOP
//				// Creation of the 4 points of the face
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1],
//						 cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1],
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				
//				// To draw the 2 triangles
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.BOTTOM : // BOTTOM
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1],
//						 cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1],
//						cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] - offset, size);

//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.RIGHT : // RIGHT
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset,
//						 cube.getPosition().m[1],
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices,
//						cube.getPosition().m[0] + 1.0 + offset,
//						cube.getPosition().m[1],
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices,
//						cube.getPosition().m[0] + 1.0 + offset,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.LEFT : // LEFT
//				this.addVertices(vertices, cube.getPosition().m[0] - offset,
//						 cube.getPosition().m[1],
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset,
//						cube.getPosition().m[1],
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset,
//						cube.getPosition().m[1] + 1.0,
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.FRONT : // FRONT
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1] - offset, 
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] - offset,
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] - offset,
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] - offset,
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.BACK : // BACK
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] + 1.0 + offset,
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] + 1.0 + offset,
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] + 1.0 + offset,
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//						cube.getPosition().m[1] + 1.0 + offset,
//						cube.getPosition().m[2] + 1.0, size);

//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.ALL : // ALL
//				if (cube.hasFacet(DirectionEnum.TOP)) {
//					// TOP
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.TOP].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.TOP].x,
//						DirectionEnum.properties[DirectionEnum.TOP].y,
//						DirectionEnum.properties[DirectionEnum.TOP].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.BOTTOM)) {
//					// BOTTOM
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] - offset, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.BOTTOM].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.BOTTOM].x,
//						DirectionEnum.properties[DirectionEnum.BOTTOM].y,
//						DirectionEnum.properties[DirectionEnum.BOTTOM].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.RIGHT)) {
//					// RIGHT
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset,
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices,
//							cube.getPosition().m[0] + 1.0 + offset,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices,
//							cube.getPosition().m[0] + 1.0 + offset,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.RIGHT].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.RIGHT].x,
//						DirectionEnum.properties[DirectionEnum.RIGHT].y,
//						DirectionEnum.properties[DirectionEnum.RIGHT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.LEFT)) {
//					// LEFT
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] - offset,
//							 cube.getPosition().m[1],
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices,
//							cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices,
//							cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1],
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices,
//							cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1] + 1.0,
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.LEFT].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.LEFT].x,
//						DirectionEnum.properties[DirectionEnum.LEFT].y,
//						DirectionEnum.properties[DirectionEnum.LEFT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.FRONT)) {
//					// FRONT
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1] - offset,
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] - offset,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] - offset,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] - offset,
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.FRONT].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.FRONT].x,
//						DirectionEnum.properties[DirectionEnum.FRONT].y,
//						DirectionEnum.properties[DirectionEnum.FRONT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.BACK)) {
//					// BACK
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0 + offset,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0 + offset,
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0 + offset,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0,
//							cube.getPosition().m[1] + 1.0 + offset,
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.HOVER,
//							DirectionEnum.properties[DirectionEnum.BACK].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.BACK].x,
//						DirectionEnum.properties[DirectionEnum.BACK].y,
//						DirectionEnum.properties[DirectionEnum.BACK].z]);
//					verticeSize = vertices.length/3;
//				}
//			break;
//			
//		} // end switch facet
//		if (cube!=null && face.getDirection()!=DirectionEnum.ALL) {
//			color.push(appli.getColor(CubeStateEnum.HOVER,
//				DirectionEnum.properties[face.getDirection()].axis));
//			normal.push([DirectionEnum.properties[face.getDirection()].x,
//				DirectionEnum.properties[face.getDirection()].y,
//				DirectionEnum.properties[face.getDirection()].z]);
//		}
//	} // end if facet exist
};


//==============================================================================
/**
 * Prepare each face of the cube Hover for rendering.
 * @param {Array} vertices - Array to fill with vertex position.
 * @param {Array} indices - Array to fill with indices for the drawing.
 * @param {Array} color - Array to with color depending of the face.
 * @param {Array} normal - Array to fill with the normal of each face.
 * @return {void}
 */
ModelView3D.prototype.prepareFaceSelect = function (face, vertices, indices,
		color, normal)
{
	//console.log ("ModelView3D.prepareFaceSelect face=");
	if (typeof face != "object"
			|| typeof vertices != "object"
			|| typeof indices != "object"
			|| typeof color != "object"
			|| typeof normal != "object") {
		console.error ("ERROR - ModelView3D.prepareFaceHover : bad type of parameter");
	}
	// --------------------------------------
	var size = this.modelController.getModel().getSize();

	// Preparation of each face
	var cube = this.modelController.getModel().getCube(face.getCube().m[0], 
			face.getCube().m[1], face.getCube().m[2]);
/////// XXX modif
	if (cube != null && cube.hasFacet (face.getDirection ())) {
		this.prepareFace (
			cube, 
			face.getDirection (), 
			0.001,
			vertices, 
			indices, 
			color, 
			normal, 
			null, 
			appli.getColor (CubeStateEnum.SELECTED,
				DirectionEnum.properties[face.getDirection()].axis), 
			size);
	}
/////// XXX end modif
//	var offset = 0.001;
//	var verticeSize = vertices.length/3; // 3 points per vertices
//	// If the cube got a facet in this direction	
//	if (cube!=null && 
//		(face!=DirectionEnum.ALL && cube.hasFacet(face.getDirection())) 
//		|| face.getDirection()==DirectionEnum.ALL) { 
//		switch (face.getDirection()) {
//			case DirectionEnum.TOP : // TOP
//				// Creation of the 4 points of the face
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1], 
//						 cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1], 
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0], 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] + 1.0 + offset, size);
//				
//				// To draw the 2 triangles
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.BOTTOM : // BOTTOM
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1], 
//						 cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1], 
//						cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0], 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] - offset, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] - offset, size);

//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.RIGHT : // RIGHT
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset,
//						 cube.getPosition().m[1]	, 
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset, 
//						cube.getPosition().m[1]	, 
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, 
//						cube.getPosition().m[0] + 1.0 + offset, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.LEFT : // LEFT
//				this.addVertices(vertices, cube.getPosition().m[0] - offset,
//						 cube.getPosition().m[1]	, 
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset, 
//						cube.getPosition().m[1]	, 
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] - offset, 
//						cube.getPosition().m[1] + 1.0, 
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.FRONT : // FRONT
//				this.addVertices(vertices, cube.getPosition().m[0],
//						 cube.getPosition().m[1] - offset, 
//						 cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] - offset, 
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0], 
//						cube.getPosition().m[1] - offset, 
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] - offset, 
//						cube.getPosition().m[2] + 1.0, size);
//				
//				indices.push(verticeSize, verticeSize+3, verticeSize+1);
//				indices.push(verticeSize, verticeSize+2, verticeSize+3);
//			break;
//			case DirectionEnum.BACK : // BACK
//				this.addVertices(vertices, cube.getPosition().m[0],
//						cube.getPosition().m[1] + 1.0 + offset, 
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] + 1.0 + offset, 
//						cube.getPosition().m[2], size);
//				this.addVertices(vertices, cube.getPosition().m[0], 
//						cube.getPosition().m[1] + 1.0 + offset, 
//						cube.getPosition().m[2] + 1.0, size);
//				this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//						cube.getPosition().m[1] + 1.0 + offset, 
//						cube.getPosition().m[2] + 1.0, size);

//				indices.push(verticeSize, verticeSize+1, verticeSize+3);
//				indices.push(verticeSize, verticeSize+3, verticeSize+2);
//			break;
//			case DirectionEnum.ALL : // ALL
//				if (cube.hasFacet(DirectionEnum.TOP)) {
//					// TOP
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1], 
//							 cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1], 
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0], 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] + 1.0 + offset, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.TOP].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.TOP].x, 
//						DirectionEnum.properties[DirectionEnum.TOP].y, 
//						DirectionEnum.properties[DirectionEnum.TOP].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.BOTTOM)) {
//					// BOTTOM
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1], 
//							 cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1], 
//							cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0], 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] - offset, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] - offset, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.BOTTOM].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.BOTTOM].x, 
//						DirectionEnum.properties[DirectionEnum.BOTTOM].y, 
//						DirectionEnum.properties[DirectionEnum.BOTTOM].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.RIGHT)) {
//					// RIGHT
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset,
//							 cube.getPosition().m[1]	, 
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset, 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset, 
//							cube.getPosition().m[1]	, 
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, 
//							cube.getPosition().m[0] + 1.0 + offset, 
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.RIGHT].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.RIGHT].x, 
//						DirectionEnum.properties[DirectionEnum.RIGHT].y, 
//						DirectionEnum.properties[DirectionEnum.RIGHT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.LEFT)) {
//					// LEFT
//					this.addVertices(vertices, cube.getPosition().m[0] - offset,
//							 cube.getPosition().m[1]	, 
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1]	,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] - offset,
//							cube.getPosition().m[1] + 1.0, 
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.LEFT].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.LEFT].x,
//						DirectionEnum.properties[DirectionEnum.LEFT].y, 
//						DirectionEnum.properties[DirectionEnum.LEFT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.FRONT)) {
//					// FRONT
//					this.addVertices(vertices, cube.getPosition().m[0],
//							 cube.getPosition().m[1] - offset, 
//							 cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] - offset, 
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0], 
//							cube.getPosition().m[1] - offset, 
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] - offset, 
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+3, verticeSize+1);
//					indices.push(verticeSize, verticeSize+2, verticeSize+3);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.FRONT].axis)
//							);
//					normal.push(
//						[DirectionEnum.properties[DirectionEnum.FRONT].x, 
//						DirectionEnum.properties[DirectionEnum.FRONT].y, 
//						DirectionEnum.properties[DirectionEnum.FRONT].z]);
//					verticeSize = vertices.length/3;
//				}
//				if (cube.hasFacet(DirectionEnum.BACK)) {
//					// BACK
//					this.addVertices(vertices, cube.getPosition().m[0],
//							cube.getPosition().m[1] + 1.0 + offset, 
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] + 1.0 + offset, 
//							cube.getPosition().m[2], size);
//					this.addVertices(vertices, cube.getPosition().m[0], 
//							cube.getPosition().m[1] + 1.0 + offset,
//							cube.getPosition().m[2] + 1.0, size);
//					this.addVertices(vertices, cube.getPosition().m[0] + 1.0, 
//							cube.getPosition().m[1] + 1.0 + offset, 
//							cube.getPosition().m[2] + 1.0, size);
//					indices.push(verticeSize, verticeSize+1, verticeSize+3);
//					indices.push(verticeSize, verticeSize+3, verticeSize+2);
//					color.push(appli.getColor(CubeStateEnum.SELECTED, 
//							DirectionEnum.properties[DirectionEnum.BACK].axis));
//					normal.push([DirectionEnum.properties[DirectionEnum.BACK].x,
//						DirectionEnum.properties[DirectionEnum.BACK].y, 
//						DirectionEnum.properties[DirectionEnum.BACK].z]);
//					verticeSize = vertices.length/3;
//				}
//			break;
//			default :
//				//console.log ("default");
//			break;
//			
//		} // end switch facet
//		if (face.getDirection()!=DirectionEnum.ALL) {
//			color.push(appli.getColor(CubeStateEnum.SELECTED, 
//					DirectionEnum.properties[face.getDirection()].axis));
//			normal.push([DirectionEnum.properties[face.getDirection()].x, 
//				DirectionEnum.properties[face.getDirection()].y, 
//				DirectionEnum.properties[face.getDirection()].z]);
//		}
//	} // end if facet exist
};

//==============================================================================
/**
 * Empty all buffer hover.
 * @param {glContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.clearHover = function (gl) {
	this.hovervbo = gl.createBuffer();
	this.hovervbo.numItems = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, this.hovervbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);

	this.hoveribo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.hoveribo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), 
			gl.STATIC_DRAW);
	this.hoveribo.numItems = 0;
};


//==============================================================================
/**
 * Empty all buffer select.
 * @param {glContext} gl - the gl context.
 * @return {void}
 */
ModelView3D.prototype.clearSelect = function (gl) {
	for (var tmp=0; tmp<this.nbBuffer; ++tmp) {
		this.selectvbo[tmp] = gl.createBuffer();
		this.selectvbo[tmp].numItems = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.selectvbo[tmp]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), 
				gl.STATIC_DRAW);

		this.selectibo[tmp] = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.selectibo[tmp]);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), 
				gl.STATIC_DRAW);
		this.selectibo[tmp].numItems = 0;
	}
};



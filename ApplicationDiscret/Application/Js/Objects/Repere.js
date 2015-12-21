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


/* origin : Vector
 * size : int
 * frame3D : Frame3D
 *
 * Repere(name : String, shader : DefaultShader, frame3D : Frame3D)
 * prepare(gl : glContext) : void
 * addVertice(stripVertices : Array, x : int, y : int, z : int) : void
 * hoverPrepare(gl : glContext) : void
 * draw(gl : glContext) : void
 * setFrame(frame3D : Frame3D) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



Repere.prototype = new GenericStructure();
Repere.prototype.constructor = Repere;

/**
 * Create a Repere given an origin and a size
 * @constructor 
 * @param {String} name - The name of the repere
 * @param {Shader} shader - The shader to use
 * @param {Frame3D} frame3D - The frame associated to the repere
 */
function Repere(name, shader, frame3D) {
	// Call parent constructor (mandatory !)
	GenericStructure.call(this, name, shader);
	if (shader.getAttribute(AttributeEnum.normal) 
			|| shader.getAttribute(AttributeEnum.tangent) 
			|| shader.getAttribute(AttributeEnum.bitangent) 
			|| shader.getAttribute(AttributeEnum.texcoord)) 
	{
		console.log ("Repere created with bad shader <"+shader.GetName()+">");
	}
	this.origin = new Vector(-1.0, -1.0, -1.0);
	this.size = 2;
	this.frame3D = frame3D;
};


//==============================================================================
/**
 * Overload Prepare.
 * @param {glContext} gl - the gl context.
 */
Repere.prototype.prepare = function (gl) {
	var vertices = [// the vertex of the box which serve as repere
		[this.origin.X()				, this.origin.Y()				, 
			this.origin.Z()				],
		[this.origin.X()				, this.origin.Y() + this.size	, 
			this.origin.Z()				],
		[this.origin.X() + this.size	, this.origin.Y()				,
			 this.origin.Z()				],
		[this.origin.X() + this.size	, this.origin.Y() + this.size	, 
			this.origin.Z()				],
		[this.origin.X()				, this.origin.Y()				, 
			this.origin.Z() + this.size	],
		[this.origin.X()				, this.origin.Y() + this.size	, 
			this.origin.Z() + this.size	],
		[this.origin.X() + this.size	, this.origin.Y()				, 
			this.origin.Z() + this.size	],
		[this.origin.X() + this.size	, this.origin.Y() + this.size	, 
			this.origin.Z() + this.size	],
	];

	// Color of each vertices, the box is black
	var colors = [];
	for (var i=0; i<vertices.length; ++i) {
		colors.push(appli.getBackgroundColor());
	}

	// Indices to draw the box
	var indices = [
		0,1,2,3,	// BOTTOM
		6,7,		// RIGHT
		4,5,		// TOP
		0,1,		// LEFT
		1,0,
		0,2,4,6,	// FRONT
		6,3,
		3,1,7,5		// BACK
	];

	// Create buffer 
	this.vbo = gl.createBuffer();
	this.vbo.numItems = vertices.length; 
	
	// and fill it!
	var data = [];
	for (vert=0; vert<vertices.length; ++vert) {
		this.addAPoint(data, vertices[vert]); 
		this.addAColor(data, colors[vert]);
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo); 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

	this.ibo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), 
	gl.STATIC_DRAW);
	this.ibo.numItems = indices.length;
	
	this.hoverPrepare(gl);
};


//==============================================================================
/**
 * Fill the vertices for the repere.
 * @param {float[]} stripVertices - Array to fill with coordinates.
 * @param {float} x - X coordinates of hovered cube.
 * @param {float} y - Y coordinates of hovered cube.
 * @param {float} z - Z coordinates of hovered cube.
 */
Repere.prototype.addVertice = function (stripVertices, x, y, z) {
	// Allows some lisibility
	// Origin point
	var originX = this.origin.m[0];
	var originY = this.origin.m[1];
	var originZ = this.origin.m[2];

	// Coordinate in X and Coordinate in X next to the last point
	var offsetSizeX = [this.size * x /25, this.size * (x+1)/25];

	// Coordinate in y and Coordinate in y next to the last point
	var offsetSizeY = [this.size * y /25, this.size * (y+1)/25];

	// Coordinate in Z and Coordinate in Z next to the last point
	var offsetSizeZ = [this.size * z /25, this.size * (z+1)/25];

	var tmp = 0.001;

	// Factorize
	// Ring 1
	for (var i=0; i<2; ++i) {
		stripVertices.push([originX + offsetSizeX[i], 
				originY + tmp, originZ + tmp]);
		stripVertices.push([originX + offsetSizeX[i],
				originY + tmp, originZ + this.size - tmp]);
		stripVertices.push([originX + offsetSizeX[i], 
				originY + this.size - tmp, originZ + this.size - tmp]);
		stripVertices.push([originX + offsetSizeX[i], 
				originY + this.size - tmp, originZ + tmp]);
	}

	// Ring 2
	for (var i=0; i<2; ++i) {
		stripVertices.push([originX + tmp, 
				originY + offsetSizeY[i], originZ + tmp]);
		stripVertices.push([originX + this.size - tmp, 
				originY + offsetSizeY[i], originZ + tmp]);
		stripVertices.push([originX + this.size - tmp, 
				originY + offsetSizeY[i], originZ + this.size - tmp]);
		stripVertices.push([originX + tmp, 
				originY + offsetSizeY[i], originZ + this.size - tmp]);
	}

	// Ring 3
	for (var i=0; i<2; ++i) {
		stripVertices.push([originX + tmp, 
				originY + tmp, originZ + offsetSizeZ[i]]);
		stripVertices.push([originX + tmp, 
				originY + this.size - tmp, originZ + offsetSizeZ[i]]);
		stripVertices.push([originX + this.size - tmp, 
				originY + this.size - tmp, originZ + offsetSizeZ[i]]);
		stripVertices.push([originX + this.size - tmp, 
				originY + tmp, originZ + offsetSizeZ[i]]);
	}
};


//==============================================================================
/**
 * Prepare the stripes (to optimize when the hover change).
 * @param {glContext} gl - The gl context.
 */
Repere.prototype.hoverPrepare = function (gl) {
	var model = this.frame3D.getCurentModel();
	if (model == null) {
		return;
	}
	var stripVertices = [];
	var stripColors = [];
	var stripIndices = [];
	// If a cube is hovered, we retrieve it's coordinates
	if (model.isHoverFacet()) {
		var x = model.getHoverFacet().getCube().m[0];
		var y = model.getHoverFacet().getCube().m[1];
		var z = model.getHoverFacet().getCube().m[2];
		this.addVertice(stripVertices, x, y, z); // Fill vertices

		for (var i=0; i<24; ++i) { // strip color
			stripColors.push(appli.getLeaderColor());
		}
		
		for (var i=0; i<3; ++i) { // Prepare the 3 ring
			for (var j=0; j<4; ++j) { // Prepare a ring
				stripIndices.push(0+i*8+j,4+i*8+j)
			}
			stripIndices.push(0+i*8,4+i*8) // End the ring
			if (i!=2) // Degenerate triangles betweens the rings
				stripIndices.push(4+i*8,8+i*8);
		}
	}

	// Create buffer 
	this.stripVbo = gl.createBuffer();
	this.stripVbo.numItems = stripVertices.length; 
	
	// and fill it!
	var stripData = [];
	for (vert=0; vert<stripVertices.length; ++vert) {
		this.addAPoint(stripData, stripVertices[vert]); 
		this.addAColor(stripData, stripColors[vert]);
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.stripVbo); 
	gl.bufferData(gl.ARRAY_BUFFER, 
			new Float32Array(stripData), gl.STATIC_DRAW);

	this.stripIbo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.stripIbo);
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(stripIndices), 
	gl.STATIC_DRAW);
	this.stripIbo.numItems = stripIndices.length;
};


//==============================================================================
/**
 * Overload draw.
 * @param {glContext} gl - the GL context.
 */
Repere.prototype.draw = function (gl) {
	if (this.vbo == undefined || this.ibo == undefined) {
		return;
	}
	this.shader.setMode(0);
	// Let's the shader prepare its attributes
	this.shader.setAttributes(gl, this.vbo);
	
	// Let's render !
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
	gl.drawElements(gl.TRIANGLE_STRIP, this.ibo.numItems, gl.UNSIGNED_SHORT, 0);
	
	if (this.stripIbo == undefined || this.stripVbo == undefined) {
		return;
	}
	// Draw the stripes
	this.shader.setAttributes(gl, this.stripVbo);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.stripIbo);
	gl.drawElements(gl.TRIANGLE_STRIP, 
			this.stripIbo.numItems, gl.UNSIGNED_SHORT, 0);
};


//==============================================================================
/**
 * Associate a new frame to the repere.
 * @param {Frame} frame - the new frame for the repere.
 */

Repere.prototype.setFrame = function (frame) {
	this.frame3D = frame;
};



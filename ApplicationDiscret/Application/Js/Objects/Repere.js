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
 * Repere(name : String, shader : DefaultShader, frame3D : Frame3D)
 * prepare(glContext : glContext) : void
 * addVertice(stripVertices : Array, x : int, y : int, z : int) : void
 * draw(glContext : glContext) : void
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
 * TODO
 * 
 * @param {WebGLRenderingContext} glContext - The gl context (used by the
 * shader).
 */
function Repere (glContext) {
	GenericStructure.call (this, "repere", new RepereShader (glContext));
		
	/**
	 * {Vector} The dimension of the 3D space in voxel.
	 */
	this.dimension = new Vector (1, 1, 1);
	
	/**
	 * @inheritdoc
	 * An user cannot select the repere.
	 */
	this.isPickable = false;
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



//##############################################################################
//	Drawing methods
//##############################################################################



/**
 * @override
 * 
 * @param {WebGLRenderingContext} glContext - The gl context.
 */
Repere.prototype.prepare = function (glContext) {
	/// Vertex and color buffers
	var vertexBuffer = [ // the vertex of the box which serve as repere
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
	// Color of each vertices, lines are white


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
	if (this.glVertexBuffer === undefined)
	{
		console.error ("Repere.draw: prepare the repere BEFORE drawing it !");
		return;
	}
		
	// Let's the shader prepare its attributes
	this.shader.setAttributes (glContext, this.glVertexBuffer);
	
	// Let's render !
	glContext.drawArrays (glContext.LINE_LOOP, 0, this.glVertexBuffer.numItems);
};


//==============================================================================
/**
 * @override
 * 
 * Always throw an error. The repere is not pickable.
 * 
 * @throws {String}
 */
Repere.prototype.drawBackBuffer = function () {
	throw "Repere is not pickable !"
};



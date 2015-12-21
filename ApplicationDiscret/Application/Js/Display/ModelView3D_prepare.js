/**
 * Prepare a face of a cube. Fill all the buffers (color, normal and backColor).
 * 
 * @param voxel {Voxel} - The current voxel.
 * @param direction {DirectionEnum} - The direction of the face to prepare.
 * @param offset {Number} - an offset to draw the face.
 * @param vertexBuffer {Array} - The vertex buffer which contains 3-tuple
 * coordinates of each point.
 * @param indicesBuffer {Array} - The indices buffer which contains the order
 * (the indices) to draw all points.
 * @param colorBuffer {Array} - The color buffer which contains the color of 
 * each point.
 * @param normalBuffer {Array} - The normal buffer which contains the normal of
 * each triangle.
 * @param backColorBuffer {Array} - The normal buffer which contains the normal
 * of each face.
 * @param colorFace {Array[4]} - The color of the face to draw.
 * @param universSize {Vector} - The size of the univers.
 * 
 * @return {void}
 */
ModelView3D.prototype.prepareFace = function (
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
	// TODO vérifier les entrés
	// FIXME sortir la variable suivante (à créé une fois et vrai tout le temps)
	/* TODO écrire une petite explication sur la variable suivante
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
	
	// Creation of the 4 points of the face
	
	var verticeSize = vertexBuffer.length / 3; // 3 points per vertices
	
	for (var i = 0; i < 4; ++i) {
		var vertex = new Vector (DirectionEnum.properties[direction].x * offset,
			DirectionEnum.properties[direction].y * offset,
			DirectionEnum.properties[direction].z * offset);
		vertex.add (addVector (voxel.getPosition (), 
			offsetVertexInCube[direction][i]));
		this.addVertices2 (vertexBuffer, vertex, universSize);
	}

	
	switch (direction) {
	
	case DirectionEnum.TOP :
	case DirectionEnum.RIGHT :
	case DirectionEnum.FRONT :
		indicesBuffer.push (verticeSize, verticeSize + 3, verticeSize + 1);
		indicesBuffer.push (verticeSize, verticeSize + 2, verticeSize + 3);
	break;
	
	case DirectionEnum.BOTTOM :
	case DirectionEnum.LEFT :
	case DirectionEnum.BACK :
		indicesBuffer.push (verticeSize, verticeSize + 1, verticeSize + 3);
		indicesBuffer.push (verticeSize, verticeSize + 3, verticeSize + 2);
	break;
	
	case DirectionEnum.ALL :
		for (var i = 0; i < DirectionEnum.size; ++i) {
			if (voxel.hasFacet (i)) {
//				console.log ("rappel en", i);
				this.prepareFace (
					voxel,
					i,
//					new Vector (DirectionEnum.properties[i].x,
//						DirectionEnum.properties[i].y,
//						DirectionEnum.properties[i].z
//					),
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
//			else 
//				console.log ("Pas de facet en", i)
		} // end for each direction
	break;
	default :
	break;
	}
	
	colorBuffer.push (colorFace);
	if (normalBuffer != undefined && normalBuffer != null)
		normalBuffer.push ([DirectionEnum.properties[direction].x,
				DirectionEnum.properties[direction].y,
				DirectionEnum.properties[direction].z]);
	
	// The color used by the picking according to the facet position
	if (backColorBuffer != undefined && backColorBuffer != null)
		backColorBuffer.push (this.posToColor (voxel, direction));
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
ModelView3D.prototype.posToColor = function (voxel, direction) {
	// TODO compléter avec la formule de transformation
	return [
		((voxel.getPosition().m[0] + 1) * 10 + direction) / 255, // red
		((voxel.getPosition().m[1] + 1) * 10) / 255, // green
		((voxel.getPosition().m[2] + 1) * 10) / 255, // blue
		1.0 // alpha
		];
};



//==============================================================================
/**
 * TODO 
 */
ModelView3D.prototype.addVertices2 = function (dataVertices, vertex, size) {
	if (!(dataVertices instanceof Array) || !(vertex instanceof Vector) 
		|| !(size instanceof Vector))
	{
		console.error ("ModelView3D.addVertices2 - bab type of parameter !");
	}
	
	dataVertices.push((vertex.m[0] / size.m[0]) * 2.0 - 1.0,
		(vertex.m[1] / size.m[1]) * 2.0 - 1.0,
		(vertex.m[2] / size.m[2]) * 2.0 - 1.0);
};

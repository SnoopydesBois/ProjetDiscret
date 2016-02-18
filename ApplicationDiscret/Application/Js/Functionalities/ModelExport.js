/// LICENCE ////////////////////////////////////////////////////////////////////

/**
 * @license
 * Copyright BENOIST Thomas, BISUTTI Adrien, DESPLEBAIN Tanguy,
 * LAURET Karl, (juin 2015)
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
 * termes
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/* constructor ()
 *
 */


/// CODE ///////////////////////////////////////////////////////////////////////



ModelExport.prototype.constructor = ModelExport;

/**
 * @constructor
 *
 */
function ModelExport (idSurface, idMeridian, idRevolution) {
	this.idSurface = idSurface;
	this.idMeridian = idMeridian;
	this.idRevolution = idRevolution;
	this.connexity = parseInt($("#connexityChoice").val());
};


//==============================================================================
/**
 * Get the current id of the canvas containing the surface used to export
 * @return {String} The id of the canvas containing the surface
 */
ModelExport.prototype.getIdSurface = function(){
	return this.idSurface;
};


//==============================================================================
/**
 * Get the current id of the HTML element containing meridian to export
 * @return {String} The id of the HTML element containing the meridian
 */
ModelExport.prototype.getIdMeridian = function(){
	return this.idMeridian;
};


//==============================================================================
/**
 * Get the current id of the HTML element containing curve of revolution to export
 * @return {String} The id of the HTML element containing the revolution
 */
ModelExport.prototype.getIdRevolution = function(){
	return this.idRevolution;
};


//==============================================================================
/**
 * Set the id of the new canvas containing the surface to export
 * @param {String} idSurface - The id of the canvas containing the surface
 */
ModelExport.prototype.setIdSurface = function(idSurface){
	this.idSurface = idSurface;
};


//==============================================================================
/**
 * Set the id of the new HTML element containing the meridian to export
 * @param {String} idMeridian - The id of the HTML element containing the meridian
 */
ModelExport.prototype.setIdMeridian = function(idMeridian){
	this.idMeridian = idMeridian;
};


//==============================================================================
/**
 * Set the id of the new HTML element containing the curve of revolution to export
 * @param {String} idRevolution - The id of the HTML element containing the curve of revolution
 */
ModelExport.prototype.setIdRevolution = function(idRevolution){
	this.idRevolution = idRevolution;
};


//==============================================================================
/**
 * Export the 3D canvas to x3d
 * Propose to save an x3d file representing the surface by boxes
 * @param {Surface} surface - The surface to export to x3d file
 */
ModelExport.prototype.exportX3D = function(surface){
	var x3D = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + 
					"\t<!DOCTYPE X3D PUBLIC \"ISO//Web3D//DTD X3D 3.2//EN\"\n" +
					  "\t\t\"http://www.web3d.org/specifications/x3d-3.2.dtd\">\n\n" +

					"\t<X3D profile=\"Immersive\" version=\"3.2\"\n" +
						 "\t\txmlns:xsd=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
						 "\t\txsd:noNamespaceSchemaLocation=\"http://www.web3d.org/specifications/x3d-3.2.xsd\">\n" +
						 "\t<head></head>\n" +
					"\t<Scene>\n" ;
					  
	var indicesBuffer = [], vertexBuffer = [];
	
	var dimension = surface.getDimension();
	
	
	for(var x = 0; x < dimension.x; x++){
		for(var y = 0; y < dimension.y; y++){
			for(var z = 0; z < dimension.z; z++){
				var voxel = surface.getVoxel(x,z,y)
				if(voxel != null && voxel.isVisible(this.connexity)){
					x3D += "\t<Transform translation=\""+  (x - dimension.x/2) + " " + (y - dimension.y/2) + " " + (z - dimension.z/2)  + "\">\n" +
								"\t\t<Shape>\n" + 
									"\t\t\t<Box size=\"" + 1.0 + " " +  1.0 + " " + 1.0 + "\"/>\n"+
								"\t\t</Shape>\n" +
							"\t</Transform>\n";
				}
			}
		}
	}

	x3D += 		"\t</Scene>\n" +
			"</X3D>";
		
	var blob = new Blob([x3D], {type: "text/xml"});

	saveAs(blob, "surfaceX3d");
	
}


//==============================================================================
/**
 * Export the meridian div to PNG
 */
ModelExport.prototype.exportMeridianPng = function(){
	this.getImg2DData(this.idMeridian, "meridian.png")
}


//==============================================================================
/**
 * Export the curve of revolution div to PNG
 */
ModelExport.prototype.exportRevolutionPng = function(){
	this.getImg2DData(this.idRevolution, "revolution.png");
}


//==============================================================================
/**
 * Use of the saveSvgAsPng function from saveSvgAsPng library.
 * @param {String} id - The name of the div containing the svg to save
 */
ModelExport.prototype.getImg2DData = function(id, name){
	// To modify to use canvas if handfree mode is in use
	saveSvgAsPng(document.querySelector("#" + id + '>svg'), name);	
}


//==============================================================================
/**
 * Export the 3D canvas to PNG
 */
ModelExport.prototype.export3DPng = function(surfaceView){
	$('#download').attr('href', this.getImg3DData(this.idSurface, surfaceView));
	$('#download').attr('download', 'Surface3D.png');
}


//==============================================================================
/**
 * Create 2D canvas from 3D canvas
 * @param {String} id - The name of the div containing the svg to save
 * @param {SurfaceViewer} surfaceView - The surfaceView containing the objects to render
 * @return {String} the url to the canvas img
 */
ModelExport.prototype.getImg3DData = function(id, surfaceView){

	var width = $("#" + id).width(), height = $("#" + id).height();
	
	var pixels = [];
	pixels = surfaceView.getImgData(width, height);
		
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext("2d");
	
	var imageData = context.createImageData(width, height);
	imageData.data.set(pixels);
	context.putImageData(imageData, 0, 0);
	
	return canvas.toDataURL();
}


//==============================================================================
/**
 *
 */
ModelExport.prototype.exportSTL = function(renderer){
	var isLittleEndian = true; // STL files assume little endian, see wikipedia page

// 		sizeInBytes = 
//         80 * sizeof(UINT8)
//      +  1 * sizeof(UINT32)
//      + (12 * sizeof(REAL32) + 1 * sizeof(UINT16)) * N triangles*

	// Retrieving the coordinates
	var vertexBuffer = [];
	var indicesBuffer = [];

	renderer.prepareSTL(this.connexity, vertexBuffer, indicesBuffer);
	
	var nbTriangles = vertexBuffer.length/3;
	// Creation of the buffer containing the data for the stl
	
	/* UINT8[80] – Header
	 UINT32 – Number of triangles
	*/
	var headerOffset = 84;
	/*  REAL32[3] – Normal vector
		REAL32[3] – Vertex 1
		REAL32[3] – Vertex 2
		REAL32[3] – Vertex 3
		UINT16 – Attribute byte count
	*/
	var sizeTriangles = 50 * indicesBuffer.length;
	
	var buffer = new ArrayBuffer(headerOffset + sizeTriangles);

	// Creation of a view to write data in the buffer
	var dataview = new DataView(buffer);
	// Offset used when writing data into buffer
	var offset = 80; // For the STL header 
		
		
    dataview.setUint32(offset, indicesBuffer.length, isLittleEndian);
	offset += 4;
	
	for(var i = 0; i < indicesBuffer.length; i++){
		// Write data of normal (unused)
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4; // size of float in bytes
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;

		// Write each vertex data
		dataview.setFloat32(offset, vertexBuffer[indicesBuffer[i]], isLittleEndian);
		offset += 4;
		dataview.setFloat32(offset, vertexBuffer[indicesBuffer[i]+1]+1, isLittleEndian);
		offset += 4;
		dataview.setFloat32(offset, vertexBuffer[indicesBuffer[i]+2]+2, isLittleEndian);
		offset += 4;
		
		
		offset += 2; // ignore byte count attribute
	}
	
	var blob = new Blob([dataview], {type: 'application/octet-binary'});
    
	// console.log(vertexBuffer.length);
	// console.log(nbTriangles);
	// console.log(indicesBuffer.length);
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs(blob, "surfaceSTL.stl");
}
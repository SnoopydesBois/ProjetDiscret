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

	saveAs(blob, "surfaceX3d.x3d");
	
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
	// If there is no svg, document.querySelector return false. It happens when we are working on the canvas (hand free drawing)
	var svgElement = document.querySelector("#" + id + '>svg');
	if(svgElement == null){
		var canvas = document.querySelector("#" + id);
		var width = canvas.width;
		var height = canvas.height
		var context = canvas.getContext("2d");
		
		var imageData = context.getImageData(0,0, width, height);
				
		canvas.toBlob(function(blob) {
			saveAs(blob, "meridian.png");
		});
	}
	else{
		// To modify to use canvas if handfree mode is in use
		saveSvgAsPng(svgElement, name);
	}
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

	renderer.prepareSTL(this.connexity, indicesBuffer, vertexBuffer);
	
	var nbTriangles = indicesBuffer.length/3;
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
	var sizeTriangles = 50 * nbTriangles;
	
	var buffer = new ArrayBuffer(headerOffset + sizeTriangles);

	// Creation of a view to write data in the buffer
	var dataview = new DataView(buffer);
	// Offset used when writing data into buffer
	var offset = 80; // For the STL header 
		
		
    dataview.setUint32(offset, nbTriangles, isLittleEndian);
	offset += 4;
	
	for(var i = 0; i < indicesBuffer.length; i+=3){
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4; // size of float in bytes
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;
		// console.log("======================");
		for(var p =  0; p < 3; p++){
			for(var c = 0; c < 3; c++){
				// console.log(indicesBuffer[i+p]*3 +c);
				dataview.setFloat32(offset, vertexBuffer[indicesBuffer[i+p]*3+c], isLittleEndian);
				// console.log ("triangle n°", i/3, "point", p, "coord", c);
				// console.log("Coord", vertexBuffer[indicesBuffer[i+p]*3+c]);
				offset += 4;
			}
		}
		
		offset += 2; // ignore byte count attribute
	}
	
	var blob = new Blob([dataview], {type: 'application/octet-binary'});
    
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs(blob, "surfaceSTL.stl");
}



//==============================================================================
/**
 * Save the current meridian and the current curve of revolution to a zip archive
 */
ModelExport.prototype.saveCurves = function(meridian, revolution){
	// Date of save
	var date = new Date();
	
	var txtDate = date.getDate() + "_" + date.getMonth() + 1 + "_" + date.getFullYear() + "@" + date.getHours(); 
	
	// Zip creation
	var zip = new JSZip();
	
	// Folder containing 3 files
	var modelFolder = zip.folder("Curves " + txtDate);
	
	
	if(meridian instanceof FormulaCurve){
		modelFolder.file("Meridian.xml", 
				this.writeExplicit(meridian)
			);

	}
	else if(meridian instanceof DrawnCurve){
		modelFolder.file("Meridian.xml", 
				this.writeDrawn(meridian)
			);
	}	
			
	modelFolder.file("Revolution.xml",
			this.writeImplicit(revolution)
		);
	
	var content = zip.generate({type:"blob"});
	
	window.saveAs(content, "Curves.zip");
};


//==============================================================================
/**
 *
 */
ModelExport.prototype.writeExplicit = function(curve){
	return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + 
			'<!DOCTYPE Curve  [\n' +
					'\t\t<!ELEMENT Curve (CurveType, Equation)>\n' +
					'\t\t<!ELEMENT CurveType (Class)>\n' +
					'\t\t<!ELEMENT Class (#PCDATA)>\n' +
					'\t\t<!ELEMENT Equation (#PCDATA)>\n' +
				']>\n' +
			'<Curve>\n' +
				'\t<CurveType>\n' +
					'\t\t<Class> Explicit </Class>\n' +
				'\t</CurveType>\n' +
				'\t<Equation>' +  curve.getEquation()  + '</Equation>\n' +
			'</Curve>';
};


//==============================================================================
/**
 *
 */
ModelExport.prototype.writeImplicit = function(curve){
	return '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n' + 
			'<!DOCTYPE Curve  [\n' +
					'\t\t<!ELEMENT Curve (CurveType, Equation)>\n' +
					'\t\t<!ELEMENT CurveType (Class)>\n' +
					'\t\t<!ELEMENT Class (#PCDATA)>\n' +
					'\t\t<!ELEMENT Equation (#PCDATA)>\n' +
				']>\n' +
			'<Curve>\n' +
				'\t<CurveType>\n' +
					'\t\t<Class> Implicit </Class>\n' +
				'\t</CurveType>\n' +
				'\t<Equation>' +  curve.getEquation()  + '</Equation>\n' +
			'</Curve>';
};


//==============================================================================
/**
 *
 */
ModelExport.prototype.writeDrawn = function(curve){
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n' + 
				'<!DOCTYPE Curve [\n' +
						'\t\t<!ELEMENT Curve (CurveType, Equation)>\n' +
						'\t\t<!ELEMENT CurveType (Class)>\n' +
						'\t\t<!ELEMENT Class (#PCDATA)>\n' +
						'\t\t<!ELEMENT xCoords (#PCDATA)>\n' +
						'\t\t<!ELEMENT yCoords (#PCDATA)>\n' +
				']>\n'+
				'<Curve>\n' +
					'\t<CurveType>\n' +
						'\t\t<Class> Explicit </Class>\n' +
					'\t</CurveType>\n' +
					'\t<xCoords> ';
				
	var list = curve.getXList();
	for(var i = 0; i < list.length; i++){
		xml += list[i] + " ";
	}
	
	xml += '\t</xCoords>\n' +
			'\t<yCoords> ';
	
	list = curve.getYList();
	for(var i = 0; i < list.length; i++){
		xml += list[i] + " ";
	}
	
	xml += '\t</yCoords>\n' +
			'</Curve>';
	return xml;
	
};
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


/* idSurface : String
 * idMeridian : String
 * idRevolution : String
 * 
 * ModelExport (idSurface : String, idMeridian : String, idRevolution : String)
 * 
 * getIdSurface () : String
 * getIdMeridian () : String
 * getIdRevolution () : String
 * setIdSurface (idSurface : String) : void
 * setIdMeridian (idMeridian : String) : void
 * setIdRevolution (idRevolution : String) : void
 * exportX3D (surface : Surface) : void
 * exportMeridianPng () : void
 * exportRevolutionPng () : void
 * getImg2DData (id : String, name : String) : void
 * export3DPng (surfaceView : SurfaceViewer) : void
 * getImg3DData (id : String, surfaceView : SurfaceViewer) : String
 * exportSTL (renderer : SurfaceRenderer) : void
 * saveGeneratrix (meridianController : Controller2DMeridian) : void
 * saveImplicitCurve (curveController : Controller2D) : void
 * saveExplicitCurve (curveController : Controller2DMeridian) : void
 * saveDrawnCurve (curveController : Controller2DMeridian) : void
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 */
ModelExport.prototype.constructor = ModelExport;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * The id to provide for the model are exactly what is written for the id 
 * attribute in the html tag. Not with a # in front.
 * 
 * @param {String} idSurface - The id of the container of the surface to export.
 * @param {String} idMeridian - The id of the container of the generatrix 
 * to export.
 * @param {String} idRevolution - The id of the container of the directrix 
 * to export.
 */
function ModelExport (idSurface, idMeridian, idRevolution) {
	
	/**
	 * {String} The id of the canvas of the surface to export.
	 */
	this.idSurface = idSurface;
	
	/**
	 * {String} The id of the HTML element of the generatrix to export.
	 */
	this.idMeridian = idMeridian;
	
	/**
	 * {String} The id of the HTML element of the directrix to export.
	 */
	this.idRevolution = idRevolution;
};



//##############################################################################
//	Constructor
//##############################################################################



/**
 * Get the current id of the canvas containing the surface used to export.
 * 
 * @return {String} The id of the canvas containing the surface.
 */
ModelExport.prototype.getIdSurface = function () {
	return this.idSurface;
};


//==============================================================================
/**
 * Get the current id of the HTML element containing meridian to export.
 * 
 * @return {String} The id of the HTML element containing the meridian.
 */
ModelExport.prototype.getIdMeridian = function(){
	return this.idMeridian;
};


//==============================================================================
/**
 * Get the current id of the HTML element containing curve of revolution to 
 * export.
 * 
 * @return {String} The id of the HTML element containing the revolution
 */
ModelExport.prototype.getIdRevolution = function () {
	return this.idRevolution;
};


//==============================================================================
/**
 * Set the id of the new canvas containing the surface to export.
 * 
 * @param {String} idSurface - The id of the canvas containing the surface.
 * 
 * @return {void}
 * @throws {String} The parameter is not of string type.
 */
ModelExport.prototype.setIdSurface = function (idSurface) {
	if (!(typeof idSurface == "string")) {
		throw "ModelExport.setIdSurface.ErrorBadParameterType";
	}
	
	this.idSurface = idSurface;
};


//==============================================================================
/**
 * Set the id of the new HTML element containing the meridian to export.
 * 
 * @param {String} idMeridian - The id of the HTML element containing the 
 * generatrix.
 * 
 * @return {void}
 * @throws {String} The parameter is not of string type.
 */
ModelExport.prototype.setIdMeridian = function (idMeridian) {
	if (!(typeof idMeridian == "string")) {
		throw "ModelExport.setIdMeridian.ErrorBadParameterType";
	}
	this.idMeridian = idMeridian;
};


//==============================================================================
/**
 * Set the id of the new HTML element containing the curve of revolution to 
 * export.
 * 
 * @param {String} idRevolution - The id of the HTML element containing the 
 * directrix.
 * 
 * @return {void}
 * @throws {String} The parameter is not of string type.
 */
ModelExport.prototype.setIdRevolution = function (idRevolution) {
	if (!(typeof idRevolution == "string")) {
		throw "ModelExport.setIdRevolution.ErrorBadParameterType";
	}
	this.idRevolution = idRevolution;
};


//==============================================================================
/**
 * Export the 3D canvas to X3D. Propose to save an X3D file representing the
 * surface by boxes.
 * 
 * @param {Surface} surface - The surface to export to X3D file.
 * 
 * @return {void}
 * @throws {String} The parameter is not of Surface type.
 */
ModelExport.prototype.exportX3D = function (surface) {
	if (!(surface instanceof Surface)) {
		throw "ModelExport.exportX3D.ErrorBadParameterType";
	}
	var x3D = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + 
					"\t<!DOCTYPE X3D PUBLIC \"ISO//Web3D//DTD X3D 3.2//EN\"\n" +
					  "\t\t\"http://www.web3d.org/specifications/" +
					  "x3d-3.2.dtd\">\n\n" +

					"\t<X3D profile=\"Immersive\" version=\"3.2\"\n" +
						 "\t\txmlns:xsd=\"http://www.w3.org/2001/XMLSchema" +
						 "-instance\"\n" +
						 "\t\txsd:noNamespaceSchemaLocation=\"http://www.web3d"+
						 ".org/specifications/x3d-3.2.xsd\">\n" +
						 "\t<head></head>\n" +
					"\t<Scene>\n" ;
	
	var dimension = surface.getDimension ();
	
	// Get the current connexity.
	var connexity = parseInt ($("#connexityChoice").val ());
	
	// Create the voxels in the X3D file
	for (var x = 0; x < dimension.x; x++) {
		for (var y = 0; y < dimension.y; y++) {
			for (var z = 0; z < dimension.z; z++) {
				var voxel = surface.getVoxel (x, z, y)
				if (voxel != null && voxel.isVisible(connexity)) {
					x3D += "\t<Transform translation=\""+ (x - dimension.x / 2) 
									+ " " 
									+ (y - dimension.y / 2) 
									+ " " 
									+ (z - dimension.z / 2)  
									+ "\">\n" +
								"\t\t<Shape>\n" + 
									"\t\t\t<Box size=\"" + (1.0 - dimension.x/2) 
										 + " " 
										 + (1.0 - dimension.y / 2) 
										 + " " 
										 + (1.0 - dimension.z / 2)
										 + "\"/>\n"+
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
};


//==============================================================================
/**
 * Export the meridian div to PNG.
 * 
 * @return {void}
 */
ModelExport.prototype.exportMeridianPng = function () {
	this.getImg2DData (this.idMeridian, "generatrix.png");
};


//==============================================================================
/**
 * Export the curve of revolution div to PNG.
 * 
 * @return {void}
 */
ModelExport.prototype.exportRevolutionPng = function () {
	this.getImg2DData (this.idRevolution, "directrix.png");
};


//==============================================================================
/**
 * Use of the saveSvgAsPng function from saveSvgAsPng library.
 * 
 * @param {String} id - The name of the div containing the svg to save.
 * @param {String} name - The name of the file to save.
 * 
 * @return {void}
 * @throws {TODO}
 */
ModelExport.prototype.getImg2DData = function (id, name) {
	if (!checkType(arguments, "string", "string")) {
		throw "ModelExport.getImg2DData.ErrorBadParameterType";
	}
	// If there is no svg, document.querySelector return null. 
	// It happens when we are working on the canvas (hand free drawing)
	var svgElement = document.querySelector("#" + id + '>svg');
	
	if (svgElement == null) { // Canvas case
		var canvas = document.querySelector ("#" + id);
		var width = canvas.width;
		var height = canvas.height
		var context = canvas.getContext ("2d");
		
		var imageData = context.getImageData (0, 0, width, height);
				
		canvas.toBlob (function (blob) {
			saveAs (blob, "generatrix.png");
		});
	}
	else { // SVG case
		// To modify to use canvas if handfree mode is in use
		saveSvgAsPng (svgElement, name);
	}
};


//==============================================================================
/**
 * Export the 3D canvas to PNG.
 * 
 * @param {SurfaceViewer} surfaceView - The SurfaceViewer of the current 
 * surface.
 * 
 * @return {void}
 * @throws {TODO}
 */
ModelExport.prototype.export3DPng = function (surfaceView) {
	if (!(surfaceView instanceof SurfaceViewer)) {
		throw "ModelExport.export3DPng.ErrorBadParameterType";
	}
	$('#download').attr('href', this.getImg3DData(this.idSurface, surfaceView));
	$('#download').attr ('download', 'Surface3D.png');
};


//==============================================================================
/**
 * Create 2D canvas from 3D canvas.
 * 
 * @param {String} id - The name of the div containing the svg to save
 * @param {SurfaceViewer} surfaceView - The surfaceView containing the objects
 * to render.
 * 
 * @return {String} the url to the canvas img.
 * @throws {TODO}
 */
ModelExport.prototype.getImg3DData = function (id, surfaceView) {
	if (!((arguments, "string", SurfaceViewer))) {
		throw "ModelExport.getImg3DData.ErrorBadParameterType";
	}

	var width = $("#" + id).width (), height = $("#" + id).height ();
	
	var pixels = [];
	pixels = surfaceView.getImgData (width, height);
		
	var canvas = document.createElement ('canvas');
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext ("2d");
	
	var imageData = context.createImageData (width, height);
	imageData.data.set (pixels);
	context.putImageData (imageData, 0, 0);
	
	return canvas.toDataURL ();
};


//==============================================================================
/**
 * Export the current surface to binary STL format
 * 
 * @param {SurfaceRenderer} renderer - The surface renderer.
 * 
 * @return {void}
 * @throws {TODO}
 */
ModelExport.prototype.exportSTL = function (renderer) {
	if (!(renderer instanceof SurfaceRenderer)) {
		throw "ModelExport.exportSTL.ErrorBadParameterType";
	}
	
	var isLittleEndian = true; // STL files assume little endian, see wikipedia page

	// Retrieving the coordinates
	var vertexBuffer = [];
	
	var indicesBuffer = [];
	var connexity = parseInt($("#connexityChoice").val());
	if(connexity == ConnexityEnum.C26){
		connexity = ConnexityEnum.C18;
	}
	renderer.prepareSTL(connexity, indicesBuffer, vertexBuffer);
	
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
	
	var buffer = new ArrayBuffer (headerOffset + sizeTriangles);

	// Creation of a view to write data in the buffer
	var dataview = new DataView (buffer);
	// Offset used when writing data into buffer
	var offset = 80; // For the STL header 
		
		
    dataview.setUint32 (offset, nbTriangles, isLittleEndian);
	offset += 4;
	
	for (var i = 0; i < indicesBuffer.length; i+=3) {
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4; // size of float in bytes
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;
		dataview.setFloat32(offset, 0.0, isLittleEndian);
		offset += 4;
		for (var p =  0; p < 3; p++) {
			for (var c = 0; c < 3; c++) {
				dataview.setFloat32(offset, vertexBuffer[
						indicesBuffer[i + p] * 3 + c
					], isLittleEndian);
				offset += 4;
			}
		}
		offset += 2; // ignore byte count attribute
	}
	
	var blob = new Blob ([dataview], {type: 'application/octet-binary'});
    
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs (blob, "surfaceSTL.stl");
};	


//==============================================================================
/**
 * Save the current generatrix.
 * 
 * @param {Controller2DMeridian} meridianController - The controller of 
 * the generatrix.
 * 
 * @return {void}
 * @throws {String} If the parameter is not a Controller2DMeridian.
 */
ModelExport.prototype.saveGeneratrix = function (meridianController) {
	if (!(meridianController instanceof Controller2DMeridian)) {
		throw "ModelExport.saveGeneratrix.ErrorBadParameterType";
	}
	
	var curve = meridianController.getActiveCurve ();
	if (curve instanceof ExplicitCurve) {
		this.saveExplicitCurve (meridianController);
	}
	else if (curve instanceof DrawnCurve) {
		this.saveDrawnCurve (meridianController);
	}
};


//==============================================================================
/**
 * Save an implicit curve to XML format.
 * 
 * @param {Controller2D} curveController - The controller of the curve to 
 * save.
 * 
 * @return {void}
 * @throws {String} If the parameter is not a Controller2D.
 */
ModelExport.prototype.saveImplicitCurve = function (curveController) {	
	if (!(curveController instanceof Controller2D)) {
		throw "ModelExport.saveImplicitCurve.ErrorBadParameterType";
	}
	
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + 
				/* DTD Definition */
				'<!DOCTYPE Curve  [\n' +
					'\t\t<!ELEMENT Curve (CurveType, Equation, Range)>\n' +
					'\t\t<!ELEMENT CurveType (Class)>\n' +
					'\t\t<!ELEMENT Class (#PCDATA)>\n' +
					'\t\t<!ELEMENT Equation (#PCDATA)>\n' +
					'\t\t<!ELEMENT Range (xMin, xMax, yMin, yMax)>\n' +
						'\t\t\t<!ELEMENT xMin (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT xMax (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT yMin (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT yMax (#PCDATA)>\n' +
				']>\n' +
				/* ====== */
			'<Curve>\n' +
				'\t<CurveType>\n' +
					'\t\t<Class>ImplicitCurve</Class>\n' +
				'\t</CurveType>\n' +
				'\t<Equation>'+  curveController.getEquationNoParameter()
					+ '</Equation>\n' +
				'\t<Range>\n'+
					'\t\t<xMin>' + curveController.getXRange().getMin()
						+ '</xMin>\n' +
					'\t\t<xMax>' + curveController.getXRange().getMax()
						+ '</xMax>\n' +
					'\t\t<yMin>' + curveController.getYRange().getMin()
						+ '</yMin>\n' +
					'\t\t<yMax>' + curveController.getYRange().getMax()
						+ '</yMax>\n' +
				'\t</Range>\n'+
				"";
	xml += '</Curve>';
	
	var blob = new Blob ([xml], {type: 'text/xml'});
    
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs (blob, "directrix.xml");
};


//==============================================================================
/**
 * Save an explicit curve to XML format.
 * 
 * @param {Controller2DMeridian} curveController - The controller of the curve
 * to save.
 * 
 * @return {void}
 * @throws {String} If the parameter is not a Controller2D.
 */
ModelExport.prototype.saveExplicitCurve = function (curveController) {
	if (!(curveController instanceof Controller2DMeridian)) {
		throw "ModelExport.saveExplicitCurve.ErrorBadParameterType";
	}
	
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + 
				/* DTD Definition */
				'<!DOCTYPE Curve  [\n' +
					'\t\t<!ELEMENT Curve (CurveType, Equation, Range)>\n' +
					'\t\t<!ELEMENT CurveType (Class)>\n' +
						'\t\t<!ELEMENT Class (#PCDATA)>\n' +
					'\t\t<!ELEMENT Equation (#PCDATA)>\n' +
					'\t\t<!ELEMENT Range (xMin, xMax, yMin, yMax)>\n' +
						'\t\t\t<!ELEMENT xMin (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT xMax (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT yMin (#PCDATA)>\n' +
						'\t\t\t<!ELEMENT yMax (#PCDATA)>\n' +
				']>\n' +
				/* ====== */
			'<Curve>\n' +
				'\t<CurveType>\n' +
					'\t\t<Class>ExplicitCurve</Class>\n' +
				'\t</CurveType>\n' +
				'\t<Equation>' + curveController.getEquationNoParameter()
					+ '</Equation>\n' +
				'\t<Range>\n' +
					'\t\t<xMin>' + curveController.getXRange().getMin()
						+ '</xMin>\n' +
					'\t\t<xMax>' + curveController.getXRange().getMax()
						+ '</xMax>\n' +
					'\t\t<yMin>' + curveController.getYRange().getMin()
						+ '</yMin>\n' +
					'\t\t<yMax>' + curveController.getYRange().getMax()
						+ '</yMax>\n' +
				'\t</Range>\n' +
				"";
				
	xml += '</Curve>';
	var blob = new Blob([xml], {type: 'text/xml'});
    
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs(blob, "generatrix.xml");
};


//==============================================================================
/**
 * Save a drawn curve to xml format.
 * 
 * @param {Controller2DMeridian} curveController - The controller of the curve
 * to save.
 * 
 * @return {void}
 */
ModelExport.prototype.saveDrawnCurve = function(curveController){
	if(!(curveController instanceof Controller2DMeridian)){
		throw "ModelExport.saveDrawnCurve.ErrorBadParameterType";
	}
	
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>\n' + 
				/* DTD Definition */
				'<!DOCTYPE Curve [\n' +
						'\t\t<!ELEMENT Curve (CurveType, xCoords, yCoords)>\n' +
						'\t\t<!ELEMENT CurveType (Class)>\n' +
						'\t\t<!ELEMENT Class (#PCDATA)>\n' +
						'\t\t<!ELEMENT xCoords (#PCDATA)>\n' +
						'\t\t<!ELEMENT yCoords (#PCDATA)>\n' +
				']>\n'+
				/* ====== */
				'<Curve>\n' +
					'\t<CurveType>\n' +
						'\t\t<Class>DrawnCurve</Class>\n' +
					'\t</CurveType>\n' +
					'\t<xCoords>';
				
	var list = curveController.getActiveCurve().getXList();
	for(var i = 0; i < list.length; i++){
		xml += list[i];
		if(i < list.length-1){
			xml += " ";
		}
	}
	
	xml += '</xCoords>\n' +
			'\t<yCoords>';
	
	list = curveController.getActiveCurve().getYList();
	for(var i = 0; i < list.length; i++){
		xml += list[i];
		if(i < list.length-1){
			xml += " ";
		}
	}
	
	xml += '</yCoords>\n' +
			'</Curve>';
			
	var blob = new Blob([xml], {type: 'text/xml'});
    
    // FileSaver.js defines `saveAs` for saving files out of the browser
    saveAs(blob, "generatrix.xml");
};



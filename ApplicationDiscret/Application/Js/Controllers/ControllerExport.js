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
 * constructor ()
 * pressKey (event : WindowEvent) : void
 * mouseDown (event : WindowEvent) : void
 * mouseUp (event : WindowEvent) : void
 * mouseMouv (event : WindowEvent) : void
 * scroll (event : WindowEvent) : void
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc TODO
 * This class is empty, just for genericity.
 */


ControllerCamera.prototype = new Controller ();
ControllerExport.prototype.constructor = ControllerExport;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * @param{String} idSurface - The id of the canvas containing the surface to export
 * @param{String} idMeridian - The id of the HTML element containing the meridian to export
 * @param{String} idRevolution - The id of the HTML element containing the curve of revolution to export
 */
function ControllerExport (idSurface, idMeridian, idRevolution) {
	this.model = new ModelExport(idSurface, idMeridian, idRevolution);
}


//==============================================================================
/**
 * Set the id of the new HTML element containing the meridian to export
 * @param {String} idMeridian - The id of the HTML element containing the meridian
 */
ControllerExport.prototype.setIdMeridian = function(idMeridian){
	this.model.idMeridian = idMeridian;
};


//==============================================================================
/**
 * Set the id of the new HTML element containing the curve of revolution to export
 * @param {String} idRevolution - The id of the HTML element containing the curve of revolution
 */
ControllerExport.prototype.setIdRevolution = function(idRevolution){
	this.model.idRevolution = idRevolution;
};


//##############################################################################
//	Event methods
//##############################################################################


//==============================================================================
/**
 * Call the model method to export the surface to x3d
 * @param {Surface} surface - The surface to export to x3d file
 */
ControllerExport.prototype.exportX3D = function(surface){
	this.model.exportX3D(surface);
};


//==============================================================================
/**
 * Call the model method to export the surface to PNG
 * @param {SurfaceViewer} surfaceView - The surfaceView containing the objects to render
 */
ControllerExport.prototype.export3DPng = function(surfaceView){
	this.model.export3DPng(surfaceView);
};


//==============================================================================
/**
 * Call the model method to export the meridian to PNG
 */
ControllerExport.prototype.exportMeridianPng = function(){
	this.model.exportMeridianPng();
};


//==============================================================================
/**
 * Call the model method to export the revolution ton PNG
 */
ControllerExport.prototype.exportRevolutionPng = function(){
	this.model.exportRevolutionPng();
};


//==============================================================================
/**
 *
 */
ControllerExport.prototype.exportSTL = function(renderer){
	this.model.exportSTL(renderer);
};


//==============================================================================
/**
 *
 */
ControllerExport.prototype.saveCurves = function(meridianController, revolutionController){
	this.model.saveCurves(meridianController, revolutionController);
};
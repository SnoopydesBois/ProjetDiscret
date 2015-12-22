/// LICENCE ////////////////////////////////////////////////////////////////////

/*
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
 * select (modelContr : ModelController,
 *         face : Facet,
 *         multiple : boolean) : void
 * cube (modelContr : ModelController) : void
 * face (modelContr : ModelController) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



ModelGen.prototype.constructor = ModelGen;

/**
 * @constructor Do nothing.
 * @param {Vector} dimension - The dimension of the 3D space
 */
function ModelGen (dimension) {
	this.repere = new Repere(dimension);
	this.surface = undefined;
}


//==============================================================================
/**
 * @param {Curve} meridian - The meridian to use to model.
 * @param {Curve} curveRevolution - The curve of revolution to use to model.
 */
ModelGen.protoype.generate = function(meridian, curveRevolution){
	//XXX ALGO DE GENERATION
	return this.surface;
}

//==============================================================================
/**
 * @param {Vector} position - The position of the voxel to select.
 * @return {void}
 */
ModelGen.prototype.selectVoxel = function (position) {
	//	console.log ("ModelGen.select");
	if (!(position instanceof Vector)){
		throw "position is not a Vector";
	} else if(this.surface === undefined){
		throw "the surface is not generated";
	}
	// --------------------------------------
	if (this.surface.isVoxel(position)){
		this.surface.select(position); // Select
	} else{
		this.surface.select(null); // Unselect
	}
};


//==============================================================================
/**
 * @param {Vector} position - The position of the voxel to select.
 * @return {boolean} true if the voxel is selected, else false 
 */
ModelGen.prototype.isSelectedVoxel = function (position) {
	if (!(position instanceof Vector)){
		throw "position is not a Vector";
	} else if(this.surface === undefined){
		throw "the surface is not generated";
	}
	// --------------------------------------
	return this.surface.getSelectedVoxel().getCoordinates().equals(position);
};


//==============================================================================
/**
 * @return {Vector} the dimensions of the 3D space
 */
ModelGen.prototype.getDimension = function(){
	return this.repere.getDimension();
}


//==============================================================================
/**
 * @return {Voxel} the voxel selected
 */
ModelGen.prototype.getSelectVoxel = function(){
	if(this.surface === undefined){
		throw "the surface is not generated";
	}
	
	return this.surface.getSelectedVoxel();
}
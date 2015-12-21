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



KernelSelect.prototype.constructor = KernelSelect;

/**
 * @constructor Do nothing.
 */
function KernelSelect () {
//	console.log ("KernelSelect.constructor");
}


//==============================================================================
/**
 * @param {ModelController} modelContr - The ModelController of the model 
 * to modify.
 * @param {Facet} face - the face/cube to select.
 * @param {boolean} multiple - true if multiple selection, false otherwise.
 * @return {void}
 */
KernelSelect.prototype.select = function (modelContr, face, multiple) {
//	console.log ("KernelSelect.select");
	// --------------------------------------
	if (multiple) {
		if (face != null) {
			if (modelContr.isSelectedFacet (face))
				modelContr.removeSelectedFacet (face);
			else
				modelContr.addSelectedFacet (face);
			modelContr.alert (new Signal (SignalEnum.SELECT_CHANGE));
		}
	}
	else {
		if (face != null)
			modelContr.setSelectedFacet(face);
		else
			modelContr.clearSelectFacet();
	} // end if multiple
};


//==============================================================================
/**
 * Switch from face selection to cube selection.
 * @param {ModelController} modelContr - the model.
 * @return {void}
 */
KernelSelect.prototype.cube = function (modelContr) {
//	console.log ("KernelHover.cube");
	// --------------------------------------
	var result = [];
	for (var i = 0; i < modelContr.getNbSelectedFacet(); ++i) {
		var tmp = modelContr.getSelectedFacet(i);
		result.push (modelContr.getSelectedFacet(i).getCube());
	}
	modelContr.clearSelectFacet();
	for (var i = 0; i < result.length; ++i) {
		modelContr.addSelectedFacet (new Facet (result[i], DirectionEnum.ALL));
	}
};


//==============================================================================
/**
 * Switch from cube selection to face selection.
 * @param {ModelController} modelContr - the model.
 * @return {void}
 */
KernelSelect.prototype.face = function (modelContr) {
//	console.log ("KernelHover.face");
	// --------------------------------------
	var result = [];
	for (var i = 0; i < modelContr.getNbSelectedFacet(); ++i) {
		var tmp = modelContr.getSelectedFacet(i);
		if (tmp.getDirection() == DirectionEnum.ALL) {
			var faceVisible = false;
			for (var j = 0; j < DirectionEnum.size; ++j) {
				if (modelContr.getCube(
						tmp.getCube().m[0], tmp.getCube().m[1],
						tmp.getCube().m[2]).hasFacet(j)) {
					result.push(new Facet(tmp.getCube(), j));
					faceVisible = true;
				}
			}
			if (!faceVisible)
				result.push (new Facet (tmp.getCube(), DirectionEnum.NONE));
		}
		else {
			result.push (tmp);
		}
	}
	modelContr.clearSelectFacet();
	for (var i = 0; i < result.length; ++i) {
		modelContr.addSelectedFacet (result[i]);
	}
};



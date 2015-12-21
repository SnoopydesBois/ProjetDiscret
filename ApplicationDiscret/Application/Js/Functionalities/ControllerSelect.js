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


/* kernel : KernelSelect
 * kernelExtrud : KernelExtrusion
 * modelIntern : ModelView3DExtrude
 * nbExtrud : int
 * face : boolean
 * 
 * constructor (frame : Frame,
 *              name : string,
 *              modelContrExtrusion : ModelView3DExtrude)
 * 
 * mouseDown (event : WindowEvent, face : Facet) : void
 * isFace () : boolean
 * setFace (bool : boolean) : void
 * pressKey (event : WindowEvent) : void
 */

/// CODE ///////////////////////////////////////////////////////////////////////



ControllerSelect.prototype = new Controller ();
ControllerSelect.prototype.constructor = ControllerSelect;

/**
 * @constructor
 * @param {Frame} frame - the frame associated with the controller.
 * @param {String} name - the name of the controller.
 * @param {ModelView3DExtrude} modelContrExtrusion - the model.
 */
function ControllerSelect (frame, name, modelContrExtrusion) {
//	console.log ("ControllerHover.constructor");
	// --------------------------------------
	Controller.call (this, frame, name);
	
	/**
	 * {KernelSelect} The main kernel.
	 */
	this.kernel = new KernelSelect();
	
	/**
	 * {KernelExtrusion} The extrusion kernel.
	 */
	this.kernelExtrud = new KernelExtrusion();
	
	/**
	 * {ModelView3DExtrude} The temporary model for the extrusion.
	 */
	this.modelIntern = modelContrExtrusion;
	
	/**
	 * {int} Size of extrusion.
	 */
	this.nbExtrud = 0;
	
	/**
	 * {boolean} Selection mode. True for face, false for cube.
	 */
	this.face = true;
};


//==============================================================================
/**
 * Action when a mouse button is pressed.
 * @param {WindowEvent} event - event captured by the window.
 * @param {Facet} face - face overflown by the mouse.
 * @return {void}
 */
ControllerSelect.prototype.mouseDown = function (event, face) {
//	console.log ("ControllerSelect.mouseDown");
	if (typeof event != "object") {
		console.error ("ERROR - ControllerSelect.mouseDown : bad type of "
				+ "parameter");
	}
	// --------------------------------------
	if (event.button == 0) {
		var model = this.frame.getCurentModel();
		if (this.actif && model != null) {
			if (this.face) {
				this.kernel.select (model, face, event.ctrlKey || event.metaKey);
			} 
			else {
				if (face == null) {
					this.kernel.select (model, null, event.ctrlKey ||
						event.metaKey);
				} 
				else {
					this.kernel.select(model, new Facet (face.getCube(),
							DirectionEnum.ALL), event.ctrlKey || event.metaKey);
				}
			}
			model.alert (new Signal (SignalEnum.SELECT_CHANGE));
		}
	}
};


//==============================================================================
/**
 * @return {boolean} true if the select mode is face, false if it is cube.
 */
ControllerSelect.prototype.isFace = function () {
//	console.log ("ControllerSelect.isFace");
	// --------------------------------------
	return this.face;
};


//==============================================================================
/**
 * Edit the model of selection (Face or Cube).
 * @param {boolean} bool : selection face is active.
 * @return {void}
 */
ControllerSelect.prototype.setFace = function (bool) {
//	console.log ("ControllerSelect.setFace");
	if (typeof bool != "boolean") {
		console.error ("ERROR - ControllerSelect.setFace : bad type of "
			+ "parameter");
	}
	// --------------------------------------
	this.face = bool;
	var model = this.frame.getCurentModel ();
	if (model != null) {
		if (this.face) {
			this.kernel.face (model);
		} 
		else {
			this.kernel.cube (model);
		}
	} // end if model is not null
};


//==============================================================================
/**
 * Button of the keyboard has been activated. Manage the extrusion.
 * @param {WindowEvent} event - event captured by the window.
 * @return {void}
 */
ControllerSelect.prototype.pressKey = function (event) {
//	console.log ("ControllerSelect.pressKey");
	if (typeof event != "object") {
		console.error ("ERROR - ControllerSelect.pressKey : bad type of" 
				+ " parameter");
	}
	// --------------------------------------
	var model = this.frame.getCurentModel();
	if (this.actif && model != null) {
		if (event.key == 'c') {
			this.nbExtrud++;
			this.kernelExtrud.PreExtrusion(model,
					this.modelIntern.getModelController(), this.nbExtrud);
			this.modelIntern.positive = this.nbExtrud > 0;
			model.alert (new Signal (SignalEnum.MODEL_EXTRUSION));
		} 
		else if (event.key == 'x') {
			this.nbExtrud--;
			this.kernelExtrud.PreExtrusion(model,
					this.modelIntern.getModelController(), this.nbExtrud);
			this.modelIntern.positive = this.nbExtrud > 0;
			model.alert (new Signal (SignalEnum.MODEL_EXTRUSION));
		} 
		else if (event.key == 'w' || event.key == 'Enter') {
			this.nbExtrud = 0;
			
			var sign = new Signal (SignalEnum.ADD_REMOVE_CUBES);
			var size = this.modelIntern.getModelController().getSize();
			for (var x = 0; x < size.m[0]; ++x) {
				for (var y = 0; y < size.m[1]; ++y) {
					for (var z = 0; z < size.m[2]; ++z) {
						if (this.modelIntern.getModelController().getCube(
							x, y, z) != null) {
							sign.addCubes(new Facet (new Vector(x,y,z),
									DirectionEnum.NONE));
						}
					}
				}
			}
			this.kernelExtrud.Extrusion(model,
					this.modelIntern.getModelController());
			model.alert (sign);
		}
	} // end if active and model is not null
};



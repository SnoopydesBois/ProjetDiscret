// TODO refactoring

/// LICENCE ////////////////////////////////////////////////////////////////////

/*
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
 * termes
 */

/// INDEX //////////////////////////////////////////////////////////////////////

/* 
 *	container : HTMLElement
 * funcs : Array
 * models : Array
 * modelSize : Vector
 * htmlSrc : String
 * oldSelect : Array
 * oldHover : Array
 *
 * Display2D ()
 * gridsInit () : void
 * setListModel (models : Array) : void
 * gridCanvasInit () : void
 * drawGrid (w : float) : void
 * drawGridLines (cnv : canvas, lineOptions : lineOptions) : void
 * fillGrids () : void
 * addBlock (x : int, y : int, z : int) : void
 * getState (i : int, x : int, y : int, z : int) : CubeStateEnum
 * fillBlockColor (row : int, block : int, ctx : glContext2D, color : float[3]) : void
 * rgbToHex (r : int, g : int, b : int) : String
 * screenToBlock (x : int, y : int) : block
 * prepare (idIDisplay : int) : void
 * update (x : int, y : int, z : int) : void
 * updateSelect () : void
 * updateHover () : void
 * onResize () : void
 * getGlobalCoord (axis : int, g : int, row : int, col : int) : int[]
 * onMouseClick (event : MouseEvent) : void
 * onMouseReleased (event : MouseEvent) : void
 * onMouseMove (event : MouseEvent) : void
 * mouseAction (event : MouseEvent) : void
 * minimize (event : clickEvent) : void
 * select2D (event : clickEvent) : void
 * addFunc (func : Function) : void
 * removeFunc (funcId : String) : void
 * setFullScreen (bool : bool) : void
 * getCurentModel () : ??
 * getScrollBarWidth () : int
 */

/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Handle the 2D display of a model
 */


	  ///////////////////
	 /// Constructor ///
	///////////////////


Display2D.prototype = new Display ();
Display2D.prototype.constructor = Display2D;

/** 
 * @constructor
 */
function Display2D (application) {
	Display.call (this, application);
	
	this.htmlSrc = "Display/iDisplay2D.html";
	
	/**
	 * {HTMLElement} Path to access documents of the iDisplay.
	 */
	this.container;
	
	/**
	 * {ModelController[]} List of the models displayed.
	 */
	this.models = [];
	
	/**
	 * {Vector} Max size of a model in every direction.
	 */
	this.modelSize = new Vector(25, 25, 25);
	
	
		/// Functionnalities
	
	/**
	 * {Controller[]} List of functionnalities of Display2D.
	 */
	this.funcs = [];
	//name need to be different
	this.addFunc(new ControllerHover2D(this, "ControllerHover2D",this.appli));
	this.addFunc(new ControllerSelect2D(this, "ControllerSelect2D",this.appli));
	this.addFunc(new ControllerAdd2D(this, "ControllerAdd2D",this.appli));
	this.addFunc(new ControllerRemove2D(this, "ControllerRemove2D",this.appli));
	for (var i = 0; i < this.funcs.length; i++) {
		this.appli.addFunctionality(this.funcs[i]);	
	}
	
	/**
	 * {int[]} coordinates of the selected facets, used to optimize the drawing.
	 */
	this.oldSelect = new Array();
	
	/**
	 * {int[]} coordinates of the hovered facets, use to optimize the drawing.
	 */
	this.oldHover = new Array();
};


	  //////////////////
	 /// Initiation ///
	//////////////////


/**
 * To call to init the grids.
 * @return {void}
 */	
Display2D.prototype.gridsInit = function () {
	this.gridCanvasInit();
	this.onResize();
};


//==============================================================================
/**
 * Set the list of model the Display2D contains
 * @param {ModelController[]} models
 * @return {void}
 */	
Display2D.prototype.setListModel = function (models) {
	this.models = models;
};


//==============================================================================
/**
 * Init the canvas into the html file
 * @return {void}
 */	
Display2D.prototype.gridCanvasInit = function () {
	for (var axis = 0; axis < this.numberOfAxis; axis++) {
		for (var g = 0; g < this.numberOfGrids; g++) { 
			var content= document.createElement("div");
			content= document.createElement("div");
			//id = gridContent 1 Axis 0
			content.setAttribute("id","gridContent"+g+"Axis"+axis);
			content.setAttribute("class","gridContent");
			if (axis === 0) {
				//code
				this.container.getElementById('gridX').appendChild(content);
			}
			else if (axis === 1) {	
				//code
				this.container.getElementById('gridY').appendChild(content);
			} 
			else if (axis === 2) {
				//code
				this.container.getElementById('gridZ').appendChild(content);
			}

			var headerContent = document.createElement("div");
			div = document.createElement("div");
			div.setAttribute("id","title"+g+"Axis"+axis);
			div.setAttribute("class","gridTitle");

			var stringAxis = "";
			if (axis == 0) {
				stringAxis = "YZ"
			}
			else if (axis == 1) {
				stringAxis = "XZ"
			}
			else {
				stringAxis = "XY"
			}

			$('<h1 grid="'+g+'" axis="'+axis+'">'+stringAxis+"  "
					+(g+1)+'</div>').prependTo(div);	
			headerContent.appendChild(div);

			div = document.createElement("div");
			div.setAttribute("id","s"+g+"Axis"+axis);
			div.setAttribute("class","selectionSlice");
			div.setAttribute("axis",axis);
			div.setAttribute("grid",g);
			div.addEventListener("mousedown",this.selectSlice.bind(this));
			headerContent.appendChild(div);
			
			div = document.createElement("div");
			div.setAttribute("id","m"+g+"Axis"+axis);
			div.setAttribute("class","minimizing");
			div.setAttribute("axis",axis);
			div.setAttribute("grid",g);
			//Axis 0 g 1
			div.addEventListener("mousedown",this.minimize.bind(this));
			headerContent.appendChild(div);

			this.container.getElementById('gridContent'+g
					+"Axis"+axis).appendChild(headerContent);


			var canvas= document.createElement("canvas");
			canvas.setAttribute("id","Axis"+axis+"g"+g); //Axis0 g1
			canvas.setAttribute("axis",axis);
			canvas.setAttribute("grid",g);
			canvas.setAttribute("class","grid");

			canvas.addEventListener('mousedown', 
					this.onMouseClick.bind(this), false);
			canvas.addEventListener('mouseup', 
					this.onMouseReleased.bind(this), false);
			canvas.addEventListener('mousemove', 
					this.onMouseMove.bind(this), false);
					
			var Display = this;
			this.DisplayDocument.onkeypress = function (event) {
				Display.onKeyPressed(event);
			}
			
			this.container.getElementById('gridContent'+g
					+"Axis"+axis).appendChild(canvas);

		}
	}

};


	  //////////////////////
	 /// Draw the grids ///
	//////////////////////


/**
 * Draw the grids, if width given it will take it,
 * else it will be the default width
 * @param {float} w - width of the grids 
 * @return {void}
 */	
Display2D.prototype.drawGrid = function (w) {

	this.totalH = this.totalW;
	this.caseWidth = this.totalW/this.numberOfBLocks;
	for (var axis=0; axis<this.numberOfAxis; axis++) {
		for (var g=0; g<this.numberOfGrids; g++) {
			var c =  this.container.getElementById("Axis"+axis+"g"+g);
			c.width  = this.totalW;
			c.height = this.totalH;
			var gridOptions = {
				minorLines: {
					separation: this.caseWidth,
					color: '#d3d3d3',
					width:2
				},
				majorLines: {
					separation: this.caseWidth * 5,
					color: '#666666',
					width:2
				}
			};
			var ctx = c.getContext('2d');
			ctx.clearRect(0, 0, this.totalW, this.totalH);
			this.drawGridLines(c, gridOptions.minorLines);
			this.drawGridLines(c, gridOptions.majorLines);
		}
	}	
	
};


//==============================================================================
/**
 * draw the lines on the grid depending on the lineOptions
 * @param {lineOptions} lineOptions 
 * @param {canvas} cnv
 * @return {void}
 */	
Display2D.prototype.drawGridLines = function (cnv, lineOptions) {


	var iWidth = cnv.width;
	var iHeight = cnv.height;
	
	var ctx = cnv.getContext('2d');

	ctx.strokeStyle = lineOptions.color;
	ctx.strokeWidth = lineOptions.width;

	ctx.beginPath();
	
	var iCount = null;
	var i = null;
	var x = null;
	var y = null;
	
	iCount = Math.floor(iWidth / lineOptions.separation);
	
	for (i = 0; i <= iCount; i++) {
		x = (i * lineOptions.separation);
		ctx.moveTo(x, 0);
		ctx.lineTo(x, iHeight);
		ctx.stroke();
	}
	
	
	iCount = Math.floor(iHeight / lineOptions.separation);
	
	for (i = 0; i <= iCount; i++) {
		y = (i * lineOptions.separation);
		ctx.moveTo(0, y);
		ctx.lineTo(iWidth, y);
		ctx.stroke();
	}
	
	ctx.closePath();
	
	return;
};


	  /////////////////////
	 /// Fill the grid ///
	/////////////////////


/**
 * Fill the grids
 * @return {void}
 */
Display2D.prototype.fillGrids = function () {
	for (var i = 0; i < this.modelSize.m[0]; i++) {
		for (var j = 0; j < this.modelSize.m[1]; j++) {
			for (var k = 0; k < this.modelSize.m[2]; k++) {
				this.addBlock (i, j, k);
			}
		}
	}
};


	  /////////////////////
	 /// Color a Block ///
	/////////////////////


/**
 * Add a coloured block depending on the cubes (Cubes of all the model 
 * in the list) status at the x, y, z coordinate.
 * @param {int} x
 * @param {int} y
 * @param {int} z
 * @return {void}
 */
Display2D.prototype.addBlock = function (x, y, z) {
	var state = CubeStateEnum.NULL;
	for (var l = 0; l < this.models.length; l++) {
		if (this.getState(l,x,y,z) > state) { // priority
			state = this.getState(l,x,y,z);
		}
		if (this.getState(l, x, y, z) == CubeStateEnum.SELECTED) {
			this.oldSelect.push([x, y, z]);
		}
		else if (this.getState(l, x, y, z) == CubeStateEnum.HOVER) {
			this.oldHover.push([x, y, z]);
		}
	}
	//console.log (x+" "+y+" "+" "+z);
	if (this.numVisibleTab==0) {
		var d=this.container.getElementById("Axis"+0+"g"+x);//gridNb,caseNb,rowNb
		var ctx = d.getContext("2d");
		this.fillBlockColor(y, 24-z,ctx,appli.cubeColors[state]);
	}
	else if (this.numVisibleTab==1) {
		d=this.container.getElementById("Axis"+1+"g"+y);//gridNb,caseNb,rowNb
		ctx = d.getContext("2d");
		this.fillBlockColor(x, 24-z,ctx,appli.cubeColors[state]);
	}
	else if (this.numVisibleTab==2) {
		d=this.container.getElementById("Axis"+2+"g"+z);//gridNb,caseNb,rowNbrowNb
		ctx = d.getContext("2d");
		this.fillBlockColor(x, 24-y,ctx,appli.cubeColors[state]);
	}
};


//==============================================================================
/**
 * @param {int} i - index in the model list.
 * @param {int} x - x coordinate of the cube.
 * @param {int} y - y coordinate of the cube.
 * @param {int} z - z coordinate of the cube.
 * @return {CubeStateEnum}
 */
Display2D.prototype.getState = function (i, x, y, z) {
	var model = this.models[i];
	if (model.getModel().getCube(x, y, z) != null) {
		if (model.isSelectedFacet(
				new Facet(new Vector(x, y, z), DirectionEnum.ALL))) {
			return CubeStateEnum.SELECTED;
		}
		else if (model.getHoverFacet() != null
			&& model.getHoverFacet().getCube().m[0] == x
			&& model.getHoverFacet().getCube().m[1] == y
			&& model.getHoverFacet().getCube().m[2] == z
			) {
			return CubeStateEnum.HOVER;
		}
		else {
			return CubeStateEnum.NOTNULL;
		}
	}
	else {
		return CubeStateEnum.NULL;
	}
};


//==============================================================================
/**
 * fill a block with a given color
 * @param {int} row
 * @param {int} block
 * @param {CanvasRenderingContext2D} ctx
 * @return {float[]} color given by the enum
 */
Display2D.prototype.fillBlockColor = function (row, block, ctx, color) {
	ctx.beginPath();
	ctx.rect((row * this.caseWidth) + 1, (block * this.caseWidth) + 1,
		this.caseWidth - 2, this.caseWidth - 2);
	ctx.fillStyle = this.rgbToHex (color[0] * 255, color[1] * 255,
		color[2] * 255);
	ctx.fill();
	ctx.closePath();
};


//==============================================================================
/**
 * Convert the color of the current enum into hexColor
 * @param {float} r - red color of the color to convert.
 * @param {float} g - green color of the color to convert.
 * @param {float} b - blue color of the color to convert.
 * @return {String} hex color
 */
Display2D.prototype.rgbToHex = function (r, g, b) {
	var hexColor = ((1 << 24) + (r << 16) + 
		(g << 8) + b).toString(16).substr(1);
	return "#" + hexColor[0] + hexColor[1] + hexColor[2] + hexColor[3] 
		+ hexColor[4] + hexColor[5];
};


	  //////////////////////
	 /// Other function ///
	//////////////////////


/**
 * Return the x,y coordinates into a row col coordinates.
 * @param {int} x - x coordinate.
 * @param {int} y - y coordinate.
 * @return {block}
 */
Display2D.prototype.screenToBlock = function (x, y) {
	var block =  {
		"row" : Math.floor (x / (this.caseWidth)),
		"col" : Math.floor (y / (this.caseWidth))
	};
	return block;
};


//==============================================================================
/**
 * Prepare for drawing.
 * @param {int} idIDisplay - id of the workspace where the Display is.
 * @return {void}
 */
Display2D.prototype.prepare = function (idIDisplay, doc) {
	/// verify parameters
	if (!idIDisplay)
		throw "Display2D.prepare : invalid iDisplay id (" + idIDisplay + ")";
	
	/// handle id conteneur
	this.idIDisplay = idIDisplay;
	this.DisplayDocument = doc;
	
	/// get canvas
	this.container = document.getElementById (
		this.idIDisplay).contentWindow.document;
	this.isDown = false;
	this.numberOfGrids = 25;
	this.numberOfAxis = 3;
	this.numberOfBLocks = 25;
	this.scrollWidth = this.getScrollBarWidth();
	this.iBody = $("#" + this.idIDisplay).contents().find("body");
	this.fullScreen = false;
	this.idVisibleTab = "gridX";
	this.numVisibleTab = 0;
	this.gridsInit ();
	this.displayTab (AxisEnum.Z);
	this.updateShortcut(AxisEnum.Z);
}


//==============================================================================
/**
 * Update the IDisplay. If given x, y and z, it will update only one block.
 * @param {int} [x] - the X coordinate.
 * @param {int} [y] - the Y coordinate.
 * @param {int} [z] - the Z coordinate.
 * @return {void}
 */
Display2D.prototype.update = function (x, y, z) {
	if (x == undefined) {
		this.drawGrid();
		this.fillGrids();
	}
	else {
		this.addBlock (x, y, z);
	}
};


//==============================================================================
/**
 * Update the 2D slices to set the selected cube(s) in the selection color.
 * @return {void}
 */
Display2D.prototype.updateSelect = function () {
	//console.log ("Display2D.updateSelect");
	var nbSelect = this.oldSelect.length;
	for (var i = 0; i < nbSelect; ++i) {
		this.addBlock (this.oldSelect[i][0], this.oldSelect[i][1],
			this.oldSelect[i][2]);
	}
	this.oldSelect = new Array();
	for (var i = 0; i < this.models.length; ++i) {
		var model = this.models[i];
		for (var j = 0; j < model.getNbSelectedFacet(); ++j) {
			var tmp = model.getSelectedFacet(j).getCube();
			this.addBlock (tmp.m[0], tmp.m[1], tmp.m[2]);
		}
	}
};


//==============================================================================
/**
 * Update the 2D slices to set the hovered cube in the hover color.
 * @return {void}
 */
Display2D.prototype.updateHover = function () {
	//console.log ("Display2D.updateHover");
	var nbHover = this.oldHover.length;
	for (var i = 0; i<nbHover; ++i) {
		this.addBlock (this.oldHover[i][0], this.oldHover[i][1],
				this.oldHover[i][2]);
	}
	this.oldHover = new Array();
	for (var i = 0; i < this.models.length; ++i) {
		var tmp = this.models[i].getHoverFacet();
		if (tmp != null) {
			this.addBlock (tmp.getCube().m[0], tmp.getCube().m[1],
					tmp.getCube().m[2]);
		}
	}
};


//==============================================================================
/**
 * To call when the size of the IDisplay is changed to update the grid sizes.
 * @return {void}
 */
Display2D.prototype.onResize = function () {
	if (!this.fullScreen) { // if we are in fullwindow or not
		this.totalW = this.iBody.find("#slicesTab").width() - this.scrollWidth 
			- 8;
		this.iBody.find(".gridContent").css({"width" : "calc(100% - 8px)"});
	} 
	else {
		this.totalW = (this.iBody.find("#slicesTab").width() 
				- this.scrollWidth)/ 5 - 9; 
				// 1px de jeux de base + 4 px de margin
		this.iBody.find(".gridContent").css({"width" : this.totalW + "px"});
	}

	this.update();
};


//==============================================================================
/**
 * Return the global coordinates x,y,z depending on the axis grid row and col.
 * @param {int} axis - axis of the slice.
 * @param {int} g - grid.
 * @param {int} row - row.
 * @param {int} col - col.
 * @return {int[]} Array of int corresponding the x, y, z coordinates.
 */
Display2D.prototype.getGlobalCoord = function  (axis,g,row,col) {
	var x_global;
	var y_global;
	var z_global;
	if (axis == 0) {
		x_global = g;
		y_global = row;
		z_global = 24-col;
	} 
	else if (axis == 1) {
		x_global = row;
		y_global = g;
		z_global = 24-col;
	} 
	else if (axis == 2) {
		x_global = row;
		y_global = 24-col;
		z_global = g;
	}		
	return [x_global,y_global,z_global];
};


//==============================================================================
/**
 * Turn isDown to true to start the MouseMouv event.
 * @param {MouseEvent} event - the mouseClickEvent.
 * @return {void}
 */
Display2D.prototype.onMouseClick = function (event) {
	var coord_global = this.mouseAction (event);
	for (var i =0;i < this.funcs.length; i++) {
		this.funcs[i].mouseDown (event, new Facet (
			new Vector(
				coord_global[0],
				coord_global[1],
				coord_global[2]),
			DirectionEnum.ALL));
	}
};


//==============================================================================
/**
 * Will call the mouseAction function with the good event in parameter.
 * It will simulate a simple click
 * turn isDown to false to stop the MouseMouv event to be effective.
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
Display2D.prototype.onMouseReleased = function (event) {
	var coord_global = this.mouseAction(event);
	for (var i =0;i < this.funcs.length; i++) {
		this.funcs[i].mouseUp(event,new Facet(new Vector(coord_global[0],
				coord_global[1],coord_global[2]), DirectionEnum.ALL));
	}
};


//==============================================================================
/**
 * Call when a keyboard key is pressed.
 * @param {WindowEvent} event - the key event.
 * @return {void}
 */
Display2D.prototype.onKeyPressed = function (event) {
	//console.log ("Display2D : pressKey");
	for (var i = 0; i < this.funcs.length; i++) {
		this.funcs[i].pressKey(event,null);
	}
	this.appli.shortcut(event);
};


//==============================================================================
/**
 * Will call the mouseAction function with the good event in parameter.
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
Display2D.prototype.onMouseMove = function (event) {
	var coord_global = this.mouseAction(event);
	for (var i = 0; i < this.funcs.length; i++) {
		this.funcs[i].mouseMouv(event,new Facet(new Vector(coord_global[0],
				coord_global[1],coord_global[2]), DirectionEnum.ALL));
	}
};


//==============================================================================
/**
 * Action that will be called by the MouseDown/MouseMove EventListener
 * will calculate the global x, y, z and redirect it to active function.
 * @param {MouseEvent} event - the mouse event.
 * @return {void}
 */
Display2D.prototype.mouseAction = function (event) {
//	console.log ("Display2D.mouseAction");
	// here you have the control over any element (#myContent)
	var canoffset = this.iBody.find("#Axis"+event.target.getAttribute("axis")
			+"g"+event.target.getAttribute("grid")).offset();
	
	var canvas = event.target;
	var ctx = canvas.getContext("2d");
	
	var x =(event.pageX  - Math.floor(canoffset.left));
	var y = (event.pageY+ document.body.scrollTop + 
			document.documentElement.scrollTop) - Math.floor(canoffset.top);
	var clickedBlock = this.screenToBlock(x, y);
	
	return  this.getGlobalCoord(parseInt(event.target.getAttribute("axis"))
			, parseInt(event.target.getAttribute("grid"))
			, clickedBlock.row,clickedBlock.col);
};


//==============================================================================
/**
 * Minimize or display the corresponding canvas.
 * @param {clickEvent} event - the click event.
 * @return {void}
 */
Display2D.prototype.minimize = function (event) {
//	console.log ("Display2D.minimize");
	d = this.container.getElementById("Axis" + event.target.getAttribute("axis")
			+ "g" + event.target.getAttribute("grid"));
	if (d.style.display == "none") {
		d.style.display = "block";
	} 
	else {
		d.style.display = "none";
	}
};


//==============================================================================
/**
 * Minimize or not the corresponding canvas.
 * @param {clickEvent} event - the click event.
 * @return {void}
 */
Display2D.prototype.selectSlice = function (event) {
//	console.log ("Display2D.selectSlice");
	var stringAxis = event.target.getAttribute("axis");
	var stringGrid = event.target.getAttribute("grid");
	var enumAxis;
	switch (stringAxis) {
		case '0' :
			enumAxis = AxisEnum.X;
			break;
		case '1' :
			enumAxis = AxisEnum.Y;
			break;
		default :
			enumAxis = AxisEnum.Z;
			break;
	}
	
	for (var i = 0; i < this.funcs.length; ++i) {
		if (this.funcs[i] instanceof ControllerSelect2D) {
			this.funcs[i].selectSlice(enumAxis, parseInt (stringGrid), event);
			break;
		}
	}
};


	  ////////////////////////
	 /// Getter && setter ///
	////////////////////////


/**
 * Add a functionality.
 * @param {Function} func - a fonctionality.
 * @return {void}
 */	
Display2D.prototype.addFunc = function (func) {
//	console.log ("Display2D.addFunc");
	if (func != undefined) {
		this.funcs.push (func);
	}
};


//==============================================================================
/**
 * Remove a function.
 * @param {String} funcId - name of the function to remove
 * @return {void}
 */	
Display2D.prototype.removeFunc = function (funcId) {
//	console.log ("Display2D.removeFunc");
	
	for (var i = 0;i < this.funcs.length; i++) {
		if (this.funcs[i].getName() == funcId) {
			this.funcs.splice (i, 1);
		}
	}
};


//==============================================================================
/**
 * Set the 2D view to fullScreen depending on the parameter.
 * @param {boolean} bool - indicate if the 2D view is in full screen.
 * @return {void}
 */
Display2D.prototype.setFullScreen = function (bool) {
//	console.log ("Display2D.setFullScreen");
	this.fullScreen = bool;
};


//==============================================================================
/**
 * @return {ModelController} the current model used, null otherwise.
 */
Display2D.prototype.getCurentModel = function () {
//	console.log ("Display2D.getCurentModel");
	if (this.models.length != 1)
		return null;
	else {
		return this.models[0];
	}
};


//==============================================================================
/**
 * Give the width of the scroll bar
 * @return {int} the width of the scroll bar
 */
Display2D.prototype.getScrollBarWidth = function () {
//	console.log ("Display2D.getScrollBarWidth");
	var $outer = $('<div>').css({visibility: 'hidden', 
			width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({
					width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};


//==============================================================================
/**
 * @return {Function[]} the list of all functionalities.
 */
Display2D.prototype.getFunctionalities = function () {
//	console.log ("Display2D.getFunctionalities");
	return this.funcs;
};


//==============================================================================
/**
 * Handle the tabs display in the slices. 
 * Mandatory to set the persistancy of the selected tab on focus lost.
 * @param {AxisEnum} axis - the ID of the tab to display 
 * @see idVisibleTab
 */
Display2D.prototype.displayTab = function (axis) {
//	console.log ("Display2D.displayTab");
	if (axis == AxisEnum.X) {
		var idgrid = "gridX";
		this.numVisibleTab = 0;
	}
	else if (axis == AxisEnum.Y) {
		var idgrid = "gridY";
		this.numVisibleTab = 1;
	}
	else if (axis == AxisEnum.Z) {
		var idgrid = "gridZ";
		this.numVisibleTab = 2;
	}
	
	// We remove the selected tab if there is one
	if (this.idVisibleTab !== undefined) {
		this.container.getElementById (this.idVisibleTab).style = 
				"display : none";
		
	}
	// Display the new selected tab
	this.idVisibleTab = idgrid;
	this.container.getElementById (this.idVisibleTab).style = "display : block";
	this.updateShortcut(axis);
	this.update();
};


//==============================================================================
/**
 * Update a shortcut
 * @param {int} id - id of the shortcut to update
 */
Display2D.prototype.updateShortcut = function  (axis) {
//	console.log ("Display2D.updateShortcut");
	var links = this.iBody.find('#shortcut > li');
	if (axis == AxisEnum.X) {
		var idgrid = 0;
	}
	else if (axis == AxisEnum.Y) {
		var idgrid = 1;
	}
	else if (axis == AxisEnum.Z) {
		var idgrid = 2;
	}
	var tmpaxis;
	tmpaxis = idgrid;

	for (var i = 0; i < 25; ++i) {
		// 'm' + nGrid + 'Axis' + nAxis
		links[i].firstElementChild.href = '#m' + i + 'Axis' + tmpaxis; 
	}
};



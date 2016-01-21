/**
 * @license TODO
 */


/**
 * @extends GenericViewer
 * @classdesc TODO
 */



CurveViewer.prototype.constructor = CurveViewer;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * 
 * @param {HTMLCanvasElement} canvas - The associated canvas.
 */
function CurveViewer (canvas) {
	GenericViewer.call (this, canvas, "2d");
	
	/**
	 * {Scene} The scene to display the surface.
	 */
	this.container = new Layer ();
	this.container.addObject (new Grid ());
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################







//##############################################################################
//	Draw
//##############################################################################



/**
 * Prepare all objects in the contener.
 * 
 * @return {void}
 */
CurveViewer.prototype.prepare = function () {
	
};


//==============================================================================
/**
 * Show all objects in the contener (prepare it and draw it).
 * 
 * @return {void}
 */
CurveViewer.prototype.show = function () {
	this.container.show (this.glContext);
};


//==============================================================================
/**
 * @override
 * Draw all objects in the contener.
 * 
 * @param {boolean} [backBuffer] - Indicate if we have to draw the scene 
 * normally or if we need to draw for picking.
 * 
 * @return {void}
 */
CurveViewer.prototype.draw = function (backBuffer) {
	this.container.draw (this.glContext);
};

/*
Frame2D.prototype.gridCanvasInit = function () {
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
					
			var frame = this;
			this.frameDocument.onkeypress = function (event) {
				frame.onKeyPressed(event);
			}
			
			this.container.getElementById('gridContent'+g
					+"Axis"+axis).appendChild(canvas);

		}
	}

};*/

//##############################################################################
//	Event methods
//##############################################################################



/**
 * @override
 * 
 * @param {WindowEvent} event - The window event.
 * 
 * @return {void}
 */
CurveViewer.prototype.onResize = function (event) {
	this.draw ();
};


//==============================================================================



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


/* m : Array
 *
 * Matrix ()
 * get (i : int, j : int) : Element
 * set (i : int, j : int, v : Element) : void
 * degToRad (arad : float) : float
 * getGLVector () : Array
 * toString () : String
 * createLookAt (eye : Vector, center : Vector, up : Vector) : Matrix
 * toNormal () : Matrix
 * Apply (v : Vector) : Vector
 * toConsole () : void
 * equals (that : Matrix) : bool
 * defaultConstructor () : void
 * copyConstructor (that : Matrix) : void
 * add (that : Matrix) : Matrix
 * mul (that : Matrix) : Matrix
 * transpose () : Matrix
 * invert () : Matrix
 * translate (that : Matrix) : Matrix
 * scale (that : Matrix) : Matrix
 * rotateX (angleRad : float) : Matrix
 * rotateY (angleRad : float) : Matrix
 * rotateZ (angleRad : float) : Matrix
 * createOrthographic (left : float, right : float, bottom : float,
 * 		top : float, near : float, far : float) : Matrix
 * shearing (which : int, from : int, value : int) : Matrix
 */


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc Coefficients are stored by COLUMN, so access is made using 
 * ROW + COLUMN * 4 ...
 */
Matrix.prototype = new Object;
Matrix.prototype.constructor = Matrix;



//##############################################################################
//	Type
//##############################################################################



/**
 * The type of array (for best performances, if possible).
 */
var MAT_ARRAY_TYPE = (typeof Float32Array == 'undefined') ? 
	Array : Float32Array;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 * Depending on the number of argument to the constructor, call for 
 * different matrix construction.
 * 	0 : Default constructor : 4x4 matrix.
 * 	1 : Copy constructor : copy of the matrix in argument.
 * 	3 : Creation of a lookAt Matrix for a camera.
 *  4 : Creation of a Perspective Matrix.
 * 	6 : Creation of an Orthogonal Matrix.
 * 	defaut : Error.
 * 
 * @return {Matrix} the new Matrix.
 */
function Matrix () {
	switch (arguments.length) {
	case 0: 
		return this.defaultConstructor ();
	case 1: 
		return this.copyConstructor (arguments[0]);
	case 3:
		return this.createLookAt (arguments[0], arguments[1], arguments[2]);
	case 4:
		return this.createPerspective (
			arguments[0], arguments[1], 
			arguments[2], arguments[3]
		);
	case 6: 
		return this.createOrthographic (
			arguments[0], arguments[1],
			arguments[2], arguments[3],
			arguments[4], arguments[5]
		);
	default:
		throw "Bad Matrix constructor call";
	};
	return this;
};



//==============================================================================
/**
 * Identity constructor.
 * 
 * @return {void}
 */
Matrix.prototype.defaultConstructor = function () {
	this.m = new MAT_ARRAY_TYPE (16);
	for (var i = 0; i < 4; ++i)
		for (var j = 0; j < 4; ++j)
			this.set (i, j, i == j ? 1 : 0);
};


//==============================================================================
/**
 * Copy constructor.
 * 
 * @param {Matrix} that - The matrix to copy.
 * 
 * @return {void}
 */
Matrix.prototype.copyConstructor = function (that) {
	if (that instanceof Matrix) {
		this.m = new MAT_ARRAY_TYPE (16);
		for (var i = 0; i < 16; ++i)
			this.m[i] = that.m[i];
	}
	else
		throw "Matrix: bad copy constructor call";
};


//==============================================================================
/**
 * Create a lookAt Matrix.
 * 
 * @param {Vector} eye - The eye position.
 * @param {Vector} center - The position where the camera look at.
 * @param {Vector} up - The up vector.
 * 
 * @return {Matrix} The lookAt Matrix.
 */
Matrix.prototype.createLookAt = function (eye, center, up) {
	if (! checkType (arguments, Vector, Vector, Vector))
		throw "Matrix.createLookAt: bad parameter" ;
	
	var dst = new Vector (center).sub (eye).normalize (); // Z
	var right = dst.cross (up).normalize (); // X
	var upCrossed = right.cross (dst).normalize (); // Y

	this.m = new MAT_ARRAY_TYPE (16);
	// First line
	this.m[0] =   right.x;
	this.m[1] =   upCrossed.x;
	this.m[2] = - dst.x;
	this.m[3] =   0.0; 
	// Second line
	this.m[4] =   right.y;
	this.m[5] =   upCrossed.y; 
	this.m[6] = - dst.y; 
	this.m[7] =   0.0;
	// Third line
	this.m[8]  =   right.z;
	this.m[9]  =   upCrossed.z;
	this.m[10] = - dst.z;
	this.m[11] =   0.0;
	// Last line
	this.m[12] = - right.dot (eye);
	this.m[13] = - upCrossed.dot (eye);
	this.m[14] =   dst.dot (eye);
	this.m[15] =   1.0; 
	
	return this;
};


//==============================================================================
/**
 * Create an perspective view matrix.
 * @see https://developer.mozilla.org/fr/docs/Web/API/WebGL_API/WebGL_model_view_projection
 * 
 * @param {float} fov - Field of view in radian.
 * @param {float} ratio - The aspect ratio of the scene (width divided by
 * height).
 * @param {float} near - Nearest point of the camera.
 * @param {float} far - Farest point of the camera.
 * 
 * @return {Matrix} An perspective view matrix.
 * @throws {String} If one of parameter is not a number.
 */
Matrix.prototype.createPerspective = function (fov, ratio, near, far) {
	/// parameters verification
	if (! checkType (arguments, "number", "number", "number", "number")) {
		throw "Matrix.createPerspective: one of parameters is not a number";
	}
	
	/// Fills the matrix
	this.m = new MAT_ARRAY_TYPE (16);
	var f = 1.0 / Math.tan (fov / 2);
	var rangeInv = 1 / (near - far);
	
	// First line
	this.m[0] = f / ratio;
	this.m[1] = 0.0;
	this.m[2] = 0.0;
	this.m[3] = 0.0;
	// Second line
	this.m[4] = 0.0;
	this.m[5] = f;
	this.m[6] = 0.0;
	this.m[7] = 0.0;
	// Third line
	this.m[8]  = 0.0;
	this.m[9]  = 0.0;
	this.m[10] = (near + far) * rangeInv;
	this.m[11] = -1.0;
	// Last line
	this.m[12] = 0.0;
	this.m[13] = 0.0;
	this.m[14] = near * far * rangeInv * 2.0;
	this.m[15] = 0.0;
	
	return this;
};


//==============================================================================
/**
 * Create an orthographic view matrix.
 * 
 * @param {float} left - X coordinate of the minimum corner.
 * @param {float} right - X coordinate of the maximum corner.
 * @param {float} bottom - Z coordinate of the minimum corner.
 * @param {float} top - Z coordinate of the maximum corner.
 * @param {float} near - Y coordinate of the minimum corner.
 * @param {float} far - Y coordinate of the maximum corner.
 * 
 * @return {Matrix} An orthographic view matrix.
 */
Matrix.prototype.createOrthographic = function (left, right,
		bottom, top, near, far)
{
	/// parameters verification
	if (! checkType (arguments, "number", "number", "number", "number", 
		"number", "number"))
	{
		throw "Matrix.createOrthographic: one of parameters is not a number";
	}
	
	/// Fills the matrix
	this.m = new MAT_ARRAY_TYPE (16);
	var lr = 1.0 / (left - right),
		bt = 1.0 / (bottom - top),
		nf = 1.0 / (near - far);
	
	// First line
	this.m[0] = -2.0 * lr;
	this.m[1] = 0.0;
	this.m[2] = 0.0;
	this.m[3] = 0.0;
	
	// Second line
	this.m[4] = 0.0;
	this.m[5] = -2.0 * bt;
	this.m[6] = 0.0;
	this.m[7] = 0.0;
	
	// Third line
	this.m[8] = 0.0;
	this.m[9] = 0.0;
	this.m[10] = 2.0 * nf;
	this.m[11] = 0.0;
	
	// Last line
	this.m[12] = (left + right) * Math.min (lr, bt);
	this.m[13] = (top + bottom) * Math.min (lr, bt);
	this.m[14] = (far + near) * nf;
	this.m[15] = 1.0;
	
	return this;
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @param {int} i - The line number.
 * @param {int} j - The column number.
 * 
 * @return {float} The element at i, j position.
 */
Matrix.prototype.get = function (i, j) {
	if (i < 0 || i >= 4) 
		throw "Matrix getter: bad line value (" + i + ")";
	if (j < 0 || j >= 4) 
		throw "Matrix getter: bad column value (" + j + ")";
	return this.m[i + 4 * j];
};


//==============================================================================
/**
 * Set elements in the matrix.
 * 
 * @param {int} i - The line number.
 * @param {int} j - The column number.
 * @param {float} v - The new value.
 * 
 * @return {void}
 */
Matrix.prototype.set = function (i, j, v) {
	if (i < 0 || i >= 4)
		throw "Matrix setter: bad line value (" + i + ")";
	if (j < 0 || j >= 4)
		throw "Matrix setter: bad column value (" + j + ")";
	this.m[i + j * 4] = v; 
};



//##############################################################################
//	Utilitary function
//##############################################################################



/**
 * Convert deg to rad.
 * 
 * @param {float} arad - The degrees to convert.
 * 
 * @return {float}
 */
Matrix.prototype.degToRad = function (arad) {
	return ((arad) * 0.017453292519943295769236907684886127134428718885417254560971914401710091146034494436822415696345094823);
};


//==============================================================================
/**
 * @return {float} The data for the GPU.
 */
Matrix.prototype.getGLVector = function () {
	return this.m; 
};


//==============================================================================
/**
 * To print a matrix ...
 * 
 * @return {String} The string representing the matrix.
 */
Matrix.prototype.toString = function () {
	var ch = "";
	for (l = 0; l < 4; ++l) {
		ch += "[";
		for (c = 0; c < 3; ++c) {
			ch+=this.get (l, c) + ", ";
		}
		ch += this.get (l, 3) + "]\n";
	}
	return ch;
};


//==============================================================================
/**
 * Transform a matrix to a normal matrix ...
 * 
 * @return {Matrix} The new matrix.
 */
Matrix.prototype.toNormal = function () {
	// set last column to 0
	this.m[3] = this.m[7] = this.m[11] = 0.0;
	// set last line to 0
	this.m[12] = this.m[13] = this.m[14] = this.m[15] = 0.0;
	
	// compute the 3x3 invert, and transpose it ...
	var a = this.m[0]; var b = this.m[4]; var c = this.m[8];
	var d = this.m[1]; var e = this.m[5]; var f = this.m[9];
	var g = this.m[2]; var h = this.m[6]; var i = this.m[10];
	
	var invDet = 1.0 / (a * (e * i - h * f) 
			+ d * (c * h - i * b) 
			+ g * (b * f - e * c)
		);
	// compute directly the transpose matrix
	this.m[0] = (e * i - f * h) * invDet;
	this.m[1] = (c * h - b * i) * invDet;
	this.m[2] = (b * f - c * e) * invDet;
	
	this.m[4] = (f * g - d * i) * invDet;
	this.m[5] = (a * i - c * g) * invDet;
	this.m[6] = (c * d - a * f) * invDet;
	
	this.m[8] = (d * h - e * g) * invDet;
	this.m[9] = (b * g - a * h) * invDet;
	this.m[10]= (a * e - b * d) * invDet;
	
	// and returns
	return this;
};


//==============================================================================
/**
 * @param {Vector} v - A vector.
 * 
 * @return {Vector} A new vector, this vector is the result of the
 * multiplication of the matrix with the parameter (and a coeff).
 */
Matrix.prototype.apply = function (v) {
	if (!v instanceof Vector) {
		throw("Matrix.apply: bad parameter");
	}
	var inv = 1.0 / this.m[15]; // do not forget!
	var x = v.m[0] * inv;
	var y = v.m[1] * inv;
	var z = v.m[2] * inv;
	return new Vector (
		this.m[0] * x + this.m[4] * y + this.m[8] * z + this.m[12] * inv,
		this.m[1] * x + this.m[5] * y + this.m[9] * z + this.m[13] * inv,
		this.m[2] * x + this.m[6] * y + this.m[10] * z + this.m[14] * inv);
};


//==============================================================================
/**
 * Print the matrix to console.
 * 
 * @return {void}
 */
Matrix.prototype.toConsole = function () {
	// print line by line ...
	for (var id = 0; id < 4; id++) {
		console.log ("[" + this.m[id] + " " + this.m[4 + id] + " "
			+ this.m[8 + id] + " " + this.m[12 + id] + "]");
	}
};


//==============================================================================
/**
 * @param {Matrix} that - The matrix to compare with.
 * 
 * @return {Matrix} True if the matrix are equals, false otherwise.
 */
Matrix.prototype.equals = function (that) {
	
	// Allows to compare 2 matrix with a coefficient
	var epsilon = (arguments.length == 2) ? arguments[1] : 0; 
	
	if ((!that instanceof Matrix) || (!isFinite (epsilon))) {
		throw("Matrix equals: bad parameter");
	}
	
	// Comparison
	for (var i = 0; i < 16; ++i) {
		if (Math.abs (this.m[i] - that.m[i]) > epsilon) {
			return false;
		}
	}
	return true;
};


//==============================================================================
/**
 * Addition of two matrices (+=).
 * 
 * @param {Matrix} that - The matrix to add with.
 * 
 * @return {Matrix} The matrix result of the addition.
 */
Matrix.prototype.add = function (that) {
	if (!(that instanceof Matrix)) {
		throw "Matrix addition: bad parameter!";
	}
	for (var i = 0; i < 16; ++i) {
		this.m[i] += that.m[i];
	}
	
	// mandatory: let the following line survive!
	return this;
};


//==============================================================================
/**
 * Multiplication of two matrices (*=).
 * 
 * @param {Matrix} that - The matrix to multiply with.
 * 
 * @return {Matrix} The matrix result of the multiplication.
 */
Matrix.prototype.mul = function (that) {
	if (!(that instanceof Matrix)) {
		throw "Matrix multiplication: given parameter is not a Matrix" ;
	}
	var t = new MAT_ARRAY_TYPE (this.m);
	
	for (var i = 0; i < 4; ++i) {
		for (var j = 0; j < 4; ++j) {
			var v = 0;
			for (var k = 0; k < 4; ++k) {
				v += t[i + 4 * k] * that.get (k, j);
			}
			this.set (i, j, v);
		}
	}
	// mandatory: let the following line survive!
	return this;
};


//==============================================================================
/**
 * This becomes the transposition of this.
 * 
 * @return {Matrix} The matrix transposed.
 */
Matrix.prototype.transpose = function () {
	for (var l = 0; l < 4; ++l) {
		for (var c = l + 1; c < 4; ++c) {
			var v = this.get (l, c);
			this.set (l, c, this.get (c, l));
			this.set (c, l, v);
		}
	}
	return this;
};


//==============================================================================
/**
 * @return {Matrix} the matrix inverted.
 */
Matrix.prototype.invert = function () {
	var a00 = this.m[0],  a01 = this.m[1],  a02 = this.m[2],  a03 = this.m[3];
	var a10 = this.m[4],  a11 = this.m[5],  a12 = this.m[6],  a13 = this.m[7];
	var a20 = this.m[8],  a21 = this.m[9],  a22 = this.m[10], a23 = this.m[11];
	var a30 = this.m[12], a31 = this.m[13], a32 = this.m[14], a33 = this.m[15];
	
	var b00 = a00 * a11 - a01 * a10;
	var b01 = a00 * a12 - a02 * a10;
	var b02 = a00 * a13 - a03 * a10;
	var b03 = a01 * a12 - a02 * a11;
	var b04 = a01 * a13 - a03 * a11;
	var b05 = a02 * a13 - a03 * a12;
	var b06 = a20 * a31 - a21 * a30;
	var b07 = a20 * a32 - a22 * a30;
	var b08 = a20 * a33 - a23 * a30;
	var b09 = a21 * a32 - a22 * a31;
	var b10 = a21 * a33 - a23 * a31;
	var b11 = a22 * a33 - a23 * a32;
	
	var invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 
		- b04 * b07 + b05 * b06);
	
	this.m[0]  = ( a11 * b11 - a12 * b10 + a13 * b09) * invDet;
	this.m[1]  = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
	this.m[2]  = ( a31 * b05 - a32 * b04 + a33 * b03) * invDet;
	this.m[3]  = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
	this.m[4]  = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
	this.m[5]  = ( a00 * b11 - a02 * b08 + a03 * b07) * invDet;
	this.m[6]  = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
	this.m[7]  = ( a20 * b05 - a22 * b02 + a23 * b01) * invDet;
	this.m[8]  = ( a10 * b10 - a11 * b08 + a13 * b06) * invDet;
	this.m[9]  = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
	this.m[10] = ( a30 * b04 - a31 * b02 + a33 * b00) * invDet;
	this.m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
	this.m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
	this.m[13] = ( a00 * b09 - a01 * b07 + a02 * b06) * invDet;
	this.m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
	this.m[15] = ( a20 * b03 - a21 * b01 + a22 * b00) * invDet;
	
	return this;
};


//==============================================================================
/**
 * Translation constructor: this = T * this.
 * 
 * @param {Vector} that - The vector containing the translation values.
 * 
 * @return {Matrix} This matrix translated.
 */
Matrix.prototype.translate = function (that) {
	if (!that instanceof Vector) { 
		throw "Matrix translate: given parameter is not a Vector";
	}
	
	this.m[12] += that.m[0] * this.m[15];
	this.m[13] += that.m[1] * this.m[15];
	this.m[14] += that.m[2] * this.m[15];
	
	return this;
};


//==============================================================================
/**
 * Scaling constructor.
 * 
 * @param {Number} that - The coefficient of scaling.
 * 
 * @return {Matrix} This matrix scaled.
 */
Matrix.prototype.scale = function (that) {
	if (!isFinite (that)) {
		throw "Matrix scale: given parameter is not a finite number";
	}
	
	for (var i = 0; i< 3; ++i) {
		for (var j = 0; j < 4; ++j) {
			this.m[i + j * 4] *= that;
		}
	}
	return this;
};


//==============================================================================
/**
 * @param {float} angleRad - the angle of rotation (in rad).
 * 
 * @return {Matrix} this=RotateX(angeRad)*this 
 */
Matrix.prototype.rotateX = function (angleRad) {
	var c = Math.cos (angleRad); 
	var s = Math.sin (angleRad);
	
	// only the second and third lines are modified
	for (var i = 0; i < 4; ++i) {
		var a1 = this.get (1, i);
		var a2 = this.get (2, i);
		this.set (1, i, c * a1 - s * a2);
		this.set (2, i, s * a1 + c * a2);
	}

	return this;
};


//==============================================================================
/**
 * @param {float} angleRad - The angle of rotation (in rad).
 * 
 * @return {Matrix} this = RotateY (angeRad) * this.
 */
Matrix.prototype.rotateY = function (angleRad) {
	var c = Math.cos (angleRad); 
	var s = Math.sin (angleRad);

	// only the first and third lines are modified ...
	for (var i = 0; i < 4; i++) {
		var a0 = this.get (0, i);
		var a2 = this.get (2, i);
		this.set (0, i,  c * a0 + s * a2);
		this.set (2, i, -s * a0 + c * a2);
	}

	return this;
};


//==============================================================================
/**
 * @param {float} angleRad - The angle of rotation (in rad).
 * 
 * @return {Matrix} this = RotateZ (angeRad) * this.
 */
Matrix.prototype.rotateZ = function (angleRad) {
	var c = Math.cos (angleRad); 
	var s = Math.sin (angleRad);

	// only the first two lines are modified ...
	for (var i = 0; i < 4; ++i) {
		var a0 = this.get (0, i);
		var a1 = this.get (1, i);
		this.set (0, i, c * a0 - s * a1);
		this.set (1, i, s * a0 + c * a1);
	}
	return this;
};


//==============================================================================
/**
 * @param {float} angleRad - The angle of rotation (in rad).
 * @param {Vector} axe - Axe of the rotation.
 * 
 * @return {Matrix} The rotated matrix.
 */
Matrix.prototype.rotate = function (angleRad, axe) {
	// see https://fr.wikipedia.org/wiki/Matrice_de_rotation
	var c = Math.cos (angleRad); 
	var s = Math.sin (angleRad);
	var that = new Matrix ();
	var n = new Vector (axe).normalize ();
	
	// first line
	that.m[0] = n.x * n.x * (1 - c) + c;
	that.m[1] = n.x * n.y * (1 - c) - n.z * s;
	that.m[2] = n.x * n.z * (1 - c) + n.y * s;
	// second line
	that.m[4] = n.y * n.x * (1 - c) + n.z * s;
	that.m[5] = n.y * n.y * (1 - c) + c;
	that.m[6] = n.y * n.z * (1 - c) - n.x * s;
	// third line
	that.m[8]  = n.z * n.x * (1 - c) - n.y * s;
	that.m[9]  = n.z * n.y * (1 - c) + n.x * s;
	that.m[10] = n.z * n.z * (1 - c) + c;
	
	that.mul (this);
	this.m = that.m
	return this;
};


//==============================================================================
/**
 * Transform a matrix by modifying the line "which".
 * 
 * @param {int} which - which coordinate is changed
 * @param {int} from - using this one.
 * @param {int} value - multiplication factor.
 * 
 * @return {Matrix} the new matrix.
 */
Matrix.prototype.shearing = function (which, from, value) {
	if (from < 0 || from > 3 || which < 0 || which > 3 || from == which) {
		throw "Matrix.shearing: bad type(s) of parameter(s)";
	}
	// same matrice, except the line "which"
	for (var c = 0; c < 4; ++c) {
		this.set (from, c, this.get (from, c) + value * this.get (which, from));
	}
	// mandatory
	return this;
};


//==============================================================================
/**
 * @return {Vector} The x vector of the matrix.
 */
Matrix.prototype.getXVector = function () {
	return new Vector (this.m[0], this.m[1], this.m[2]);
};


//==============================================================================
/**
 * @return {Vector} The y vector of the matrix.
 */
Matrix.prototype.getYVector = function () {
	return new Vector (this.m[4], this.m[5], this.m[6]);
};


//==============================================================================
/**
 * @return {Vector} The z vector of the matrix.
 */
Matrix.prototype.getZVector = function () {
	return new Vector (this.m[8], this.m[9], this.m[10]);
};




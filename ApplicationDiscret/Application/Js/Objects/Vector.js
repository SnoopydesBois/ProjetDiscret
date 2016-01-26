/////// LICENCE ////////////////////////////////////////////////////////////////


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
 * sur le site "http:www.cecill.info".
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


/// INDEX //////////////////////////////////////////////////////////


/* m : Array
 *
 * Vector ()
 * defaultConstructor () : Vector
 * copyConstructor (that : Vector) : Vector
 * coordinateConstructor (x : int, y : int, z : int) : Vector
 * X () : Element
 * Y () : Element
 * Z () : Element
 * add (that : Vector) : Vector
 * sub (that : Vector) : Vector
 * cross (that : Vector) : Vector
 * dot (that : Vector) : Element
 * mul (that : Vector) : Vector
 * normalize () : Vector
 * invert () : Vector
 * rotateX (rad : float) : Vector
 * rotateY (rad : float) : Vector
 * rotateZ (rad : float) : Vector
 * getGLVector () : Array
 * toString () : String
 */


/// CODE ///////////////////////////////////////////////////////////



/**
 * @classdesc Simple 3 dimensional Vector class.
 */
Vector.prototype.constructor = Vector;



//##############################################################################
//	Type
//##############################################################################



var VEC_ARRAY_TYPE = (typeof Float32Array == 'undefined') ?
	Array : Float32Array;



//##############################################################################
//	Constructors
//##############################################################################



/**
 * @constructor
 * Depending on the number of argument to the constructor, call for 
 * different vector construction.
 * 	0 : Default constructor : 3 dimensions vector
 * 	1 : Copy constructor : copy of the vector in argument
 * 	3 : Creation of a 3 dimensions vector initialized with the arguments
 * 	defaut : Error
 * 
 * @return {Vector} the new vector
 */
function Vector () {
	
	/**
	 * {VEC_ARRAY_TYPE} The main array which containt the coordinates.
	 */
	this.m = new VEC_ARRAY_TYPE (3);
	
	/**
	 * {Number} An alias to the 1st coordinate.
	 */
	Object.defineProperty (this, "x", { 
		get : function () {return this.m[0]}, 
		set : function (value) {this.m[0] = value}
	});
	
	/**
	 * {Number} An alias to the 2nd coordinate.
	 */
	Object.defineProperty (this, "y", { 
		get : function () {return this.m[1]}, 
		set : function (value) {this.m[1] = value}
	});
	
	/**
	 * {Number} An alias to the 3rd coordinate.
	 */
	Object.defineProperty (this, "z", { 
		get : function () {return this.m[2]}, 
		set : function (value) {this.m[2] = value}
	});
	try {
		switch (arguments.length) {
			case 0: 
				return this.defaultConstructor ();
			case 1:
				if (arguments[0] instanceof Array 
					|| arguments[0] instanceof Float32Array)
				{
					return this.arrayToVectorConstructor (arguments[0]);
				}
				else if (typeof arguments[0] == "number")
					return this.coordinateConstructor (arguments[0],
						arguments[0], arguments[0])
				else
					return this.copyConstructor (arguments[0]);
			case 3: 
				return this.coordinateConstructor (arguments[0], 
					arguments[1], arguments[2]);
			default: 
				throw "Vector constructor bad syntax";
		};
	}
	catch (e) {
		console.error (e);
	}
//	return this;
}


//==============================================================================
/**
 * Default constructor (no argument).
 * 
 * @return {Vector} A vector initialized with 0 in each coordinate.
 */
Vector.prototype.defaultConstructor = function () {
	this.m[0] = 0;
	this.m[1] = 0;
	this.m[2] = 0;
	return this;
};


//==============================================================================
/**
 * Copy constructor.
 * 
 * @param {Vector} that - The vector to copy.
 * 
 * @return {Vector} A vector initialized with the value from 'that'.
 */
Vector.prototype.copyConstructor = function (that) {
	if (!(that instanceof Vector)) { 
		throw "Vector: bad copy constructor call";
	}
	this.m[0] = that.m[0];
	this.m[1] = that.m[1];
	this.m[2] = that.m[2];
	return this;
};


//==============================================================================
/**
 * Transform an array to a Vector.
 * 
 * @param {Vector} tab - The vector to copy.
 * 
 * @return {Vector} A vector initialized with the value from 'that'.
 */
Vector.prototype.arrayToVectorConstructor = function (tab) {
	if (tab.length != 3) { 
		throw "Vector: bad array length in array to vector constructor call";
	}
	return this.coordinateConstructor (tab[0], tab[1], tab[2]);
};


//==============================================================================
/**
 * Constructor using three coordinates (float values).
 * 
 * @param {float} x - The first dimension value.
 * @param {float} y - The second dimension value.
 * @param {float} z - The third dimension value.
 * 
 * @return {Vector} A vector initialized with x, y and z.
 */
Vector.prototype.coordinateConstructor = function (x, y, z) {
	if (isFinite (x) && isFinite (y) && isFinite (z)) {
		this.m[0] = x;
		this.m[1] = y;
		this.m[2] = z; 
		return this;
	}
	else {
		throw "Vector: bad coordinate constructor call (" + x + ", " + y 
			+ ", " + z + ")";
	}
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {Number} The euclian length of the vector.
 */
Vector.prototype.getLength = function () {
	return Math.sqrt (
		this.m[0] * this.m[0]
		+ this.m[1] * this.m[1]
		+ this.m[2] * this.m[2]
	);
};


//==============================================================================
/**

 * @return {Array} The data to the GPU.
 */
Vector.prototype.getGLVector = function () {
	return this.m; 
};



//##############################################################################
//	Vector operations
//##############################################################################



/**
 * Addition (this += that).
 * 
 * @param {Vector} that - The vector to add with.
 * 
 * @return {Vector} The vector result of the addition.
 * @throws {String} If the 'that' is not a Vector.
 */
Vector.prototype.add = function (that) {
	if (! that instanceof Vector) {
		throw "Vector.add: given parameter is not a Vector"
	}
	this.m[0] += that.m[0];
	this.m[1] += that.m[1];
	this.m[2] += that.m[2];
	return this;
};


//==============================================================================
/**
 * Subtraction (this -= that).
 * 
 * @param {Vector} that - The vector to substract with.
 * 
 * @return {Vector} The vector result of the substraction.
 * @throws {String} If the 'that' is not a Vector.
 */
Vector.prototype.sub = function (that) {
	if (! that instanceof Vector) {
		throw "Vector.sub: given parameter is not a Vector"
	}
	this.m[0] -= that.m[0];
	this.m[1] -= that.m[1];
	this.m[2] -= that.m[2];
	return this;
};


//==============================================================================
/**
 * Cross product (returns = this ^ that).
 * 
 * @param {Vector} that - The vector to realize the cross product with.
 * 
 * @return {Vector} The vector result of the cross product.
 * @throws {String} If the 'that' is not a Vector.
 */
Vector.prototype.cross = function (that) {
	if (! that instanceof Vector) {
		throw "Vector.cross: given parameter is not a Vector"
	}
	return new Vector (
		this.m[1] * that.m[2] - this.m[2] * that.m[1],
		this.m[2] * that.m[0] - this.m[0] * that.m[2],
		this.m[0] * that.m[1] - this.m[1] * that.m[0]
	);
};


//==============================================================================
/**
 * Dot product (returns = this . that).
 * 
 * @param {Vector} that - The vector to realize the dot product with.
 * 
 * @return {Number} A scalar result of the dot product.
 * @throws {String} If the 'that' is not a Vector.
 */
Vector.prototype.dot = function (that) {
	if (! that instanceof Vector) {
		throw "Vector.dot: given parameter is not a Vector"
	}
	return this.m[0] * that.m[0] + this.m[1] * that.m[1] 
		+ this.m[2] * that.m[2];
};


//==============================================================================
/**
 * Multiplication by a scalar (this *= scalar).
 * 
 * @param {Number} that - A scalar to multiply with.
 * 
 * @return {Vector} A vector result of the multiplication with a scalar.
 */
Vector.prototype.mul = function (that) {
	if (isFinite (that)) {
		this.m[0] *= that;
		this.m[1] *= that;
		this.m[2] *= that;
		return this;
	}
	else {
		throw "Vector.mul: bad parameter";
	}
};


//==============================================================================
/**
 * Normalization. This becomes unit vector.
 * 
 * @return {Vector} The vector normalized.
 */
Vector.prototype.normalize = function () {
	var inv = 1.0 / Math.sqrt (this.m[0] * this.m[0] + this.m[1] * this.m[1] 
		+ this.m[2] * this.m[2]);
	this.m[0] *= inv;
	this.m[1] *= inv;
	this.m[2] *= inv;
	return this;
};


//==============================================================================
/**
 * @return {Vector} The opposite of the vector.
 */
Vector.prototype.invert = function () {
	this.m[0] = -this.m[0];
	this.m[1] = -this.m[1];
	this.m[2] = -this.m[2];
	return this;
};


//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around X axis.
 * 
 * @param {float} rad - The angle of rotation (in radian).
 * 
 * @return {Vector} The vector after the rotation.
 */
Vector.prototype.rotateX = function (rad) {
	return new Vector (
		this.m[0], 
		this.m[1] * Math.cos (rad) - this.m[2] * Math.sin (rad), 
		this.m[1] * Math.sin (rad) + this.m[2] * Math.cos (rad)
	);
};


//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around Y axis.
 * 
 * @param {float} rad - The angle of rotation (in radian).
 * 
 * @return {Vector} The vector after the rotation.
 */
Vector.prototype.rotateY = function (rad) {
	return new Vector (
		this.m[0] * Math.cos (rad) - this.m[2] * Math.sin (rad),
		this.m[1], 
		this.m[0] * Math.sin (rad) + this.m[2] * Math.cos (rad)
	);
};


//==============================================================================
/**
 * Rotate a vector given an angle (in radian) around Z axis.
 * 
 * @param {float} rad - The angle of rotation (in radian).
 * 
 * @return {Vector} The vector after the rotation.
 */
Vector.prototype.rotateZ = function (rad) {
	return new Vector (
		this.m[0] * Math.cos (rad) - this.m[1] * Math.sin (rad), 
		this.m[0] * Math.sin (rad) + this.m[1] * Math.cos (rad), 
		this.m[2]
	);
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * @return {String} A string to display the vector.
 */
Vector.prototype.toString = function () {
	return "[" + this.m[0] + "; " + this.m[1] + "; " + this.m[2] + "]";
};


//==============================================================================
/**
 * Test if the vector is equals to an other.
 * 
 * @param {Vector} that - An other vector.
 * 
 * @return {boolean} True if 'that' equals to this for each coordinate, false
 * otherwise.
 * @throws {String} If the 'that' is not a Vector.
 */
Vector.prototype.equals = function (that) {
	if (! that instanceof Vector) {
		throw "Vector.sub: given parameter is not a Vector"
	}
	return this.m[0] === vect.m[0] && this.m[1] === vect.m[1] 
		&& this.m[2] === vect.m[2];
};



//##############################################################################
//	Other functions
//##############################################################################



/**
 * Return the addition of two vector.
 * 
 * @param {(Vector | Number[3] | Number)} a - A vector or coordinates to
 * construct a vector.
 * @param {(Vector | Number[3] | Number)} b - A vector or coordinates to
 * construct a vector.
 * @see {@link copyConstructor, arrayToVectorConstructor, coordinateConstructor}
 * 
 * @return {Vector} A new vector corresponding to "a + b"
 */
function addVector (a, b) {
	if (! checkType (arguments, [Vector, Array, "number"],
		[Vector, Array, "number"]))
	{
		throw "addVector: one of parameter is not a Vector"
	}
	var va = new Vector (a);
	var vb = new Vector (b);
	return va.add (vb);
}



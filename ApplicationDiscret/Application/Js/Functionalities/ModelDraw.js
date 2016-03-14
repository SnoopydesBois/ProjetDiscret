/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (mars 2016)
 * Auteur : BEN OTHMANE Zied, BENOIST Thomas, BISUTTI Adrien, RICHAUME Lydie
 *
 * ziedici@gmail.com
 * benoist.thomas@hotmail.fr
 * biscui_86@hotmail.fr
 * l.richaume@gmail.com
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


/* curve : DrawnCurve
 * 
 * ModelDraw ()
 * 
 * getActiveCurve  () : DrawnCurve
 * newCurve  () : void
 * getNbPoint  () : int
 * getXCoordinates  () : Number[]
 * getYCoordinates  () : Number[]
 * closeCurve  () : Point
 */



/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * @classdesc The model to handle the drawn curve.
 */
ModelDraw.prototype.constructor = ModelDraw;



//##############################################################################
//	Constructor
//##############################################################################



/**
 * @constructor
 */
function ModelDraw () {

	/**
	 * {DrawnCurve} The curve used by the model.
	 */
	this.curve = new DrawnCurve ();
};



//##############################################################################
//	Accessors and Mutators
//##############################################################################



/**
 * @return {DrawnCurve} The current curve.
 */
ModelDraw.prototype.getActiveCurve = function () {
	return this.curve;
};



//##############################################################################
//	Other methods
//##############################################################################



/**
 * Creates a new curve.
 *
 * @return {void}
 */
ModelDraw.prototype.newCurve = function () {
	this.curve = new DrawnCurve ();
};


//==============================================================================
/**
 * @return {int} The number of points of the curve.
 */
ModelDraw.prototype.getNbPoint = function () {
	return this.curve.getMaxT ();
};


//==============================================================================
/**
 * @return {Number[]} The X coordinates for each point of the curve. 
 */
ModelDraw.prototype.getXCoordinates = function () {
	return this.curve.getXList ();
};


//==============================================================================
/**
 * @return {Number[]} The Y coordinates for each point of the curve. 
 */
ModelDraw.prototype.getYCoordinates = function () {
	return this.curve.getYList ();
};


//==============================================================================
/**
 * Closes the curve. If it is already closed, does nothing.
 * 
 * @return {Point} The added point (null if not exist or already added).
 */
ModelDraw.prototype.closeCurve = function () {
	var lastIndex = this.getNbPoint () - 1;
	
	if (lastIndex == -1)
		// there isn't any point
		return null;
		
	var lastX = this.getXCoordinates ()[lastIndex],
		lastY = this.getYCoordinates ()[lastIndex],
		firstX = this.getXCoordinates ()[0],
		firstY = this.getYCoordinates ()[0];
	
	if (lastX != firstX && lastY != firstY) {
		this.getActiveCurve ().addPoint (firstX, firstY);
		return new Point (firstX, firstY);
	}
	else 
		return null;
};



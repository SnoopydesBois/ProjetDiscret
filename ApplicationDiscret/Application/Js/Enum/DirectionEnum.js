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


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * @enum
 * Enumeration of Directions.
 * x, y and z indicate how much me move along this axis;
 * oppose is the value of the opposite face;
 * size indicate the number of directions.
 */
var DirectionEnum = {
	/// values
	TOP    : 0,
	BOTTOM : 1,
	RIGHT  : 2,
	LEFT   : 3,
	FRONT  : 4,
	BACK   : 5,
	ALL    : 6,
	NONE   : 7,

	/// properties
	properties : {
		0 : {x :  0, y :  0, z :  1, oppose : 1, axis : AxisEnum.Z, name : "TOP"},
		1 : {x :  0, y :  0, z : -1, oppose : 0, axis : AxisEnum.Z, name : "BOTTOM"},
		2 : {x :  1, y :  0, z :  0, oppose : 3, axis : AxisEnum.X, name : "RIGHT"},
		3 : {x : -1, y :  0, z :  0, oppose : 2, axis : AxisEnum.X, name : "LEFT"},
		4 : {x :  0, y : -1, z :  0, oppose : 5, axis : AxisEnum.Y, name : "FRONT"},
		5 : {x :  0, y :  1, z :  0, oppose : 4, axis : AxisEnum.Y, name : "BACK"},
		6 : {x :  0, y :  0, z :  0, oppose : 7, axis : null, name : "ALL"},
		7 : {x :  0, y :  0, z :  0, oppose : 6, axis : null, name : "NONE"}
	},
	size : 6,

	/// methods
	toString : function (direction) {
		if (0 <= direction && direction <= 7){
			return DirectionEnum.properties[direction].name;
		} else{
			return undefined;
		}
	}
};



if (Object.freeze){
	DirectionEnum = Object.freeze (DirectionEnum);
}


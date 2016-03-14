/// LICENCE ////////////////////////////////////////////////////////////////////


/**
 * @license
 * Copyright (juin 2015)
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


/// CODE ///////////////////////////////////////////////////////////////////////



/**
 * {String} Fragment shader for the application. There are three shader in one.
 * Depending of the uniform parameter 'uMode'.
 */
var fragSrc =
  "precision mediump float;\n"

+ "varying vec4 vColor;\n"
+ "varying vec3 vPos;\n"

+ "uniform vec3 uDimension;\n"
+ "uniform int uMode;\n"
+ "uniform float uRadius;\n"


+ "void main (void) {\n"
+ "	vec4 tight = vec4(0.05, 0.95, 0.05, 0.95);\n" // values
+ "	float m = max (max (uDimension.x, uDimension.y), uDimension.z);\n"
+ "	vec3 pos = ((vPos * m) + uDimension) / 2.0;\n"
+ "	if (uMode == 1) {\n" // Rendering the repere (DOTTED = 1)
		// Pixel coordinates on the screen
+ "		bool dot = false;\n"
+ "		\n"
+ "		int nb = 0;\n" // We count the number of coordinates that are integers
+ "		if (step(tight[2], fract(pos.x)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.x)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.x), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[2], fract(pos.y)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.y)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.y), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[2], fract(pos.z)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.z)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.z), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "		\n"
		// If there is only one integer coordinate, we render normally
+ "		if (nb >= 2 && !dot) {\n"
+ "			float colorX = vColor.x * 0.8;\n"
+ "			float colorY = vColor.y * 0.8;\n"
+ "			float colorZ = vColor.z * 0.8; \n"
+ "			gl_FragColor = vec4 (colorX, colorY, colorZ, 1.0);\n"
+ "		}\n"
		// The pixel is on a line, we draw
+ "		else {\n"
+ "			gl_FragColor = vColor;\n"
+ "		}\n"
+ "	}\n"
+ "	else if ((uMode == 2) || step (uRadius - 0.5, 0.0) == 0.0) {\n"
		// If picking we render the model without lines (PICKING = 2)
+ "		gl_FragColor = vColor;\n"
+ "	}\n"
+ "	else {\n"
+ "		float rad;\n"
+ "		if (uRadius >= 0.5) {\n"
+ "			rad = uRadius + 0.05;\n"
+ "		}\n"
+ "		else if (uRadius >= 0.475) {\n"
+ "			rad = uRadius + 0.09;\n"
+ "		}\n"
+ "		else if (uRadius >= 0.45) {\n"
+ "			rad = uRadius + 0.0475;\n"
+ "		}\n"
+ "		else {\n"
+ "			rad = uRadius + 0.05;\n"
+ "		}\n"
		// Pixel coordinates on the screen
+ "		float width = uRadius * 0.2;\n"
+ "		vec3 center = floor (pos) + 0.5;\n" // center of the cube 
+ "		vec3 Min = center - 1. / 2.0;\n" // min border of the cube
+ "		vec3 min = Min + width;\n" // min border of the real color
+ "		vec3 Max = center + 1. / 2.0;\n" // max border of the cube
+ "		vec3 max = Max - width;\n" // max border of the real color
+ "		int nb = 0;\n" // We count the number of coordinates that are integers

+ "		if (   (fract (1.5 - rad) < fract (pos.x) && fract (pos.x) < fract (1.5 - rad) + width)"
+ "			|| (fract (0.5 + rad) > fract (pos.x) && fract (pos.x) > fract (0.5 + rad) - width)) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "\n"
+ "		if (   (fract (1.5 - rad) < fract (pos.y) && fract (pos.y) < fract (1.5 - rad) + width)"
+ "			|| (fract (0.5 + rad) > fract (pos.y) && fract (pos.y) > fract (0.5 + rad) - width)) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "\n"
+ "		if (   (fract (1.5 - rad) < fract (pos.z) && fract (pos.z) < fract (1.5 - rad) + width)"
+ "			|| (fract (0.5 + rad) > fract (pos.z) && fract (pos.z) > fract (0.5 + rad) - width)) {\n"
+ "			nb++;\n"
+ "		}\n"
	    // If there is only one integer coordinate, we render normally
+ "		if (nb < 2) {\n"
			// center of the cube
+ "			gl_FragColor = vColor;\n"
+ "		}\n"
+ "		else {\n"
			// The pixel is on a line, we draw more darkly
+ "			gl_FragColor = vColor * vec4 (0.7, 0.7, 0.7, 1.0);\n"
+ "		}\n"
+ "	}\n" // end switch uMode
+ "}";




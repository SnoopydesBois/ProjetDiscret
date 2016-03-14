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
 * {String} Vertex shader for the application.
 */
var vertSrc =
  "attribute vec3 aPosition;\n"
+ "attribute vec4 aColor;\n"
+ "\n"
+ "uniform mat4 uOrthographicProjectionMatrix;\n"
+ "uniform mat4 uPerspectiveProjectionMatrix;\n"
+ "uniform mat4 uModelViewMatrix;\n"
+ "uniform int uViewMode;\n"
+ "\n"
+ "varying vec4 vColor;\n"
+ "varying vec3 vPos;\n"
+ "\n"
+ "void main (void) {\n"
+ "  if (uViewMode == 1) {\n" // Perspective
+ "    gl_Position = uPerspectiveProjectionMatrix * uModelViewMatrix\n"
+ "      * vec4 (aPosition, 1.0);\n"
+ "  }\n"
+ "  else {\n" // Orthographic
+ "    gl_Position = uOrthographicProjectionMatrix * uModelViewMatrix\n"
+ "      * vec4 (aPosition, 1.0);\n"
+ "  }\n"
+ "	 vPos = aPosition;\n"
+ "	 vColor = aColor;\n"
+ "}";

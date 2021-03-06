// LICENSE /////////////////////////////////////////////////////////////////////


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


// CODE ////////////////////////////////////////////////////////////////////////



//##############################################################################
//	preparing language file
//##############################################################################



/**
 * {String[][]} Matrix of translation for title attribute. Each translation is
 * indexed by the lang (string "en" or "fr") and the id of the element.
 */
var translateTitle = [];
translateTitle['en'] = [];
translateTitle['fr'] = [];



//##############################################################################
//	English
//##############################################################################



/* Menu Fichier anglais */
translateTitle['en']['m11'] = 'Open a generatrix from a local file';
translateTitle['en']['m12'] = 'Open a directrix from a local file';
translateTitle['en']['m13'] = 'Save and download the current generatrix';
translateTitle['en']['m14'] = 'Save and download the current directrix';


/* Menu Affichage anglais */
translateTitle['en']['m21'] = 'Generate the surface on the 3D View';
translateTitle['en']['m23'] = 'Orthographic view';
translateTitle['en']['m24'] = 'Perspective view';
translateTitle['en']['m25'] = 'Change the current color to red green blue';
translateTitle['en']['m26'] = 'Change the current color to white';
translateTitle['en']['m29'] = 'Center the camera';
translateTitle['en']['m22'] = 'Recenter the camera to its initial position';
translateTitle['en']['m27'] = 'Show or hide graduation';
translateTitle['en']['m28'] = 'Show or hide 3D space limits';


/* Sous menu 2D anglais */
translateTitle['en']['meridianChoice'] = 'Generatrix choice';
translateTitle['en']['curveOfRevolutionChoice'] = 'Directrix choice';
translateTitle['en']['meridianFormulaInputMenu'] =
	'Enter a formula for the generatrix';
translateTitle['en']['revolFormulaInput'] = 'Enter a formula for the directrix';


translateTitle['en']['m35'] = 'Free hand drawing';
translateTitle['en']['m351'] = 'Draw a curve';
translateTitle['en']['m352'] = 'Clear the curve';
translateTitle['en']['m353'] = 'Close the curve';


/* Menu export anglais */
translateTitle['en']['m41'] = 'Save a PNG file';
translateTitle['en']['download'] = 'Save a PNG file of the surface';
translateTitle['en']['downloadMeridian'] = 'Save a PNG file of the generatrix';
translateTitle['en']['downloadRevolution'] = 'Save a PNG file of the directrix';
translateTitle['en']['m44'] = '3D export format';


/*sous menue export 3D anglais*/
translateTitle['en']['m441'] = 'Export the surface to X3D file';
translateTitle['en']['m442'] =
	'Export the surface to STL file useable by 3D printer';


translateTitle['en']['s2'] = 'Generate the surface in the 3D view';
translateTitle['en']['s3'] =
	'Generate the surface in the 3D view with a brute-force algorithm';
translateTitle['en']['s41'] = 'Display X-slice (red)';
translateTitle['en']['s42'] = 'Display Y-slice (green)';
translateTitle['en']['s43'] = 'Display Z-slice (blue)';


//##############################################################################
//	French
//##############################################################################



/* Menu Fichier français */
translateTitle['fr']['m11'] =
	'Ouvrir une méridienne depuis un fichier sur cet ordinateur';
translateTitle['fr']['m12'] =
	'Ouvrir une courbe de révolution depuis un fichier sur cet ordinateur';
translateTitle['fr']['m13'] =
	'Enregistrer et télécharger la méridienne actuelle';
translateTitle['fr']['m14'] =
	'Enregistrer et télécharger la courbe de révolution actuelle';


/* Menu Affichage français */
translateTitle['fr']['m21'] = 'Générer la surface dans la vue 3D';
translateTitle['fr']['m23'] = 'Point de vue orthographique';
translateTitle['fr']['m24'] = 'Point de vue perspective';
translateTitle['fr']['m25'] = 
	'Changer la palette de couleur en Rouge-Vert-Bleu';
translateTitle['fr']['m26'] = 'Changer la palette de couleur en blanc';
translateTitle['fr']['m29'] = 'Centrer la caméra';
translateTitle['fr']['m22'] = 'Replacer la caméra à sa position d\'origine';
translateTitle['fr']['m27'] = 'Affichez ou cachez le repère 3D';
translateTitle['fr']['m28'] = 'Affichez ou cachez les limites de l\'espace 3D';


/* Sous menu 2D français */
translateTitle['fr']['meridianChoice'] = 'Choix de la méridienne';
translateTitle['fr']['curveOfRevolutionChoice'] =
	'Choix de la courbe de révolution';
translateTitle['fr']['meridianFormulaInputMenu'] =
	'Rentrer une formule pour la méridienne';
translateTitle['fr']['revolFormulaInput'] =
	'Rentrer une formule pour la courbe de révolution';


translateTitle['fr']['m35'] = 'Dessin à main levée';
translateTitle['fr']['m351'] = 'Dessiner une courbe';
translateTitle['fr']['m352'] = 'Effacer la courbe';
translateTitle['fr']['m353'] = 'Fermer une courbe';


/* Menu export français */
translateTitle['fr']['m41'] = 'Enregistrer une image PNG';
translateTitle['fr']['download'] = 'Save a PNG file of the surface';
translateTitle['fr']['downloadMeridian'] =
	'Enregistrer une image de la méridienne en PNG';
translateTitle['fr']['downloadRevolution'] =
	'Enregistrer une image de la courbe de révolution en PNG';
translateTitle['fr']['m44'] = 'Format d\'export 3D';


/*sous menue export 3D français*/
translateTitle['fr']['m441'] = 'Exporter la surface au format X3D';
translateTitle['fr']['m442'] =
	'Exporter la surface au format STL utilisable par une imprimante 3D';


translateTitle['fr']['s2'] = 'Générer la surface dans la vue 3D';
translateTitle['fr']['s3'] =
	'Générer la surface dans la vue 3D avec un algorithme brute force';
translateTitle['fr']['s41'] = 'Visualiser la coupe X';
translateTitle['fr']['s42'] = 'Visualiser la coupe Y';
translateTitle['fr']['s43'] = 'Visualiser la coupe Z';




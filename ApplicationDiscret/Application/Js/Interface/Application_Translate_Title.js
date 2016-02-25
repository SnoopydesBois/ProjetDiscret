// LICENSE /////////////////////////////////////////////////////////////////////


/**
 * @license TODO
 */


// CODE ////////////////////////////////////////////////////////////////////////


/**
 * TODO explication module
 */



//##############################################################################
//	preparing language file
//##############################################################################



var aLangKeys = [];
aLangKeys['en'] = [];
aLangKeys['fr'] = [];



//##############################################################################
//	English
//##############################################################################



/* Menu Fichier anglais */
aLangKeys['en']['m11'] = 'Open a generatrix from a local file';
aLangKeys['en']['m12'] = 'Open a directrix from a local file';
aLangKeys['en']['m13'] = 'Save and download the current generatrix';
aLangKeys['en']['m14'] = 'Save and download the current directrix';

/* Menu Affichage anglais */
aLangKeys['en']['m23'] = 'Orthographic view';
aLangKeys['en']['m24'] = 'Perspective view';
aLangKeys['en']['m25'] = 'Change the current color to red green blue';
aLangKeys['en']['m26'] = 'Change the current color to white';
aLangKeys['en']['m29'] = 'Center the camera';
aLangKeys['en']['m22'] = 'Recenter the camera to its initial position';
aLangKeys['en']['m27'] = 'Show or hide graduation';
aLangKeys['en']['m28'] = 'Show or hide 3D space limits';


/* Sous menu 2D anglais */
aLangKeys['en']['meridianChoice'] = 'Generatrix choice';
aLangKeys['en']['curveOfRevolutionChoice'] = 'Directrix choice';
aLangKeys['en']['meridianFormulaInputMenu'] = 'Enter a formula for the generatrix';
aLangKeys['en']['revolFormulaInput'] = 'Enter a formula for the directrix';


aLangKeys['en']['m35'] = 'Free hand drawing';
aLangKeys['en']['m351'] = 'Draw a curve';
aLangKeys['en']['m352'] = 'Clear the curve';
aLangKeys['en']['m353'] = 'Close the curve';


/* Menu export anglais */
aLangKeys['en']['m41'] = 'Save a png file';
aLangKeys['en']['download'] = 'Save a png file of the surface';
aLangKeys['en']['downloadMeridian'] = 'Save a png file of the generatrix';
aLangKeys['en']['downloadRevolution'] = 'Save a png file of the directrix';
aLangKeys['en']['m44'] = '3D export format';

/*sous menue export 3D anglais*/
aLangKeys['en']['m441'] = 'Export the surface to x3d file';
aLangKeys['en']['m442'] = 'Export the surface to stl file useable by 3D printer';

aLangKeys['en']['s2'] = 'Generate the surface in the 3D view';
aLangKeys['en']['s3'] = 'Generate the surface in the 3D view with a brute-force algorithm';
aLangKeys['en']['s41'] = 'Display X-slice (red)';
aLangKeys['en']['s42'] = 'Display Y-slice (green)';
aLangKeys['en']['s43'] = 'Display Z-slice (blue)';


//##############################################################################
//	French
//##############################################################################



/* Menu Fichier anglais */
aLangKeys['en']['m11'] = 'Ouvrir une méridienne depuis un fichier sur cet ordinateur';
aLangKeys['en']['m12'] = 'Ouvrir une courbe de révolution depuis un fichier sur cet ordinateur';
aLangKeys['en']['m13'] = 'Enregistrer et télécharger la méridienne actuelle';
aLangKeys['en']['m14'] = 'Enregistrer et télécharger la courbe de révolution actuelle';

/* Menu Affichage anglais */
aLangKeys['en']['m23'] = 'Orthographic view';
aLangKeys['en']['m24'] = 'Perspective view';
aLangKeys['en']['m25'] = 'Change the current color to red green blue';
aLangKeys['en']['m26'] = 'Change the current color to white';
aLangKeys['en']['m29'] = 'Center the camera';
aLangKeys['en']['m22'] = 'Recenter the camera to its initial position';
aLangKeys['en']['m27'] = 'Show or hide graduation';
aLangKeys['en']['m28'] = 'Show or hide 3D space limits';


/* Sous menu 2D anglais */
aLangKeys['en']['meridianChoice'] = 'Generatrix choice';
aLangKeys['en']['curveOfRevolutionChoice'] = 'Directrix choice';
aLangKeys['en']['meridianFormulaInputMenu'] = 'Enter a formula for the generatrix';
aLangKeys['en']['revolFormulaInput'] = 'Enter a formula for the directrix';


aLangKeys['en']['m35'] = 'Free hand drawing';
aLangKeys['en']['m351'] = 'Draw a curve';
aLangKeys['en']['m352'] = 'Clear the curve';
aLangKeys['en']['m353'] = 'Close the curve';


/* Menu export anglais */
aLangKeys['en']['m41'] = 'Save a png file';
aLangKeys['en']['download'] = 'Save a png file of the surface';
aLangKeys['en']['downloadMeridian'] = 'Save a png file of the generatrix';
aLangKeys['en']['downloadRevolution'] = 'Save a png file of the directrix';
aLangKeys['en']['m44'] = '3D export format';

/*sous menue export 3D anglais*/
aLangKeys['en']['m441'] = 'Export the surface to x3d file';
aLangKeys['en']['m442'] = 'Export the surface to stl file useable by 3D printer';

aLangKeys['en']['s2'] = 'Generate the surface in the 3D view';
aLangKeys['en']['s3'] = 'Generate the surface in the 3D view with a brute-force algorithm';
aLangKeys['en']['s41'] = 'Display X-slice (red)';
aLangKeys['en']['s42'] = 'Display Y-slice (green)';
aLangKeys['en']['s43'] = 'Display Z-slice (blue)';

//##############################################################################
//	Main function
//##############################################################################



$(document).ready (function () {
    // onclick behavior
    $('.lang').click (function () {
        var lang = $(this).attr ('id'); // obtain language id
        // translate all translatable elements
        $('.trtitle').each (function (i) {
			$(this).title (aLangKeys[lang][$(this).attr ('id')]);
        });
    });
});

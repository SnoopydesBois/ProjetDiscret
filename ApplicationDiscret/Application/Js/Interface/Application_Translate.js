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


var activeLang = '';


var aLangKeys = [];
aLangKeys['en'] = [];
aLangKeys['fr'] = [];

var aLangTitleKeys = [];
aLangTitleKeys['en'] = [];
aLangTitleKeys['fr'] = [];

aLangTitleKeys['en']['m21'] = 'Generate the surface on 3D Vue';
aLangTitleKeys['fr']['m21'] = 'Générer la surface dans la vue 3D';
//##############################################################################
//	English
//##############################################################################

/* Titre anglais */
aLangKeys['en']['titre'] = 'discrete revolution surface';

/* Menu Fichier anglais */
aLangKeys['en']['m1'] = 'File';
aLangKeys['en']['m11'] = 'Load Meridian';
aLangKeys['en']['m12'] = 'Load Revolution Curve';
aLangKeys['en']['m13'] = 'Save';

/* Menu Affichage anglais */
aLangKeys['en']['m2'] = 'Display';
aLangKeys['en']['m21'] = 'Camera';
aLangKeys['en']['m22'] = 'Reset';
aLangKeys['en']['m23'] = 'Orthographic';
aLangKeys['en']['m24'] = 'Add N64';
aLangKeys['en']['m25'] = 'Delete N64';
aLangKeys['en']['m26'] = 'RGB Color';
aLangKeys['en']['m27'] = 'Show/hide graduation';
aLangKeys['en']['m28'] = 'Show/hide 3D space limits';
aLangKeys['en']['m29'] = 'Center';


/* Menu Outils anglais */
aLangKeys['en']['m3'] = 'Curves';
aLangKeys['en']['m33'] = '2D Tools';
aLangKeys['en']['m34'] = '3D Tools';


/* Sous menu 2D anglais */
aLangKeys['en']['meridianChoice'] = 'The meridian';
aLangKeys['en']['curveOfRevolutionChoice'] = 'Revolution curve';
aLangKeys['en']['meridianFormulaInputMenu'] = 'Merridian formula';
aLangKeys['en']['revolFormulaInput'] = 'Revolution curve formula';
aLangKeys['en']['handFreeDrawing'] = 'Draw with free hand';
aLangKeys['en']['showSimpleParameter'] = 'Simple parameters';
aLangKeys['en']['showAdvancedParameter'] = 'Advanced parameters';
aLangKeys['en']['addMeridian'] = 'Add merridian';
aLangKeys['en']['addCurve'] = 'Add revolution curve';

/*Sous menu dessain à main levée anglais*/
aLangKeys['en']['m35'] = 'Draw with free hand';
aLangKeys['en']['m351'] = 'Drawing';
aLangKeys['en']['m352'] = 'Delete';
aLangKeys['en']['m353'] = 'Close the curve';

/* Sous menu 3D anglais */
aLangKeys['en']['dimension'] = 'Dimension';
aLangKeys['en']['repereDisplay'] = 'Display graduation';
aLangKeys['en']['voxelSize'] = 'Voxels size';
aLangKeys['en']['multiSlice'] = 'Multislices';


/* Menu export anglais */
aLangKeys['en']['m4'] = 'Export';
aLangKeys['en']['download'] = 'Export 3D Area';
aLangKeys['en']['downloadMeridian'] = 'Export Merridian';
aLangKeys['en']['downloadRevolution'] = 'Export Revolution Curve';
aLangKeys['en']['m44'] = 'Export 3D';

/*sous menue export 3D anglais*/
aLangKeys['en']['m441'] = 'Export X3D';
aLangKeys['en']['m442'] = 'Export Print X3D';





/*Menu Aide anglais*/
aLangKeys['en']['m5'] = 'Help';
aLangKeys['en']['m51'] = 'Display Help';
aLangKeys['en']['m52'] = 'About';


/* Liste des paramétres méridienne anglais */
aLangKeys['en']['mer1'] = 'List of Merridian parameters';
aLangKeys['en']['mer2'] = 'Meridian options';
aLangKeys['en']['mer3'] = 'line';
aLangKeys['en']['mer4'] = 'Sinusoid';


/* Liste des paramétres revolution anglais */
aLangKeys['en']['revol1'] = 'List of revolution parameters';
aLangKeys['en']['revol2'] = 'Revolution options';
aLangKeys['en']['revol3'] = 'Ellipse';
aLangKeys['en']['revol4'] = 'Heart';
aLangKeys['en']['revol5'] = 'Lemniscate';

/* Liste des paramétres surface anglais */
aLangKeys['en']['generate1'] = 'Generate';
aLangKeys['en']['generate2'] = 'Not optimized Generation';
aLangKeys['en']['surf3'] = 'List of surface parameters';

/*Autres champs en Anglais*/
aLangKeys['en']['a1'] = 'Angle';
aLangKeys['en']['a2'] = 'Shift';
aLangKeys['en']['a3'] = 'Delete';
aLangKeys['en']['a4'] = 'Crushing';
aLangKeys['en']['a5'] = 'Display';
aLangKeys['en']['a6'] = 'Modify';
aLangKeys['en']['a7'] = 'Generation';
aLangKeys['en']['a8'] = 'Close the curve';
aLangKeys['en']['a9'] = 'Reset';
aLangKeys['en']['a10'] = 'Center the Camera';

/*Menu surface anglais*/
aLangKeys['en']['s1'] = 'Area';
aLangKeys['en']['s2'] = 'Generate';
aLangKeys['en']['s3'] = 'Generate (brute force)';
aLangKeys['en']['s4'] = 'Display Slice';
aLangKeys['en']['s5'] = 'Delete Slices';



//##############################################################################
//	French
//##############################################################################

aLangKeys['fr']['titre'] = 'Surface de révolution discrète';

/* Menu Fichier français */
aLangKeys['fr']['m1'] = 'Fichier';
aLangKeys['fr']['m11'] = 'Charger méridienne';
aLangKeys['fr']['m12'] = 'Charger courbe de révolution';
aLangKeys['fr']['m13'] = 'Enregistrer';

/* Menu Affichage Français */
aLangKeys['fr']['m2'] = 'Affichage';
aLangKeys['fr']['m21'] = 'Caméra';
aLangKeys['fr']['m22'] = 'Réinitialiser';
aLangKeys['fr']['m23'] = 'Orthographique';
aLangKeys['fr']['m24'] = 'Ajouter N64';
aLangKeys['fr']['m25'] = 'Supprimer N64';
aLangKeys['fr']['m26'] = 'Couleur RVB';
aLangKeys['fr']['m27'] = 'Afficher/Cacher repère';
aLangKeys['fr']['m28'] = 'Afficher/Cacher limite 3D';
aLangKeys['fr']['m29'] = 'Centrer';

/* Menu Outils Franaçis */
aLangKeys['fr']['m3'] = 'Courbes';
aLangKeys['fr']['m33'] = 'Outils 2D';
aLangKeys['fr']['m34'] = 'Outils 3D';

/* Sous menu 2D français */
aLangKeys['fr']['meridianChoice'] = 'Méridiennes';
aLangKeys['fr']['curveOfRevolutionChoice'] = 'Courbe de révolution';
aLangKeys['fr']['meridianFormulaInputMenu'] = 'Formule méridienne';
aLangKeys['fr']['revolFormulaInput'] = 'formule courbe de révolution';
aLangKeys['fr']['handFreeDrawing'] = 'Dessiner à main levée';
aLangKeys['fr']['showSimpleParameter'] = 'Paramétres simple';
aLangKeys['fr']['showAdvancedParameter'] = 'Paramétres avancés';
aLangKeys['fr']['addMeridian'] = 'Ajout méridienne';
aLangKeys['fr']['addCurve'] = 'Ajout courbe de révolution';

/*Sous menu dessain à main levée français*/
aLangKeys['fr']['m35'] = 'Dessiner à main levée';
aLangKeys['fr']['m351'] = 'Dessiner';
aLangKeys['fr']['m352'] = 'Effacer';
aLangKeys['fr']['m353'] = 'Fermer la courbe';


/* Sous menu 3D français */
aLangKeys['fr']['dimension'] = 'Dimension';
aLangKeys['fr']['repereDisplay'] = 'Afficher le repère';
aLangKeys['fr']['voxelSize'] = 'Taille des voxels';
aLangKeys['fr']['multiSlice'] = 'Multicoupe';

/* Menu export français */
aLangKeys['fr']['m4'] = 'Export';
aLangKeys['fr']['download'] = 'Exporter surface 3D';
aLangKeys['fr']['downloadMeridian'] = 'Exporter méridienne';
aLangKeys['fr']['downloadRevolution'] = 'Exporter courbe de révolution';
aLangKeys['fr']['m44'] = 'Export 3D';

/* Sous menu export 3D français */
aLangKeys['fr']['m441'] = 'Export X3D';
aLangKeys['fr']['m442'] = 'Export impression X3D';

/* Menu Aide français*/
aLangKeys['fr']['m5'] = 'Aide';
aLangKeys['fr']['m51'] = 'Afficher aide';
aLangKeys['fr']['m52'] = 'À propos';

/* Liste des paramétres méridienne français */


aLangKeys['fr']['mer1'] = 'List of meridian parameters';
aLangKeys['fr']['mer1'] = 'Liste des paramètres de la méridienne';
aLangKeys['fr']['mer1'] = 'Liste des paramètres de la méridienne';
aLangKeys['fr']['mer2'] = 'Option Méridienne';
aLangKeys['fr']['mer3'] = 'ligne';
aLangKeys['fr']['mer4'] = 'Sinusoid';


/* Liste des paramétres revolution français */
aLangKeys['fr']['revol1'] = 'Liste des paramètres Révolution';
aLangKeys['fr']['revol2'] = 'Option Revolution';

/* Liste des paramètres revolution français */
aLangKeys['fr']['revol1'] = 'Liste des paramètres Révolution';
aLangKeys['fr']['revol2'] = 'Options Revolution';


/* Liste des paramètres revolution français */
aLangKeys['fr']['revol1'] = 'Liste des paramètres Révolution';
aLangKeys['fr']['revol2'] = 'Options Revolution';

aLangKeys['fr']['revol3'] = 'Ellipse';
aLangKeys['fr']['revol4'] = 'Coeur';
aLangKeys['fr']['revol5'] = 'Lemniscate';

/* Liste des paramétres surface français */
aLangKeys['fr']['generate1'] = 'Générer';
aLangKeys['fr']['generate2'] = 'Génération non optimisée';
aLangKeys['fr']['surf3'] = 'Liste des paramètres de la Surface';


/*Autres champs en Français*/
aLangKeys['fr']['a1'] = 'angle';
aLangKeys['fr']['a2'] = 'décalage';
aLangKeys['fr']['a3'] = 'Effacer';
aLangKeys['fr']['a4'] = 'ecrasement';
aLangKeys['fr']['a5'] = 'Visualiser';
aLangKeys['fr']['a6'] = 'modifier';
aLangKeys['fr']['a7'] = 'Génération';
aLangKeys['fr']['a8'] = 'Fermer la courbe';

aLangKeys['fr']['a9'] = 'Remettre à zéro';
aLangKeys['fr']['a10'] = 'Centrer la Caméra';

/*Menu surface français*/
aLangKeys['fr']['s1'] = 'Surface';
aLangKeys['fr']['s2'] = 'Générer';
aLangKeys['fr']['s3'] = 'Générer (brute force)';
aLangKeys['fr']['s4'] = 'Visualiser coupe';
aLangKeys['fr']['s5'] = 'Effacer les coupes';


//##############################################################################
//	Main function
//##############################################################################



$(document).ready (function () {
    // onclick behavior
    $('.lang').click (function () {
        activeLang = $(this).attr ('id'); // obtain language id
        // translate all translatable elements
        $('.tr').each (function (i) {
			$(this).text (aLangKeys[activeLang][$(this).attr ('id')]);			
        });		
		
		 $('.trtitle').each (function (i) {
			$(this).title (aLangTitleKeys[activeLang][$(this).attr('id')]);			
        });
		
    });
});



function translateAbout () {

	var x = document.getElementById("m52");
  
	if(x.attr('tr') == 'en') {
		$(this).href(AboutFR.html);
	}
	else {
		$(this).href(AboutEN.html);
	}
   
}



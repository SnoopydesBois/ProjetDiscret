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


/**
 * TODO
 */
Application.prototype.activeIndexLang = 0;


/**
 * TODO
 */
Application.languages = ['fr', 'en'];


/**
 * TODO
 */
var aLangKeys = [];
aLangKeys['en'] = [];
aLangKeys['fr'] = [];



//##############################################################################
//	English
//##############################################################################



/* Titre anglais */
aLangKeys['en']['titre'] = 'discrete revolution surface';


/* Menu Fichier anglais */
aLangKeys['en']['m1'] = 'File';
aLangKeys['en']['m11'] = 'Load generatrix';
aLangKeys['en']['m12'] = 'Load directrix';
aLangKeys['en']['m13'] = 'Save generatrix';
aLangKeys['en']['m14'] = 'Save directrix';


/* Menu Affichage anglais */
aLangKeys['en']['m2'] = 'Display';
aLangKeys['en']['m21'] = 'Camera';
aLangKeys['en']['m22'] = 'Reset';
aLangKeys['en']['m23'] = 'Orthographic';
aLangKeys['en']['m25'] = 'RGB color';
aLangKeys['en']['m26'] = 'White color';
aLangKeys['en']['m27'] = 'Show/hide graduation';
aLangKeys['en']['m28'] = 'Show/hide 3D space limits';
aLangKeys['en']['m29'] = 'Center';


aLangKeys['en']['m3'] = 'Curve';
aLangKeys['en']['m341'] = 'Connexity';


/* Sous menu 2D anglais */
aLangKeys['en']['meridianChoice'] = 'Generatrix';
aLangKeys['en']['curveOfRevolutionChoice'] = 'Directrix';
aLangKeys['en']['meridianFormulaInputMenu'] = 'Generatrix formula';
aLangKeys['en']['revolFormulaInput'] = 'Directrix formula';
aLangKeys['en']['handFreeDrawing'] = 'Free hand drawing';


/*Sous menu dessin à main levée anglais*/
aLangKeys['en']['m35'] = 'Free hand drawing';
aLangKeys['en']['m351'] = 'Drawing';
aLangKeys['en']['m352'] = 'Clear';
aLangKeys['en']['m353'] = 'Close the curve';


/* Sous menu 3D anglais */
aLangKeys['en']['voxelSize'] = 'Voxels size';


/* Menu export anglais */
aLangKeys['en']['m4'] = 'Export';
aLangKeys['en']['m41'] = 'Image PNG';
aLangKeys['en']['download'] = '3D Surface';
aLangKeys['en']['downloadMeridian'] = 'Generatrix';
aLangKeys['en']['downloadRevolution'] = 'Directrix';
aLangKeys['en']['m44'] = 'Export 3D';


/*sous menue export 3D anglais*/
aLangKeys['en']['m441'] = 'X3D';
aLangKeys['en']['m442'] = 'Print X3D';


/*Menu Aide anglais*/
aLangKeys['en']['m5'] = 'Help';
aLangKeys['en']['m51'] = 'Display Help';
aLangKeys['en']['m52'] = 'About';


aLangKeys['en']['c18reinfored'] = 'C-18 reinforced';
aLangKeys['en']['c6reinfored'] = 'C-6 reinforced';


/* Liste des paramétres méridienne anglais */
aLangKeys['en']['mer3'] = 'Line';
aLangKeys['en']['mer4'] = 'Sinusoid';


/* Liste des paramétres revolution anglais */
aLangKeys['en']['revol3'] = 'Ellipse';
aLangKeys['en']['revol4'] = 'Heart';
aLangKeys['en']['revol5'] = 'Lemniscate';
aLangKeys['en']['revol6'] = 'Lissajous curve';
aLangKeys['en']['revol8'] = 'Knot curve';
aLangKeys['en']['revol10'] = 'Hyperbola';
aLangKeys['en']['revol11'] = 'Folium of Descartes';
aLangKeys['en']['revol12'] = 'Waffle';
aLangKeys['en']['revol13'] = 'Atomic Lissajous';
aLangKeys['en']['revol15'] = 'Doily';


/* Liste des paramétres surface anglais */
aLangKeys['en']['generate1'] = 'Generate';
aLangKeys['en']['generate2'] = 'Generate (brute-force)';


aLangKeys['en']['xSlice'] = 'X slice';
aLangKeys['en']['ySlice'] = 'Y slice';
aLangKeys['en']['zSlice'] = 'Z slice';


/*Autres champs en Anglais*/
aLangKeys['en']['a3'] = 'Clear';
aLangKeys['en']['a5'] = 'Display';
aLangKeys['en']['a8'] = 'Close the curve';
aLangKeys['en']['a9'] = 'Reset';
aLangKeys['en']['a10'] = 'Reset the camera';

aLangKeys['en']['popUpGen'] = 'Generation...';
aLangKeys['en']['popUpAbort'] = 'Abort...';


/*Menu surface anglais*/
aLangKeys['en']['s1'] = 'Surface';
aLangKeys['en']['s2'] = 'Generate';
aLangKeys['en']['s3'] = 'Generate (brute force)';
aLangKeys['en']['s4'] = 'Display Slice';
aLangKeys['en']['s5'] = 'Deselect Slices';
aLangKeys['en']['s41'] = 'X (red)';
aLangKeys['en']['s42'] = 'Y (green)';
aLangKeys['en']['s43'] = 'Z (blue)';



//##############################################################################
//	French
//##############################################################################

aLangKeys['fr']['titre'] = 'Surface de révolution discrète';


/* Menu Fichier français */
aLangKeys['fr']['m1'] = 'Fichier';
aLangKeys['fr']['m11'] = 'Charger méridienne';
aLangKeys['fr']['m12'] = 'Charger courbe de révolution';
aLangKeys['fr']['m13'] = 'Enregistrer méridienne';
aLangKeys['fr']['m14'] = 'Enregistrer courbe de révolution';


/* Menu Affichage français */
aLangKeys['fr']['m2'] = 'Affichage';
aLangKeys['fr']['m21'] = 'Caméra';
aLangKeys['fr']['m22'] = 'Réinitialiser';
aLangKeys['fr']['m23'] = 'Orthographique';
aLangKeys['fr']['m25'] = 'Couleur RVB';
aLangKeys['fr']['m26'] = 'Couleur blanche';
aLangKeys['fr']['m27'] = 'Afficher/Cacher repère';
aLangKeys['fr']['m28'] = 'Afficher/Cacher limite 3D';
aLangKeys['fr']['m29'] = 'Centrer';

/* Menu Outils français */
aLangKeys['fr']['m3'] = 'Courbes';
aLangKeys['fr']['m341'] = 'Connexité :';


/* Sous menu 2D français */
aLangKeys['fr']['meridianChoice'] = 'Méridiennes';
aLangKeys['fr']['curveOfRevolutionChoice'] = 'Courbe de révolution';
aLangKeys['fr']['meridianFormulaInputMenu'] = 'Formule méridienne';
aLangKeys['fr']['revolFormulaInput'] = 'Formule courbe de révolution';
aLangKeys['fr']['handFreeDrawing'] = 'Dessiner à main levée';


/*Sous menu dessain à main levée français*/
aLangKeys['fr']['m35'] = 'Dessiner à main levée';
aLangKeys['fr']['m351'] = 'Dessiner';
aLangKeys['fr']['m352'] = 'Effacer';
aLangKeys['fr']['m353'] = 'Fermer la courbe';


/* Sous menu 3D français */
aLangKeys['fr']['voxelSize'] = 'Taille des voxels';


/* Menu export français */
aLangKeys['fr']['m4'] = 'Export';
aLangKeys['fr']['download'] = 'Surface 3D';
aLangKeys['fr']['downloadMeridian'] = 'Méridienne';
aLangKeys['fr']['downloadRevolution'] = 'Courbe de révolution';
aLangKeys['fr']['m44'] = 'Export 3D';

/* Sous menu export 3D français */
aLangKeys['fr']['m441'] = 'X3D';
aLangKeys['fr']['m442'] = 'Impression X3D';


/* Menu Aide français*/
aLangKeys['fr']['m5'] = 'Aide';
aLangKeys['fr']['m51'] = 'Afficher aide';
aLangKeys['fr']['m52'] = 'À propos';

aLangKeys['fr']['c18reinfored'] = 'C-18 renforcé';
aLangKeys['fr']['c6reinfored'] = 'C-6 renforcé';


/* Liste des paramétres méridienne français */
aLangKeys['fr']['mer3'] = 'Ligne';
aLangKeys['fr']['mer4'] = 'Sinusoid';


/* Liste des paramétres revolution français */
aLangKeys['fr']['revol3'] = 'Ellipse';
aLangKeys['fr']['revol4'] = 'Coeur';
aLangKeys['fr']['revol5'] = 'Lemniscate';
aLangKeys['fr']['revol6'] = 'Courbe de Lissajous';
aLangKeys['fr']['revol8'] = 'Courbe du noeud';
aLangKeys['fr']['revol10'] = 'Hyperbole';
aLangKeys['fr']['revol11'] = 'Folium de Descartes';
aLangKeys['fr']['revol12'] = 'Gauffre';
aLangKeys['fr']['revol13'] = 'Lissajous atomique';
aLangKeys['fr']['revol15'] = 'Napperon';


/* Liste des paramétres surface français */
aLangKeys['fr']['generate1'] = 'Générer';
aLangKeys['fr']['generate2'] = 'Génération (brute-force)';


aLangKeys['fr']['xSlice'] = 'Coupe en X';
aLangKeys['fr']['ySlice'] = 'Coupe en Y';
aLangKeys['fr']['zSlice'] = 'Coupe en Z';


/*Autres champs en français*/
aLangKeys['fr']['a3'] = 'Effacer';
aLangKeys['fr']['a5'] = 'Visualiser';
aLangKeys['fr']['a8'] = 'Fermer la courbe';
aLangKeys['fr']['a9'] = 'Remettre à zéro';
aLangKeys['fr']['a10'] = 'Réinitialiser la caméra';


aLangKeys['fr']['popUpGen'] = 'Génération...';
aLangKeys['fr']['popUpAbort'] = 'Annulation...';


/* Menu surface français */
aLangKeys['fr']['s1'] = 'Surface';
aLangKeys['fr']['s2'] = 'Générer';
aLangKeys['fr']['s3'] = 'Générer (brute force)';
aLangKeys['fr']['s4'] = 'Visualiser coupe';
aLangKeys['fr']['s5'] = 'Effacer les coupes';
aLangKeys['fr']['s41'] = 'X (rouge)';
aLangKeys['fr']['s42'] = 'Y (verte)';
aLangKeys['fr']['s43'] = 'Z (bleue)';



//##############################################################################
//	href translation
//##############################################################################



var translateHref = [];
translateHref['en'] = [];
translateHref['fr'] = [];

translateHref['fr']['m51'] = 'helpFR.html';
translateHref['fr']['m52'] = 'aboutFR.html';
translateHref['fr']['verifNavDownload'] = 'https://www.mozilla.org/fr/firefox/new/';
translateHref['fr']['verifNavDownload2'] = 'https://www.mozilla.org/fr/firefox/new/';

translateHref['en']['m51'] = 'helpEN.html';
translateHref['en']['m52'] = 'aboutEN.html';
translateHref['en']['verifNavDownload'] = 'https://www.mozilla.org/en-US/firefox/new/';
translateHref['en']['verifNavDownload2'] = 'https://www.mozilla.org/en-US/firefox/new/';


//##############################################################################
//	Main function
//##############################################################################



/**
 * Translate all element (HTMLtex, title and href).
 * 
 * @return {void}
 */
Application.prototype.translateAll = function () {
	this.activeIndexLang = (this.activeIndexLang + 1)
		% Application.languages.length;
	activeLang = Application.languages[this.activeIndexLang];
	
	/// translate HTMLtext
	$('.tr').each (function (i) {
		$(this).text (aLangKeys[activeLang][$(this).attr ('id')]);			
	});		

	/// translate title
	$('.trtitle').each (function (i) {
		$(this).attr ("title", 
			translateTitle[activeLang][$(this).attr ('id')]);			
	});
	
	/// translate a element
	$('.atr').each (function (i) {
		$(this).attr ("href", translateHref[activeLang][$(this).attr ('id')]);			
	});
	
};



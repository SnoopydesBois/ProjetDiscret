﻿// preparing language file
var aLangKeys=new Array();
aLangKeys['en']=new Array();
aLangKeys['fr']=new Array();
/*Menu Fichier Anglais*/
aLangKeys['en']['m1']='File';
aLangKeys['en']['m11']='New';
aLangKeys['en']['m12']='Open';
aLangKeys['en']['m13']='save';
/*Menu Affichage Anglais*/
aLangKeys['en']['m2']='Display';
aLangKeys['en']['m21']='Generate';
aLangKeys['en']['m22']='Center the camera';
aLangKeys['en']['m23']='Orthographic';
aLangKeys['en']['m24']='Add N64';
aLangKeys['en']['m25']='Delete N64';
aLangKeys['en']['m26']='RGB Color';

/*Menu Outils Anglais*/
aLangKeys['en']['m3']='Tools';
aLangKeys['en']['m31']='Cancel';
aLangKeys['en']['m32']='Again';
aLangKeys['en']['m33']='2D Tools';
aLangKeys['en']['m34']='3D Tools';


/*sous menu 2D Anglais*/
aLangKeys['en']['m331']='The meridian';
aLangKeys['en']['m332']='Revolution curve';
aLangKeys['en']['m333']='Merridian formula';
aLangKeys['en']['m334']='Revolution curve formula';
aLangKeys['en']['m335']='Draw with free hand';
aLangKeys['en']['m336']='Simple parameters';
aLangKeys['en']['m337']='Advanced parameters';
aLangKeys['en']['m338']='Add merridian';
aLangKeys['en']['m339']='Add revolution curve';

/*sous menu 3D Anglais*/
aLangKeys['en']['m341']='Connexity';
aLangKeys['en']['m342']='Dimension';
aLangKeys['en']['m343']='Display graduation';
aLangKeys['en']['m344']='Voxels size';
aLangKeys['en']['m345']='Multislices';


/*Menu export anglais*/
aLangKeys['en']['m4']='Export';
aLangKeys['en']['m41']='Download as image';
aLangKeys['en']['m42']='Export 3D';

/*sous menue export 3D anglais*/
aLangKeys['en']['m421']='Export X3D';
aLangKeys['en']['m422']='Export Print X3D';

/*Menu Aide anglais*/
aLangKeys['en']['m5']='Help';
aLangKeys['en']['m51']='Display Help';
aLangKeys['en']['m52']='About';


/*Liste des paramétres méridienne anglais*/
aLangKeys['en']['mer1']='List of Merridian parameters';
aLangKeys['en']['mer2']='Meridian options';
aLangKeys['en']['mer3']='line';
aLangKeys['en']['mer4']='Sinusoid';


/*Liste des paramétres revolution anglais*/
aLangKeys['en']['revol1']='List of revolution parameters';
aLangKeys['en']['revol2']='Revolution options';
aLangKeys['en']['revol3']='Circle';
aLangKeys['en']['revol4']='Heart';
aLangKeys['en']['revol5']='Lemniscate';

/*Liste des paramétres surface anglais*/
aLangKeys['en']['surf1']='Generate';
aLangKeys['en']['surf2']='Generation not optimized';
aLangKeys['en']['surf3']='List of surface parameters';

/************************************************************/
/*Menu Fichier français*/
aLangKeys['fr']['m1']='Fichier';
aLangKeys['fr']['m11']='Nouveau';
aLangKeys['fr']['m12']='Ouvrir';
aLangKeys['fr']['m13']='Enregistrer';

/*Menu Affichage Français*/
aLangKeys['fr']['m2']='Affichage';
aLangKeys['fr']['m21']='Générer';
aLangKeys['fr']['m22']='Centrer La caméra';
aLangKeys['fr']['m23']='Orthographique';
aLangKeys['fr']['m24']='Ajouter N64';
aLangKeys['fr']['m25']='Supprimer N64';
aLangKeys['fr']['m26']='Couleur RVB';

/*Menu Outils Franaçis*/
aLangKeys['fr']['m3']='Outils';
aLangKeys['fr']['m31']='Annuler';
aLangKeys['fr']['m32']='Refaire';
aLangKeys['fr']['m33']='Outils 2D';
aLangKeys['fr']['m34']='Outils 3D';

/*sous menu 2D français*/
aLangKeys['fr']['m331']='Méridiennes';
aLangKeys['fr']['m332']='Courbe de révolution';
aLangKeys['fr']['m333']='Formule méridienne';
aLangKeys['fr']['m334']='formule courbe de révolution';
aLangKeys['fr']['m335']='Dessiner à main levée';
aLangKeys['fr']['m336']='Paramétres simple';
aLangKeys['fr']['m337']='Paramétres avancés';
aLangKeys['fr']['m338']='Ajout méridienne';
aLangKeys['fr']['m339']='Ajout courbe de révolution';

/*sous menu 3D français*/
aLangKeys['fr']['m341']='Connexité';
aLangKeys['fr']['m342']='Dimension';
aLangKeys['fr']['m343']='Afficher le repére';
aLangKeys['fr']['m344']='Taille des voxels';
aLangKeys['fr']['m345']='multicoupes';

/*Menu export Français*/
aLangKeys['fr']['m4']='Export';
aLangKeys['fr']['m41']='Télecharger comme image';
aLangKeys['fr']['m42']='Export 3D';

/*sous menue export 3D Français*/
aLangKeys['fr']['m421']='Export X3D';
aLangKeys['fr']['m422']='Export impression X3D';

/*Menu Aide Français*/
aLangKeys['fr']['m5']='Aide';
aLangKeys['fr']['m51']='Afficher aide';
aLangKeys['fr']['m52']='À propos';

/*Liste des paramétres méridienne français*/
aLangKeys['fr']['mer1']='List of meridian parameters';
aLangKeys['fr']['mer2']='Option Méridienne';
aLangKeys['fr']['mer3']='ligne';
aLangKeys['fr']['mer4']='Sinusoid';

/*Liste des paramétres revolution français*/
aLangKeys['fr']['revol1']='Liste des paramètres Révolution';
aLangKeys['fr']['revol2']='Option Revolution';
aLangKeys['fr']['revol3']='Cercle';
aLangKeys['fr']['revol4']='Coeur';
aLangKeys['fr']['revol5']='Lemniscate';

/*Liste des paramétres surface français*/
aLangKeys['fr']['surf1']='Générer';
aLangKeys['fr']['surf2']='Génération non optimisée';
aLangKeys['fr']['surf3']='Liste des paramètres de la Surface';

$(document).ready(function() {

    // onclick behavior
    $('.lang').click( function() {
        var lang = $(this).attr('id'); // obtain language id

        // translate all translatable elements
        $('.tr').each(function(i){
			$(this).text(aLangKeys[lang][ $(this).attr('key') ]);
        });

    } );

});
// preparing language file
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
aLangKeys['en']['m22']='Center the Camera';

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

/*Liste des paramétres méridienne anglais*/
aLangKeys['en']['xx1']='List of the meridian parameters';

/************************************************************/
/*Menu Fichier français*/
aLangKeys['fr']['m1']='Fichier';
aLangKeys['fr']['m11']='Nouveau';
aLangKeys['fr']['m12']='Ouvrir';
aLangKeys['fr']['m13']='Enregistrer';

/*Menu Affichage Français*/
aLangKeys['fr']['m2']='Affichage';
aLangKeys['fr']['m21']='Générer';
aLangKeys['fr']['php']='Centrer la caméra';

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


/*Liste des paramétres méridienne français*/
aLangKeys['fr']['xx1']='Liste des paramétres méridienne';




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
// preparing language file
var aLangKeys=new Array();
aLangKeys['en']=new Array();
aLangKeys['ru']=new Array();

aLangKeys['en']['home']='Home';
aLangKeys['en']['peoples']='Peoples >>';
aLangKeys['en']['all_list']='All list';
aLangKeys['en']['online']='Online';
aLangKeys['en']['articles']='Articles >>';
aLangKeys['en']['js']='JavaScript';
aLangKeys['en']['php']='PHP';
aLangKeys['en']['html']='HTML';
aLangKeys['en']['css']='CSS';
aLangKeys['en']['contact_us']='Contact us';
aLangKeys['en']['welcome']='Welcome guests';

aLangKeys['ru']['home']='Главная';
aLangKeys['ru']['peoples']='Пользователи >>';
aLangKeys['ru']['all_list']='Весь список';
aLangKeys['ru']['online']='В сети';
aLangKeys['ru']['articles']='Статьи >>';
aLangKeys['ru']['js']='Яваскрипт';
aLangKeys['ru']['php']='ПХП';
aLangKeys['ru']['html']='ХТМЛ';
aLangKeys['ru']['css']='КСС';
aLangKeys['ru']['contact_us']='Напишите нам';
aLangKeys['ru']['welcome']='Добро пожаловать';


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
Lancer l'application :
Ouvrir le fichier discreteSurace.html dans un navigateur. L'application a
uniquement été testée sous firefox.

Génération :
L'image est rafraichie avant la fin de la génération, il ne faut donc pas
s'étonner que la surface soit incomplète jusqu'à ce que le message en bas de la
fenêtre indique "Finished".

Workers :
Les workers (threads pour javascript) peuvent être bloqués pour des raisons de
sécurité par le navigateur (notamment chrome) lorsque les fichiers sources sont
en local (une fois le site hébergé sur un serveur, les workers fonctionnent sur
tous les navigateurs récents).
Pour lever ce bloquage il existe plusieurs solutions :
* Accéder au site à l'aide d'un seveur local
* Sous Firefox, mettre le paramètre security.fileuri.strict_origin_policy à 
  false (toutes les versions de Firefox ne pose pas problème, il semblera que
  cela dépende des plugins installés).
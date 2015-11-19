/**
 * test.js
 * 
 * author : abisutti
 * created : Wed, 18 Nov 2015 16:21:06 +0100
 * modified : Wed, 18 Nov 2015 16:21:06 +0100
 */


Coque.prototype.constructor = Coque;

function Coque (d) {
	this.data = d;
}

Coque.prototype.dump = function () {
	console.log ("(" + this.data + ")");
}

Coque.prototype.to_string = function () {
	return ("(" + this.data + ")");
}

Coque.prototype.set = function (val) {
	this.data = val;
}
//==============================================================================

A.prototype.constructor = A;

function A () {
	this.att1 = new Coque ("A.att1");
	this.att2 = new Coque ("A.att2");
	this.att3 = new Coque ("A.att3");
}

A.prototype.dump = function () {
	console.log ("--- A.dump ---");
	this.att1.dump ();
	this.att2.dump ();
	this.att3.dump ();
	console.log ("--- Fin A.dump ---");
}


//==============================================================================

Cadeau.prototype.constructor = Cadeau;

function Cadeau (msg, data) {
	this.cadeau = data;
	this.whoami = msg;
}

Cadeau.prototype.dump = function () {
	console.log (this.whoami + " : " + this.cadeau.to_string ());
}


//==============================================================================

function exploite (cad) {
	console.log ("Cadeau reçu :");
	cad.dump();
	console.log ("Modification du cadeau, set de la valeur 'modified'");
	cad.cadeau.set ("modified");
	cad.dump();
}


//==============================================================================



var a = new A ();

var c1 = new Cadeau ("Cadeau avec référence", a.att1);
var c2 = Object.freeze (new Cadeau ("CADEAU FREEZE avec référence", a.att2));
var c3 = new Cadeau ("Cadeau avec RÉFÉRENCE FREEZE", Object.freeze (a.att3));


console.log ("============= AVANT : =============");
a.dump ();
c1.dump ();
c2.dump ();
c3.dump ();

console.log ("============= EXPLOITE : =============");
console.log ("-- EXPLOITATION DU CADEAU 1 --");
exploite (c1);
console.log ("-- EXPLOITATION DU CADEAU 2 --");
exploite (c2);
console.log ("-- EXPLOITATION DU CADEAU 3 --");
exploite (c3);

console.log ("============= RES : =============");
a.dump ();
c1.dump ();
c2.dump ();
c3.dump ();

console.log ("============= MODIF DE A : =============");
a.att1.set ("MODIFICATION DE att1 PAR A");
a.dump ();
c1.dump ();
c2.dump ();
c3.dump ();

console.log ("============= MODIF att2, att3 PAR c2, c3 SANS METHODE SET PAR LA VALEUR 'modif sans set': =============");
c2.cadeau.data = "modif sans set"
c3.cadeau.data = "modif sans set"
a.dump ();
c1.dump ();
c2.dump ();
c3.dump ();


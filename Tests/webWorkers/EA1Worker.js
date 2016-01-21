importScripts("Math.js");
importScripts("Equation.js");
importScripts("Vector.js");

var dimension;
var implicit_curve;
var explicit_curve;

// onmessage = function(e) {
  // console.log('Message reçu du script principal');
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  // console.log('Renvoi d\'un message au script principal');
  // postMessage(workerResult);
// }

onmessage = function(e){
	if (e.data == 20) console.log(e.data);
}

//postMessage("truc");
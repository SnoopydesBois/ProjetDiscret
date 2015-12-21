console.log(math.eval('sqrt(3^2 + 4^2)'));


var scope = { 'a' : 3, 'b' : 4};
var blah = "c"
scope[blah] = 5;
blah = "d";
console.log(scope);
console.log(math.parse('a+b').compile());
//math.eval("a+b");

//console.log(math.parse('+-+-+-+-'));

try{
math.compile("18 285");
}
catch(e){
	console.log(e instanceof SyntaxError);
}

try{
console.log(math.compile('+-+-+-+-'));
}
catch(e){
	console.log(e.name + ":" + e.message);
}


console.log(math.parse('qsdfiusdfqiuyqsdfihu'));

var listParameters = new Array();
listParameters['a'] = 1;
listParameters['b'] = 2;

console.log(listParameters['b']);


console.log(listParameters);
for (var i in listParameters){
	console.log("i : " + i + ", listParameters[i] : " + listParameters[i]);
}


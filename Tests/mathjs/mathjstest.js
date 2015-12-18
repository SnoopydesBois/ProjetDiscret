console.log(math.eval('sqrt(3^2 + 4^2)'));


var scope = { a : 3, b : 4}
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

var listParameters = [];
listParameters['a'] = 1;
listParameters['b'] = 2;

console.log(listParameters['b']);
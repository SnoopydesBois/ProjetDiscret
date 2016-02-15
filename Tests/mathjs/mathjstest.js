console.log(math.eval('sqrt(3^2 + 4^2)'));


var scope = { 'a' : 3, 'b' : 4, 'x':0, 'y' : 0};
var blah = "c"
scope[blah] = 5;
blah = "d";
console.log(scope);
console.log(math.parse('a+b').compile());


console.log("dot( [1, 0],[x,y]/norm( [x, y] ) )")
var node = math.parse("dot( [0, 0],[x,y]/norm( [x, y] ) )");
// console.log(node);
// node.traverse(function(node, path, parent){
	// console.log(node.type +":"+node.name);
// });
console.log("eval : " + node.compile().eval(scope));


/*console.log("a+y")
var node1 = math.parse("a+y");
node1.traverse(function(node, path, parent){
	console.log(node.type +":"+node.name);
});
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


console.log(listParameters);
console.log("test des node.name")
math.parse('a*x+b*y').forEach(function (node, path, parent) {
		console.log(node.type + ":" + node.name);
});
*/
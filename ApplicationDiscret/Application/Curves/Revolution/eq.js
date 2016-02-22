
function MeridianeEquation() {
		var input = document.getElementById("meridianFormulaInput");
		console.log(input.value);	
}

function RevolutionEquation() {
		var input = document.getElementById("revolutionFormulaInput");
		console.log(input.value);	
		
		var equation = new Equation(input);
		var x = new ImplicitCurve(equation);
		
		
		
}


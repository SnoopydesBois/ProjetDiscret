BatEquation.prototype = new Equation;
BatEquation.prototype.constructor = BatEquation;

//==============================================================================
/**
* @constructor
*/
function BatEquation() {
	Equation.call(this, "");
	this.formule = [];
	
	//Portion de courbe 1
	this.formule[0][0] = math.parse("x^2/(49*0.14^2) + (y^2/(9*0.14^2)) - 1"); // x^2/(49*a^2) + (y^2/(9*a^2)) - 1 <= 0
	this.formule[0][1] = math.parse("Abs(x/0.14) - 3"); //Abs[x/a] >= 3
	this.formule[0][2] = math.parse("-3*Sqrt(33)/7 - y/0.14");//-3*Sqrt[33]/7 <= y/a
	
	//Portion de courbe 2
	this.formule[1][0] = math.parse("-3 - y/0.14"); // -3 <= y/a
	this.formule[1][1] = math.parse("y/0.14"); //y/a <= 0
	this.formule[1][2] = math.parse("-4 - x/0.14"); //-4 <= x/a
	this.formule[1][3] = math.parse("x/0.14 - 4"); //x/a <= 4
	this.formule[1][4] = math.parse(" -(3*Sqrt(33) - 7)*x^2/(112*0.14^2) + Abs(x/0.14)/2 + Sqrt((1 - (Abs(Abs(x/0.14) - 2) - 1)^2)) - y/0.14 - 3"); //-(3*Sqrt[33] - 7)*x^2/(112*a^2) + Abs[x/a]/2 + Sqrt[(1 - (Abs[Abs[x/a] - 2] - 1)^2)] - y/a - 3 <= 0
	
	//portion de courbe 3
	this.formule[2][0] = math.parse("y"); // y >= 0
	this.formule[2][1] = math.parse("3/4 - Abs(x/0.14) "); //3/4 <= Abs[x/a]
	this.formule[2][2] = math.parse("Abs(x/0.14) - 1"); //Abs[x/a] <= 1
	this.formule[2][3] = math.parse("-8*Abs(x/0.14) - y/0.14 + 9"); //-8*Abs[x/a] - y/a + 9 >= 0
	
	//portion de courbe 4
	this.formule[3][0] = math.parse("1/2 - Abs(x/0.14)"); //1/2 <= Abs[x/a]
	this.formule[3][1] = math.parse("Abs(x/0.14) - 3/4"); //Abs[x/a] <= 3/4
	this.formule[3][2] = math.parse("3*Abs(x/0.14) - y/0.14 + 3/4"); //3*Abs[x/a] - y/a + 3/4 >= 0
	this.formule[3][3] = math.parse("y"); //y >= 0
	
	//portion de courbe 5
	this.formule[4][0] = math.parse("Abs(x/0.14) - 1/2"); //Abs[x/a] <= 1/2
	this.formule[4][1] = math.parse("y"); // y >= 0
	this.formule[4][2] = math.parse("9/4 - y/0.14"); // 9/4 - y/a >= 0
	
	//portion de courbe 6
	this.formule[5][0] = math.parse("1 - Abs(x/0.14)"); //1 <= Abs[x/a]
	this.formule[5][1] = math.parse("Abs(x/0.14) - 3"); //Abs[x/a] <= 3
	this.formule[5][2] = math.parse("y"); // y >= 0 
	this.formule[5][3] = math.parse("-Abs(x/0.14)/2 - 3*Sqrt(10)*Sqrt(4 - (Abs(x/0.14) - 1)^2)/7 - y/0.14 + 6*Sqrt(10)/7 + 3/2"); //-Abs(x/a)/2 - 3*Sqrt[10]*Sqrt[4 - (Abs[x/a] - 1)^2]/7 - y/a + 6*Sqrt[10]/7 + 3/2 >= 0
};
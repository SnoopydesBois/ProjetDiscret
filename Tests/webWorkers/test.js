
var meridian = new ExplicitCurve("cos(x/9.0)*10.0");
var revol = new ImplicitCurve("x^2 + y^2 - 1");
var dimension = new Vector(21,21,21);

w = new BruteAlgoWorker(meridian, revol, dimension);

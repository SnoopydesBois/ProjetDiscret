/**
* Fragment shader for the application
*/
var fragSrc =
  "precision mediump float;\n"
+ "\n"
+ "varying vec4 vColor;\n"
+ "varying vec3 vPos;\n"
+ "\n"
+ "uniform vec3 uDimension;\n"
+ "uniform int uMode;\n"
+ "\n"
+ "\n"
+ "void main (void) {\n"
+ "	vec4 tight = vec4(0.05, 0.95, 0.05, 0.95); // values\n"
+ "	float m = max (max (uDimension.x, uDimension.y), uDimension.z);\n"
+ "	vec3 pos = ((vPos * m) + uDimension) / 2.0;\n"
+ "	if (uMode == 1) { // Rendering the repere (DOTTED = 1)\n"
+ "		 // Pixel coordinates on the screen\n"
+ "		bool dot = false;\n"
+ "		\n"
+ "		int nb = 0; // We count the number of coordinates that are integers\n"
+ "		if (step(tight[2], fract(pos.x)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.x)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.x), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[2], fract(pos.y)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.y)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.y), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[2], fract(pos.z)) == 0.0 \n"
+ "			|| step(tight[3], fract(pos.z)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "		else if (mod(fract(pos.z), 0.4) > 0.2) {\n"
+ "			dot = true;\n"
+ "		}\n"
+ "		\n"
+ "	    // If there is only one integer coordinate, we render normally\n"
+ "		if (nb >= 2 && !dot) {\n"
+ "			float colorX = vColor.x * 0.8;\n"
+ "			float colorY = vColor.y * 0.8;\n"
+ "			float colorZ = vColor.z * 0.8; \n"
+ "			gl_FragColor = vec4(colorX, colorY, colorZ, 1.0);\n"
+ "		}\n"
+ "		// The pixel is on a line, we draw\n"
+ "		else {\n"
+ "			gl_FragColor = vColor;\n"
+ "			\n"
+ "		}\n"
+ "	}\n"
+ "	else if (uMode == 2) { // If picking we render the model without lines (PICKING = 2)\n"
+ "		gl_FragColor = vColor;\n"
+ "	}\n"
+ "	else {\n"
+ "		 // Pixel coordinates on the screen\n"
+ "\n"
+ "		int nb = 0; // We count the number of coordinates that are integers\n"
+ "		if (step(tight[0], fract(pos.x)) == 0.0 \n"
+ "			|| step(tight[1], fract(pos.x)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[0], fract(pos.y)) == 0.0 \n"
+ "			|| step(tight[1], fract(pos.y)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "	\n"
+ "		if (step(tight[0], fract(pos.z)) == 0.0 \n"
+ "			|| step(tight[1], fract(pos.z)) == 1.0) {\n"
+ "			nb++;\n"
+ "		}\n"
+ "	    // If there is only one integer coordinate, we render normally\n"
+ "		if (nb < 2) {\n"
+ "			gl_FragColor = vColor;\n"
+ "		}\n"
+ "		else {\n"
+ "			// The pixel is on a line, we draw more darkly\n"
+ "			float colorX = vColor.x * 0.7;\n"
+ "			float colorY = vColor.y * 0.7;\n"
+ "			float colorZ = vColor.z * 0.7;\n"
+ "			"
+ "			gl_FragColor = vec4(colorX, colorY, colorZ, 1.0);\n"
+ "		}\n"
+ "	} // end switch uMode\n"
+ "}";

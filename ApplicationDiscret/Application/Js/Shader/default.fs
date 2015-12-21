precision mediump float;

varying vec4 vColor;
varying vec3 vPos;

uniform int uMode;


void main(void) {
	vec4 tight = vec4(0.05, 0.95, 0.05, 0.95); // values
	if (uMode == 0) { // Rendering the repere
		 // Pixel coordinates on the screen
		vec3 pos = ((vPos + 1.0) / 2.0) * 25.0;
		bool dot = false;
		
		int nb = 0; // We count the number of coordinates that are integers
		if (step(tight[2], fract(pos.x)) == 0.0 
			|| step(tight[3], fract(pos.x)) == 1.0) {
			nb++;
		}
		else if (mod(fract(pos.x), 0.4) > 0.2) {
			dot = true;
		}
	
		if (step(tight[2], fract(pos.y)) == 0.0 
			|| step(tight[3], fract(pos.y)) == 1.0) {
			nb++;
		}
		else if (mod(fract(pos.y), 0.4) > 0.2) {
			dot = true;
		}
	
		if (step(tight[2], fract(pos.z)) == 0.0 
			|| step(tight[3], fract(pos.z)) == 1.0) {
			nb++;
		}
		else if (mod(fract(pos.z), 0.4) > 0.2) {
			dot = true;
		}
		
	    // If there is only one integer coordinate, we render normally
		if (nb >= 2 && !dot) {
			float colorX = vColor.x * 1.8;
			float colorY = vColor.y * 1.8;
			float colorZ = vColor.z * 1.8; 
			gl_FragColor = vec4(colorX, colorY, colorZ, 1.0);
		}
		// The pixel is on a line, we draw
		else {
			gl_FragColor = vColor;
			
		}
	}
	else if (uMode == 1) { // If picking we render the model without lines
		gl_FragColor = vColor;
	}
	else {
		 // Pixel coordinates on the screen
		vec3 pos = ((vPos + 1.0) / 2.0) * 25.0;

		int nb = 0; // We count the number of coordinates that are integers
		if (step(tight[0], fract(pos.x)) == 0.0 
			|| step(tight[1], fract(pos.x)) == 1.0) {
			nb++;
		}
	
		if (step(tight[0], fract(pos.y)) == 0.0 
			|| step(tight[1], fract(pos.y)) == 1.0) {
			nb++;
		}
	
		if (step(tight[0], fract(pos.z)) == 0.0 
			|| step(tight[1], fract(pos.z)) == 1.0) {
			nb++;
		}
	    // If there is only one integer coordinate, we render normally
		if (nb < 2) {
			gl_FragColor = vColor;
		}
		// The pixel is on a line, we draw
		else {
			float colorX = vColor.x * 0.7;
			float colorY = vColor.y * 0.7;
			float colorZ = vColor.z * 0.7; 
			
			gl_FragColor = vec4(colorX, colorY, colorZ, 1.0);
		}
	}
}	

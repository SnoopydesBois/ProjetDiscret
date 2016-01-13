precision mediump float;

varying vec4 vColor;
varying vec3 vPos;

uniform int uMode;


void main (void) {
	if (uMode == 0) {
		gl_FragColor = vec4 (1.0, 1.0, 1.0, 1.0);
	}
	else if (uMode == 1) {
		gl_FragColor = vColor;
	}
	else { // uMode == 2
		gl_FragColor = vec4 (vPos, 1.0);
	}
}	

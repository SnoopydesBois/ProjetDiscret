attribute vec3 aPosition;
attribute vec4 aColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec4 vColor;
varying vec3 vPos;

void main (void) {
	vec3 p = aPosition * 2.0;
//	gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
	gl_Position = vec4 (p, 1.0);
	vPos = aPosition;
	vColor = aColor;
}

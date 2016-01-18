/**
* Vertex shader for the application
*/
var vertsrc=
"attribute vec3 aPosition;\n"
+"attribute vec4 aColor;\n"
+"\n"
+"uniform mat4 uProjectionMatrix;\n"
+"uniform mat4 uModelViewMatrix;\n"
+"\n"
+"varying vec4 vColor;\n"
+"varying vec3 vPos;\n"
+"\n"
+"void main(void) {\n"
+"	gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);\n"
+"	vPos = aPosition;\n"
+"	vColor = aColor;\n"
+"}\n";

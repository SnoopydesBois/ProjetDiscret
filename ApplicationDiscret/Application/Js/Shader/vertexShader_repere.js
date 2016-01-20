/**
* Vertex shader for the application
*/
var vertRepereSrc =
  "attribute vec3 aPosition;\n"
+ "attribute vec4 aColor;\n"
+ "\n"
+ "uniform mat4 uProjectionMatrix;\n"
+ "uniform mat4 uModelViewMatrix;\n"
//+ "uniform vec3 uDimension;\n"
+ "\n"
+ "varying vec4 vColor;\n"
+ "varying vec3 vPos;\n"
+ "\n"
+ "void main (void) {\n"
+ "  gl_Position = vec4 (-0.9, -0.9, 0.0, 0.0) + /*uProjectionMatrix * uModelViewMatrix */ vec4 (aPosition * 0.2, 1.0);\n"
+ "	 vPos = aPosition;\n"
+ "	 vColor = aColor;\n"
+ "}";

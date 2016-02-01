/**
 * {String} Vertex shader for the application.
 */
var vertSrc =
  "attribute vec3 aPosition;\n"
+ "attribute vec4 aColor;\n"
+ "\n"
+ "uniform mat4 uOrthographicProjectionMatrix;\n"
+ "uniform mat4 uPerspectiveProjectionMatrix;\n"
+ "uniform mat4 uModelViewMatrix;\n"
+ "uniform int uViewMode;\n"
+ "\n"
+ "varying vec4 vColor;\n"
+ "varying vec3 vPos;\n"
+ "\n"
+ "void main (void) {\n"
+ "  if (uViewMode == 1) {\n" // Perspective
+ "    gl_Position = uPerspectiveProjectionMatrix * uModelViewMatrix\n"
+ "      * vec4 (aPosition, 1.0);\n"
+ "  }\n"
+ "  else {\n" // Orthographic
+ "    gl_Position = uOrthographicProjectionMatrix * uModelViewMatrix\n"
+ "      * vec4 (aPosition, 1.0);\n"
+ "  }\n"
+ "	 vPos = aPosition;\n"
+ "	 vColor = aColor;\n"
+ "}";

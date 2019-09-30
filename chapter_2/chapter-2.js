const canvas = document.querySelector("#glcanvas")
const gl = canvas.getContext("webgl")

if(!gl) {
  alert("unable to initialize webgl")
  return
}

// 顶点着色器
const vsSource = `
  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`

// 片元着色器
const fsSource = `
  voin main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`

// 初始化着色器程序，让webgl知道如何绘制我们的数据

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  // 创建着色器程序
  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  // 创建失败
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram))
    return null
  }
  return shaderProgram
}

// 创建指定的类型的着色器，上传source源码并编译
function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("an error occurred compiling the shaders: " + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

varying float vNoise;
varying vec2 vUv;
uniform sampler2D oceanTexture;
uniform float time;

void main() {
  vec3 color1 = vec3(0.1, 0.2, .7);
  vec3 color2 = vec3(0.75, 0.75, 1.);
  vec3 color = mix(color1, color2, (vNoise + 1.) * 0.5);

  vec2 newUV = vec2(vUv.x, vUv.y + 0.005 * sin(vUv.x * 10.0 + time));
  vec4 oceanView = texture2D(oceanTexture, newUV);
//  vec2 newUV = vec2(vUv.x, vUv.y + 0.05 * vNoise);

  gl_FragColor = vec4(color, 1.0);
//  gl_FragColor = vec4(vUv, 0., 1.);

//  gl_FragColor = vec4(vUv, 0.0, 1.);
//  gl_FragColor = vec4(0.0, 0.0, 0., 1.0);
//  gl_FragColor = oceanView + vec4(vNoise);
//  gl_FragColor = vec4(vNoise, vNoise, vNoise, 1);
}


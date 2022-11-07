
varying float vNoise;
varying vec2 vUv;
uniform sampler2D oceanTexture;

void main() {
  vec3 color1 = vec3(0., 0.2, .7);
  vec3 color2 = vec3(1., 1., 1.);

  vec3 color = mix(color1, color2, (vNoise + 1.) * 0.5);
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(vUv, 0., 1.);
  gl_FragColor = texture2D(oceanTexture, vUv);
}


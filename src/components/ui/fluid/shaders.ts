export const fluidVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fluidFragmentShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    // Simple fluid-like noise
    vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
    {
        return a + b*cos( 6.28318*(c*t+d) );
    }

    void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * (iResolution.xy / min(iResolution.x, iResolution.y));
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);

        for (float i = 0.0; i < 4.0; i++) {
            uv = fract(uv * 1.5) - 0.5;

            float d = length(uv) * exp(-length(uv0));

            vec3 col = palette(length(uv0) + i*.4 + iTime*.4, vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.263,0.416,0.557));

            d = sin(d*8. + iTime)/8.;
            d = abs(d);

            d = pow(0.01 / d, 1.2);

            finalColor += col * d;
        }

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

[
    {
        name: 'damero',
        type: 'src',
        inputs: [
            { name: 'freq', type: 'float', default: 20.0 }
			,{ name: 'veloc', type: 'float', default: 1.0 }
            ,{ name: 'proporcion', type: 'float', default: 1.0 }
			,{ name: 'solidez', type: 'float', default: 0.01 }

        ],
        glsl: `return vec4(
        sin((_st.y + time * veloc) * freq * vec3(proporcion))
        * sin((_st.x) * freq) * solidez * 100.0, 1.0);
    `
    },
    {
        name: 'cuadCurv',
        type: 'src',
        inputs: [
            { name: 'a', type: 'float', default: 20.0 }
        ],
        glsl: `return vec4(
        sin((_st.x*_st.y) + time) *
        vec3(
        cos((_st.x*_st.y) + time),
        sin((_st.x*_st.y) + time),
        tan(time / (_st.y + _st.x)))
        * a
        ,1.0);`
    },
    {
        name: 'tramaRGB',
        type: 'src',
        inputs: [
            { name: 'r', type: 'float', default: 80.0 },
			{ name: 'g', type: 'float', default: 80.0 },
			{ name: 'b', type: 'float', default: 80.0 },
        ],
        glsl: `return vec4(
        cos(r*_st.y),
        sin(g*(_st.x-_st.y)),
        sin(b*(_st.x+_st.y)),
        1.0);`
    },
    {
        name: 'gradFluctua',
        type: 'src',
        inputs: [],
        glsl: `return vec4(
        _st.x,
        _st.y + sin(time),
         sin(_st.x - _st.y),
         1.0);`
    },
    {
        name: 'gradSector',
        type: 'src',
        inputs: [],
        glsl: `float v = 1.;
        if(_st.x <= 100.){ v = 2.; }
        return vec4(
        atan(_st.y,_st.x)*sin(time),
        atan(v-_st.y * time),
        step(_st.x-_st.y,-tan(-uv.y/10000.))+sin(time)*cos(time), 1.0);`
    },
    {
        name: 'estrellaCurva',
        type: 'src',
        inputs: [
            { name: 'sides', type: 'float',  default: 5.0 },
            { name: 'radius', type: 'float',  default: 0.5 },
            { name: 'smoothing', type: 'float',  default: 0.005 }
        ],
        glsl:`vec2 st = _st * 2. - 1.;
   float a = atan(st.x,st.y) + 3.14;
   float r = (2. * 3.14) / sides;
   float d = acos(floor(.4 + a / r) * r - a) * length(st);
   return vec4(vec3(1.0-smoothstep(radius,radius + smoothing + 0.2,d)), 1.0);`
    }

].forEach(ex=> { _hydra.synth.setFunction(ex); });

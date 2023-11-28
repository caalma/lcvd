[
    {
        name: 'altColor',
        type: 'color',
        inputs: [
			{ name: 'r', type: 'float', default: 1. },
			{ name: 'g', type: 'float', default: 1. },
			{ name: 'b', type: 'float', default: 1. },
		],
        glsl: `return vec4(
            _c0[0] * r,
            _c0[1] * g,
            _c0[2] * b,
            0.0);`
    },
    {
        name: 'recorte',
        type: 'color',
        inputs: [
			{ name: 'src', type: 'vec4', default: (0., 0., 0., 0., 0.) }
		],
        glsl: `return _c0 / src;`
    },
    {
    name: 'colorearTime',
    type: 'color',
    inputs: [
			 { name: 'r', type: 'float', default: 1. },
			 { name: 'g', type: 'float', default: 1. },
			 { name: 'b', type: 'float', default: 1. },
		],
    glsl: `return vec4(
					sin(_c0[0] * time * r),
					sin(_c0[1] * time * g),
					sin(_c0[2] * time * b),
					_c0[3]);`
    },

].forEach(ex=> { _hydra.synth.setFunction(ex); });

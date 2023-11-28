[
    {
        name: 'tron',
        type: 'combine',
        inputs: [
            { type: 'float', name: 'potencia', default: 1 },
			{ type: 'float', name: 'grosor', default: 10 }
        ],
        glsl:`_c1 *= potencia;
        return vec4(
					vec3(0.3)*abs(vec3(grosor)*_c0.rgb/_c1.rgb),
					max(min(_c0, _c1),1.0)
				);`
    },
    {
    name: 'cristal',
    type: 'combine',
    inputs: [],
    glsl:`return vec4(
					abs(min(_c0[0]-_c1[0], 0.5)),
					abs(min(_c1[1]-_c0[1], 0.5)),
					abs(min(_c0[2]+_c1[2], 0.5)),
				  1.0);`
    },
    {
    name: 'intercal',
    type: 'combineCoord',
    inputs: [],
    glsl: `return vec2(
					_st.y-_c0.r*_c0.b,
					_st.x-_c0.g-_c0.b
				);`
}

].forEach(ex=> { _hydra.synth.setFunction(ex); });

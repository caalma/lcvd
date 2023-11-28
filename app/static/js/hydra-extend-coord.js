[
    {
        name: 'telar',
        type: 'coord',
        inputs: [
            { name: 'freq', type: 'float', default: 1.0 },
            { name: 'mult', type: 'float', default: 1.0 }
        ],
        glsl: `return - cos(tan(cos(_st * freq) / tan(_st)) * mult)
        * mult - sin(_st.x-_st.y);`
    }

].forEach(ex=> { _hydra.synth.setFunction(ex); });


const Transicion = Tr = {
	activas: [],
	disponibles: {},
	v: {},
	actualizar: ()=> {
		for(let k of Transicion.activas){
            Transicion.disponibles[k](k);
        }
	},
	registrar: (k, fn, va, activar=false)=> {
		Transicion.disponibles[k] = fn;
		Transicion.v[k] = va;
		if(activar){
            Transicion.activar(k);
        }
	},
	activar: (k)=> {
		Transicion.activas.push(k);
	},
	desactivar: (k)=> {
		Transicion.activas = Transicion.activas.filter(v => v != k);
	},
	valor: (k)=> {
		return Transicion.v[k].n;
	},
    setear: (k, va)=> {
        for(let j of Object.keys(va)){
            Transicion.v[k][j] = va[j];
        }
    }
};


/* transiciones */
const t_line = (k) => {
	if(Tr.v[k].v > 0){
		if(Tr.v[k].n >= Tr.v[k].s){
            Tr.v[k].n = Tr.v[k].s;
        }else{
            Tr.v[k].n += Tr.v[k].v;
        }
	}
	if(Tr.v[k].v < 0){
		if(Tr.v[k].n <= Tr.v[k].i){
            Tr.v[k].n = Tr.v[k].i;
        }else{
            Tr.v[k].n += Tr.v[k].f;
        }
	}
}

const t_geom = (k) =>{
	if(Tr.v[k].v > 0){
		if(Tr.v[k].n >= Tr.v[k].s){
			Tr.v[k].n = Tr.v[k].s;
		}else{
			Tr.v[k].n += (Tr.v[k].s - Tr.v[k].n) * Tr.v[k].v;
		}
	}
	if(Tr.v[k].v < 0){
		if(Tr.v[k].n <= Tr.v[k].i){
			Tr.v[k].n = Tr.v[k].i;
		}else{
			Tr.v[k].n -= (Tr.v[k].i - Tr.v[k].n) * Tr.v[k].v;
		}
	}
}

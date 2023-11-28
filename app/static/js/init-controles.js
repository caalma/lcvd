// --- codigo principal

const pagina = 'controles';

// evalua en pagina de visor
const codigo = document.querySelector('#editing');
codigo.enviar = (v) => {
    bc.postMessage({accion: 'codigo', valor: v});
    codigo.classList.remove('error')
    estado.innerHTML = '';
};
codigo.setError = (d) => {
    if(d.accion == 'error_codigo'){
        if(d.valor){
            codigo.classList.add('error')
            estado.innerHTML = d.valor;
        }else{
            codigo.classList.add('ok');
            setTimeout(()=>codigo.classList.remove('ok'), 900);
        }
    }
};

// --- resaltado de codigo para codigo principal
const update = (t) => {
    let re = document.querySelector("#highlighting-content");
    if(t[t.length-1] == "\n") { t += " "; }
    re.innerHTML = t.replace(new RegExp("&", "g"), "&amp;")
        .replace(new RegExp("<", "g"), "&lt;");
    Prism.highlightElement(re);
}

const sync_scroll = (el) => {
    let re = document.querySelector("#highlighting");
    re.scrollTop = el.scrollTop;
    re.scrollLeft = el.scrollLeft;
}

const check_tab = (el, ev) => {
    let cod = el.value;
    if(ev.key == "Tab") {
        ev.preventDefault();
        let bt = cod.slice(0, el.selectionStart),
            at = cod.slice(el.selectionEnd, el.value.length),
            cp = el.selectionStart + 1;
        el.value = bt + "\t" + at;
        el.selectionStart = cp;
        el.selectionEnd = cp;
        update(el.value);
    }
}


// --- codigo secundario
// evalua en pagina de visor
const codigo_sec = document.querySelector('#codigo_secundario');
codigo_sec.enviar = (v) => {
    bc.postMessage({accion: 'codigo_sec', valor: v});
    codigo_sec.classList.remove('error');
    estado.innerHTML = '';
};
codigo_sec.setError = (d) => {
    if(d.accion == 'error_codigo_sec'){
        if(d.valor){
            codigo_sec.classList.add('error')
            estado.innerHTML = '[SEC] ' +  d.valor;
        }else{
            codigo_sec.classList.add('ok');
            setTimeout(()=>codigo_sec.classList.remove('ok'), 900);
        }
    }
};


// --- codigo control
// evalua en pagina de controles
const codigo_cnt = document.querySelector('#codigo_control');
codigo_cnt.enviar = (v) => {
    try{
        eval(v);
        codigo_cnt.classList.remove('error');
        codigo_cnt.classList.add('ok');
        setTimeout(()=>codigo_cnt.classList.remove('ok'), 900);
        estado.innerHTML = '';
    }catch (err){
        codigo_cnt.classList.add('error');
        estado.innerHTML = '[CNT]' + err;
    }
};


// --- estado
const estado = document.querySelector('#estado');


// --- opacidad de imagen (canvas hydra) en el visor
// evalua en pagina de visor
const opIma = document.querySelector('#op-ima');
opIma.cambiar = (v) => {
    bc.postMessage({accion: 'opacidad_imagen', valor: v});
    opIma.value = v;
};
opIma.addEventListener('change', ev => {
    opIma.cambiar(ev.target.value);
});


// --- opacidad codigo en el visor
// evalua en pagina de visor
const opCod = document.querySelector('#op-cod');
opCod.cambiar = (v) => {
    bc.postMessage({accion: 'opacidad_codigo', valor: v});
};
opCod.addEventListener('change', ev => {
    opCod.cambiar(ev.target.value);
});


// --- velocidad - speed de hydra
// evalua en pagina de visor
const velocidad = document.querySelector('#velocidad');
velocidad.addEventListener('change', ev => {
    bc.postMessage({accion: 'velocidad', valor: ev.target.value});
});


// --- grabar / memorizar estado actual de los codigos
// evalua en pagina de controles
const grabarCodigos = document.querySelector('#grabar-codigos');
grabarCodigos.addEventListener('click', ev => {
    CC.grabar('0-visuales-ultima', 'c1')
    CC.grabar('0-visuales-ajustes', 'c2')
    CC.grabar('0-control-basica', 'c3')
});


// --- cmdflash - utilidad para ejecturar codigos con historial
// evalua en pagina de controles
const cmdflash = document.querySelector('#cmdflash');
cmdflash.activar = () => {
    cmdflash_cmp.classList.remove('error');
    cmdflash.classList.add('activo');
    cmdflash_cmp.focus();
    cmdflash_hst.posicion = 0;
    cmdflash_hst.limpiar_seleccion();
}

const cmdflash_cmp = document.querySelector('#cmdflash-cmp'),
      cmdflash_hst = document.querySelector('#cmdflash-hst');
cmdflash_hst.agregar = (text) => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(text));
    cmdflash_hst.appendChild(li);
}

cmdflash_hst.posicion = undefined;

cmdflash_hst.seleccionar = (n) => {
    let items = cmdflash_hst.querySelectorAll('li');
    cmdflash_hst.posicion = (cmdflash_hst.posicion + n) % items.length;
    cmdflash_cmp.value = (items[cmdflash_hst.posicion].textContent);
    cmdflash_hst.limpiar_seleccion();
    items[cmdflash_hst.posicion].classList.add('actual');
}

cmdflash_hst.limpiar_seleccion = () => {
    let items = cmdflash_hst.querySelectorAll('li');
    items.forEach(el => el.classList.remove('actual'));
}

cmdflash_cmp.addEventListener('keydown', ev => {
    if(ev.key == 'Escape'){
        ev.preventDefault();
        cmdflash.classList.remove('activo');
        estado.innerHTML = '';

    }
    if(ev.key == 'Enter'){
        if(ev.ctrlKey){
            ev.preventDefault();
            try{
                let cmd = ev.target.value;
                eval(cmd);
                cmdflash.classList.remove('activo');
                cmdflash_hst.agregar(cmd);
                estado.innerHTML = '';
            }catch(err){
                cmdflash_cmp.classList.add('error');
                estado.innerHTML = err;

            }
        }
    }
    if(ev.key == 'ArrowDown' && ev.altKey){
        cmdflash_hst.seleccionar(1);
    }else if(ev.key == 'ArrowUp' && ev.altKey){
        cmdflash_hst.seleccionar(-1);
    }else{
        cmdflash_hst.limpiar_seleccion();

    }
});


// --- recepcion de broadcast channel
bc.addEventListener('message', ev => {
    codigo.setError(ev.data);
    codigo_sec.setError(ev.data);
});


// --- atajos de teclas
[codigo, codigo_sec, codigo_cnt].forEach(el => {
    el.addEventListener('keydown', ev => {
        if(ev.key == 'Escape'){
            ev.preventDefault();
            let cmd = ev.target.value.trimEnd() + '\n';

            if(ev.ctrlKey){
                let p0 = ev.target.selectionStart,
                    pa = ev.target.selectionEnd,
                    pi = cmd.lastIndexOf('\n', pa),
                    pf = cmd.indexOf('\n', pa);

                if(p0 == pa){
                    cmd = cmd.substring(pi, pf)
                }else{
                    cmd = cmd.substring(p0, pa)
                }
            }
            el.enviar(cmd);
        }
    });
});

[codigo, codigo_sec, codigo_cnt, cmdflash_cmp].forEach(el => {
    el.addEventListener('keydown', ev => {
        let val_ins = {'{':'{}', '(':'()', '[':'[]', '"': '""', "'": "''"};
        if(Object.keys(val_ins).indexOf(ev.key) > -1){
            ev.preventDefault();

            textarea_insert_text(ev.target, val_ins[ev.key]);
            if(el.id == 'editing'){
                update(el.value);
            }
        }
    });
});

document.addEventListener('keydown', ev => {
    //console.log(ev);
    if(ev.key == 'F1') {
        ev.preventDefault();
        codigo.focus();
    }
    if(ev.key == 'F2') {
        ev.preventDefault();
        codigo_sec.focus();
    }
    if(ev.key == 'F3') {
        ev.preventDefault();
        codigo_cnt.focus();
    }
    if(ev.key == 'F4') {
        ev.preventDefault();
        Auxiliar.focus();
    }

    if(ev.key == 'F5') {
        ev.preventDefault();
        Notas.focus()
    }
    if(ev.key == 'F6') {
        ev.preventDefault();
        opIma.focus()
    }
    if(ev.key == 'F7') {
        ev.preventDefault();
        opCod.focus()
    }
    if(ev.key == 'F8') {
        ev.preventDefault();
        velocidad.focus()
    }
    if(ev.key == 'x' && ev.altKey) {
        ev.preventDefault();
        cmdflash.activar()
    }
});


// --- inicializar
Auxiliar.activar('#auxiliar');
Notas.activar('#notas');

[opIma, opCod, codigo].forEach(el =>  el.dispatchEvent(evChange));
[codigo].forEach(el =>  el.dispatchEvent(evInput));

CC.leer('0-visuales-ultima', 'c1')
CC.leer('0-visuales-ajustes', 'c2')
CC.leer('0-control-basica', 'c3')

tema(0)

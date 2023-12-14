// --- funcionalidades de códigos

const CC = {
    grabar: (nom, target='c1', ext='.js') => {
        // --- graba el contenido de un campo de código en el archivo indicado
        let el = CC.target(target),
            ne = nom + ext;
        ajax_post('/codigo/grabar/', {nombre: ne, 'texto': el.value });
    },

    leer: (nom, target='c1', ext='.js') => {
        // --- lee el codigo según el nombre de archivo indicado
        let el = CC.target(target),
            ne = nom + ext
        ajax_post('/codigo/leer/', {nombre: ne}, resp => {
            el.value = resp;
            el.dispatchEvent(evChange);
            el.dispatchEvent(evInput);
        });
    },

    ejecutar: (nom, ext='.js', cb_ok=()=>{}, cb_err=()=>{}) => {
        // --- ejecuta el código correspondiente al nombre directamente en el visor
        let ne = nom + ext;
        ajax_post('/codigo/leer/', {nombre: ne}, cb_ok, cb_err);
    },

    lista: (cb_ok = ()=>{}) => {
        // --- lista los archivos de codigos disponibles
        ajax_post('/codigos/', {}, resp => {
            cb_ok(resp.trim().split('\n'));
        });
    },

    target: (t) => {
        // --- obtiene el elemento correspondiente
        if(t == 'c1'){
            return codigo;
        }else if(t == 'c2'){
            return codigo_sec;
        }else if(t == 'c3'){
            return codigo_cnt;
        }else{
            return undefined;
        }
    }
}


const tema = (n) => {
    // --- actualiza la variable tema_actual, tanto en la pestaña de controles como de visor
    tema_actual = temas_disponibles[n];
    bc.postMessage({accion: 'codigo_sec', valor: `tema_actual = "${tema_actual}"`});
}



const i = (n) => {
    // --- obtiene la imagen correspondiente al indice n del grupo grupo correspondiente al tema actual
    let t = recursos_imagen[tema_actual].length,
        i = (n - 1) % t,
        u = URLimagenes + recursos_imagen[tema_actual][i];
    return u;
}



const v = (n) => {
    // --- obtiene el video correspondiente al indice n del grupo grupo correspondiente al tema actual
    let t = recursos_video[tema_actual].length,
        i = (n - 1) % t,
        u = URLvideos + recursos_video[tema_actual][i];
    return u;
}



const nui = (lista) => {
    // --- numera los items de una lista
    let r = [], i;
    for (i=0; i < lista.length; i++){
        r.push('[' + (i+1) + '] ' + lista[i])
    }
    return r;
}



const lsk = (obj) => {
    // --- lista las claves de un objeto
    return Object.keys(obj);
}



const format_code = (code) => {
    // --- da formato correcto e identado al texto de un códugo
    return prettier.format(code, {
        parser: 'babel',
        plugins: prettierPlugins,
    });
}



const textarea_insert_text = (el, text) => {
    // --- inserta un texto en la posición actual del cursor
    let ipos = el.selectionStart,
        fpos = el.selectionEnd;
    el.value = el.value.substring(0, ipos) + text
        + el.value.substring(fpos, el.value.length);
    el.selectionStart = el.selectionEnd = ipos + 1;
}



const ajax_post = (url, data, cb_ok=(or)=>{}, cb_err=(or)=>{}) => {
    // --- llamada al servidor con metodo post
    let xhr = new XMLHttpRequest(),
        fd = new FormData();

    Object.keys(data).forEach( k => { fd.append(k, data[k]) });
    xhr.open('POST', url, true);
    xhr.send(fd);
    xhr.onload = () => {
        if(xhr.status === 200) {
            cb_ok(xhr.response);
        }else{
            cb_err(xhr.response);
        }
    }
}


// --- inicialización

const EOL = '\n',
      URLaudios = '/static/audios/',
      URLvideos = '/static/videos/',
      URLimagenes = '/static/imagenes/',
      bc = new BroadcastChannel('LCbc'),
      evChange = new Event('change'),
      evInput = new Event('input');

let temas_disponibles,
    tema_actual,
    recursos_imagen,
    recursos_video;

ajax_post('/temas_disponibles/', {}, resp => {
    temas_disponibles = JSON.parse(resp)
});

ajax_post('/recursos_imagen/', {}, resp => {
    recursos_imagen = JSON.parse(resp)
});

ajax_post('/recursos_video/', {}, resp => {
    recursos_video = JSON.parse(resp)
});

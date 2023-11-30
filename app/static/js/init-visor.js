// --- variables generales
const visor = document.querySelector('#vcanvas'),
      codigo_parent = document.querySelector('#vcodehl'),
      codigo = document.querySelector('#vcodehl-content'),
      _hydraSeteo = { canvas: visor },
      _hydra = new Hydra(_hydraSeteo),
      codeLindo = false,
      pagina = 'visor';

var nombre_imagen_capturada = 'captura';

// --- eventos
bc.addEventListener('message', async (ev) => {
    if(ev.data.accion == 'codigo'){
        try {
            let cod = ev.data.valor;
            _hydra.sandbox.eval(cod);
            Cod.text(cod);
            bc.postMessage({accion: 'error_codigo', valor: false});
        }
        catch(err) {
            bc.postMessage({accion: 'error_codigo', valor: err});
        }
    }else if(ev.data.accion == 'codigo_sec'){
        try {
            let cod = ev.data.valor;
            _hydra.sandbox.eval(cod);
            bc.postMessage({accion: 'error_codigo_sec', valor: false});
        }
        catch(err) {
            bc.postMessage({accion: 'error_codigo_sec', valor: err});
        }
    }else if(ev.data.accion == 'velocidad'){
        speed = ev.data.valor;
    }else if(ev.data.accion == 'opacidad_imagen'){
        visor.style.opacity = ev.data.valor;
    }else if(ev.data.accion == 'opacidad_codigo'){
        Cod.opacity(ev.data.valor);
    }
});

// --- inicializar
loadScript('/static/js/hydra-extend-src.js');
loadScript('/static/js/hydra-extend-color.js');
loadScript('/static/js/hydra-extend-coord.js');
loadScript('/static/js/hydra-extend-combine.js');
loadScript('/static/js/hydra-extend-combinecoord.js');

Ima.resolution(800,800)

hEval('0-visuales-inicial');

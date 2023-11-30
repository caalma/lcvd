// ---  funcionalidades de visor
const Vis = {
    reset: () => {
        hush();
        Cod.text('');
    },
    reload: () => {
        window.location.reload();
    }
}


// ---  funcionalidades de imagen
const Ima = {
    resolution: (w = 800, h=800) => {
        setResolution(w, h);
    },
    proportion: (e='adaptable') => {
        if(e == 'adaptable'){
            vcanvas.classList.remove('prop-real');
            vcanvas.classList.add('prop-adaptable');
        }else if(e == 'real'){
            vcanvas.classList.remove('prop-adaptable');
            vcanvas.classList.add('prop-real');
        }
    },
    save: (nombre='lcvd-imagen-anonima', espera=0) => {
        nombre_imagen_capturada = nombre;
        setTimeout(()=> _hydra.saveFrame = true, espera * 1000);
    }

}



// ---  controles de codigo
const Cod = {
    text: (c) => {
        c = '//\n' + c;
        if(codeLindo){ c = format_code(c); }
        if(c[c.length-1] == "\n"){ c += " "; }
        codigo.innerHTML = c.replace(new RegExp("&", "g"), "&amp;")
            .replace(new RegExp("<", "g"), "&lt;");
        Prism.highlightElement(codigo);
    },
    size:  (n) => {
        codigo.style.fontSize = n + 'em';

    },
    center: (e=true) => {
        let c = 'centrado';
        if(e){
            vcode.classList.add(c);
        }else{
            vcode.classList.remove(c);
        }
    },
    opacity: (n=10 ) => {
        codigo_parent.style.opacity = n/10;
    }
}


// --- evaluar dentro del sandbox de hydra
const hEval = (nomb) => {
    CC.ejecutar(nomb, '.js', resp => {
        _hydra.sandbox.eval(resp);
    });
}

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



// --- captura de imagen
const grabarImagen = (nombre='lcvd-imagen-anonima', espera=0) => {
    nombre_imagen_capturada = nombre;
    setTimeout(()=> _hydra.saveFrame = true, espera * 1000);
}


// --- evaluar dentro del sandbox de hydra
const hEval = (nomb) => {
    CC.ejecutar(nomb, '.js', resp => {
        _hydra.sandbox.eval(resp);
    });
}

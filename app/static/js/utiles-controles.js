// --- funcionalidades de controles
const Cnt = {
    reload : (p_controles = true, p_visor = false) => {
        if (p_controles){
            window.location.reload();
        }
        if (p_visor){
            bc.postMessage({accion: 'codigo_sec', valor: 'Vis.reload()'});
        }
    }
}

const Auxiliar =  Aux = {
    el: undefined,

    activar: (id) => {
        Auxiliar.el = document.querySelector(id);
    },

    ver: (t) => {
        Auxiliar.el.innerHTML = t;
    },

    focus: () => {
        Auxiliar.el.focus();
    },

    limpiar: () => {
        Aux.ver('');
    }
}

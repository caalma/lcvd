const Notas = {
    el: undefined,
    activar: (id) => {
        Notas.el = document.querySelector(id);
        Notas.el.addEventListener('blur', ev => {
            Notas.grabar();
        });
        ajax_post('/notas/', {}, r => {
            Notas.el.innerHTML = r;
        })
    },
    focus: () => {
        Notas.el.focus();
    },
    grabar: () => {
        ajax_post('/notas/grabar/', {texto: Notas.el.innerText});
    }
}

_hydra.canvasToImage = (callback) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    let d = new Date();
    a.download = `${nombre_imagen_capturada}.png`;
    document.body.appendChild(a);
    var self = _hydra;
    _hydra.canvas.toBlob(blob => {
        if (self.imageCallback) {
            self.imageCallback(blob);
            delete self.imageCallback;
        } else {
            a.href = URL.createObjectURL(blob);
            console.log(a.href);
            a.click();
        }
    }, 'image/png');
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(a.href);
    }, 300);
}

const Aud = {
    el: document.createElement('audio'),

    ini:  (nombre) => {
        Aud.el.src = `${URLaudios}${nombre}.mp3`;
        Aud.el.play();
    },

    vol: (n) => {
        Aud.el.volume = n;
    },

    pp: () => {
        if(Aud.el.paused){
            Aud.el.play();
        }else{
            Aud.el.pause();
        }
    }
}

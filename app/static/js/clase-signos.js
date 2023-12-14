
class Signos {
    constructor(p='', uni='abcdefghijklmnñopqrstuvwxyz'){
        this.p = p;
        this.uni = uni;
        this.normalizar();
        return this;
    }

    normalizar(){
        let r = [];
        for (let i in this.p){
            if(this.uni.indexOf(this.p[i]) > -1 ){
                r.push(this.p[i]);
            }
        }
        this.p =  r.join('');
    }

    pal () {
        return this.p;
    }

    pos (s){
        return this.uni.indexOf(s);
    }

    ini (){
        return this.pos(this.p[0]) / (this.uni.length-1);
    }

    dis (){
        let r = [];
        for(let i in this.p){
            let j = parseInt(i) + 1;
            if(this.p[j]){
                let pa = this.pos(this.p[i]),
                    ps = this.pos(this.p[j]),
                    d = Math.abs(pa - ps);
                r.push(d / (this.uni.length-1));
            }
        }
        return r;
    }

    dat (){
        return [this.ini(), this.dis()];
    }
}

module.exports = Signos;

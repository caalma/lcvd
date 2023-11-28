speed = 1
a.setScale(3)

let n = 3

osc(1, 0.1, ()=> a.fft[0])
.rotate()
.pixelate(n,n)
.rotate(0,(Math.random() - Math.random()))

.out()
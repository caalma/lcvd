let n = 37
osc(n,0.01,1)
.diff(osc(n, 0.01, 0.1).rotate(Math.PI / 2)
)
.scale(0.2).rotate(0,0.03)
.modulateScale(shape(n, 0.1, 0.8), 
()=>Math.sin(time/8)* n * n)
.out()
osc(9,0.01,1)
.kaleid(5)
.mask(shape(4,0.3,1.4))
.modulateRotate(shape(6,0.1,1.1))
.modulateRotate(shape(3,0.1,0.9))
.modulateScale(shape(5,0.1,0.8).invert())
.scale(0.3)
.add(shape(4,0.2,1.4)
.color(0.3,0.3,1,0.6))
.rotate(()=>time)
.layer(voronoi(99,1,3)
.modulateScale(noise(1,10))
.luma())
.out()
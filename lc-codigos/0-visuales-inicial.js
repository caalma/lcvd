speed = 1

osc(0.1)
.add(noise(0.2,0.3))
.color(0.4, 0.5, 0.6)
.colorama(0.7)
.shift(0.8)
.diff(osc(0.9))
.out()
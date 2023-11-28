# LCVD

La utilidad consiste en dos pestañas que funcionan sincronizadamente, una destinada a los [controles](/controles/) y la otra al [visor](/visor/).
Los controles se componen de varios bloques de texto editable que permiten evaluar el código que contienen, además de unos campos editable pero no evaluables, y unos pocos botones y campos numéricos para controlar funcionalidades específicas.


## Atajos de teclas
+ `ESC` Ejecutar campo completo de código. Funciona dentro de un campo de código.
+ `Ctrl+ESC` Ejecutar linea o selección actual de código. Funciona dentro de un campo de código.
+ `F1` Foco en campo de código principal. Evalua en la página de visor y muestra el código.
+ `F2` Foco en campo de código secundario. Evalua evalua en la página de visor y no muestra el código.
+ `F3` Foco en campo de código auxiliar. Evalua en la página de controles.
+ `F4` Foco en salida/log de controles. Es efímero y es editable.
+ `F5` Foco en campo de notas. Es permanente (graba al salir del campo) y es editable.
+ `F6` Foco en campo de control del la opacidad para la imagen del visor.
+ `F7` Foco en campo de control del la opacidad para el código del visor.
+ `F8` Foco en campo de control de la velocidad (variable `speed`) de hydra.
+ `Alt+x` Activa el panel de evaluación de código individual. Permite mantener y seleccionar sobre un historial (que de momento es efímero).


## Hydra
### Enlaces:
+ [Funciones](https://hydra.ojack.xyz/api/)
+ [Documentación](https://hydra.ojack.xyz/docs/#/)
+ [Extensiones](https://github.com/geikha/hyper-hydra)
+ [Editor oficial](https://hydra.ojack.xyz/)

## P5js
+ [Documentación](https://p5js.org/reference/)
+ [Editor oficial](https://editor.p5js.org/)

## Lista de funciones básicas de Hydra
### Source

+ `noise( scale = 10, offset = 0.1 )`
+ `voronoi( scale = 5, speed = 0.3, blending = 0.3 )`
+ `osc( frequency = 60, sync = 0.1, offset )`
+ `shape( sides = 3, radius = 0.3, smoothing = 0.01 )`
+ `gradient( speed )`
+ `src( tex )`
+ `solid( r, g, b, a = 1 )`
+ `prev()`

### Geometría
+ `rotate( angle = 10, speed )`
+ `scale( amount = 1.5, xMult = 1, yMult = 1, offsetX = 0.5, offsetY = 0.5 )`
+ `pixelate( pixelX = 20, pixelY = 20 )`
+ `kaleid( nSides = 4 )`
+ `repeat( repeatX = 3, repeatY = 3, offsetX, offsetY )`
+ `repeatX( reps = 3, offset )`
+ `repeatY( reps = 3, offset )`
+ `scroll( scrollX = 0.5, scrollY = 0.5, speedX, speedY )`
+ `scrollX( scrollX = 0.5, speed )`
+ `scrollY( scrollY = 0.5, speed )`


### Color
+ `posterize( bins = 3, gamma = 0.6 )`
+ `shift( r = 0.5, g, b, a )`
+ `invert( amount = 1 )`
+ `contrast( amount = 1.6 )`
+ `brightness( amount = 0.4 )`
+ `luma( threshold = 0.5, tolerance = 0.1 )`
+ `thresh( threshold = 0.5, tolerance = 0.04 )`
+ `color( r = 1, g = 1, b = 1, a = 1 )`
+ `saturate( amount = 2 )`
+ `hue( hue = 0.4 )`
+ `colorama( amount = 0.005 )`
+ `sum()` [¿?]
+ `r( scale = 1, offset )`
+ `g( scale = 1, offset )`
+ `b( scale = 1, offset )`
+ `a( scale = 1, offset )`

### Fusión
+ `add( texture, amount = 1 )`
+ `blend( texture, amount = 0.5 )`
+ `diff( texture )`
+ `layer( texture )`
+ `mask( texture )`
+ `mult( texture, amount = 1 )`
+ `sub( texture, amount = 1 )`

### Modulación
+ `modulate( texture, amount = 0.1 )`
+ `modulateHue( texture, amount = 1 )`
+ `modulateKaleid( texture, nSides = 4 )`
+ `modulatePixelate( texture, multiple = 10, offset = 3 )`
+ `modulateRepeat( texture, repeatX = 3, repeatY = 3, offsetX = 0.5, offsetY = 0.5 )`
+ `modulateRepeatX( texture, reps = 3, offset = 0.5 )`
+ `modulateRepeatY( texture, reps = 3, offset = 0.5 )`
+ `modulateRotate( texture, multiple = 1, offset )`
+ `modulateScale( texture, multiple = 1, offset = 1 )`
+ `modulateScrollX( texture, scrollX = 0.5, speed )`
+ `modulateScrollY( texture, scrollY = 0.5, speed )`

### Fuentes Externas
+ `init( options )`
+ `initCam( index )`
+ `initImage( url )`
+ `initVideo( url )`
+ `initScreen()`
+ `initStream()` [¿?]

### Ajustes Sintetizador
+ `render( texture = all )`
+ `update()`
+ `setResolution( width, height )`
+ `hush()`
+ `setFunction( options )`
+ `speed = 1`
+ `bpm = 30`
+ `width`
+ `height`
+ `time`
+ `mouse = { x, y }`

### Array
+ `fast( speed = 1 )`
+ `smooth( smooth = 1 )`
+ `ease( ease = 'linear' )`
+ `offset( offset = 0.5 )`
+ `fit( low = 0, high = 1 )`

### Audio
+ `a.fft = Array(4)`
+ `a.setSmooth( smooth = 0.4 )`
+ `a.setCutoff( cutoff = 2 )`
+ `a.setBins( numBins = 4 )`
+ `a.setScale( scale = 10 )`
+ `a.show()`
+ `a.hide()`


## Lista de funciones extras para Hydra

### Source
+ `damero( freq = 20.0, veloc = 1.0, proporcion = 1.0, solidez = 0.01 )`
+ `cuadCurv( a = 20.0 )`
+ `tramaRGB( r = 80.0, g = 80.0, b = 80.0 )`
+ `gradFluctua()`
+ `gradSector()`
+ `estrellaCurva( sides = 5.0, radius =  0.5, smoothing =  0.005 )`

### Color
+ `altColor( r = 1.0, g = 1.0, b = 1.0 )`
+ `recorte( src )`
+ `colorearTime( r = 1.0, g = 1.0, b = 1.0 )`

### Combine
+ `tron( potencia = 1.0, grosor = 10.0 )`
+ `cristal()`
+ `intercal()`

### Coord
+ `coord( freq = 1.0, mult = 1.0 )`

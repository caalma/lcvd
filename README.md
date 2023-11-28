# LCVD - Live Coding Visor Disociado


Herramienta para editar y ejecutar código javascript en una pestaña disociada de los controles.

Está pensado para usarse de forma offline, por eso incorpora las librerías de terceros.

Las tecnologías integradas son: hydra, p5js, bootstrap, prism, prettier.


## Lógica de funcionamiento

El concepto es trabajar con dos pestañas que se comunican entre sí. En una de ellas está el código y en la otra las visuales.

![pestañas](./lcvd-paginas-m1.png)

![pestañas](./lcvd-paginas-m2.png)

Además incorpora algunas funcionalidades para grabar y leer los códigos con que se está experimentando, y administrar algunos recursos extras como: videos, imágenes y audios.

Para ello requiere de un server local que necesita Python3. Y debe ser activado con el script `activar.py`.


## Instalación

1. Clonar el repositorio. Por ejemplo: `git clone https://github.com/caalma/lcvd`.
2. Instalar Python 3
3. Instalar los requerimientos: `pip3 install -r requirements.txt
`


## Modo de uso

El servidor local se inicia ejecutando `activar.py`. Recomiendo lanzarlo desde una terminal de comandos para volver a ejecutarlo en caso de modificar los seteos.

Una vez activo el servidor automáticamente llamará al navegador de internet predeterminado y cargará la pagina de controles.

Manualmente abrir el visor desde el botón "Abrir VISOR".

Para más información dirigirse a la página de ayuda incorporada.


## Configuración

Para personalizarlo es necesario modificar ciertos valores en el documentos `seteos.yml`.

Esos valores son:
- `archivo_notas`: Es el nombre del archivo donde se almacenan las notas, que se ubica en la carpeta `./lc-notas/`
- `temas_disponibles`: Lista de claves que permiten agrupar los distintos recursos. Es necesario para usar las funciones `i(n)` y `v(n)` que devuelven la url de la imagen o video correspondiente según el tema definido actualmente. Dichas urls son usadas luego para cargarlas desde `initImage` o `initVideo` de Hydra.

- `recursos_imagen`: Lista de grupos que tienen listas de rutas relativas a las imágenes necesarias. Los nombres de los grupos deben corresponder con los asignados en `temas_disponibles`.

- `recursos_video`: Lista de grupos que tienen listas de rutas relativas a los videos necesarios. Los nombres de los grupos deben corresponder con los asignados en `temas_disponibles`.

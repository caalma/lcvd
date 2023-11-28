#!/usr/bin/env python
# -*- coding:utf-8 -*-

from os import listdir
from os.path import splitext
from flask import ( Flask, render_template, request,
                   url_for, redirect, jsonify, send_file)
from werkzeug.exceptions import abort
from markdown import Markdown
import yaml


# configuración

cfg = {}
with open('./seteos.yml', 'r') as f:
    cfg = yaml.safe_load(f)


# aplicación flash

app = Flask(__name__)
app.debug = True
app.config['TEMPLATES_AUTO_RELOAD'] = True


# pagina de controles

@app.route('/')
def portada():
    return redirect(url_for('controles'))

@app.route('/controles/')
def controles():
    pagina = 'controles'
    return render_template('controles.html', **locals())


# pagina de visor

@app.route('/visor/')
def visor():
    pagina = 'visor'
    return render_template('visor.html', **locals())

# pagina de ayuda
ar_ayuda = './ayuda.md'

@app.route('/ayuda/')
def ayuda():
    pagina = 'ayuda'
    ayuda_html =  ''
    with open(ar_ayuda, 'r') as f:
        md = Markdown()
        texto_html = md.convert(f.read())
    return render_template('ayuda.html', **locals())


# codigos

ru_codigos = '../lc-codigos/'

@app.route('/codigos/', methods=('GET','POST'))
def codigos_lista():
    lista = []
    for ar in listdir(ru_codigos):
        lista.append(splitext(ar)[0])
    return '\n'.join(lista)

@app.route('/codigo/leer/', methods=('GET','POST'))
def codigo_leer():
    if request.method == 'POST':
        nomb = request.form['nombre']
        with open(f'{ru_codigos}{nomb}', 'r') as f:
            return f.read()
    return 'error'

@app.route('/codigo/grabar/', methods=('GET','POST'))
def codigo_grabar():
    if request.method == 'POST':
        nomb = request.form['nombre']
        with open(f'{ru_codigos}{nomb}', 'w') as f:
            f.write(request.form['texto'])
            return ''
    return 'error'


# notas

ru_notas = '../lc-notas/'
ar_notas = f'{ru_notas}{cfg["archivo_notas"]}'

@app.route('/notas/', methods=('GET','POST'))
def notas():
    with open(ar_notas, 'r') as f:
        return f.read()

@app.route('/notas/grabar/', methods=('GET','POST'))
def notas_grabar():
    if request.method == 'POST':
        with open(ar_notas, 'w') as f:
            f.write(request.form['texto'])
            return 'ok'
    return 'error'


# temas
@app.route('/temas_disponibles/', methods=('GET','POST'))
def temas_disponibles():
    return jsonify(cfg['temas_disponibles'])


# recursos
@app.route('/recursos_imagen/', methods=('GET','POST'))
def recursos_imagen():
    return jsonify(cfg['recursos_imagen'])

@app.route('/recursos_video/', methods=('GET','POST'))
def recursos_video():
    return jsonify(cfg['recursos_video'])


# static de recursos imagen, video y audio
ru_recursos_imagen = '../lc-recursos/imagenes/'
@app.route('/static/imagenes/<path:archivo>', methods=('GET', 'POST'))
def static_imagenes(archivo=''):
    r_doc = f'{ru_recursos_imagen}{archivo}'
    if r_doc:
        return send_file(r_doc)
    else:
        return ''

ru_recursos_video = '../lc-recursos/videos/'
@app.route('/static/videos/<path:archivo>', methods=('GET', 'POST'))
def static_videos(archivo=''):
    r_doc = f'{ru_recursos_video}{archivo}'
    if r_doc:
        return send_file(r_doc)
    else:
        return ''

ru_recursos_audio = '../lc-recursos/audios/'
@app.route('/static/audios/<path:archivo>', methods=('GET', 'POST'))
def static_audios(archivo=''):
    r_doc = f'{ru_recursos_audio}{archivo}'
    if r_doc:
        return send_file(r_doc)
    else:
        return ''

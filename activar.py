#!/usr/bin/env python
# -*- coding:utf-8 -*-

from livereload import Server
from app.app import app
import webbrowser
from os import chdir

if __name__ == '__main__':
    r = './app/'
    chdir(r)

    h = '127.0.0.1'
    p = 8099
    l = 35729
    url = f'http://{h}:{p}'

    webbrowser.open(url)
    server = Server(app.wsgi_app)

    server.setHeader('Access-Control-Allow-Origin', '*')
    server.setHeader('Access-Control-Allow-Methods', '*')

    server.serve(root='./', liveport=l, host=h, port=p)

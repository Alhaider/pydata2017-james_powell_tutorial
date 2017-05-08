#!/usr/bin/env python

from http.server import test, SimpleHTTPRequestHandler
from argparse import ArgumentParser
from os import getcwd, chdir
from os.path import exists, relpath, join
from logging import getLogger
from pathlib import Path

info = getLogger(__name__).info

class NoCacheHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = join(getcwd(), relpath(self.path, '/'))
        if not exists(path):
            info('redirecting {self.path} to /'.format(self=self))
            self.path = '/'
        return super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--bind', '-b', default='', metavar='ADDRESS',
                        help='Specify alternate bind address '
                             '[default: all interfaces]')
    parser.add_argument('--port', '-p', default=8000, metavar='PORT',
                        type=int, help='Specify alternate port [default: 8000]')
    parser.add_argument('dir', action='store',
                        default='.', type=Path, nargs='?',
                        help='Specify directory to serve [default: $PWD]')
    args = parser.parse_args()
    info('chdir({args.dir})'.format(args=args))
    chdir(args.dir)
    test(HandlerClass=NoCacheHandler, port=args.port, bind=args.bind)

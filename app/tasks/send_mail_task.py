# -*- coding: utf-8 -*-

from os import environ

import requests


class Task:
    """
    Simple http get to the api /send url
    """
    def run(self):
        port = int(environ.get("PORT", 5000))
        url = 'http://localhost:%s/send' % port
        print('sending http get to: %s' % url)
        rep = requests.get(url)
        print(rep.status_code)

# -*- coding: utf-8 -*-

from os import path

from mongoengine import connect

"""
Mongo connection stuff is hidden in here.
"""

url = None
URL_FILE = './credentials'

def load_db_url(): 
    global url
    
    if not path.isfile(URL_FILE):
        raise Exception('credential file is missing')

    with open(URL_FILE, 'r') as fp:
        url = fp.read()
        return url


def db_connected(func):

    def _decorator(*args, **kwargs):
        con = connect(db='alert', host=url or load_db_url())
        ret = func(*args, **kwargs)
        con.disconnect()
        return ret
    return _decorator


if __name__ == '__main__':

    # cache test
    print(load_db_url())
    URL_FILE = '/dev/null'
    print(url)
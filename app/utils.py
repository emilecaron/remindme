# -*- coding: utf-8 -*-

"""
Mongo connection stuff
        &
  Email sending stuff
        &
      Utils
"""

from os import environ as env
from functools import reduce
from fractions import gcd
try:
    from configparser import ConfigParser
except ImportError:
    from ConfigParser import ConfigParser

from mongoengine import connect
import requests


EMAIL_DATE_FORMAT = ""

config = ConfigParser()
config.read('app/settings.cfg')


class ConnectionContext:
    def __init__(self, safe=True):
        self.safe = safe

    def __enter__(self):
        self.con = connect(db='alert', host=env.get('MONGOLAB_URL'))
        return self.con

    def __exit__(self, type, exc, trace):
        self.con.disconnect()
        if self.safe:
            return False


def lcm(numbers):
    """ Least common multiple """
    return reduce(lambda x, y: (x * y) / gcd(x, y), numbers, 1)


def online(url='http://www.google.fr'):
    '''
    Get-ping utility
    '''
    try:
        requests.get(url, timeout=1)
        return True
    except requests.ConnectionError:
        return False

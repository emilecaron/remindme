# -*- coding: utf-8 -*-

"""
Mongo connection stuff
        &
Email sending stuff
"""

from os import path
from configparser import ConfigParser

from mongoengine import connect
import requests


CREDENTIALS_FILE = './credentials.cfg'

config = ConfigParser()
config.read(CREDENTIALS_FILE)


class ConnectionContext:
    def __enter__(self):
        self.con = connect(db='alert', host=config.get('mongolab', 'url'))

    def __exit__(self, type, exc, trace):
        self.con.disconnect()
        return False


def send_email(to, subject, html, sender='noreply'):
    url = 'https://api.sendgrid.com/api/mail.send.json'
    params = {
        'api_user': config.get('sendgrid', 'api_user'),
        'api_key': config.get('sendgrid', 'api_key'),
        'to': to,
        'subject': subject,
        'html': html,
        'from': sender
    }
    rep = requests.get(url, params=params)
    rep.raise_for_status()
    print(rep.json())



if __name__ == '__main__':
    send_email('smilzor@gmail.com', 'subject', '<h1>Body</h1>')
    print('done.')
# -*- coding: utf-8 -*-

import requests

from os import environ as env
from utils import config


def send_email(to, subject, html, sender=None):
    url = config.get('sendgrid', 'send_url')
    params = {
        'api_user': env.get('SENDGRID_USER'),
        'api_key': env.get('SENDGRID_KEY'),
        'to': to,
        'subject': subject,
        'html': html,
        'from': sender or 'noreply@zozor-remindme.herokuapp.com'
    }
    try:
        rep = requests.get(url, params=params)
        rep.raise_for_status()
    except requests.ConnectionError as e:
        console.log
        return True

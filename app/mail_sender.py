# -*- coding: utf-8 -*-

import requests

from utils import config


def send_email(to, subject, html, sender='noreply'):
    url = config.get('sendgrid', 'send_url')
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

# -*- coding: utf-8 -*-

from datetime import datetime

from mongoengine import *


class Alert(Document):

    meta = {'collection': 'alert'}

    email = EmailField(required=True)
    date = DateTimeField(required=True, unique_with='email')
    created_at = DateTimeField(default=datetime.now())
    last_sent = DateTimeField()


if __name__ == '__main__':
    Alert(email='emile.caron@outlook.com', date=datetime(day=5, month=10, year=1991))
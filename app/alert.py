# -*- coding: utf-8 -*-
from datetime import datetime

from mongoengine import *

from credentials import Credentials


class Alert(Document, Credentials):

    meta = {'collection': 'alert'}

    email = EmailField(required=True)
    date = DateTimeField(required=True)
    created_at = DateTimeField(default=datetime.now())
    last_sent = DateTimeField()

    
    @Credentials._connect # TODO: find way to do this from Credentials directly
    def save(self):
        return Document.save(self)

    # connected = (save, ...)  <- only write this here


if __name__ == '__main__':
    x = Alert(email='emile.caron@outlook.com', date=datetime.now())
    x.save()
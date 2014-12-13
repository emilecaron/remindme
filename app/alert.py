# -*- coding: utf-8 -*-
from datetime import datetime

from mongoengine import *

from credentials import Credentials


class AlertDocument(Document, Credentials):

    email = EmailField(required=True)
    date = DateTimeField(required=True)
    last_sent = DateTimeField()

    def save(self):
        """
        One connection per save
        """
        con = connect(db='alert', host=self.db_url)
        Document.save(self)
        import time
        time.sleep(10)
        x.remove()
        con.disconnect()

if __name__ == '__main__':
    x = AlertDocument(email='emile.caron@outlook.com', date=datetime.now())
    x.save()
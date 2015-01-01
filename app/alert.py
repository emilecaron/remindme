# -*- coding: utf-8 -*-

from datetime import datetime

from mongoengine import *


class Alert(Document):

    meta = {
        'collection': 'alert'
    }
    key = ('email', 'date')

    email = EmailField(required=True)
    date = DateTimeField(required=True)
    created_at = DateTimeField(default=datetime.now())
    last_sent = DateTimeField()


    def next_start_date(self):
        now = datetime.now()

    @staticmethod
    def get_alerts_to_send():
        yield dict(email='lol@gmail.com', date='Soon')

    def save_unique(self):
        query_args = {f: getattr(self, f) for f in self.key}
        
        if Alert.objects(**query_args).count():
            return 'duplicate'

        return self.save()

if __name__ == '__main__':

    Alert(email='emile.caron@outlook.com', date=datetime(day=5, month=10, year=1991))
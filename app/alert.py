# -*- coding: utf-8 -*-

from datetime import datetime, timedelta

from mongoengine import Document, EmailField, DateTimeField
from flask import render_template

from utils import config


class Alert(Document):

    meta = {
        'collection': 'alert'
    }
    key = ('email', 'date')

    email = EmailField(required=True)
    date = DateTimeField(required=True)
    created_at = DateTimeField(default=datetime.now())
    last_sent = DateTimeField()

    def save(unique=False):
        query_args = {f: getattr(self, f) for f in self.key}
        if unique and Alert.objects(**query_args):
            return 'duplicate'

        super(Alert, self).save()
        return 'ok'

    def update_sent(self):
        self.last_sent = datetime.now()
        self.save()

    def next_start_date(self):
        now = datetime.now()

        past = False
        if now > self.date:
            past = True

        delta = abs(now - self.date)
        delta_days = delta.total_seconds() / 86400
        freq = timedelta(days=28)

        next_date = self.date
        if past:
            next_date += (1 + delta_days // 28) * freq
        else:
            next_date -= (delta_days // 28) * freq

        if next_date < now:
            raise Exception('something wrong with your maths zozor')

        return next_date

    @staticmethod
    def alerts_to_send():

        now = datetime.now()
        last_sent_limit = now - timedelta(days=27)
        remind_limit = now + timedelta(days=3)

        not_sent = Alert.objects(last_sent__not__gt=last_sent_limit)

        return filter(lambda a: a.next_start_date() < remind_limit, not_sent)

    @property
    def email_data(self):
        time_format = config.get('misc', 'email_date_format')
        subject = 'This is your Remind me alert'
        context = {
            'start_date': self.next_start_date().strftime(time_format),
            'email': self.email
        }
        body = render_template('email.html', **context)

        return {
            'to': self.email,
            'subject': subject,
            'html': body
        }

# -*- coding: utf-8 -*-

from os import environ as env
import sys

from flask import Flask, request, render_template, jsonify, redirect, url_for
from requests import ConnectionError

from alert import Alert
from scheduler import Scheduler
from utils import ConnectionContext, online
from mail_sender import send_email


app = Flask(__name__)
online = online()

cdns = {
    'jquery-1.11.2.min.js': 'https://code.jquery.com/jquery-1.11.2.min.js',
    'backbone-min.js': 'https://backbonejs.org/backbone-min.js',
    'bootstrap.min.css': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css',
    'underscore-min.js': 'https://underscorejs.org/underscore-min.js'
}


@app.route("/")
def index():
    return render_template('page.html')


@app.route('/cdn/<filename>')
def cdn_proxy(filename):
    '''
    Homemade local cdn when working offline
    '''
    if online and filename in cdns:
        return redirect(cdns[filename], 302)

    return redirect(url_for('static', filename=filename))


@app.route("/api/register", methods=['POST'])
def register():
    status = None
    data = request.json

    with ConnectionContext():
        status = Alert(**data).save_unique()

    if status == 'ok':
        return jsonify(data)

    if status == 'duplicate':
        return 'duplicate', 409

    return 'no', 500


@app.route("/send")
def send_alerts():
    sent = []

    with ConnectionContext(safe=False):
        for alert in Alert.alerts_to_send():
            try:
                send_email(**alert.email_data)
                alert.update_sent()
                sent.append(alert.email)
            except ConnectionError:
                pass

    return jsonify({'emails_sent': sent})


if __name__ == "__main__":
    app.debug = '-d' in sys.argv

    print('Online mode: %s' % online)

    # Start separate scheduler
    print('Starting scheduler')
    scheduler = Scheduler()
    scheduler.add_task('send_mail_task', minutes=10)
    scheduler.start(async=True, daemon=True, start_delay=5)

    # Start server

    print('Starting app with debug set to %s' % app.debug)
    app.run(host='0.0.0.0', port=int(env.get("PORT", 5000)))

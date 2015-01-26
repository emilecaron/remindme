# -*- coding: utf-8 -*-

from os import environ as env
import sys

from flask import Flask, request, render_template, jsonify, redirect, url_for

from alert import Alert
from scheduler import Scheduler
from utils import ConnectionContext, online
from mail_sender import send_email


app = Flask(__name__)
online = online()

# Redirect to these cdns if online
cdns = {
    'jquery-1.11.2.min.js': 'https://code.jquery.com/jquery-1.11.2.min.js',
    'backbone-min.js': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js',
    'bootstrap.min.css': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css',
    'underscore-min.js': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js'
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

    print("using local static file for %s" % filename)
    return redirect(url_for('static', filename=filename), 302)


@app.route("/api/register", methods=['POST'])
def register():
    status = None
    data = request.json

    with ConnectionContext():
        status = Alert(**data).save(unique=True)

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
            if not send_email(**alert.email_data):
                alert.update_sent()
                sent.append(alert.email)

    return jsonify({'emails_sent': sent})


if __name__ == "__main__":
    app.debug = '-d' in sys.argv

    # Start separate scheduler
    print('Starting scheduler')
    scheduler = Scheduler()
    scheduler.add_task('send_mail_task', minutes=10)
    scheduler.start(async=True, daemon=True, start_delay=5)

    # Start server
    print('Starting app with debug=%s and cdn=%s' % (app.debug, online))
    app.run(host='0.0.0.0', port=int(env.get("PORT", 5000)))

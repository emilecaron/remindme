# -*- coding: utf-8 -*-

from os import environ as env

from flask import Flask, request, render_template, jsonify
from requests import ConnectionError

from alert import Alert
from scheduler import Scheduler
from utils import ConnectionContext
from mail_sender import send_email


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')


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
    print('Starting app')

    # Start separate scheduler
    scheduler = Scheduler()
    scheduler.add_task('send_mail_task', minutes=10)
    scheduler.start(async=True, daemon=True, start_delay=5)

    # Start server
    app.run(host='0.0.0.0', debug=True, port=int(env.get("PORT", 5000)))

# -*- coding: utf-8 -*-

import json

from flask import Flask, request, render_template, jsonify
from mongoengine import NotUniqueError

from alert import Alert
from utils import ConnectionContext, send_alert


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
            send_alert(alert)
            sent.append(alert.email)

    return jsonify({'emails_sent': sent})



if __name__ == "__main__":
    app.run(debug=True)

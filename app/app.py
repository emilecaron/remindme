# -*- coding: utf-8 -*-

import json

from flask import Flask, request, render_template, jsonify
from mongoengine import NotUniqueError

from alert import Alert
from utils import ConnectionContext


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')



@app.route("/api/register", methods=['POST'])
def register():
    data = request.json

    alert = Alert(**data)

    with ConnectionContext():
        status = alert.save_unique()

    if status == 'ok':
        print('Registered: %s' % data['email'])
        return jsonify(data)

    if status == 'duplicate':
        return 'duplicate', 409

@app.route("/send", methods=['POST'])
def send():

    send_email('smilzor@gmail.com', 'subject', '<h1>Body</h1>')



if __name__ == "__main__":
    app.run(debug=True)

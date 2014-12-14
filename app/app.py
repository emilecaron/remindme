# -*- coding: utf-8 -*-

import json

from flask import Flask, request, render_template, jsonify
from mongoengine import NotUniqueError

from alert import Alert
from credentials import db_connected


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')



@app.route("/api/register", methods=['POST'])
@db_connected
def register():
    data = request.json

    alert = Alert(**data)

    try:
        alert.save()
        return 'ok', 201

    except NotUniqueError: 
        return 'duplicate', 409


if __name__ == "__main__":
    app.run(debug=True)

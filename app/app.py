# -*- coding: utf-8 -*-

import json

from flask import Flask, request, render_template, jsonify

from alert import AlertDocument, connect


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')


@app.route("/api/register", methods=['POST'])
def register():
    email = request.form.get('email')
    date = request.form.get('date')
    
    rfg = request.form.get

    
    # success, danger
    return jsonify({
        'type': 'success',
        'title': email,
        'msg': 'registered successfully' if True else 'registration failed'
    })


if __name__ == "__main__":
    db_url = AlertDocument.get_db_url()
    app.run(debug=True)

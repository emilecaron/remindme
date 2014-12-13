# -*- coding: utf-8 -*-

import json
from flask import Flask, request, render_template, jsonify


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('page.html')


@app.route("/api/register", methods=['POST'])
def register():
    email = request.form.get('email')
    date = request.form.get('date')
    print('Registering {} for {}'.format(email, date))
    
    # success, danger
    return jsonify({
        'type': 'success',
        'title': email,
        'msg': 'registered successfully' if True else 'registration failed'
    })


if __name__ == "__main__":
    app.run(debug=True)

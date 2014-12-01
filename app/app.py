# -*- coding: utf-8 -*-

import json
from flask import Flask, request, render_template


app = Flask(__name__)

SUCCESS_W = '{} registered successfully'


@app.route("/")
def index():
    return render_template('page.html')

@app.route("/api/register", methods=['POST'])
def register():
    email = request.form.get('email')
    date = request.form.get('date')
    print('Registering {} for {}'.format(email, date))
    
    # success, danger
    return json.dumps({
        'type': 'success',
        'title': email,
        'msg': 'registered successfully' if True else 'registration failed'
    })

if __name__ == "__main__":
    app.debug = True
    app.run()

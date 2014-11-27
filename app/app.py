# -*- coding: utf-8 -*-

import json
from flask import Flask, request, render_template


app = Flask(__name__)

SUCCESS_W = '<strong>{}</strong> registered successfully'


@app.route("/")
def index():
    return render_template('page.html')

@app.route("/api/register", methods=['POST'])
def register():
    email = request.form.get('email')
    date = request.form.get('date')
    print('Registering {} for {}'.format(email, date))
    
    # success, danger
    reply={'status': 'success', 'msg': SUCCESS_W.format(email)}
    return json.dumps(reply)

if __name__ == "__main__":
    app.debug = True
    app.run()
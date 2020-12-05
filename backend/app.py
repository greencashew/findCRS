#!flask/bin/python
from flask import Flask, jsonify, request, abort

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/projection', methods=['POST'])
def create_task():
    if not request.json:
        abort(400)
    if 'continent' not in request.json:
        abort(400)
    if 'markers' not in request.json:
        abort(400)

    input_markers = {
        'continent': request.json['continent'],
        'markers': request.json['markers']
    }

    return jsonify({'task': input_markers}), 200


app.run()

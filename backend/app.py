#!flask/bin/python
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

from backend.processor import process

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = True


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'health': 'true'}), 200


@app.route('/api/projection', methods=['POST'])
def request_crs_find():
    if not request.json:
        abort(400)
    if 'markers' not in request.json:
        abort(400)
    if 'interactiveMapBounds' not in request.json:
        abort(400)

    markers = request.json['markers']
    interactiveMapBounds = request.json['interactiveMapBounds']

    print(interactiveMapBounds)

    input_values_map, expected_values_map = extract_values(markers)
    validate_received_data(input_values_map, expected_values_map)

    result = process(input_values_map, expected_values_map)

    print(result)
    return jsonify({'crs_systems': result}), 200


def extract_values(markers):
    input_values_map = []
    expected_values_map = []
    for marker in markers:
        input_values_map.append((float(marker.get('inputMap')[0]), float(marker.get('inputMap')[1])))
        expected_values_map.append((float(marker.get('interactiveMap')[0]), float(marker.get('interactiveMap')[1])))
    return input_values_map, expected_values_map


def validate_received_data(map, map2):
    if not map:
        abort(400)
    if not map2:
        abort(400)


if __name__ == "__main__":
    app.run()

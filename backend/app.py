#!flask/bin/python
import logging

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
    logging.info(request.json)
    if not request.json:
        abort(400, "Incorrect json payload provided.")
    if 'markers' not in request.json:
        abort(400, "Incorrect json payload provided. Missing markers field.")
    if 'interactiveMapBounds' not in request.json:
        abort(400, "No map boundaries provided in json payload")

    markers = request.json['markers']
    interactive_map_bounds = request.json['interactiveMapBounds']

    input_values_map, expected_values_map = extract_values(markers)
    validate_received_data(input_values_map, expected_values_map)

    result = process(input_values_map, expected_values_map, interactive_map_bounds)
    return jsonify({'crs_systems': result}), 200


@app.errorhandler(Exception)
def handle_exception(e):
    logging.error("Exception occured.", exc_info=True)
    return str(e), 500


def extract_values(markers):
    input_values_map = []
    expected_values_map = []
    for marker in markers:
        input_values_map.append((float(marker.get('inputMap')[0]), inverse_values(float(marker.get('inputMap')[1]))))
        expected_values_map.append((float(marker.get('interactiveMap')[0]), float(marker.get('interactiveMap')[1])))
    return input_values_map, expected_values_map


def inverse_values(values):
    return values * -1


def validate_received_data(map, map2):
    if not map:
        abort(400, "No markers data provided")
    if not map2:
        abort(400, "No markers data provided")


if __name__ == "__main__":
    app.run()

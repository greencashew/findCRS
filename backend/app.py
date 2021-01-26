#!flask/bin/python
from flask import Flask, jsonify, request, abort

from backend.coordinates_transformer import get_possible_crs

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/projection', methods=['POST'])
def create_task():
    if not request.json:
        abort(400)
    if 'markers' not in request.json:
        abort(400)

    markers = request.json['markers']

    input_values_map, expected_values_map = extract_values(markers)
    validate_received_data(expected_values_map, input_values_map)

    result = get_possible_crs(input_values_map, expected_values_map)

    print(result)
    return jsonify({'crs_systems': result}), 200


def extract_values(markers):
    input_values_map = []
    expected_values_map = []
    for marker in markers:
        input_values_map.append((float(marker.get('inputMap')[0]), float(marker.get('inputMap')[1])))
        expected_values_map.append((float(marker.get('interactiveMap')[0]), float(marker.get('interactiveMap')[1])))
    return input_values_map, expected_values_map


def validate_received_data(expected_values_map, input_values_map):
    if not input_values_map:
        abort(400)
    if not expected_values_map:
        abort(400)


if __name__ == "__main__":
    app.run()

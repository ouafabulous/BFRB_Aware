from flask import Flask, jsonify
from algorithm.parsing import parse_data
import os

app = Flask(__name__)

log_path = '../logs'


def sort_files_by_timestamp(list_files):
    timestamps = []
    for filename in list_files:
        try:
            timestamp = int(filename.replace('.log', ''))
            timestamps.append(timestamp)
        except ValueError:
            pass
    return [f"{filename}.log" for filename in sorted(timestamps)]

@app.route("/get/data")
def get_data():
    response = {
        "hrs": [],
        "positions": []
    }
    for file in sort_files_by_timestamp(os.listdir(log_path)):
        filepath = f"{log_path}/{file}"
        positions, hrs = parse_data(filepath).values()
        response["hrs"] += hrs
        response["positions"] += positions
        os.remove(filepath)
    return response

if __name__ == "__main__":        # on running python app.py
    app.run(host='0.0.0.0', port='8080', debug='true') # run the flask 

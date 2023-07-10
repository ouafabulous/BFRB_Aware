from flask import Flask, jsonify
from algorithm.parsing import parse_data


app = Flask(__name__)

@app.route("/get/data")
def get_data():
    return jsonify(parse_data('./algorithm/input_data/uart_mvmt_with_utc.log'))

if __name__ == "__main__":        # on running python app.py
    app.run(host='0.0.0.0', port='8080', debug='true') # run the flask 

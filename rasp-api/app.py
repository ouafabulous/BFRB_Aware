from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

if __name__ == "__main__":        # on running python app.py
    app.run(host='0.0.0.0', port='8080', debug='true') # run the flask 
app

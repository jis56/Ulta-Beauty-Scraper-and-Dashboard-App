from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
from bson import ObjectId
from bson import json_util

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/ulta_db")

def parse_json(data):
    return json.loads(json_util.dumps(data))

# Route to render data from Mongo
@app.route("/")
def home():

    #Find data from the mongo database
    ulta_data = mongo.db.ulta.find()
    
    ulta_list = []
    # Return data
    for data in ulta_data:
        #data = json.dumps(data, default=str)
        data = parse_json(data)
        ulta_list.append(data)

    return ulta_list


if __name__ == "__main__":
    app.run(debug=True)
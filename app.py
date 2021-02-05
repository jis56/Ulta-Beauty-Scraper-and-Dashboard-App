from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
from bson import ObjectId
from bson import json_util

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/ulta_db")

# Route to render data from Mongo
@app.route("/")
def home():
    ulta_data = []

    #Find data from the mongo database
    for data in mongo.db.ulta.find({}, {"_id":False}):
        ulta_data.append(data)
    #dumped_data = [json_util.dumps(data) for data in ulta_data]
    #cleaned_data = [json.loads(data) for data in dumped_data]

    #return jsonify(cleaned_data)
    return render_template("index.html", ulta_data = ulta_data)

@app.route("/foundation")
def foundation():
    foundation_data = []

    #Find data from the mongo database
    for data in mongo.db.ulta.find({"product_type":"Foundation"}, {"_id":False}):
        foundation_data.append(data)

    return jsonify(foundation_data)

@app.route("/eyeshadow")
def eyeshadow():
    eyeshadow_data = []

    #Find data from the mongo database
    for data in mongo.db.ulta.find({"product_type":"Eyeshadow"}, {"_id":False}):
        eyeshadow_data.append(data)

    return jsonify(eyeshadow_data)


@app.route("/blush")
def blush():
    blush_data = []

    #Find data from the mongo database
    for data in mongo.db.ulta.find({"product_type":"Blush"}, {"_id":False}):
        blush_data.append(data)

    return jsonify(blush_data)

@app.route("/lipstick")
def lipstick():
    lipstick_data = []

    #Find data from the mongo database
    for data in mongo.db.ulta.find({"product_type":"Lipstick"}, {"_id":False}):
        lipstick_data.append(data)
    
    return jsonify(lipstick_data)

if __name__ == "__main__":
    app.run(debug=True)
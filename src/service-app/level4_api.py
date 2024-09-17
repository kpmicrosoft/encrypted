from flask import Flask, jsonify, request

from rest_api import app
@app.route('/api/level4/setup', methods=['GET'])
def setup():
    data = {
              "message": "List of astronauts",
              "astronauts": [
                {
                  "id": 1,
                  "name": "John Doe",
                  "age": 35,
                  "mission": "Apollo 11"
                },
                {
                  "id": 2,
                  "name": "Jane Smith",
                  "age": 40,
                  "mission": "Challenger"
                },
                {
                  "id": 3,
                  "name": "Alice Johnson",
                  "age": 30,
                  "mission": "Discovery"
                },
                {
                  "id": 4,
                  "name": "Bob Brown",
                  "age": 45,
                  "mission": "Endeavour"
                }
              ]
            }

    return jsonify(data)
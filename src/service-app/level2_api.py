from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():

    data = [

            {"name": "Mercury", "coordinates": {"latitude": 0.39, "longitude": 0.0}, "description": "Closest planet to the Sun", "message": "Help! I'm stranded on Mercury!", "code": "purple}"},
            {"name": "Venus", "coordinates": {"latitude": 0.72, "longitude": 0.0}, "description": "Second planet from the Sun", "message": "Help! I'm stranded on Venus!" , "code": "blue"},
            {"name": "Earth", "coordinates": {"latitude": 1.0, "longitude": 0.0}, "description": "Our home planet", "message": "Help! I'm stranded on Earth!", "code": "green"},
            {"name": "Mars", "coordinates": {"latitude": 1.52, "longitude": 0.0}, "description": "Known as the Red Planet", "message": "Help! I'm stranded on Mars!", "code": "red"}

    ]
    return jsonify(data)
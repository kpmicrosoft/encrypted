from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():
    data = {
        "message": "Requesting help. Come and get me!",
        "planets": [
            {"name": "Mercury", "coordinates": {"latitude": 0.39, "longitude": 0.0}, "description": "Closest planet to the Sun"},
            {"name": "Venus", "coordinates": {"latitude": 0.72, "longitude": 0.0}, "description": "Second planet from the Sun"},
            {"name": "Earth", "coordinates": {"latitude": 1.0, "longitude": 0.0}, "description": "Our home planet"},
            {"name": "Mars", "coordinates": {"latitude": 1.52, "longitude": 0.0}, "description": "Known as the Red Planet"}
        ]
    }
    return jsonify(data)
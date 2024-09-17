from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():
    data = {
        "message": "Requesting help. Come and get me!",
        "planets": [
            {"name": "Mercury", "coordinates": {"x": 0.39, "y": 0.0}, "description": "Closest planet to the Sun"},
            {"name": "Venus", "coordinates": {"x": 0.72, "y": 0.0}, "description": "Second planet from the Sun"},
            {"name": "Earth", "coordinates": {"x": 1.0, "y": 0.0}, "description": "Our home planet"},
            {"name": "Mars", "coordinates": {"x": 1.52, "y": 0.0}, "description": "Known as the Red Planet"}
        ]
    }
    return jsonify(data)
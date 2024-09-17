from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():
    data = {
        "message": "Here are some planets in our solar system",
        "planets": [
            {"name": "Mercury", "coordinates": {"x": 0.39, "y": 0.0}, "help_message": "Closest planet to the Sun"},
            {"name": "Venus", "coordinates": {"x": 0.72, "y": 0.0}, "help_message": "Second planet from the Sun"},
            {"name": "Earth", "coordinates": {"x": 1.0, "y": 0.0}, "help_message": "Our home planet"},
            {"name": "Mars", "coordinates": {"x": 1.52, "y": 0.0}, "help_message": "Known as the Red Planet"}
        ]
    }
    return jsonify(data)
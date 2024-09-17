from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
from common_api import call_openai_internal


@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():
    query = "sos message from planets in the spce coordinates"
    parameters = {
        "num_valid": 1,
        "num_responses": 4,
        "values": "name, description, message, color"
    }
    ret = call_openai_internal(query, parameters)
    return ret
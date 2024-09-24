from flask import Flask, jsonify, request
import requests
import json
import os
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
client = OpenAI()


from level2_api import sos_messages
from level1_api import check_password
from common_api import help
from common_api import chat_bot
from level4_api import setup
from common_api import login
from common_api import generate_session_id
from level3_api import explain_cipher
from level3_api import provide_hint


@app.route('/api/resource', methods=['GET'])
def get_resource():
    data = {
        'id': 1,
        'name': 'Sample Resource'
    }
    return jsonify(data)

@app.route('/', methods=['GET'])
@app.route('/api', methods=['GET'])
def get_api():
    return "Hello, World!"

@app.route('/api/resource', methods=['POST'])
def create_resource():
    new_data = request.get_json()
    # Here you would typically add the new data to your database
    return jsonify(new_data), 201

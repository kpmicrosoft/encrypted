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
from level3_api import encryption_method
from level4_api import setup

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


@app.route('/api/ai', methods=['POST'])
def call_openai():
    data = request.get_json()
    query = data.get('query',
                     'sos message from planets')  # Use the provided query or default to "sos message from planets"
    parameters = data.get('parameters', {})

    num_valid = int(parameters.get('valid combination', 1))
    num_responses = int(parameters.get('number of responses ', 4))
    values = parameters.get('values', "name, coordinates (latitude, longitude), description, message, color")

    prompt = f"""
        Generate {num_responses} responses to the query: '{query}' with the following fields: {values}.
        {num_valid} of the responses should be valid, and the rest should have misinformation or incorrect types for one or more fields. The response should be in valid JSON format without any extra text, no code block syntax, and no "json" labels.
        """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    raw_response = response.choices[0].message.content.strip()

    try:
        response_json = eval(raw_response)  # Convert string to JSON-like list (ensure trusted source)
    except SyntaxError:
        return jsonify({"error": "Failed to generate valid JSON from response"}), 400

    response_data = {
        'response': response_json,
        'query': query,
        'parameters': parameters
    }

    return jsonify(response_data), 201



from flask import Flask, jsonify, request
import requests
import json

app = Flask(__name__)

from level2_api import sos_messages
from level1_api import check_password
from common_api import help
from common_api import chat_bot

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
    # Define the endpoint URL and API key
    url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
    api_key = 'sk-svcacct-dAFHZVuO8M5L9rDu-ekulp5wOwr9r5iKZbOXXyfY5cqc8Y4XG0jTsR1s4LhIY0lpqr2mFdXoYZfT3BlbkFJZ-8EdpGdF1iMTmOpnJ5FhS5ozSQEGq767SXZJBJs_uxVswovgmmI2c97S1e-hJ3kms3H6yUDcAA'

    # Define the headers
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    # Define the data payload
    data = {
        'prompt': 'Translate the following English text to French: "Hello, how are you?"',
        'max_tokens': 60
    }

    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(data))

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        result = response.json()
        return result
    else:
        print(f"Request failed with status code {response.status_code}")

    return "No valid responses"



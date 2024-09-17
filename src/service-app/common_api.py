from flask import Flask, jsonify, request

from rest_api import app

@app.route('/api/<level>/help', methods=['GET'])
def help(level):
    data = {
        "level " : level,
        "messages": [
            "Additional help message 1.",
            "Additional help message 2.",
            "Additional help message 3."
        ]
    }
    return jsonify(data)

@app.route('/api/<level>/chat_bot', methods=['POST'])
def chat_bot(level):
    data = request.get_json()
    query = data.get('query')
    parameters = data.get('parameters')

    if level == 1:
        response_data = {
            'response': 'This is a response from level 1 chat bot.',
            'query': query,
            'parameters': parameters
        }
    elif level == 2:
        response_data = {
            'response': 'This is a response from level 2 chat bot.',
            'query': query,
            'parameters': parameters
        }
    elif level == 3:
        response_data = {
            'response': 'This is a response from level 3 chat bot.',
            'query': query,
            'parameters': parameters
        }
    elif level == 4:
        response_data = {
            'response': 'This is a response from level 4 chat bot.',
            'query': query,
            'parameters': parameters
        }
    else:
        response_data = {
            'response': 'request form Invalid level',
            'query': query,
            'parameters': parameters
        }
    return jsonify(response_data), 201
from flask import Flask, jsonify, request
from rest_api import app, client
from flask import Flask, session
from flask_session import Session
import os
import hashlib


def generate_session_id(name: str) -> str:
    salt = os.urandom(16)  # Generate a random salt
    name_salt = name.encode() + salt
    session_id = hashlib.sha256(name_salt).hexdigest()
    return session_id


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Now using JSON data
    username = data.get('username')
    
    if username:
        # Store username in session and generate a session ID
        session['user_id'] = generate_session_id(username)
        return jsonify({'message': 'Login successful', 'user_id': session['user_id']}), 200
    
    return jsonify({'message': 'Username required'}), 400


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
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": query}
        ]
    )

    response_data = {
        'response': response.choices[0].message.content,
        'query': query,
        'parameters': parameters
    }

    return jsonify(response_data), 201
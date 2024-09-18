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


@app.route('/api/chat_bot', methods=['POST'])
def chat_bot():
    data = request.get_json()
    query = data.get('query')
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": query}
        ]
    )

    response_data = {
        'response': response.choices[0].message.content,
        'query': query
    }

    return jsonify(response_data), 201

@app.route('/api/aiwithprompt', methods=['POST'])
def get_response(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        prompt=prompt,
        max_tokens=150
    )
    return response.choices.text.strip()

@app.route('/api/ai', methods=['POST'])
def call_openai():
    data = request.get_json()
    query = data.get('query', 'Sos message from planets')
    parameters = data.get('parameters', {})
    ret = call_openai_internal(query, parameters)
    return ret


def call_openai_internal(query, parameters):
    num_valid = int(parameters.get('num_valid', 1))
    num_responses = int(parameters.get('num_responses', 4))
    values = parameters.get('values', "name, coordinates (latitude, longitude), description, message, color")

    prompt = f"""
            Generate {num_responses} responses to the query: '{query}' with the following fields: {values}. The audience is a middle schooler, so everything should be human readable.
            {num_valid} of the responses should be valid, and the rest should have misinformation for one or more fields. 
            Randomize the valid and invalid responses. Each response should have an 'id' field (starting from 1) and a 'valid' field (True if the response is valid, False if the response contains misinformation).
            The response should be in valid JSON format without any extra text, no code block syntax, and no "json" labels.
        """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    raw_response = response.choices[0].message.content.strip()

    try:
        raw_response = raw_response.replace("true", "True").replace("false", "False")
        response_json = eval(raw_response)
    except SyntaxError:
        return jsonify({"error": "Failed to generate valid JSON from response"}), 400

    invalid_ids = [item['id'] for item in response_json if not item.get('valid', False)]

    response_data = {
        'response': response_json,
        'query': query,
        'parameters': parameters,
        'invalid_ids': invalid_ids
    }

    return jsonify(response_data), 201
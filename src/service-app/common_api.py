from flask import Flask, jsonify, request
from rest_api import app, client
from flask import Flask, session
from flask_session import Session
import os
import hashlib

@app.route('/api/mock_chat', methods=['POST'])
def mock_chat():
    message = request.form.get('message')
    return add_message(message)





@app.route('/api/conversation', methods=['GET'])
def get_conversation():
    conversation = session.get('conversation', [])
    return {'conversation': conversation}

@app.route('/api/conversation', methods=['DELETE'])
def clear_conversation():
    session.pop('conversation', None)
    return "Conversation cleared!"

@app.route('/api/session_id', methods=['GET'])
def get_session_id():
    # Ensure the session is initialized
    if 'session_id' not in session:
        session['session_id'] = session.sid

    session_id = session['session_id']
    return jsonify({"session_id": session_id})

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

    response_content = response.choices[0].message.content
    response_data = {
        'response': response_content,
        'query': query
    }
    add_message("User: " + query)
    add_message("Chatbot: " + response_content)

    return jsonify(response_data), 201


@app.route('/api/ai', methods=['POST'])
def call_openai():
    data = request.get_json()
    query = data.get('query', 'Sos message from planets')
    ret = call_openai_internal(query)
    return ret


def call_openai_internal(query):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": query}
        ]
    )

    raw_response = response.choices[0].message.content.strip()

    try:
        raw_response = raw_response.replace("true", "True").replace("false", "False")
        response_json = eval(raw_response)
    except SyntaxError:
        return jsonify({"error": "Failed to generate valid JSON from response"}), 400

    add_message("User: " + query)
    add_message("Agent: " + str(response_json))
    return jsonify(response_json), 201


def add_message(message):
    if 'conversation' not in session:
        session['conversation'] = []
    session['conversation'].append(message)
    return "Message added!"
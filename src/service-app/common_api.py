from flask import Flask, jsonify, request

from rest_api import app, client


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
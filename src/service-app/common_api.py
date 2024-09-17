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
    response = "This is a response from level {} chat bot (AS IF haha).".format(level)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    if level == "1":
        pass
    elif level == "2":
        pass
    elif level == "3":
        pass
    elif level == "4":
        pass
    else:
        response = 'request form Invalid level'

    response_data = {
        'response': response,
        'query': query,
        'parameters': parameters
    }
    return jsonify(response_data), 201
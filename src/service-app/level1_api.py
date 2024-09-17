from flask import Flask, jsonify, request

from rest_api import app

@app.route('/api/level1/password', methods=['POST'])
def check_password():
    data = request.get_json()
    password = data.get('password', '')

    # Convert both the password and the input to lowercase
    correct_password = 'The Password'.lower()
    input_password = password.lower()

    if input_password == correct_password:
        response_data = {
            'status': 'Success',
            'detail': 'Access granted! Welcome to the next level :)'
        }
    else:
        if input_password == 'help':
            response_data = {
                'status': 'Hint',
                'detail': 'Static Generated hint'
            }
        else:
            response_data = {
                'status': 'Denied',
                'detail': 'Password is invalid, would you like a hint?'
            }
    
    return jsonify(response_data), 201

from flask import Flask, jsonify, request

from rest_api import app
@app.route('/api/level1/password', methods=['POST'])
def check_password():
    data = request.get_json()
    password = data.get('password')
    if password == 'the Password':
        response_data = {
            'status': 'success',
            'detail': 'Aceess granted!'
        }
    else:
        if password == 'Help':
            response_data = {
                'status': 'success',
                'detail': 'Aceess granted!'
            }
        else :
            response_data = {
                'status': 'denied',
                'detail': 'Access denied!'
            }
    return jsonify(response_data), 201



from flask import Flask, jsonify, request

from rest_api import app
@app.route('/api/level3/encryption-method', methods=['GET'])
def encryption_method():
    return jsonify({"method": "Caesar"})


@app.route('/api/level3/validate', methods=['POST'])
def validate():
    data = request.get_json()
    encrypted_message = data.get('encrypted_message')
    decrypted_message = data.get('decrypted_message')
    encryption_method = data.get('encryption_method')

    success_message = {
         "status" : "success",
         "message" : "Decrypted message",
         "decrypted_message" : decrypted_message,
         "encryption_method" : encryption_method,
         "encrypted_message" : encrypted_message
    }
    failure_message = {
        "status": "failed",
        "message": "Decryption failed",
        "decrypted_message" : decrypted_message,
        "encryption_method" : encryption_method,
        "encrypted_message" : encrypted_message
    }
    if decrypted_message == "success" :
        return jsonify(success_message)
    else :
        return jsonify(failure_message)

@app.route('/api/level3/encrypted-message', methods=['POST'])
def encrypted_message():
    data = request.get_json()
    encryption_method = data.get('encryption_method')

    encrypted_message = f"This message is encrypted using {encryption_method}"
    return jsonify({"encrypted_message": encrypted_message})
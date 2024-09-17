from flask import Flask, jsonify, request

from rest_api import app
@app.route('/api/level3/encryption-method', methods=['GET'])
def encryption_method():
    return jsonify({"method": "Caesar"})
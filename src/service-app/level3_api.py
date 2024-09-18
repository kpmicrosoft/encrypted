import random
from flask import Flask, jsonify, request
from rest_api import app


@app.route('/api/level3/hint', methods=['GET'])
def provide_hint():
    return jsonify({"Hint": "The key 'GALAXY' is used in a Vigenère cipher, where each letter shifts the corresponding digit."})


@app.route('/api/level3/help', methods=['GET'])
def explain_cipher():
    return """
    The Vigenère cipher works as follows:
    1. Write down the coordinates and the key.
       - Coordinates: 52, 78
       - Key: GALAXY
    2. Convert each letter in the key to a number.
       - G=7, A=1, L=12, A=1, X=24, Y=25
    3. Align the key with the coordinates.
       - For 52: G (7) and A (1)
       - For 78: L (12) and A (1)
    4. Shift each digit of the coordinates by the corresponding number in the key.
    """

def generate_random_coordinates():
    x = random.randint(10, 99)
    y = random.randint(10, 99)

    return x, y

def encrypt_coordinates(x, y):
    key_numbers = keys()
    x_digits = [x // 10, x % 10]
    y_digits = [y // 10, y % 10]

    x_encrypted = (x_digits[0] + key_numbers[0]) % 10 * 10 + (x_digits[1] + key_numbers[1]) % 10
    y_encrypted = (y_digits[0] + key_numbers[2]) % 10 * 10 + (y_digits[1] + key_numbers[3]) % 10
    return x_encrypted, y_encrypted


@app.route('/api/level3/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    x = data.get("x")
    y = data.get("y")
    x_decrypted, y_decrypted = decrypt_coordinates(x, y)
    coordinates = {
        "x": x_decrypted,
        "y": y_decrypted,
    }
    return jsonify(coordinates), 200

def decrypt_coordinates(x, y):
    key_numbers = keys()
    x_digits = [x // 10, x % 10]
    y_digits = [y // 10, y % 10]

    x_decrypted = ((x_digits[0] - key_numbers[0]) % 10) * 10 + ((x_digits[1] - key_numbers[1]) % 10)
    y_decrypted = ((y_digits[0] - key_numbers[2]) % 10) * 10 + ((y_digits[1] - key_numbers[3]) % 10)
    return x_decrypted, y_decrypted


def keys():
    key_numbers = [7, 1, 12, 1, 24, 25]
    return key_numbers


@app.route('/api/level3/coordinates', methods=['GET'])
def coordinates():
    x, y = generate_random_coordinates()
    x_encrypted, y_encrypted = encrypt_coordinates(x, y)
    encrypted_coordinates = {
        "x": x_encrypted,
        "y": y_encrypted,
        "original": {
            "x": x,
            "y": y
        }
    }
    return jsonify(encrypted_coordinates)

@app.route('/api/level3/validate', methods=['POST'])
def validate():
    data = request.get_json()
    x_encrypted = data.get("x")
    y_encrypted = data.get("y")
    x = data["original"]["x"]
    y = data["original"]["y"]
    x_decrypted, y_decrypted = decrypt_coordinates(x_encrypted, y_encrypted)

    if x == x_decrypted and y == y_decrypted:
        return jsonify({"status": "Success", "detail": "Coordinates are correct!"}), 200
    else:
        return jsonify({"status": "Failed", "detail": "Coordinates are incorrect!"}), 400

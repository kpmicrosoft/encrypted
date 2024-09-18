import random
from flask import Flask, jsonify, request
from rest_api import app
from common_api import get_response

from rest_api import app
@app.route('/api/level3/encryption-method', methods=['GET'])
def encryption_method():
    return jsonify({"method": "Vigenère"})


def provide_hint():
    return jsonify({"Hint": "The key 'GALAXY' is used in a Vigenère cipher, where each letter shifts the corresponding digit."})


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
    key_numbers = [7, 1, 12, 1, 24, 25]
    x_encrypted = (x // 10 + key_numbers) % 10 * 10 + (x % 10 + key_numbers) % 10
    y_encrypted = (y // 10 + key_numbers) % 10 * 10 + (y % 10 + key_numbers) % 10
    return f"{x_encrypted}, {y_encrypted}"


def decrypt_coordinates(x, y):
    key_numbers = [7, 1, 12, 1, 24, 25]
    x_decrypted = ((x // 10 - key_numbers) % 10) * 10 + ((x % 10 - key_numbers) % 10)
    y_decrypted = ((y // 10 - key_numbers) % 10) * 10 + ((y % 10 - key_numbers) % 10)
    return x_decrypted, y_decrypted


@app.route('/api/level3/validate', methods=['POST'])
def validate():
    data = request.get_json()
    attempts = 0
    key = "GALAXY"
    x, y = generate_random_coordinates()
    encrypted_message = f"My location coordinates are: {encrypt_coordinates(x, y)}."
    print(f"\nEncrypted Message: {encrypted_message}")


    while attempts < 10:
        user_input = data.get("Ask a question about the cipher or enter the decrypted coordinates: ","")
        
        if user_input.lower() == 'hint':
            print(provide_hint())
            continue
        
        if user_input.lower() == 'explain':
            print(explain_cipher())
            continue
        
        prompt = f"Answer the player's question: {user_input} for the encrypted message {encrypted_message} using the Vigenère cipher with the key {key}."
        result = get_response(prompt)

        if "correct" in result.lower():
            print("\nCongratulations! You have decrypted the coordinates and found the lost astronaut. Level Passed!")
            break
        else:
            print("\nIncorrect coordinates. Try again or ask for a hint!")
            attempts += 1
    
    if attempts >= 10:
        print("\nYou've reached the maximum number of attempts. The decrypted coordinates are 33, 19.")


@app.route('/api/level3/encrypted-message', methods=['POST'])
def encrypted_message():
    data = request.get_json()
    encryption_method = data.get('encryption_method')

    encrypted_message = f"This message is encrypted using {encryption_method}"
    return jsonify({"encrypted_message": encrypted_message})
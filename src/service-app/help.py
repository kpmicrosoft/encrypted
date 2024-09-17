from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/help', methods=['GET'])
def help():
    return jsonify({
        'message': 'This is the help endpoint. How can I assist you?'
    })

if __name__ == '__main__':
    app.run(debug=True)
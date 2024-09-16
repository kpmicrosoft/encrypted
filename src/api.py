from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/api/resource', methods=['GET'])
def get_resource():
    data = {
        'id': 1,
        'name': 'Sample Resource'
    }
    return jsonify(data)

@app.route('/', methods=['GET'])
@app.route('/api', methods=['GET'])
def get_api():
    return "Hello, World!"

@app.route('/api/resource', methods=['POST'])
def create_resource():
    new_data = request.get_json()
    # Here you would typically add the new data to your database
    return jsonify(new_data), 201

if __name__ == '__main__':
    app.run(debug=True, port=8080)
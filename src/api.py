import sys
import os
import os
from flask import Flask, session
from flask_session import Session

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src/service-app')))

import rest_api

rest_api.app.secret_key = 'abc123'

# Configure server-side session to use filesystem
rest_api.app.config['SESSION_TYPE'] = 'filesystem'
rest_api.app.config['SESSION_FILE_DIR'] = os.path.join(os.getcwd(), 'flask_session_files')  # Directory for session files
rest_api.app.config['SESSION_FILE_THRESHOLD'] = 100  # Number of sessions to keep before cleanup
rest_api.app.config['SESSION_FILE_MODE'] = 0o600  # Permissions for session files
rest_api.app.config['SESSION_PERMANENT'] = True
rest_api.app.config['PERMANENT_SESSION_LIFETIME'] = 60 * 60 * 24 * 7  # 7 days

# Ensure the session directory exists
if not os.path.exists(rest_api.app.config['SESSION_FILE_DIR']):
    os.makedirs(rest_api.app.config['SESSION_FILE_DIR'])

# Initialize Flask-Session
Session(rest_api.app)

if __name__ == '__main__':
    rest_api.app.run(debug=True, host="0.0.0.0", port=5000) #TODO: Change back to 5000


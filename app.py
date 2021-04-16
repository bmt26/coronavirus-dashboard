"""
Main driver file for the server.
"""

import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

# Load environment variables from .env
load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

# Avoid warnings from SQLAlchemy
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Declare the database variable
DB = SQLAlchemy(APP)

# Import models (prevent circular import issues)
import models

# Create database
DB.create_all()

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """ Retrieve index.html and serve to the webpage using Flask """
    return send_from_directory('./build', filename)

@SOCKETIO.on('login')
def on_login(data):
    """ Run function when a client emits the 'login' event to the server """
    print(data)

# Allow for the importing of the app in python shell
if __name__ == "__main__":
    # Call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

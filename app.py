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

def add_user_to_db(data):
    """ Function to add a new player to the database """
    # Prepare variables to enter into database
    email = data['email']
    name = data['name']
    image = data['image']
    country = "None"

    # Model a new user
    new_user = models.UserData(email=email, name=name, image=image, country=country)

    # Add new user to database
    DB.session.add(new_user)
    
    # Commit database session
    DB.session.commit()

    # Query all user from existing UserData database
    all_users = models.UserData.query.all()

    # Instantiate users list
    users = []

    # Loop through all users in database
    for user in all_users:
        # Instantiate empty user dictionary
        user_dict = {}
        # Set key/value pair and include all user data
        user_dict['email'] = user.email
        user_dict['name'] = user.name
        user_dict['image'] = user.image
        user_dict['country'] = user.country
        # Append to user list
        users.append(user_dict)

    return users

@SOCKETIO.on('login')
def on_login(data):
    """ Run function when a client emits the 'login' event to the server """
    print(data)

    # Check if logged in user exists in database. If not, add user
    if DB.session.query(models.UserData).filter_by(
        email=data['email']).first() is None:
            print("Adding user to database!")
            add_user_to_db(data)

# Allow for the importing of the app in python shell
if __name__ == "__main__":
    # Call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

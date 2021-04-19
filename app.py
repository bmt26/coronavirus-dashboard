"""
Main driver file for the server.
"""

import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import json
import requests
from requests.auth import HTTPBasicAuth

# Load environment variables from .env
load_dotenv(find_dotenv())
APP = Flask(__name__, static_folder='./build/static')

cors = CORS(APP, resources={r"/*": {"origins": "*"}})

username = os.getenv('username')
password = os.getenv('password')
Countries = []
NewConfirmed = []
TotalConfirmed = []
NewDeaths = []
TotalDeaths = []
NewRecovered = []
TotalRecovered = []

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
    new_user = models.UserData(email=email,
                               name=name,
                               image=image,
                               country=country)

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
    if DB.session.query(
            models.UserData).filter_by(email=data['email']).first() is None:
        print("Adding user to database!")
        add_user_to_db(data)

    global TEMPEMAIL
    TEMPEMAIL = ""
    TEMPEMAIL = data['email']
    print("TEMPEMAIL", TEMPEMAIL)


@SOCKETIO.on('connect')
def GetData():
    #URL to get all the data for countries
    URL = 'https://api.covid19api.com/summary'
    req = requests.get(URL, auth=HTTPBasicAuth(username, password))
    response = req.json()['Countries']

    #print(response)

    for i in range(len(response)):
        if response[i]['Country'] not in Countries:
            Countries.append(response[i]['Country'])
            NewConfirmed.append(response[i]['NewConfirmed'])
            TotalConfirmed.append(response[i]['TotalConfirmed'])
            NewDeaths.append(response[i]['NewDeaths'])
            TotalDeaths.append(response[i]['TotalDeaths'])
            NewRecovered.append(response[i]['NewRecovered'])
            TotalRecovered.append(response[i]['TotalRecovered'])

    print("sending the data")
    #socketio.emit('connect', {'countries' : Countries})
    #print("Countries: " + str(Countries))

    SOCKETIO.emit(
        'connect', {
            'countries': Countries,
            'newconfirmed': NewConfirmed,
            'totalconfirmed': TotalConfirmed,
            'newdeaths': NewDeaths,
            'totaldeaths': TotalDeaths,
            'newrecovered': NewRecovered,
            'totalrecovered': TotalRecovered,
        })


@SOCKETIO.on('getstate')
def GetStates(data):
    State = []
    Confirmed = []
    Deaths = []
    Recovered = []
    Active = []
    country = data['country']
    print(country)
    URL = "https://api.covid19api.com/live/country/" + country + "/status/confirmed"
    req = requests.get(URL, auth=HTTPBasicAuth(username, password))
    #print(req.json())
    response = req.json()

    for i in range(len(response)):
        if response[i]['Province'] not in State:
            State.append(response[i]['Province'])
            Confirmed.append(response[i]['Confirmed'])
            Deaths.append(response[i]['Deaths'])
            Recovered.append(response[i]['Recovered'])
            Active.append(response[i]['Active'])

    SOCKETIO.emit(
        'States', {
            'State': State,
            'Confirmed': Confirmed,
            'Deaths': Deaths,
            'Recovered': Recovered,
            'Active': Active,
        })


@SOCKETIO.on('newHomeCountry')
def updateCountry(data):
    # Function to modify user home country
    country = data['country']
    useremail = TEMPEMAIL
    print("This is the email", TEMPEMAIL)
    user = DB.session.query(models.UserData).filter_by(email=useremail).first()
    print(user)
    user.country = country
    DB.session.commit()

    print(useremail + "New Home Country is: " + country)

    SOCKETIO.emit('new_country', data, broadcast=True, include_self=False)


# Allow for the importing of the app in python shell
if __name__ == "__main__":
    # Call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

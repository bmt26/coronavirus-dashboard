"""
Main driver file for the server.
"""
# pylint: disable=E1101,C0413,W1508,R0903,W0603,C0200

import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import requests
from requests.auth import HTTPBasicAuth

# Load environment variables from .env
load_dotenv(find_dotenv())
APP = Flask(__name__, static_folder='./build/static')

COR = CORS(APP, resources={r"/*": {"origins": "*"}})

USERNAME = os.getenv('username')
PASSWORD = os.getenv('password')
COUNTRIES = []
NEW_CONFIRMED = []
TOTAL_CONFIRMED = []
NEW_DEATHS = []
TOTAL_DEATHS = []
NEW_RECOVERED = []
TOTAL_RECOVERED = []
TEMPEMAIL = ""

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
def get_data():
    """ Retrieves Covid-19 Statistics from the API """
    #URL to get all the data for countries
    url = 'https://api.covid19api.com/summary'
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    response = req.json()['Countries']

    #print(response)

    for i in range(len(response)):
        if response[i]['Country'] not in COUNTRIES:
            COUNTRIES.append(response[i]['Country'])
            NEW_CONFIRMED.append(response[i]['NewConfirmed'])
            TOTAL_CONFIRMED.append(response[i]['TotalConfirmed'])
            NEW_DEATHS.append(response[i]['NewDeaths'])
            TOTAL_DEATHS.append(response[i]['TotalDeaths'])
            NEW_RECOVERED.append(response[i]['NewRecovered'])
            TOTAL_RECOVERED.append(response[i]['TotalRecovered'])

    print("sending the data")
    #socketio.emit('connect', {'countries' : COUNTRIES})
    #print("Countries: " + str(COUNTRIES))

    SOCKETIO.emit(
        'connect', {
            'countries': COUNTRIES,
            'newconfirmed': NEW_CONFIRMED,
            'totalconfirmed': TOTAL_CONFIRMED,
            'newdeaths': NEW_DEATHS,
            'totaldeaths': TOTAL_DEATHS,
            'newrecovered': NEW_RECOVERED,
            'totalrecovered': TOTAL_RECOVERED,
        })


@SOCKETIO.on('getstate')
def get_states(data):
    """ Returns Covid-19 State Statistics when requested """
    state = []
    confirmed = []
    deaths = []
    recovered = []
    active = []
    country = data['country']
    print(country)
    url = "https://api.covid19api.com/live/country/" + country + "/status/confirmed"
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    #print(req.json())
    response = req.json()

    for i in range(len(response)):
        if response[i]['Province'] not in state:
            state.append(response[i]['Province'])
            confirmed.append(response[i]['Confirmed'])
            deaths.append(response[i]['Deaths'])
            recovered.append(response[i]['Recovered'])
            active.append(response[i]['Active'])

    SOCKETIO.emit(
        'States', {
            'State': state,
            'Confirmed': confirmed,
            'Deaths': deaths,
            'Recovered': recovered,
            'Active': active,
        })


@SOCKETIO.on('newHomeCountry')
def update_country(data):
    """ Function to modify user home country """
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

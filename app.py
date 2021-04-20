"""
Main driver file for the server.
"""
#pylint: disable=E1101,W0601,W1508,W0611,C0330,C0413,C0303

import os
import json
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import requests
from requests.auth import HTTPBasicAuth

# Load environment variables from .env
load_dotenv(find_dotenv())
APP = Flask(__name__, static_folder='./build/static')

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

USERNAME = os.getenv('username')
PASSWORD = os.getenv('password')
COUNTRIES = []
NEWCONFORM = []
TOTALCONFORM = []
NEWDEATHS = []
TOTALDEATHS = []
NEWRECOVERED = []
TOTALRECOVERED = []

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
    """ Function to add a new user to the database """
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

def modify_country_in_db(data):
    """ Function to modify a users country in the database """
    # Query the database for desired user using email
    all_users = models.UserData.query.all()

    # Loop through all users and find the desired user by email
    for user in all_users:
        # If user's email is found, change the country
        if data['email'] == user.email:
            user.country = data['country']
            break

    # user = DB.session.query(models.UserData).filter_by(email=user_email)

    # Create dictionary
    user_dict = {'email': data['email'], 'country': data['country']}

    # Commit the changes to the database
    DB.session.commit()

    return user_dict

def get_state_statistics(country):
    """ Function to retrieve the statistics for a particular country """
    state = []
    confirmed = []
    deaths = []
    recovered = []
    active = []
    url = "https://api.covid19api.com/live/country/" + country + "/status/confirmed"
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    response = req.json()
    length = len(response)
    for i in range(length):
        if response[i]['Province'] not in state:
            state.append(response[i]['Province'])
            confirmed.append(response[i]['Confirmed'])
            deaths.append(response[i]['Deaths'])
            recovered.append(response[i]['Recovered'])
            active.append(response[i]['Active'])

    return state

def get_country_statistics():
    """ Function to retrieve the statistics per country """
    #URL to get all the data for countries
    url = 'https://api.covid19api.com/summary'
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    #print(str(req.json()))
    response = req.json()['Countries']
    lenght = len(response)
    for i in range(lenght):
        if response[i]['Country'] not in COUNTRIES:
            COUNTRIES.append(response[i]['Country'])

    return COUNTRIES

@SOCKETIO.on('login')
def on_login(data):
    """ Run function when a client emits the 'login' event to the server """
    print(data)

    # Check if logged in user exists in database. If not, add user
    if DB.session.query(models.UserData).filter_by(email=data['email']).first() is None:
        print("Adding user to database!")
        add_user_to_db(data)
    global TEMPEMAIL
    TEMPEMAIL = data['email']
    print("TEMPEMAIL", TEMPEMAIL)

@SOCKETIO.on('connect')
def get_data():
    '''This function will get all the data from API'''
    #URL to get all the data for countries
    url = 'https://api.covid19api.com/summary'
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    #print(str(req.json()))
    response = req.json()['Countries']
    lenght = len(response)
    for i in range(lenght):
        if response[i]['Country'] not in COUNTRIES:
            COUNTRIES.append(response[i]['Country'])
            NEWCONFORM.append(response[i]['NewConfirmed'])
            TOTALCONFORM.append(response[i]['TotalConfirmed'])
            NEWDEATHS.append(response[i]['NewDeaths'])
            TOTALDEATHS.append(response[i]['TotalDeaths'])
            NEWRECOVERED.append(response[i]['NewRecovered'])
            TOTALRECOVERED.append(response[i]['TotalRecovered'])
    print("sending the data")
    SOCKETIO.emit('connect', {'countries' : COUNTRIES, 
                            'newconfirmed' : NEWCONFORM, 
                            'totalconfirmed' : TOTALCONFORM, 
                            'newdeaths' : NEWDEATHS, 
                            'totaldeaths' : TOTALDEATHS, 
                            'newrecovered' : NEWRECOVERED, 
                            'totalrecovered' : TOTALRECOVERED})
@SOCKETIO.on('getstate')
def get_state(data):
    '''This function will get all the data of a certain country'''
    state = []
    confirmed = []
    deaths = []
    recovered = []
    active = []
    country = data['country']
    print(country)
    url = "https://api.covid19api.com/live/country/" + country + "/status/confirmed"
    req = requests.get(url, auth=HTTPBasicAuth(USERNAME, PASSWORD))
    response = req.json()
    length = len(response)
    for i in range(length):
        if response[i]['Province'] not in state:
            state.append(response[i]['Province'])
            confirmed.append(response[i]['Confirmed'])
            deaths.append(response[i]['Deaths'])
            recovered.append(response[i]['Recovered'])
            active.append(response[i]['Active'])
    SOCKETIO.emit('States', {'State' : state, 
                            'Confirmed' : confirmed, 
                            'Deaths' : deaths, 
                            'Recovered' : recovered, 
                            'Active' : active})
@SOCKETIO.on('newHomeCountry')
def update_country(data):
    '''Function to modify user home country'''
    country = data['country']
    useremail = TEMPEMAIL
    print("This is the email", TEMPEMAIL)
    user = DB.session.query(models.UserData).filter_by(
        email=useremail).first()
    print(user)

    user.country = country
    DB.session.commit()
    SOCKETIO.emit('new_country', data, broadcast=True, include_self=False)

# Allow for the importing of the app in python shell
if __name__ == "__main__":
    # Call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

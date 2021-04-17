import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import json
import requests
from requests.auth import HTTPBasicAuth


load_dotenv(find_dotenv())
app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

username = os.getenv('username')
password = os.getenv('password')
Countries = []
NewConfirmed = []
TotalConfirmed = []
NewDeaths = []
TotalDeaths = []
NewRecovered = []
TotalRecovered = []

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@socketio.on('connect')
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
    
    socketio.emit('connect', {
                            'countries' : Countries, 
                            'newconfirmed' : NewConfirmed, 
                            'totalconfirmed' : TotalConfirmed,
                            'newdeaths' : NewDeaths,
                            'totaldeaths' : TotalDeaths,
                            'newrecovered' : NewRecovered,
                            'totalrecovered' : TotalRecovered,
                            })

@socketio.on('getstate')
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
    
    socketio.emit('States', {
                            'State' : State,
                            'Confirmed' : Confirmed,
                            'Deaths' : Deaths,
                            'Recovered' : Recovered,
                            'Active' : Active,
                            })

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
        



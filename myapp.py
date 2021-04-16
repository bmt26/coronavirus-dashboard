import requests
import os
from flask import Flask, render_template
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) 
from requests.auth import HTTPBasicAuth

username = os.getenv('username')
password = os.getenv('password')
Countries = []
NewConfirmed = []
TotalConfirmed = []
NewDeaths = []
TotalDeaths = []
NewRecovered = []
TotalRecovered = []

app = Flask(__name__)

#Default URL
URL = 'https://api.covid19api.com/'

req = requests.get(URL, auth=HTTPBasicAuth(username, password))
response = req.json()
#print (response)

def GetData():
    #URL to get all the data for countries 
    URL = 'https://api.covid19api.com/summary'
    req = requests.get(URL, auth=HTTPBasicAuth(username, password))
    response = req.json()['Countries']
    
    #print(response)
    
    for i in range(len(response)):
        #temp = response[i]['Country']
        Countries.append(response[i]['Country'])
        NewConfirmed.append(response[i]['NewConfirmed'])
        TotalConfirmed.append(response[i]['TotalConfirmed'])
        NewDeaths.append(response[i]['NewDeaths'])
        TotalDeaths.append(response[i]['TotalDeaths'])
        NewRecovered.append(response[i]['NewRecovered'])
        TotalRecovered.append(response[i]['TotalRecovered'])

GetData()
print(TotalDeaths)
print(TotalConfirmed)


"""
@app.route('/')
def hello_world():
    print('updated')
    return render_template(
        "index.html",
        len = len(track), track=track,
        audio=audio
    )
    """
    
app.run(
        port=int(os.getenv('PORT', 8080)),
        host=os.getenv('IP', '0.0.0.0'),
        debug=True
    )
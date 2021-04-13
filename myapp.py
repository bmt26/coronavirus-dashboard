import requests
import os
from flask import Flask, render_template
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) 
from requests.auth import HTTPBasicAuth

username = os.getenv('username')
password = os.getenv('password')
countries = []

app = Flask(__name__)

#Default URL
URL = 'https://api.covid19api.com/'

req = requests.get(URL, auth=HTTPBasicAuth(username, password))
response = req.json()
#print (response)

def GetCountries():
    #URL for all the countries 
    URL = 'https://api.covid19api.com/countries'
    req = requests.get(URL, auth=HTTPBasicAuth(username, password))
    response = req.json()
    
    print(response[0]['Country'])
    
    for i in range(len(response)):
        temp = response[i]['Country']
        countries.append(temp)
    print(countries)

GetCountries()



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
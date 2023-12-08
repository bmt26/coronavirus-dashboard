* Sprint 1 Heroku Link: https://secret-taiga-47016.herokuapp.com/
* Sprint 2 Heroku Link: https://coronavirus-dashboard-sprint2.herokuapp.com/

# CS490 Project 3 - Coronavirus Dashboard
This project allows for a user to connect and view the Coronavirus statistics of all countries. Upon clicking the name of a country in the statistics table, a user can view the Coronavirus statistics of the states/territories in that country. Upon user login, a user can set their "Home" country to personalize their Coronavirus statistics dashboard.

## Install Dependencies
1. In `~/environment` directory, install Flask (`pip install Flask`)
2. Install python-dotenv (`pip install python-dotenv`)
3. Install requests (`pip install requests`)
4. Install Flask-SocketIO (`pip install flask-socketio`)
5. Install Flask-CORS (`pip install flask-cors`)
6. In the project directory, install Node Modules (`npm install`)
7. Install SocketIO client (`npm install socket.io-client --save`)
8. Include Application Dependencies (`pip install -r requirements.txt`)
9. Install PostgreSQL (`sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`)
10. Install Psycopg2 to use SQL in Python (`pip install psycopg2-binary`)
11. Install SQLAlchemy with Flask (`pip install Flask-SQLAlchemy==2.1`)

## Setup
1. Install dependencies
2. Create file `.env` in the main directory
3. Sign in or create an account on the [Coronavirus API](https://documenter.getpostman.com/view/10808728/SzS8rjbc)
4. Obtain `username` and `password` from the Coronavirus API
5. Sign in and create a project with Google's [Developer API](https://console.cloud.google.com/projectcreate)
6. Create credentials for your new OAuth Webapp
7. Obtain `CLIENT_ID` from Google's Developer API
8. Input `REACT_APP_CLIENT_ID`, `username`, and `password` to `.env` with lines `export REACT_APP_CLIENT_ID='YOUR_ID'`, `export username='YOUR_USERNAME'`, and `export password='YOUR_PASSWORD'`
9. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
10. Initialize the PSQL database by running `sudo service postgresql initdb`
11. Start PSQL with `sudo service postgresql start`
12. Make a new superuser by running `sudo -u postgres createuser --superuser $USER`
13. Create a new database with `sudo -u postgres createdb $USER`
14. Verify that your user was created
  * `psql`
  * `\du` - Ensure that ec2-user is a user
  * `\l` - Ensure that ec2-user is a database
15. Make a new user
  * Create user: `create user {username} superuser password {'password'};`
  * Exit SQL: `\q`
16. Save the newly created username in a `sql.env` file with the following format
  * `SQL_USER={your_username}`
  * `SQL_PASSWORD={your_password}`

## Run Application
1. Call the main program (`python app.py`)
2. Open another terminal, enter the project directory, and start the application (`npm run start`)
3. Preview the webpage in the browser
4. View the Coronavirus statistics on the dashboard
5. Login with Google using the "Login" button and personalize your Coronavirus statistics dashboard

## Deploy to Heroku
1. Install Heroku CLI: `npm install -g heroku`
2. [Create an account](https://signup.heroku.com/login) on Heroku
3. Create the file `requirements.txt` with all non-standard dependencies, separated by a new line
4. Allow Heroku to run the application by creating the file `Procfile` and adding the line `web: python app.py`
5. Add and commit all modified files to Git
6. Log into Heroku using the command `heroku login -i` in terminal
7. Create a Heroku application using `heroku create --buildpack heroku/python`
8. Add NodeJS Buildpack with the command `heroku buildpacks:add --index 1 heroku/nodejs`
9. Create a new remote database in your Heroku application with `heroku addons:create heroku-postgresql:hobby-dev`
10. Get the configuration variables set by Heroku using `heroku config`
11. Create a .env file and set the variable by running `touch .env && echo "DATABASE_URL='copy-paste-database-url'" > .env`
12. Push code to Heroku's remote repository using `git push heroku main`
13. Navigate to your [Heroku Dashboard](https://dashboard.heroku.com/apps) and select your application. Select `Settings`. then `Reveal Config Vars`
14. Add `REACT_APP_CLIENT_ID`, `username`, and `password` with the values from your `.env` file.
15. Run `heroku open` in the terminal and click on the link to view your [live application](https://coronavirus-dashboard-sprint2.herokuapp.com/)

## Update Database With Python
1. In the terminal, run `python` to open the interactive Python shell and run the following lines of code.
```
>> from app import DB
>> import models
>> DB.create_all()
>> user1 = models.UserData(email='your_username', name='your_name', image='your_image_url', country='your_country')
>> DB.session.add(user)
>> DB.session.commit()
```
2. In the same Python session, confirm that the data was added.
```
>> models.UserData.query.all()
```
3. Confirm that the Heroku remote database has been updated.
  * Open interactive SQL shell with `heroku pg:psql`
  * List all tables in the remote database by running `\d`
  * Query the data using `SELECT * FROM user_data;`

## Technical Issues
1. `Invalid DOM property 'class'` upon rendering various components
  * Previously: In component, `class` was set using `class=...`
  * Fix: Replace `class=...` to `className=...`
2. `HTTP 404 Error` when navigating to the Heroku-deployed application
  * Previously: Did not have buildpacks added to the Heroku application
  * Fix: Add heroku buildpacks `heroku/python` and `heroku/nodejs`
3. `HTTP 400 Error` when Heroku-deployed application tries to connect with Server
  * Previously: Line 42 of `app.py` contained `MY_CORS_allowed_origins`
  * Fix: Line 42 of `app.py` set to `cors_allowed_origins`

## Known Problems
1. Upon clicking some on countries in the dashboard, states/territories are not listed
  * The Coronavirus Statistics API in use does not support states/territories for some countries.

## Project Improvement
1. ~~Add a text entry and button to allow a user to search for countries/states/territories~~ COMPLETE!
  * ~~Create a new component to support a search field entry~~
  * ~~Emit the name of the country/state/territory to the server~~
  * ~~Request the statistics for the desired country/state/territory~~
  * ~~Emit the statistics back to the client~~
2. Only display 25 rows on the Coronavirus Dashboard, but allow users to click "Show More" to extend the table
  * When displaying the dashboard, loop through and display only the first 25 rows
  * Create a "Show More" button
  * When the "Show More" button is clicked, render the next 25 rows

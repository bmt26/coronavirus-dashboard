import { React, useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';
import SetCountry from './SetCountry';
import UsersTable from './UsersTable';

import './Authentication.css';


// Function to handle user Authentication
function Authentication(props) {
  // Declare loggedIn and setLoggedIn, set default to false
  const [loggedIn, setLoggedIn] = useState(false);
  // Declare userProfile and setUserProfile
  const [userProfile, setUserProfile] = useState({});

function GetNews(){
  props.socket.emit('news');
  document.getElementById("news").classList.add('active');
  document.getElementById("home").classList.remove('active');
  document.getElementById("about").classList.remove('active');
}

function GoHome(){
  props.socket.emit('home');
  document.getElementById("home").classList.add('active');
  document.getElementById("news").classList.remove('active');
  document.getElementById("about").classList.remove('active');
}

function GoAbout(){
  props.socket.emit('about');
  document.getElementById("about").classList.add('active');
  document.getElementById("home").classList.remove('active');
  document.getElementById("news").classList.remove('active');
}


  // Display the Login component when the user has not logged in
  if (loggedIn === false) {
    return (
      <div>
        <div class="topnav">
          <a id="home" onClick={() => GoHome()} class="active" href="#home">Home</a>
          <a id="news" onClick={() => GetNews()} href="#news">News</a>
          <a id="about" onClick={() => GoAbout()} href="#about">About</a>
          <Login
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            socket={props.socket}
          />
        </div>
      </div>
    );
  }
  // Display the Logout component and UserProfile and SetCountry dropdown and set button when the user has logged in
  return (
    <div>
      <div className="topnav">
        <a id="home" onClick={() => GoHome()} class="active" href="#home">Home</a>
        <a id="news" onClick={() => GetNews()} href="#news">News</a>
        <a id="about" onClick={() => GoAbout()} href="#about">About</a>
        <Logout 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
        />
        <UserProfile userProfile={userProfile} />
        <SetCountry />
        <UsersTable />
      </div>
    </div>
  );
}

export default Authentication;

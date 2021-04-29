import { React, useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';

import './Authentication.css';
import './UserProfile.css';
import './Logout.css';
import SetCountry from './SetCountry';
import UsersTable from './UsersTable';

// Function to handle user Authentication
function Authentication(props) {
  // Declare loggedIn and setLoggedIn, set default to false
  const [loggedIn, setLoggedIn] = useState(false);
  // Declare userProfile and setUserProfile
  const [userProfile, setUserProfile] = useState({});

  // Display the Login component when the user has not logged in
  if (loggedIn === false) {
    return (
      <div>
        <div className="auth-div">
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
      <div className="auth-div">
        <UserProfile userProfile={userProfile} />
        <Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <SetCountry />
        <UsersTable />
      </div>
    </div>
  );
}

export default Authentication;

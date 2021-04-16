import { React, useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfile';

// Function to handle user Authentication
function Authentication(props) {
    // Declare loggedIn and setLoggedIn, set default to false
    const [loggedIn, setLoggedIn] = useState(false);
    // Declare userProfile and setUserProfile
    const [userProfile, setUserProfile] = useState({})
    
    // Display the Login component when the user has not logged in
    if (loggedIn === false) {
        return (
            <div className="App">
                <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } userProfile={ userProfile } setUserProfile={ setUserProfile } socket={ props.socket } />
            </div>
        );
    }
    // Display the Logout component and UserProfile when the user has logged in
    return (
        <div className="App">
            <Logout loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
            <UserProfile userProfile={ userProfile } />
        </div>
    );
}

export default Authentication;
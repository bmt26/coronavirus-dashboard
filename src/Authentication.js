import { React, useState } from 'react';
import Login from './Login';
import Logout from './Logout';

// Function to handle user Authentication
function Authentication(props) {
    // Declare loggedIn and setLoggedIn, set default to false
    const [loggedIn, setLoggedIn] = useState(false);
    
    // Display the Login component when the user has not logged in
    if (loggedIn === false) {
        return (
            <div className="App">
                <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
            </div>
        );
    }
    // Display the Logout component when the user has logged in
    return (
        <div className="App">
            <Logout loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
        </div>
    );
}

export default Authentication;
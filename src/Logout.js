import React from 'react';
import { GoogleLogout } from 'react-google-login';

// Get the Google API clientId environment variable
const clientId = process.env.REACT_APP_CLIENT_ID;

// Function to handle Google API Logout
function Logout(props) {
    // Upon user logout success
    const onSuccess = () => {
        // Set loggedIn to false
        props.setLoggedIn(false);
        console.log('Successfully logged out.');
    };

    return (
        <div>
            <GoogleLogout
                className="logout-button"
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;
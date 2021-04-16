import io from 'socket.io-client';
import React from 'react';
import { GoogleLogin } from 'react-google-login';

// Establish and connect to socket connection
const socket = io();

// Get the Google API clientId environment variable
const clientId = process.env.REACT_APP_CLIENT_ID;

// Function to handle Google API Login
function Login(props) {
    // Upon user login success
    const onSuccess = (googleUser) => {
        // Set loggedIn to true
        props.setLoggedIn(true);
        // Declare user profile and get basic information
        var profile = googleUser.getBasicProfile();
        // Emit user profile information to server
        socket.emit('login', { 'email': profile.getEmail(), 'name': profile.getName(), 'image': profile.getImageUrl() });

        console.log('[Login Success] Current User:', googleUser.profileObj);
    };
    
    // Upon user login failure
    const onFailure = (googleUser) => {
        console.log('[Login Failed] res:', googleUser);
    };
    
    return (
        <div>
            <GoogleLogin
                clientId={ clientId }
                buttonText="Login"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={ 'single_host_origin' }
                style={{ marginTop: '100px' }}
                isSignedIn={ props.loggedIn }
            />
        </div>
    );
}

export default Login;
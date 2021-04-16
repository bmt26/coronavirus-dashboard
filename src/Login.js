import React from 'react';
import { GoogleLogin } from 'react-google-login';

// Get the Google API clientId environment variable
const clientId = process.env.REACT_APP_CLIENT_ID;

// Function to handle Google API Login
function Login(props) {
    // Upon user login success
    const onSuccess = (res) => {
        // Set loggedIn to true
        props.setLoggedIn(true);
        console.log('[Login Success] Current User:', res.profileObj);
    };
    
    // Upon user login failure
    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
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
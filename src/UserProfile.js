import React from 'react';

function UserProfile(props) {
    console.log(props.userProfile['email']);
    return (
        <div>
            <h1> Hello, { props.userProfile['name'] }! </h1>
            <img src={ props.userProfile['image'] } />
        </div>
    );
}

export default UserProfile;
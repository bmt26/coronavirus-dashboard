import React from 'react';
import './UserProfile.css';

function UserProfile(props) {
  console.log(props.userProfile['email']);
  return (
    <div>
      <p>
      <img src={props.userProfile['image']} alt="User's Profile" />
      <b>{props.userProfile['name']} </b>
      </p>
    </div>
  );
}

export default UserProfile;

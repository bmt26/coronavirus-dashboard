import React from 'react';

function UserProfile(props) {
  console.log(props.userProfile['email']);
  return (
    <div className="user-profile">
      <img src={props.userProfile['image']} alt="User's Profile" />
      <b> {props.userProfile['name']} </b>
    </div>
  );
}

export default UserProfile;

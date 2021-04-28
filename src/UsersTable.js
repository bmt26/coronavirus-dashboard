import React from 'react';
import './setcountry.css';
import io from 'socket.io-client';

const socket = io();

// Call <UsersTable /> in the Authentication.js file under
// <SetCountry />

function UsersTable() {

  // Leaderboard state
  const [users, setUsers] = useState([]);
  const [homeCountries, setHomeCountries] = useState([]);
  
  // Get users and home countries list then display them

  
  
  return (
      <div>
      </div>
  );
}

export default UsersTable;

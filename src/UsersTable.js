import React, { useRef, useState, useEffect } from 'react';
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

  useEffect(() => {
    socket.on('content', (data) => {
      console.log('Array for users table', data.users);
      console.log('Array for home countries', data.countries);

      setUsers(data.users);
      setHomeCountries(data.countries);
    });
  }, []);
  
  function tableContent(){
    const table = users.map((value, index) => {
      const content = homeCountries[index];
      return (
        <tr>
            <td>{value}</td>
            <td>{content}</td>
        </tr>
      );
    });
    
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="2">Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name and Last Name</td>
            <td>Home Country</td>
          </tr>
          <tr>{table}</tr>
        </tbody>
      </table>
    );
  }
  
  return (
      <div className="leaderboard">
          {tableContent()}
      </div>
  );
}

export default UsersTable;

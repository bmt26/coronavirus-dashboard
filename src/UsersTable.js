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
    
    socket.on('newContent', (data) => {
      // Update lists with new data for home country
      console.log('Array for users table', data.users);
      console.log('Array for home countries', data.countries);

      setUsers(data.users);
      setHomeCountries(data.countries);
    });
  }, []);
  
  function tableContent(){
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="2">Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name and Last Name</th>
            <th>Home Country</th>
          </tr>
          <td>
            {users.map((user, i) => (
            <tr>
              <td>{user}</td>
            </tr>
            ))}
          </td>
          <td>
            {homeCountries.map((country, i) => (
            <tr>
              <td>{country}</td>
            </tr>
            ))}
          </td>
        </tbody>
      </table>
    );
  }
  
  return (
      <div className="UsersTable">
          {tableContent()}
      </div>
  );
}

export default UsersTable;

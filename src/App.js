import io from 'socket.io-client';
import { React, useState, useEffect } from 'react';
import Authentication from './Authentication';
import { Table } from './Table.js';

import './App.css';

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  // Reference to SearchCountry component
  const [country, setCountry] = useState('');

  // Declare statistics and setCountryStatistics
  const [statistics, setCountryStatistics] = useState({});

  // Declare Area and setArea variables
  const [Area, setArea] = useState([]);

  // Functions inside of useEffect are run when variables in array changes
  useEffect(() => {
    // Listen for the 'search_country' event emitted by the server
    socket.on('search_country', (data) => {
      console.log(data);
      setCountryStatistics(data);
    });
  }, []);

  return (
    <div className="App">
      <Authentication socket={socket} />
      <Table
        Area={Area}
        setArea={setArea}
        setCountry={setCountry}
        country={country}
        statistics={statistics}
      />
    </div>
  );
}
export default App;

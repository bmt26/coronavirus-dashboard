import io from 'socket.io-client';
import { React, useState, useEffect } from 'react';
import Authentication from './Authentication';
import SearchCountry from './SearchCountry'
import { Table } from './Table.js';

import './App.css';

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  // Reference to SearchCountry component
  const [country, setCountry] = useState('');

  // Declare Area and setArea variables
  const [Area, setArea] = useState([]);

  // Function to handle searching for a desired country
  function onClickSearch() {
    // Emit the 'search_country' event to the server
    console.log({ country })
    socket.emit('search_country', { country });
  }

  // Functions inside of useEffect are run when variables in array changes
  useEffect(() => {
    // Listen for the 'search_country' event emitted by the server
    socket.on('search_country', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <Authentication socket={socket} />
      <SearchCountry
        onChange={(event) => setCountry(event.target.value)}
        value={country}
        disabled={country.length === 0}
        onClick={onClickSearch}
      />
      <Table Area={Area} setArea={setArea} />
    </div>
  );
}
export default App;

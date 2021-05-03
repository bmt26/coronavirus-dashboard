import io from 'socket.io-client';
import { React, useState } from 'react';
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

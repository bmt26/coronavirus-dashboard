import io from 'socket.io-client';
import { React, useState } from 'react';
import Authentication from './Authentication';
import { Table } from './Table.js';
import LandingPage from './LandingPage.js';

import './App.css';

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  const [Area, setArea] = useState([]);
  return (
    <div className="App">
      <LandingPage/>
      <Authentication socket={socket} />
      <Table Area={Area} setArea={setArea} />
    </div>
  );
}
export default App;

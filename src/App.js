import io from 'socket.io-client';
import { React, useState } from 'react';
import Authentication from './Authentication';
import CompareStats from './CompareStats.js';
import { Table } from './Table.js';

import './App.css';

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  const [Area1, setArea1] = useState([]);
  const [Area2, setArea2] = useState([]);
  return (
    <div className="App">
      <Authentication socket={socket} />
      <CompareStats Area1={Area1} Area2={Area2} />
      <Table setArea1={setArea1} setArea2={setArea2} />
    </div>
  );
}
export default App;

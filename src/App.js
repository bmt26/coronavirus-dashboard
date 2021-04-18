import io from 'socket.io-client';
import { React, useState, useEffect } from 'react';
import Authentication from './Authentication';
import { Table } from "./Table.js";

import './App.css';

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  
  return (
    <div className="App">
      <Authentication socket={ socket } />
      <Table sortstat="Total Confirmed" mostleast={true}/>
    </div>
  );
}
export default App;

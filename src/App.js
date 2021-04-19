import io from "socket.io-client";
import { React } from "react";
import Authentication from "./Authentication";
import { Table } from "./Table.js";

import "./App.css";

// Establish and connect to socket connection
const socket = io();

// Main driver function
function App() {
  return (
    <div className="App">
      <Authentication socket={socket} />
      <Table />
    </div>
  );
}
export default App;

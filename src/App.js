import { React, useState, useEffect } from 'react';
import Login from './Login';
import Logout from './Logout';

import './App.css';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <Login />
      <Logout />
    </div>
  );
}

export default App;

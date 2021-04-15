import { React, useState, useEffect } from 'react';
import Login from './Login';
import Logout from './Logout';

import './App.css';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  
  if (loggedIn === false) {
    return (
      <div className="App">
        <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
      </div>
    );
  }
  return (
      <div className="App">
        <Logout loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
      </div>
    );
}

export default App;

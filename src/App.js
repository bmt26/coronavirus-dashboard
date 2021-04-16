import logo from './logo.svg';
import './App.css';
import ParticlesBg from 'particles-bg';
import SetCountry from './SetCountry';

function App() {
  return (
    <div className="App">
      <div className="display">
        <ParticlesBg type="circle" bg />
        <h1>Play Tic Tac Toe, Enjoy!</h1>
      </div>
      <div>
        <SetCountry />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './setcountry.css';
import { getCountries } from './Table';
import io from 'socket.io-client';

const socket = io();

function SetCountry() {
  var countriesArr = getCountries();

  function setHomeCountry() {
    var selectedCountry = document.getElementById('countries').value;
    if (selectedCountry !== 'Countries') {
      console.log(selectedCountry);
      socket.emit('newHomeCountry', { country: selectedCountry });
    }
  }

  return (
    <form>
      <select className="dropdown" name="dropdown" id="countries">
        <option disabled hidden selected>
          Countries
        </option>
        {countriesArr.map((country, i) => (
          <option>{country}</option>
        ))}
      </select>
      <div className="set">
        <button type="button" onClick={() => setHomeCountry()}>
          Set Home Country
        </button>
      </div>
    </form>
  );
}

export default SetCountry;

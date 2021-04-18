import React from 'react';
import './setcountry.css';
import { getCountries } from './Table';

function SetCountry() {
    
    var countriesArr = getCountries();
    
    function setHomeCountry(){
        var selectedValue = document.getElementById("countries").value;
        if(selectedValue !== 'Countries'){
            console.log(selectedValue);
        }
    }
    
    return(
        <form>
              <select className='dropdown' name='dropdown' id="countries">
                <option disabled hidden selected >Countries</option>
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
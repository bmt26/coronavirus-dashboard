import React from 'react';
import './setcountry.css';

function SetCountry() {
    
    const arr = ["Mexico","Canada","Peru", "USA"];
    
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
                {arr.map((country, i) => (
                    <option>{country}</option>
                ))}
              </select>
              <div className="set">
                  <button type="button" onClick={() => setHomeCountry()}>
                    Set Country
                  </button>
              </div>
        </form>
    );
}

export default SetCountry;
import React from 'react';

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
              <select name='dropdown' id="countries">
                <option disabled hidden selected >Countries</option>
                {arr.map((value, i) => (
                    <option>{value}</option>
                ))}
              </select>
              <button type="button" onClick={() => setHomeCountry()}>
                Set Country
              </button>
        </form>
    );
}

export default SetCountry;
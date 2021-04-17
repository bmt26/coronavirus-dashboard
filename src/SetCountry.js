import React from 'react';

function SetCountry() {
    
    function setCountry(){
        var selectedValue = document.getElementById("countries").value;
        console.log(selectedValue);
    }
    
    return(
        <form name='formid'>
              <select name='ddlselect' id="countries">
                <option disabled hidden selected >Countries</option>
                <option value="Peru">Peru</option>
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Canada">Canada</option>
              </select>
              <button type="button" onClick={() => setCountry()}>
                Set Country
              </button>
        </form>
    );
}

export default SetCountry;
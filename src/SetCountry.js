import React from 'react';

function SetCountry() {
    return(
        <div>
            <form action="/action_page.php">
              <label for="cars">Choose a car:</label>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <br></br>
              <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default SetCountry;
import { React, useState } from 'react';

// Function to handle user Search
function SearchCountry(props) {
    return (
        <div>
            <input type='text' class='searchCountryInput' id='searchCountryInput' name='searchCountryInput' />
            <button class='searchCountryButton' id='searchCountryButton'> Search </button>
        </div>
    );
}

export default SearchCountry;
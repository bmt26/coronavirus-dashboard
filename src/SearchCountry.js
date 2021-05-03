import { React, useState } from 'react';

// Function to handle user Search
function SearchCountry(props) {
    const {
        onChange, country, disabled, onClick,
    } = props;
    // Display the search bar
    return (
        <div>
            <input
                required
                id="searchCountryInput"
                onChange={onChange}
                aria-label="search-input"
                value={country}
                type="text"
            />
            <button
                className="searchCountryButton"
                type="submit"
                disabled={disabled}
                onClick={onClick}> Search </button>
        </div>
    );
}

export default SearchCountry;
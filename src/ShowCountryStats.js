import { React, useState } from 'react';

// Function to display statistics of the user's country
function ShowCountryStats(props) {
    const {
        statistics,
    } = props;

    // Only display if the user searched for a country
    if (Object.keys(statistics).length > 0) {
        return (
            <div>
                <table align="center">
                    <tr>
                        <th colspan="4"> { statistics['country'] } </th>
                    </tr>
                    <tr>
                        <th> Confirmed Cases </th>
                        <th> Active Cases </th>
                        <th> Recovered </th>
                        <th> Confirmed Deaths </th>
                    </tr>
                    <tr>
                        <td> { statistics['confirmed'] } </td>
                        <td> { statistics['active'] } </td>
                        <td> { statistics['recovered'] } </td>
                        <td> { statistics['deaths'] } </td>
                    </tr>
                </table>
            </div>
        );
    }

    return (
        <div>
        </div>
    );
}

export default ShowCountryStats;
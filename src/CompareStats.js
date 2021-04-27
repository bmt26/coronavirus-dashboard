import React, { useState } from 'react';
import './TableStyle.css';
export function CompareStats(props) {
    const Area = props.Area;
    
    if ( (Area[0] === "country" && Area[8] !== "state") || (Area[8] === "country" && Area[0] !== "state" ) ) {
        return (
            <div> 
                <table class="center">
                    <tr>
                        <th colspan="3">Compare Covid-19 Statistics</th>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{Area[1]}</td>
                        <td>{Area[9]}</td>
                    </tr>
                    <tr>
                        <th>New Confirmed</th>
                        <td>{Area[2]}</td>
                        <td>{Area[10]}</td>
                    </tr>
                    <tr>
                        <th>Total Confirmed</th>
                        <td>{Area[3]}</td>
                        <td>{Area[11]}</td>
                    </tr>
                    <tr>
                        <th>New Deaths</th>
                        <td>{Area[4]}</td>
                        <td>{Area[12]}</td>
                    </tr>
                    <tr>
                        <th>Total Deaths</th>
                        <td>{Area[5]}</td>
                        <td>{Area[13]}</td>
                    </tr>
                    <tr>
                        <th>New Recovered</th>
                        <td>{Area[6]}</td>
                        <td>{Area[14]}</td>
                    </tr>
                    <tr>
                        <th>Total Recovered</th>
                        <td>{Area[7]}</td>
                        <td>{Area[15]}</td>
                    </tr>
                </table>
            </div>
        );
    }
    if ( (Area[0] === "state" && Area[6] !== "country") || (Area[6] === "state" && Area[0] !== "country" ) ) {
        return (
            <div> 
                <table class="center">
                    <tr>
                        <th colspan="3">Compare Covid-19 Statistics</th>
                    </tr>
                    <tr>
                        <th>State</th>
                        <th>{Area[1]}</th>
                        <th>{Area[7]}</th>
                    </tr>
                    <tr>
                        <td>Total Confirmed</td>
                        <td>{Area[2]}</td>
                        <td>{Area[8]}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths</td>
                        <td>{Area[3]}</td>
                        <td>{Area[9]}</td>
                    </tr>
                    <tr>
                        <td>Total Recovered</td>
                        <td>{Area[4]}</td>
                        <td>{Area[10]}</td>
                    </tr>
                    <tr>
                        <td>Current Active</td>
                        <td>{Area[5]}</td>
                        <td>{Area[11]}</td>
                    </tr>
                </table>
            </div>
        );
    }
    return null;
}

export default CompareStats;
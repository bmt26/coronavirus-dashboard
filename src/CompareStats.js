import React, { useState } from 'react';
import './TableStyle.css';
export function CompareStats(props) {
    const Area1 = props.Area1;
    const Area2 = props.Area2;
    
    if ( (Area1[0] === "country" && Area2[0] !== "state") || (Area2[0] === "country" && Area1[0] !== "state" ) ) {
        return (
            <div> 
                <table class="center">
                    <tr>
                        <th colspan="3">Compare Covid-19 Statistics</th>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <th>{Area1[1]}</th>
                        <th>{Area2[1]}</th>
                    </tr>
                    <tr>
                        <td>New Confirmed</td>
                        <td>{Area1[2]}</td>
                        <td>{Area2[2]}</td>
                    </tr>
                    <tr>
                        <td>Total Confirmed</td>
                        <td>{Area1[3]}</td>
                        <td>{Area2[3]}</td>
                    </tr>
                    <tr>
                        <td>New Deaths</td>
                        <td>{Area1[4]}</td>
                        <td>{Area2[4]}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths</td>
                        <td>{Area1[5]}</td>
                        <td>{Area2[5]}</td>
                    </tr>
                    <tr>
                        <td>New Recovered</td>
                        <td>{Area1[6]}</td>
                        <td>{Area2[6]}</td>
                    </tr>
                    <tr>
                        <td>Total Recovered</td>
                        <td>{Area1[7]}</td>
                        <td>{Area2[7]}</td>
                    </tr>
                </table>
            </div>
        );
    }
    if ( (Area1[0] === "state" && Area2[0] !== "country") || (Area2[0] === "state" && Area1[0] !== "country" ) ) {
        return (
            <div> 
                <table class="center">
                    <tr>
                        <th colspan="3">Compare Covid-19 Statistics</th>
                    </tr>
                    <tr>
                        <th>State</th>
                        <th>{Area1[1]}</th>
                        <th>{Area2[1]}</th>
                    </tr>
                    <tr>
                        <td>Total Confirmed</td>
                        <td>{Area1[2]}</td>
                        <td>{Area2[2]}</td>
                    </tr>
                    <tr>
                        <td>Total Deaths</td>
                        <td>{Area1[3]}</td>
                        <td>{Area2[3]}</td>
                    </tr>
                    <tr>
                        <td>Total Recovered</td>
                        <td>{Area1[4]}</td>
                        <td>{Area2[4]}</td>
                    </tr>
                    <tr>
                        <td>Current Active</td>
                        <td>{Area1[5]}</td>
                        <td>{Area2[5]}</td>
                    </tr>
                </table>
            </div>
        );
    }
    return null;
}

export default CompareStats;
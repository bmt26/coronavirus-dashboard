import React from "react";

export function MakeTable(props) {
  return (
        <div>
          <tr>
            <td>{props.countries}</td>
            <td>{props.newconfirmed}</td>
            <td>{props.totalconfirmed}</td>
            <td>{props.newdeaths}</td>
            <td>{props.totaldeaths}</td>
            <td>{props.newrecovered}</td>
            <td>{props.totalrecovered}</td>
          </tr>
        </div>
	);
}

/*<tr>
        		<td>Countries</td>
        		<td>New Confirmed</td>
        		<td>Total Confirmed</td>
        		<td>New Deaths</td>
        		<td>Total Deaths</td>
        		<td>New Recovered</td>
        		<td>Total Recovered</td>
        </tr>*/
import React from "react";
import "./TableStyle.css";

export function MakeTable(props) {
  return (
    <div>
      {props.index === 0 ? (
      <div>
        <div>
          <tr>
            <th>Countries</th>
        		<th>New Confirmed</th>
        		<th>Total Confirmed</th>
        		<th>New Deaths</th>
        		<th>Total Deaths</th>
        		<th>New Recovered</th>
        		<th>Total Recovered</th>
          </tr>
        </div>
        <div onClick={() => props.GetStates(props.countries)}>
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
      </div>
        
        ) : (
        <div onClick={() => props.GetStates(props.countries)}>
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
      )}
    </div>
	);
}

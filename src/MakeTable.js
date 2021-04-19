import React from "react";
import "./TableStyle.css";

export function MakeTable(props) {
  return (
    <div class="center">
      {props.index === 0 ? (
      <div>

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

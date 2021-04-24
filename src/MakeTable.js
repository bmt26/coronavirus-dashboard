import React from 'react';
import './TableStyle.css';

export function MakeTable(props) {
  return (
    <div class="center">
      {props.index === 0 ? (
        <div>
          <div>
            <tr>
              <td><button>Compare</button></td>
              <td onClick={() => props.GetStates(props.countries)}>{props.countries}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.newconfirmed}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.totalconfirmed}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.newdeaths}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.totaldeaths}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.newrecovered}</td>
              <td onClick={() => props.GetStates(props.countries)}>{props.totalrecovered}</td>
            </tr>
          </div>
        </div>
      ) : (
        <div>
          <tr>
            <td><button>Compare</button></td>
            <td onClick={() => props.GetStates(props.countries)}>{props.countries}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.newconfirmed}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.totalconfirmed}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.newdeaths}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.totaldeaths}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.newrecovered}</td>
            <td onClick={() => props.GetStates(props.countries)}>{props.totalrecovered}</td>
          </tr>
        </div>
      )}
    </div>
  );
}

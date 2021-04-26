import React from 'react';
import './TableStyle.css';

export function MakeTable(props) {
  return (
    <div class="center">
      {props.index === 0 ? (
        <div>
          <div>
            <tr>
              <td><button onClick={() => props.setArea1(["country",props.countries,props.newconfirmed,props.totalconfirmed,props.newdeaths,props.totaldeaths,props.newrecovered,props.totalrecovered])}>Compare #1</button>
              <button onClick={() => props.setArea2(["country",props.countries,props.newconfirmed,props.totalconfirmed,props.newdeaths,props.totaldeaths,props.newrecovered,props.totalrecovered])}>Compare #2</button></td>
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
            <td><button onClick={() => props.setArea1(["country",props.countries,props.newconfirmed,props.totalconfirmed,props.newdeaths,props.totaldeaths,props.newrecovered,props.totalrecovered])}>Compare #1</button>
            <button onClick={() => props.setArea2(["country",props.countries,props.newconfirmed,props.totalconfirmed,props.newdeaths,props.totaldeaths,props.newrecovered,props.totalrecovered])}>Compare #2</button></td>
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

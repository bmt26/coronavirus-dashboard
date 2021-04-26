import React from 'react';
import './TableStyle.css';

export function StateTable(props) {
  return (
    <div class="center">
      {props.index === 0 ? (
        <div>
          <div>
            <tr>
              <th>State</th>
              <th>Confirmed</th>
              <th>Deaths</th>
              <th>Recovered</th>
              <th>Active Cases</th>
            </tr>
          </div>
          <div>
            <tr>
              <td><button onClick={() => props.setArea1(["state",props.states,props.confirmed,props.death,props.recovered,props.active])}>Compare #1</button>
              <button onClick={() => props.setArea2(["state",props.states,props.confirmed,props.death,props.recovered,props.active])}>Compare #2</button></td>
              <td>{props.states}</td>
              <td>{props.confirmed}</td>
              <td>{props.death}</td>
              <td>{props.recovered}</td>
              <td>{props.active}</td>
            </tr>
          </div>
        </div>
      ) : (
        <div>
          <tr>
            <td><button onClick={() => props.setArea1(["state",props.states,props.confirmed,props.death,props.recovered,props.active])}>Compare #1</button>
            <button onClick={() => props.setArea2(["state",props.states,props.confirmed,props.death,props.recovered,props.active])}>Compare #2</button></td>
            <td>{props.states}</td>
            <td>{props.confirmed}</td>
            <td>{props.death}</td>
            <td>{props.recovered}</td>
            <td>{props.active}</td>
          </tr>
        </div>
      )}
    </div>
  );
}

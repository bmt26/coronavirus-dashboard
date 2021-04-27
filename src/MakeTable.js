import React from 'react';
import './TableStyle.css';

export function MakeTable(props) {
  const Area = props.Area;
  const setArea = props.setArea;
  function PushData() {
    if (Area.length===16 && Area[1]!==props.countries && Area[9]!==props.countries) {
      setArea(["country", props.countries, props.newconfirmed, props.totalconfirmed, props.newdeaths, props.totaldeaths, props.newrecovered, props.totalrecovered, Area[0], Area[1], Area[2], Area[3], Area[4], Area[5], Area[6], Area[7]]);
    }
    else if (Area.length===16 && Area[1]===props.countries) {
      setArea([Area[8], Area[9], Area[10], Area[11], Area[12], Area[13], Area[14], Area[15], null, null, null, null, null, null, null, null]);
    }
    else if (Area.length===16 && Area[9]===props.countries) {
      setArea([Area[0], Area[1], Area[2], Area[3], Area[4], Area[5], Area[6], Area[7], null, null, null, null, null, null, null, null]);
    }
    else {
      setArea(["country", props.countries, props.newconfirmed, props.totalconfirmed, props.newdeaths, props.totaldeaths, props.newrecovered, props.totalrecovered, null, null, null, null, null, null, null, null]);
    }
  }
  return (
    <div class="center">
      {props.index === 0 ? (
        <div>
          <div>
            <tr>
              <td><button onClick={() => PushData()}>Compare #1</button></td>
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
            <td><button onClick={() => PushData()}>Compare #1</button></td>
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

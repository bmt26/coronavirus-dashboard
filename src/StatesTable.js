import React from 'react';
import './TableStyle.css';

export function StateTable(props) {
  const Area = props.Area;
  const setArea = props.setArea;
  function PushData() {
    if (Area.length === 12 && Area[1] !== props.states && Area[7] !== props.states) {
      setArea([
        'state',
        props.states,
        props.confirmed,
        props.death,
        props.recovered,
        props.active,
        Area[0],
        Area[1],
        Area[2],
        Area[3],
        Area[4],
        Area[5],
      ]);
    } else if (Area.length === 12 && Area[1] === props.states) {
      setArea([
        Area[6],
        Area[7],
        Area[8],
        Area[9],
        Area[10],
        Area[11],
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    } else if (Area.length === 12 && Area[7] === props.states) {
      setArea([
        Area[0],
        Area[1],
        Area[2],
        Area[3],
        Area[4],
        Area[5],
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    } else {
      setArea([
        'state',
        props.states,
        props.confirmed,
        props.death,
        props.recovered,
        props.active,
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    }
  }
  return (
    <tr>
      <td>{props.states}</td>
      <td>{props.confirmed}</td>
      <td>{props.death}</td>
      <td>{props.recovered}</td>
      <td>{props.active}</td>
      <td>
        <button onClick={() => PushData()}>Compare</button>
      </td>
    </tr>
  );
}

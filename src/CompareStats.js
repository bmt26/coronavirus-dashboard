import React from 'react';
import './TableStyle.css';
export function CompareStats(props) {
  const Area = props.Area;
  const setArea = props.setArea;

  function RemoveData() {
    const territory = arguments[0];
    if (Area[0] === 'country' && territory === 1) {
      setArea([
        Area[8],
        Area[9],
        Area[10],
        Area[11],
        Area[12],
        Area[13],
        Area[14],
        Area[15],
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    } else if (Area[8] === 'country' && territory === 2) {
      setArea([
        Area[0],
        Area[1],
        Area[2],
        Area[3],
        Area[4],
        Area[5],
        Area[6],
        Area[7],
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]);
    } else if (Area[0] === 'state' && territory === 1) {
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
    } else if (Area[6] === 'state' && territory === 2) {
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
    }
  }

  if (
    (Area[0] === 'country' && Area[8] !== 'state') ||
    (Area[8] === 'country' && Area[0] !== 'state')
  ) {
    return (
      <>
        <tr>
          <th colspan="8">Compare Covid-19 Statistics</th>
        </tr>
        <tr>
          <th>Country</th>
          <th>New Confirmed</th>
          <th>Total Confirmed</th>
          <th>New Deaths</th>
          <th>Total Deaths</th>
          <th>New Recovered</th>
          <th>Total Recovered</th>
          <th></th>
        </tr>
        <tr>
          <td>{Area[1]}</td>
          <td class={Area[2] > Area[10] ? 'greater' : Area[2] < Area[10] ? 'lesser' : 'equal'}>
            {Area[2]}
          </td>
          <td class={Area[3] > Area[11] ? 'greater' : Area[3] < Area[11] ? 'lesser' : 'equal'}>
            {Area[3]}
          </td>
          <td class={Area[4] > Area[12] ? 'greater' : Area[4] < Area[12] ? 'lesser' : 'equal'}>
            {Area[4]}
          </td>
          <td class={Area[5] > Area[13] ? 'greater' : Area[5] < Area[13] ? 'lesser' : 'equal'}>
            {Area[5]}
          </td>
          <td class={Area[6] > Area[14] ? 'greater' : Area[6] < Area[14] ? 'lesser' : 'equal'}>
            {Area[6]}
          </td>
          <td class={Area[7] > Area[15] ? 'greater' : Area[7] < Area[15] ? 'lesser' : 'equal'}>
            {Area[7]}
          </td>
          <td>
            {Area[0] === 'country' ? (
              <button onClick={() => RemoveData(1)}>Remove Territory</button>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>{Area[9]}</td>
          <td class={Area[2] < Area[10] ? 'greater' : Area[2] > Area[10] ? 'lesser' : 'equal'}>
            {Area[10]}
          </td>
          <td class={Area[3] < Area[11] ? 'greater' : Area[3] > Area[11] ? 'lesser' : 'equal'}>
            {Area[11]}
          </td>
          <td class={Area[4] < Area[12] ? 'greater' : Area[4] > Area[12] ? 'lesser' : 'equal'}>
            {Area[12]}
          </td>
          <td class={Area[5] < Area[13] ? 'greater' : Area[5] > Area[13] ? 'lesser' : 'equal'}>
            {Area[13]}
          </td>
          <td class={Area[6] < Area[14] ? 'greater' : Area[6] > Area[14] ? 'lesser' : 'equal'}>
            {Area[14]}
          </td>
          <td class={Area[7] < Area[15] ? 'greater' : Area[7] > Area[15] ? 'lesser' : 'equal'}>
            {Area[15]}
          </td>
          <td>
            {Area[8] === 'country' ? (
              <button onClick={() => RemoveData(2)}>Remove Territory</button>
            ) : null}
          </td>
        </tr>
      </>
    );
  }
  if (
    (Area[0] === 'state' && Area[6] !== 'country') ||
    (Area[6] === 'state' && Area[0] !== 'country')
  ) {
    return (
      <>
        <tr>
          <th colspan="6">Compare Covid-19 Statistics</th>
        </tr>
        <tr>
          <th>State</th>
          <th>Total Confirmed</th>
          <th>Total Deaths</th>
          <th>Total Recovered</th>
          <th>Current Active</th>
          <th></th>
        </tr>
        <tr>
          <td>{Area[1]}</td>
          <td class={Area[2] > Area[8] ? 'greater' : Area[2] < Area[8] ? 'lesser' : 'equal'}>
            {Area[2]}
          </td>
          <td class={Area[3] > Area[9] ? 'greater' : Area[3] < Area[9] ? 'lesser' : 'equal'}>
            {Area[3]}
          </td>
          <td class={Area[4] > Area[10] ? 'greater' : Area[4] < Area[10] ? 'lesser' : 'equal'}>
            {Area[4]}
          </td>
          <td class={Area[5] > Area[11] ? 'greater' : Area[5] < Area[11] ? 'lesser' : 'equal'}>
            {Area[5]}
          </td>
          <td>
            {Area[0] === 'state' ? (
              <button onClick={() => RemoveData(1)}>Remove Territory</button>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>{Area[7]}</td>
          <td class={Area[2] < Area[8] ? 'greater' : Area[2] > Area[8] ? 'lesser' : 'equal'}>
            {Area[8]}
          </td>
          <td class={Area[3] < Area[9] ? 'greater' : Area[3] > Area[9] ? 'lesser' : 'equal'}>
            {Area[9]}
          </td>
          <td class={Area[4] < Area[10] ? 'greater' : Area[4] > Area[10] ? 'lesser' : 'equal'}>
            {Area[10]}
          </td>
          <td class={Area[5] < Area[11] ? 'greater' : Area[5] > Area[11] ? 'lesser' : 'equal'}>
            {Area[11]}
          </td>
          <td>
            {Area[6] === 'state' ? (
              <button onClick={() => RemoveData(2)}>Remove Territory</button>
            ) : null}
          </td>
        </tr>
      </>
    );
  }
  return null;
}

export default CompareStats;

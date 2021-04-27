import React from 'react';
import './TableStyle.css';
export function CompareStats(props) {
  const Area = props.Area;

  if (
    (Area[0] === 'country' && Area[8] !== 'state') ||
    (Area[8] === 'country' && Area[0] !== 'state')
  ) {
    return (
      <div>
        <table class="center">
          <tr>
            <th colspan="3">Compare Covid-19 Statistics</th>
          </tr>
          <tr>
            <th>Country</th>
            <th>{Area[1]}</th>
            <th>{Area[9]}</th>
          </tr>
          <tr>
            <td>New Confirmed</td>
            <td class={Area[2] > Area[10] ? 'greater' : Area[2] < Area[10] ? 'lesser' : 'equal'}>
              {Area[2]}
            </td>
            <td class={Area[2] < Area[10] ? 'greater' : Area[2] > Area[10] ? 'lesser' : 'equal'}>
              {Area[10]}
            </td>
          </tr>
          <tr>
            <td>Total Confirmed</td>
            <td class={Area[3] > Area[11] ? 'greater' : Area[3] < Area[11] ? 'lesser' : 'equal'}>
              {Area[3]}
            </td>
            <td class={Area[3] < Area[11] ? 'greater' : Area[3] > Area[11] ? 'lesser' : 'equal'}>
              {Area[11]}
            </td>
          </tr>
          <tr>
            <td>New Deaths</td>
            <td class={Area[4] > Area[12] ? 'greater' : Area[4] < Area[12] ? 'lesser' : 'equal'}>
              {Area[4]}
            </td>
            <td class={Area[4] < Area[12] ? 'greater' : Area[4] > Area[12] ? 'lesser' : 'equal'}>
              {Area[12]}
            </td>
          </tr>
          <tr>
            <td>Total Deaths</td>
            <td class={Area[5] > Area[13] ? 'greater' : Area[5] < Area[13] ? 'lesser' : 'equal'}>
              {Area[5]}
            </td>
            <td class={Area[5] < Area[13] ? 'greater' : Area[5] > Area[13] ? 'lesser' : 'equal'}>
              {Area[13]}
            </td>
          </tr>
          <tr>
            <td>New Recovered</td>
            <td class={Area[6] > Area[14] ? 'greater' : Area[6] < Area[14] ? 'lesser' : 'equal'}>
              {Area[6]}
            </td>
            <td class={Area[6] < Area[14] ? 'greater' : Area[6] > Area[14] ? 'lesser' : 'equal'}>
              {Area[14]}
            </td>
          </tr>
          <tr>
            <td>Total Recovered</td>
            <td class={Area[7] > Area[15] ? 'greater' : Area[7] < Area[15] ? 'lesser' : 'equal'}>
              {Area[7]}
            </td>
            <td class={Area[7] < Area[15] ? 'greater' : Area[7] > Area[15] ? 'lesser' : 'equal'}>
              {Area[15]}
            </td>
          </tr>
        </table>
      </div>
    );
  }
  if (
    (Area[0] === 'state' && Area[6] !== 'country') ||
    (Area[6] === 'state' && Area[0] !== 'country')
  ) {
    return (
      <div>
        <table class="center">
          <tr>
            <th colspan="3">Compare Covid-19 Statistics</th>
          </tr>
          <tr>
            <th>State</th>
            <th>{Area[1]}</th>
            <th>{Area[7]}</th>
          </tr>
          <tr>
            <td>Total Confirmed</td>
            <td class={Area[2] > Area[8] ? 'greater' : Area[2] < Area[8] ? 'lesser' : 'equal'}>
              {Area[2]}
            </td>
            <td class={Area[2] < Area[8] ? 'greater' : Area[2] > Area[8] ? 'lesser' : 'equal'}>
              {Area[8]}
            </td>
          </tr>
          <tr>
            <td>Total Deaths</td>
            <td class={Area[3] > Area[9] ? 'greater' : Area[3] < Area[9] ? 'lesser' : 'equal'}>
              {Area[3]}
            </td>
            <td class={Area[3] < Area[9] ? 'greater' : Area[3] > Area[9] ? 'lesser' : 'equal'}>
              {Area[9]}
            </td>
          </tr>
          <tr>
            <td>Total Recovered</td>
            <td class={Area[4] > Area[10] ? 'greater' : Area[4] < Area[10] ? 'lesser' : 'equal'}>
              {Area[4]}
            </td>
            <td class={Area[4] < Area[10] ? 'greater' : Area[4] > Area[10] ? 'lesser' : 'equal'}>
              {Area[10]}
            </td>
          </tr>
          <tr>
            <td>Current Active</td>
            <td class={Area[5] > Area[11] ? 'greater' : Area[5] < Area[11] ? 'lesser' : 'equal'}>
              {Area[5]}
            </td>
            <td class={Area[5] < Area[11] ? 'greater' : Area[5] > Area[11] ? 'lesser' : 'equal'}>
              {Area[11]}
            </td>
          </tr>
        </table>
      </div>
    );
  }
  return null;
}

export default CompareStats;

import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';
import CompareStats from './CompareStats.js';
import { MakeTable } from './MakeTable.js';
import { StateTable } from './StatesTable.js';
import { SortInit } from './Sort.js';
import PropTypes from 'prop-types';
import './TableStyle.css';

const socket = io();
let countriesArr;
export function Table(props) {
  const [Countries, setCountries] = useState([]);
  const [NewConfirmed, setNewConfirmed] = useState([]);
  const [TotalConfirmed, setTotalConfirmed] = useState([]);
  const [NewDeaths, setNewDeaths] = useState([]);
  const [TotalDeaths, setTotalDeaths] = useState([]);
  const [NewRecovered, setNewRecovered] = useState([]);
  const [TotalRecovered, setTotalRecovered] = useState([]);
  const [ShowCountries, setShowCountries] = useState(true);
  const [ShowStates, setShowStates] = useState(false);

  const [States, setStates] = useState([]);
  const [StateConfirmed, setStateConfirmed] = useState([]);
  const [StateDeaths, setStatesDeaths] = useState([]);
  const [StatesRecovered, setStatesRecovered] = useState([]);
  const [StatesActive, setStatesActive] = useState([]);

  const [ClickedCountry, setClickedCountry] = useState([]);

  const [MostLeast, setMostLeast] = useState([]);
  const [SortStat, setSortStat] = useState([]);
  const Area = props.Area;
  const setArea = props.setArea;
  var templist = [];

  function GetStates(country) {
    console.log('Clicked');
    console.log(country);
    socket.emit('getstate', { country: country });
    var Clicked = country;
    setClickedCountry(Clicked);
  }

  function showtable() {
    console.log('back button clicked');
    console.log(ClickedCountry);
    setShowStates(false);
    setShowCountries(true);
    SortTable('Total Confirmed');
  }

  function SortTable() {
    //Determine which variables to send to be sorted
    setMostLeast(true);
    if (SortStat === arguments[0]) {
      setMostLeast(!MostLeast);
    } else {
      setMostLeast(true);
    }
    setSortStat(arguments[0]);
  }

  useEffect(() => {
    socket.on('connect', (data) => {
      try {
        console.log('getting data');
        console.log(data);
        console.log(data.countries);

        countriesArr = data.countries;
        getCountries();

        const count = [...data.countries];
        const newconf = [...data.newconfirmed];
        const totalconf = [...data.totalconfirmed];
        const newdeat = [...data.newdeaths];
        const totaldeat = [...data.totaldeaths];
        const newrecov = [...data.newrecovered];
        const totalrecov = [...data.totalrecovered];

        setCountries(count);
        setNewConfirmed(newconf);
        setTotalConfirmed(totalconf);
        setNewDeaths(newdeat);
        setTotalDeaths(totaldeat);
        setNewRecovered(newrecov);
        setTotalRecovered(totalrecov);
      } catch (err) {
        console.log(err.message);
      }
      SortTable('Total Confirmed');
    });

    socket.on('States', (data) => {
      const stat = [...data.State];
      const conf = [...data.Confirmed];
      const deh = [...data.Deaths];
      const rec = [...data.Recovered];
      const act = [...data.Active];

      setStates(stat);
      setStateConfirmed(conf);
      setStatesDeaths(deh);
      setStatesRecovered(rec);
      setStatesActive(act);

      setShowCountries(false);
      setShowStates(true);

      console.log(stat);
      console.log(conf);
      console.log(deh);
      console.log(rec);
      console.log(act);
      SortTable('States Confirmed');
    });
  }, []); //eslint-disable-line

  switch (SortStat) {
    case 'Countries':
      templist = [...Countries];
      break;
    case 'New Confirmed':
      templist = [...NewConfirmed];
      break;
    case 'Total Confirmed':
      templist = [...TotalConfirmed];
      break;
    case 'New Deaths':
      templist = [...NewDeaths];
      break;
    case 'Total Deaths':
      templist = [...TotalDeaths];
      break;
    case 'New Recovered':
      templist = [...NewRecovered];
      break;
    case 'Total Recovered':
      templist = [...TotalRecovered];
      break;
    case 'States':
      templist = [...States];
      break;
    case 'States Confirmed':
      templist = [...StateConfirmed];
      break;
    case 'States Deaths':
      templist = [...StateDeaths];
      break;
    case 'States Recovered':
      templist = [...StatesRecovered];
      break;
    case 'States Active':
      templist = [...StatesActive];
      break;
    default:
      break;
  }
  const newpos = SortInit(SortStat, MostLeast, templist);
  return (
    <div id="Covid19_Stats">
      <div>
        {ShowCountries === true ? (
          <table class="center">
            <CompareStats Area={Area} setArea={setArea} />
            <tr>
              <th colspan="8">Coronavirus Stats</th>
            </tr>
            <tr>
              <th onClick={() => SortTable('Countries')}>
                Countries{SortStat === 'Countries' ? (MostLeast ? '▲' : '▼') : '◆'}
              </th>
              <th onClick={() => SortTable('New Confirmed')}>
                New Confirmed{SortStat === 'New Confirmed' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('Total Confirmed')}>
                Total Confirmed{SortStat === 'Total Confirmed' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('New Deaths')}>
                New Deaths{SortStat === 'New Deaths' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('Total Deaths')}>
                Total Deaths{SortStat === 'Total Deaths' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('New Recovered')}>
                New Recovered{SortStat === 'New Recovered' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('Total Recovered')}>
                Total Recovered{SortStat === 'Total Recovered' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th></th>
            </tr>
            {newpos.map((pos, index) => (
              <MakeTable
                countries={Countries[pos]}
                newconfirmed={NewConfirmed[pos]}
                totalconfirmed={TotalConfirmed[pos]}
                newdeaths={NewDeaths[pos]}
                totaldeaths={TotalDeaths[pos]}
                newrecovered={NewRecovered[pos]}
                totalrecovered={TotalRecovered[pos]}
                index={index}
                GetStates={GetStates}
                Area={Area}
                setArea={setArea}
              />
            ))}
          </table>
        ) : null}
      </div>

      <div>
        {ShowStates === true ? (
          <table class="center">
            <CompareStats Area={Area} setArea={setArea} />
            <tr>
              <th colspan="6">{ClickedCountry}</th>
            </tr>
            <tr>
              <th onClick={() => SortTable('States')}>
                States{SortStat === 'States' ? (MostLeast ? '▲' : '▼') : '◆'}
              </th>
              <th onClick={() => SortTable('States Confirmed')}>
                Total Confirmed{SortStat === 'States Confirmed' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('States Deaths')}>
                Total Deaths{SortStat === 'States Deaths' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('States Recovered')}>
                Total Recovered{SortStat === 'States Recovered' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th onClick={() => SortTable('States Active')}>
                Current Active{SortStat === 'States Active' ? (MostLeast ? '▼' : '▲') : '◆'}
              </th>
              <th>
                <button type="button" class="button" onClick={showtable}>
                  Back
                </button>
              </th>
            </tr>
            {newpos.map((pos, index) => (
              <StateTable
                states={States[pos]}
                confirmed={StateConfirmed[pos]}
                death={StateDeaths[pos]}
                recovered={StatesRecovered[pos]}
                active={StatesActive[pos]}
                Area={Area}
                setArea={setArea}
              />
            ))}
          </table>
        ) : null}
      </div>
    </div>
  );
}
Table.propTypes = {
  sortstat: PropTypes.node.isRequired,
  mostleast: PropTypes.node.isRequired,
};

export function getCountries() {
  // Function to export the list of countries for dropdown list.
  return countriesArr;
}

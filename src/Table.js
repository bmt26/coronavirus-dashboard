import React, { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';
import { MakeTable } from './MakeTable.js';
import { StateTable } from './StatesTable.js';
import { SortInit } from './Sort.js';
import "./TableStyle.css";

const socket = io();
let currentUser;
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
	
	var sortstat = props.sortstat;
	var templist = [];
	

function GetStates(country){
	console.log("Clicked");
	console.log(country);
	socket.emit('getstate', { country : country });
	var Clicked = country;
	setClickedCountry(Clicked);
}

function showtable(){
	console.log("back button clicked");
	console.log(ClickedCountry);
	setShowStates(false);
	setShowCountries(true);
}

useEffect(() => {
	socket.on('connect', (data) => {
		try{
			console.log("getting data");
			console.log(data);
			console.log(data.countries);
			
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
		}
		catch(err){
			console.log(err.message);
		}
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
    });
    
  }, []);
	
	//Determine which variables to send to be sorted
	switch(sortstat) {
  	case "New Confirmed":
  		templist = [...NewConfirmed];
    	break;
    case "Total Confirmed":
    	templist = [...TotalConfirmed];
    	break;
    case "New Deaths":
    	templist = [...NewDeaths];
    	break;
    case "Total Deaths":
    	templist = [...TotalDeaths];
    	break;
    case "New Recovered":
    	templist = [...NewRecovered];
    	break;
    case "Total Recovered":
    	templist = [...TotalRecovered];
    case "Countries":
    	templist = [...Countries];
    	break;
    }
  const newpos = SortInit(sortstat, true, templist);
  return(
  	<div>
  		<div>
  		{ShowCountries === true ? (
  			<table id="customers">
        	<tr>
        		<th>Coronavirus Stats</th>
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
          	/>
        	  ))}
      	</table>
      	) : null}
    	</div>
    	
    	<div>
    		{ShowStates === true ? (
    			<table id="customers">
    			<button type="button" onClick={showtable}>Back</button>
        	<tr>
        		<th>{ClickedCountry}</th>
        	</tr>
        	{States.map((state, index) => (
          	<StateTable
            	states={state}
            	confirmed={StateConfirmed[index]}
            	death={StateDeaths[index]}
            	recovered={StatesRecovered[index]}
            	active={StatesActive[index]}
          	/>
        	  ))}
      	</table>
    		) : null}
    		
    	</div>
    	
  	</div>
  );
}
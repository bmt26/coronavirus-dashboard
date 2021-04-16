import React, { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';
import { MakeTable } from './MakeTable.js'

const socket = io();
let currentUser;
export function Table() {
  const [Countries, setCountries] = useState([]);
  const [NewConfirmed, setNewConfirmed] = useState([]);
  const [TotalConfirmed, setTotalConfirmed] = useState([]);
  const [NewDeaths, setNewDeaths] = useState([]);
  const [TotalDeaths, setTotalDeaths] = useState([]);
  const [NewRecovered, setNewRecovered] = useState([]);
  const [TotalRecovered, setTotalRecovered] = useState([]);

	
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
  }, []);
	
  return(
  	<div>
  		<p>heelo</p>
 
  		<div>
  			<table id="customers">
        	<tr>
          	<th>Coronavirus Stats</th>
        	</tr>
        	{Countries.map((country, index) => (
          	<MakeTable
            	countries={country}
            	newconfirmed={NewConfirmed[index]}
            	totalconfirmed={TotalConfirmed[index]}
            	newdeaths={NewDeaths[index]}
            	totaldeaths={TotalDeaths[index]}
            	newrecovered={NewRecovered[index]}
            	totalrecovered={TotalRecovered[index]}
          	/>
        	  ))}
      	</table>
    	</div>
    	
  	</div>
  );
}

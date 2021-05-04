import React from 'react';
import './News.css';

export function News(props) {
  
  return (
	<div class="card">
		<a href={props.url}>
		<h1>
			{props.headline}
		</h1>
		</a>
		
		<p>
			{props.snippet}
		</p>
	</div>
  );
}

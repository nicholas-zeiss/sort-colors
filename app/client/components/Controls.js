/**
This component allows us to choose which sorting algorithm we desire and to start/stop the sort
**/

import React from 'react';


const Controls = (props) => {
	return (
		<div className='btn-group btn-group-lg' id='controls'>
			<div className='btn-group dropup'>
				<button type='button'className="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown">
					Choose Algorithm &nbsp;<span className='caret'></span>
				</button>
				<ul className='dropdown-menu'>
					{props.algorithms.map(alg => <li key={alg}><a onClick={props.chooseAlgorithm.bind(null, alg)}>{alg}</a></li>)}
				</ul>
			</div>
			<button type='button' className='btn btn-success btn-lg' id='start-btn' onClick={props.toggleSorting}>
				{props.sorting ? 'Pause' : 'Start'}&nbsp;
			</button>
		</div>
	);
}

export default Controls;
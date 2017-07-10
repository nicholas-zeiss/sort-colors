/**
This component allows us to choose which sorting algorithm we desire and to start/stop the sort
**/

import React from 'react';


const Controls = (props) => {
	return (
		<div className='btn-toolbar' id='controls'>
			<div className='btn-group dropup' id='control-dropup'>
				<button type='button' className='btn btn-default'  disabled={props.sorting} id='control-dropup'>{props.currAlg}</button>
				<button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' disabled={props.sorting}><span className='caret'></span></button>
				<ul className='dropdown-menu'>
					{props.algorithms.map(alg => <li key={alg} className={props.currAlg == alg ? 'disabled' : null}><a onClick={props.chooseAlgorithm.bind(null, alg)}>{alg}</a></li>)}
				</ul>
			</div>
			<div className='btn-group' id='control-toggle'>
				<button type='button' className='btn btn-success' id='start-btn' onClick={props.toggleSorting}>
					{props.sorting ? <span className='glyphicon glyphicon-pause'></span> : 
						props.sorted ? <span className='glyphicon glyphicon-refresh'></span> : <span className='glyphicon glyphicon-play'></span>}
				</button>
				<button type='button' className='btn btn-danger' id='reset-btn' onClick={props.reset}><span className='glyphicon glyphicon-refresh'></span></button>
			</div>
		</div>
	);
};

export default Controls;
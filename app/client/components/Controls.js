/**
This component allows us to choose which sorting algorithm we desire and to play/pause/reset the sort as well as move forward one step
**/

import React from 'react';

import Algorithms from '../sort algorithms/Algorithms';

const AlgorithmNames = Object.keys(Algorithms);


const Controls = (props) => {
	return (
		<div className='btn-toolbar pull-left' id='controls'>
			<div className='btn-group dropup' id='control-dropup'>
				<button type='button' className='btn btn-default'  disabled={props.sorting}>Change Algorithm</button>
				<button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' disabled={props.sorting}><span className='caret'></span></button>
				<ul className='dropdown-menu'>
					{AlgorithmNames.map(alg => <li key={alg} className={props.currAlgorithm == alg ? 'disabled' : null}><a onClick={props.changeAlgorithm.bind(null, alg)}>{alg}</a></li>)}
				</ul>
			</div>
			<div className='btn-group' id='control-toggle'>
				<button type='button' className='btn btn-success' onClick={props.toggleSorting} disabled={props.sorted}>
					{props.sorting ? <span className='glyphicon glyphicon-pause'></span> : <span className='glyphicon glyphicon-play'></span>}
				</button>
				<button type='button' className='btn btn-success' onClick={props.stepForward} disabled={props.sorting || props.sorted}>
					<span className='glyphicon glyphicon-step-forward'></span>
				</button>
				<button type='button' className='btn btn-danger' onClick={props.reset} disabled={props.sorting}>
					<span className='glyphicon glyphicon-refresh'></span>
				</button>
			</div>
		</div>
	);
};

export default Controls;
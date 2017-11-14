/**
 *
 *	This component allows us to choose which sorting algorithm we desire and to play/pause/reset the sort as well as move forward one step
 *
**/

import React from 'react';

import Algorithms from '../sort algorithms/Algorithms';


const AlgorithmNames = Object.keys(Algorithms);


const Controls = props => {
	return (
		<div className='btn-toolbar pull-left' id='controls'>
			<div className='btn-group dropup' id='control-dropup'>
				<button
					className='btn btn-default'
					disabled={ props.sorting } 
					type='button'
				>
					Change Algorithm
				</button>
				
				<button
					className='btn btn-default dropdown-toggle'
					data-toggle='dropdown'
					disabled={ props.sorting }
					type='button'
				>
					<span className='caret'></span>
				</button>
				
				<ul className='dropdown-menu'>
					{ 
						AlgorithmNames.map(alg => (
							<li className={ props.currAlgorithm == alg ? 'disabled' : null } key={ alg }>
								<a onClick={ props.changeAlgorithm.bind(null, alg) }>{ alg }</a>
							</li> 
						))
					}
				</ul>
			</div>

			<div className='btn-group' id='control-toggle'>
				<button
					className='btn btn-success'
					disabled={ props.sorted }
					onClick={ props.toggleSorting }
					title={ props.sorting ? 'Pause' : 'Play' }
					type='button'
				>
					{ props.sorting ? <span className='glyphicon glyphicon-pause'></span> : <span className='glyphicon glyphicon-play'></span> }
				</button>
				
				<button
					className='btn btn-success'
					disabled={ props.sorting || props.sorted }
					onClick={ props.stepForward }
					title='Step Forward'
					type='button'
				>
					<span className='glyphicon glyphicon-step-forward'></span>
				</button>
				
				<button
					className='btn btn-danger'
					disabled={ props.sorting }
					onClick={ props.reset }
					title='Reset'
					type='button'
				>
					<span className='glyphicon glyphicon-refresh'></span>
				</button>
			</div>
		</div>
	);
};


export default Controls;


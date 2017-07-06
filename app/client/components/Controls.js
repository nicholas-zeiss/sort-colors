/**
This component allows us to choose which sorting algorithm we desire and to start/stop the sort
**/

import React from 'react';


class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='btn-group btn-group-lg'>
				<div className='btn-group dropup'>
					<button type='button'className="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown">
						Choose Algorithm &nbsp;<span className='caret'></span>
					</button>
					<ul className='dropdown-menu'>
						<li><a>button</a></li>
						<li><a>merge</a></li>
					</ul>
				</div>
				<button type='button' className='btn btn-success btn-lg' id='start-btn'>Start</button>
			</div>
		);
	}
}

export default Controls;
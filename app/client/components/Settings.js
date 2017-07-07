

import React from 'react';

const Settings = (props) => {
	return (
		<div id='settings'>
			<div className='btn-group btn-group-lg'>
				<button type='button' className='btn btn-default btn-lg' id='start-btn'><span className='glyphicon glyphicon-minus'></span></button>
				{props.delay}
				<button type='button' className='btn btn-default btn-lg' id='start-btn'><span className='glyphicon glyphicon-plus'></span></button>
			</div>
			<div className='btn-group btn-group-lg'>
				<button type='button' className='btn btn-default btn-lg' id='start-btn'><span className='glyphicon glyphicon-minus'></span></button>
				{props.numItems}
				<button type='button' className='btn btn-default btn-lg' id='start-btn'><span className='glyphicon glyphicon-plus'></span></button>
			</div>
		</div>
	);
}

export default Settings;
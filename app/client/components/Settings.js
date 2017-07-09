/**
This component allows us to alter the delay between ticks and the amount of items to sort
**/

import React from 'react';

const Settings = (props) => {
	return (
		<div id='settings' className='btn-toolbar'>
			<div className='btn-group' id='settings-delay'>
				<button type='button' className='btn btn-default' disabled={props.sorting} onClick={props.changeDelay.bind(null, -5)}><span className='glyphicon glyphicon-minus'></span></button>
				<button className='btn btn-primary'>{props.delay}</button>
				<button type='button' className='btn btn-default' disabled={props.sorting} onClick={props.changeDelay.bind(null, 5)}><span className='glyphicon glyphicon-plus'></span></button>
			</div>
			<div className='btn-group' id='settings-items'>
				<button type='button' className='btn btn-default' disabled={props.sorting} onClick={props.changeNum.bind(null, -1)}><span className='glyphicon glyphicon-minus'></span></button>
				<button className='btn btn-primary'>{props.numItems}</button>
				<button type='button' className='btn btn-default' disabled={props.sorting} onClick={props.changeNum.bind(null, 1)}><span className='glyphicon glyphicon-plus' onClick={props.changeNum.bind(null, 1)}></span></button>
			</div>
		</div>
	);
}

export default Settings;
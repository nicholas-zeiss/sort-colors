/**
This component allows us to alter the delay between ticks and the amount of items to sort
**/

import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			intervals: [],
			mouseStillDown: false
		};
	}

	repeat(action) {
		action();

		setTimeout(() => {
			if (this.state.mouseStillDown) {
				let id = setInterval(action, 100);
				
				this.setState({
					intervals: this.state.intervals.concat(id)
				});
			}
		}, 500);

		this.setState({
			mouseStillDown: true
		});
	}

	stopRepeat() {
		this.state.intervals.forEach(id => clearInterval(id));

		this.setState({
			mouseStillDown: false
		});
	}

	render() {
		return (
			<div id='settings' className='btn-toolbar pull-right'>
				<div className='btn-group' id='settings-delay'>
					<button onMouseDown={this.repeat.bind(this, this.props.changeDelay.bind(null, -5))}
									onMouseUp={this.stopRepeat.bind(this)} type='button'
									type='button'
									className='btn btn-default'
									disabled={this.props.sorting}>
						<span className='glyphicon glyphicon-minus'></span>
					</button>
					<button className='btn btn-primary' disabled={this.props.sorting}>{'Delay (ms): ' + this.props.delay}</button>
					<button onMouseDown={this.repeat.bind(this, this.props.changeDelay.bind(null, 5))}
									onMouseUp={this.stopRepeat.bind(this)}
									type='button'
									className='btn btn-default'
									disabled={this.props.sorting}>
						<span className='glyphicon glyphicon-plus'></span>
					</button>
				</div>
				<div className='btn-group' id='settings-items'>
					<button onMouseDown={this.repeat.bind(this, this.props.changeNum.bind(null, -5))}
									onMouseUp={this.stopRepeat.bind(this)}
									type='button'
									className='btn btn-default'
									disabled={this.props.sorting}>
						<span className='glyphicon glyphicon-minus'></span>
					</button>
					<button className='btn btn-primary' disabled={this.props.sorting}>{'Items: ' + this.props.numItems}</button>
					<button onMouseDown={this.repeat.bind(this, this.props.changeNum.bind(null, 5))}
									onMouseUp={this.stopRepeat.bind(this)}
									type='button'
									className='btn btn-default'
									disabled={this.props.sorting}>
						<span className='glyphicon glyphicon-plus'></span>
					</button>
				</div>
			</div>
		);
	}
}

export default Settings;
/**
This component displays the data we are sorting using a canvas element
**/

import React from 'react';


class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			container: 'null'
		};
	}

	componentDidMount() {
		this.setState({
			container: document.getElementById('visualizer').getContext('2d')
		});
	}

	componentDidUpdate() {
		let ctx = this.state.container;

		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, this.props.width, this.props.height);
	}

	render() {
		return (
			<div className='text-center'>
				<canvas id='visualizer' width={this.props.width} height={this.props.height}></canvas>
			</div>
		);
	}
}

export default View;
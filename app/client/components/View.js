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

		let width = this.props.width / this.props.data.length;

		for (let i = 0; i < this.props.data.length; i++) {
			ctx.fillStyle = Math.abs(i - this.props.active) < 2 ? 'red' : 'black';
			ctx.fillRect(i * width, (1 - this.props.data[i] / this.props.data.length) * this.props.height, width - 2, this.props.height);
		}
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
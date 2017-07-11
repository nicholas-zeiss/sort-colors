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

	/**
	Runs for each change in the data being sorted
	**/
	componentDidUpdate() {
		let ctx = this.state.container;

		ctx.fillStyle = '#1c1e22';																		//draw background
		ctx.fillRect(0, 0, this.props.width, this.props.height);

		let width = this.props.width / this.props.data.length;

		for (let i = 0; i < this.props.data.length; i++) {				//draw data
			ctx.fillStyle = 'white'; 																//default color

			for (let j = 0; j < this.props.colors.length; j++) {												//checks if current data is in any of the color ranges defined by the
				if (i >= this.props.colors[j][0] && i <= this.props.colors[j][1]) {				//sorting objects color map, earlier color ranges have precedence
					ctx.fillStyle = this.props.colors[j][2];
					break;
				}
			}

			if (this.props.validHeap && this.props.validHeap.has(i) && ctx.fillStyle != '#ff0000') {
				ctx.fillStyle = 'cyan';
			}

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
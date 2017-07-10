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

		ctx.fillStyle = '#1c1e22';																		//background
		ctx.fillRect(0, 0, this.props.width, this.props.height);

		let width = this.props.width / this.props.data.length;

		for (let i = 0; i < this.props.data.length; i++) {
			ctx.fillStyle = i == this.props.active ? 'red' :			//red if the current piece of data is being sorted by the algorithm
											i >= this.props.sortedSection[0] && i <= this.props.sortedSection[1] ? 'green' : 'white';			//green if in final position, black otherwise

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
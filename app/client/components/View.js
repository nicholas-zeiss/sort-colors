/**
 *
 *	This component displays the data we are sorting using a canvas element.
 *
**/

import React from 'react';

import Colors from '../utils/Colors';


class View extends React.Component {
	constructor(props) {
		super(props);
		this.contextRef = canvas => this.context = canvas.getContext('2d');
	}


	componentDidUpdate() {
		const ctx = this.context;
		const colors = this.props.sortController.colors;
		const data = this.props.sortController.data;
		const canvasHeight = this.props.canvasHeight;
		const canvasWidth = this.props.canvasWidth;
		const columnWidth = canvasWidth / data.length;

		ctx.fillStyle = Colors.background;																		
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		
		for (let i = 0; i < data.length; i++) {
			ctx.fillStyle = colors[i];

			// data.length is equal to the largest item's value
			const columnHeight = (1 - data[i] / data.length) * canvasHeight;


			ctx.fillRect(i * columnWidth, columnHeight, columnWidth - 2, canvasHeight);
		}
	}


	render() {
		return (
			<div className='text-center'>
				<canvas
					height={ this.props.canvasHeight }
					id='visualizer'
					ref={ this.contextRef }
					width={ this.props.canvasWidth }
				>
				</canvas>
			</div>
		);
	}
}


export default View;


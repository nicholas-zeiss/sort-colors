/**
This component displays the data we are sorting using a canvas element
**/

import React from 'react';

import COLORS from '../utils/Colors';

class View extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			container: 'null'
		};
	}


	componentDidMount() {
		this.setState({
			container: $('#visualizer')[0].getContext('2d')
		});
	}

	/**
	Runs for each change in the data being sorted
	**/
	componentDidUpdate() {
		let ctx = this.state.container;

		ctx.fillStyle = COLORS.background;																		
		ctx.fillRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);

		let width = this.props.canvasWidth / this.props.sortController.data.length;

		for (let i = 0; i < this.props.sortController.data.length; i++) {
			let height = (1 - this.props.sortController.data[i] / this.props.sortController.data.length) * this.props.canvasHeight;			//this.props.data.length is equal to the largest item's value

			ctx.fillStyle = COLORS.white; 																//default color

			for (let j = 0; j < this.props.sortController.colors.length; j++) {												//sets item color according to provided color map
				if (i >= this.props.sortController.colors[j][0] && i <= this.props.sortController.colors[j][1]) {				//color map is 2d array, each inner array is [startIndex, endIndex, color]
					ctx.fillStyle = this.props.sortController.colors[j][2];
					break;																																	//earliest inner array has precedence
				}
			}

			const validHeap = this.props.sortController.sortModel.validHeap && !this.props.sortController.sorted ? this.props.sortController.sortModel.validHeap : null

			//when using heapsort the heap portion has several yellow and several blue sections. Rather than construct arrays for each in the color map we 
			//set the whole heap yellow. We track what items should be blue seperately in a Set passed here as validHeap and in this loop
			//override that yellow style as necessary. If the item is red, however, that is the active item in the data and we do not override.
			if (validHeap && validHeap.has(i) && ctx.fillStyle != COLORS.red) {				
				ctx.fillStyle = COLORS.cyan;
			}

			ctx.fillRect(i * width, height, width - 2, this.props.canvasHeight);
		}
	}


	render() {
		return (
			<div className='text-center'>
				<canvas id='visualizer' width={this.props.canvasWidth} height={this.props.canvasHeight}></canvas>
			</div>
		);
	}
}

export default View;
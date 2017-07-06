/**
This is our top level component which contains all subcomponents.
**/

import React from 'react';

import Controls from'./Controls';
import View from './View';


class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canvasHeight: 300,						//default values, will be changed when this component mounts and we know how much space we have
			canvasWidth: 500,
			canvasDiv: null								//holds a reference to the div where View is rendered so we can track it's dimensions and pass it down to View
		};

		/**
		This function is passed as a ref to the div holding View. Upon mounting it is called to pass the div to state
		and updated the dimensions passed to View. The ref must have this bound to it so it can call setState, however
		using ref={this.updateCanvasDimensions.bind(this)} results in it being called on updates and not just mount. So,
		we define it here to avoid that.
		**/
		this.updateCanvasDimensions = function(row) {					
			this.setState({
				canvasHeight: .6 * (row.offsetWidth - 200), 
				canvasWidth: row.offsetWidth - 200,
				canvasDiv: row
			});
		}.bind(this);
	}

	/**
	On mount we create a listener for window resizes which triggers the View to receive new dimensions
	**/
	componentDidMount() {
		window.onresize = () => { 
			this.setState({
				canvasHeight: .6 * (this.state.canvasDiv.offsetWidth - 200),
				canvasWidth: this.state.canvasDiv.offsetWidth - 200
			}); 
		};
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='page-header'>
					<h1 className='text-center' id='header'>Visual Sorter</h1>
				</div>
				<div className='container'>
					<div className='row'>
						<div ref={this.updateCanvasDimensions}>
							<View width={this.state.canvasWidth} height={this.state.canvasHeight}/>
						</div>
					</div>
					<div className='row'>
						<div className='text-center'>		
							<Controls/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
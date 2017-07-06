/**
This is our top level component which contains all subcomponents.
**/

import React from 'react';

import Controls from'./Controls';
import View from './View';

import Bubble from '../utils/Bubble.js';
import Merge from '../utils/Merge.js';

import Sorter from '../utils/Sorter.js';


const ALGORITHMS = {
	Bubble: Bubble,
	Merge: Merge
}

const KEYS = Object.keys(ALGORITHMS).sort();
console.log(KEYS);

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canvasHeight: 300,						//default values, will be changed when this component mounts and we know how much space we have
			canvasWidth: 500,
			canvasDiv: null,							//holds a reference to the div where View is rendered so we can track it's dimensions and pass it down to View
			sorting: false,
			algorithm: 'Bubble',
			sorter: new Sorter(Bubble, 50),
			numItemsToSort: 50,
			intervalID: undefined
		};

		/**
		This function is passed as a ref to the div holding View. Upon mounting it is called to pass the div to state
		and update the dimensions passed to View. The ref must have this bound to it so it can call setState, however
		using ref={this.updateCanvasDimensions.bind(this)} results in it being called on updates and not just mount. So,
		we define it here to avoid that.
		**/
		this.updateCanvasDimensions = function(row) {					
			this.setState({
				canvasHeight: .5 * (row.offsetWidth - 100), 
				canvasWidth: row.offsetWidth - 100,
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
				canvasHeight: .5 * (this.state.canvasDiv.offsetWidth - 100),
				canvasWidth: this.state.canvasDiv.offsetWidth - 100
			});
		};
	}

	toggleSorting() {
		if (!this.state.sorting) {
			let id = setInterval(() => {
				this.state.sorter.tick();
				
				if (this.state.sorter.sorted) {
					this.stopSorting();
				}
				
				this.setState({}); 
			}, 15);

			this.setState({
				sorting: true,
				intervalID: id
			});
		} else {
			this.stopSorting();
		}
	}

	stopSorting() {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sorting: false,
				ntervalID: undefined
		});
	}

	chooseAlgorithm(alg) {
		if (alg !== this.state.algorithm && !this.state.sorting) {
			this.state.sorter.reset(ALGORITHMS[alg], this.state.numItemsToSort);
			this.setState({
				algorithm: alg,
			});
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='page-header'>
					<h1 className='text-center' id='header'>Visual Sorter</h1>
				</div>
				<div className='container well'>
					<div className='row'>
						<h3 id='algorithm'>{`Now using ${this.state.algorithm} sort`}</h3>
					</div>
					<div className='row' ref={this.updateCanvasDimensions}>
						<View width={this.state.canvasWidth} height={this.state.canvasHeight} data={this.state.sorter.data} active={this.state.sorter.active}/>
					</div>
					<div className='row text-center'>
						<Controls sorting={this.state.sorting} algorithms={KEYS} toggleSorting={this.toggleSorting.bind(this)} chooseAlgorithm={this.chooseAlgorithm.bind(this)}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
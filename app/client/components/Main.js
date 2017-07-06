/**
This is our top level component which contains all subcomponents.
**/

import React from 'react';

import Controls from'./Controls';
import View from './View';

import Bubble from '../utils/Bubble';
import Gnome from '../utils/Gnome';
import Insertion from '../utils/Insertion';
import Merge from '../utils/Merge';
import Selection from '../utils/Selection';

import Sorter from '../utils/Sorter';


const ALGORITHMS = {
	Bubble: Bubble,
	Gnome: Gnome,
	Insertion: Insertion,
	Merge: Merge,
	Selection: Selection
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
			sorter: new Sorter(Bubble, 25),	
			numItemsToSort: 25,
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

	/**
	Allows us to start and stop sorting, animations and the sort itself is controlled by an interval we create
	**/
	toggleSorting() {
		if (!this.state.sorting) {
			let id = setInterval(() => {
				this.state.sorter.tick();
				
				if (this.state.sorter.sorted) {
					this.stopSorting();
				}
				
				this.setState({}); 
			}, 25);

			this.setState({
				sorting: true,
				intervalID: id
			});
		} else {
			this.stopSorting();
		}
	}

	/**
	Called by the animating interval created in toggleSorting if sort is completed, or by user is the pause button is activated
	**/
	stopSorting() {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sorting: false,
			intervalID: undefined
		});
	}

	/**
	Sent as a prop to Controls, allows us to change algorithms if the sort is not in progress
	**/
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
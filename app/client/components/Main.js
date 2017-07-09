/**
This is our top level component which contains all subcomponents.
**/

import React from 'react';

import Controls from './Controls';
import Settings from './Settings';
import View from './View';

import Bubble from '../sort algorithms/Bubble';
import Gnome from '../sort algorithms/Gnome';
import Heap from '../sort algorithms/Heap';
import Insertion from '../sort algorithms/Insertion';
import Merge from '../sort algorithms/Merge';
import Selection from '../sort algorithms/Selection';

import Sorter from '../utils/Sorter';


const ALGORITHMS = {
	Bubble: Bubble,
	Gnome: Gnome,
	Heap: Heap,
	Insertion: Insertion,
	Merge: Merge,
	Selection: Selection
};

const KEYS = Object.keys(ALGORITHMS).sort();

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canvasHeight: 300,						//default values, will be changed when this component mounts and we know how much space we have
			canvasWidth: 500,
			canvasDiv: null,							//holds a reference to the div where View is rendered so we can track it's dimensions and pass it down to View
			sorting: false,
			algorithm: 'Bubble',							
			sorter: new Sorter(Bubble, 100),
			unsorted: true,	
			numItemsToSort: 100,
			intervalID: undefined,
			delay: 30
		};
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
	This function is passed as a ref to the div holding View which we need access to to resize the canvas when the window resizes.
	The funky syntax gives it lexical this so that we can use this.setState. Defining an arrow function inline on the div or binding 
	a function there results in it executing on updates and not just mounts which leads to an infinite loop of updates.
	**/
	updateCanvasDimensions = (row) => {					
		if (row) {
			this.setState({
				canvasHeight: .5 * (row.offsetWidth - 100), 
				canvasWidth: row.offsetWidth - 100,
				canvasDiv: row
			});
		}
	}

	/**
	Allows us to start and stop sorting, animations and the sort itself is controlled by an interval we create
	**/
	toggleSorting() {
		if (!this.state.sorting) {
			if (this.state.sorter.sorted) {
				this.reset(this.toggleSorting);
			} else {
				let id = setInterval(() => {
					this.state.sorter.tick();
					
					if (this.state.sorter.sorted) {
						this.pauseSorting();
					}
					
					this.forceUpdate(); 
				}, this.state.delay);

				this.setState({
					sorting: true,
					intervalID: id
				});
		  }
		} else {
			this.pauseSorting();
		}
	}

	/**
	Called by the animating interval created in toggleSorting if sort is completed, or by user if the pause button is activated
	**/
	pauseSorting() {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sorting: false,
			intervalID: undefined
		});
	}
	
	/**
	Resets the sorter, generates new random data to sort
	**/
	reset() {
			clearInterval(this.state.intervalID);
			this.state.sorter.reset(ALGORITHMS[this.state.algorithm], this.state.numItemsToSort);

			this.setState({
				sorting: false,
				intervalID: undefined
			});
		
	}

	/**
	Sent as a prop to Controls, allows us to change algorithms if the sort is not in progress
	**/
	chooseAlgorithm(alg) {
		this.state.sorter.reset(ALGORITHMS[alg], this.state.numItemsToSort);
		this.setState({
			algorithm: alg,
		  unsorted: true
		});
	}


	changeDelay(n) {
		console.log('changing delay by', n)
		if (this.state.delay + n <= 500 && this.state.delay + n >= 5) {
			this.setState({
				delay: this.state.delay + n
			});
		}
	}

	changeNum(n) {
		if (this.state.numItemsToSort + n <= 100 && this.state.numItemsToSort + n >= 10) {
			this.state.sorter.reset(ALGORITHMS[this.state.algorithm], this.state.numItemsToSort + n);

			this.setState({
				numItemsToSort: this.state.numItemsToSort + n
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
						<View width={this.state.canvasWidth} 
									height={this.state.canvasHeight} 
									data={this.state.sorter.data} 
									active={this.state.sorter.active}/>
					</div>
					<div className='row'>
						<div className='col-md-4 text-center'>
							<Controls algorithms={KEYS}
												currAlg={this.state.algorithm}
												chooseAlgorithm={this.chooseAlgorithm.bind(this)}
												sorting={this.state.sorting} 
												sorted={this.state.sorter.sorted}
												reset={this.reset.bind(this)} 
												toggleSorting={this.toggleSorting.bind(this)}/>
						</div>
						<div className='col-md-4 col-md-offset-4 text-center'>
							<Settings delay={this.state.delay} 
												changeDelay={this.changeDelay.bind(this)} 
												changeNum={this.changeNum.bind(this)} 
												numItems={this.state.numItemsToSort} 
												sorting={this.state.sorting}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
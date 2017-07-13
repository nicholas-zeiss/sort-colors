/**
This is our top level component which contains all subcomponents. It is the view component of our MVC and linkes the user interface to the controller, which is an
instance of the Sorter class held in this component's state. The subcomponents it contains are View, Controller, and Settings. View renders the data being sorted
to a canvas. Controller allows the user to change algorithms, pause/play, step forward, and reset the sorter. Settings allows the user to change the number of items
to be sorted and to change the delay between the ticks of the sorter.
**/

import React from 'react';

import Controls from './Controls';
import Settings from './Settings';
import View from './View';

import Bubble from '../sort algorithms/Bubble';
import Cocktail from '../sort algorithms/Cocktail';
import Gnome from '../sort algorithms/Gnome';
import Heap from '../sort algorithms/Heap';
import Insertion from '../sort algorithms/Insertion';
import Intro from '../sort algorithms/Intro';
import Merge from '../sort algorithms/Merge';
import Quick from '../sort algorithms/Quick';
import Selection from '../sort algorithms/Selection';
import Shell from '../sort algorithms/Shell';

import Sorter from '../utils/Sorter';

import ALG_INFO from '../utils/algInfo';
import COLOR_KEY from '../utils/colorKey';


const ALGORITHMS = {
	'Bubble Sort': Bubble,
	'Cocktail Shaker Sort': Cocktail,
	'Gnome Sort': Gnome,
	'Heapsort': Heap,
	'Insertion Sort': Insertion,
	'Introsort': Intro,
	'Merge Sort': Merge,
	'Quicksort': Quick,
	'Selection Sort': Selection,
	'Shellsort': Shell
};

const KEYS = Object.keys(ALGORITHMS).sort();			//ironically we do not use any of our own algorithms here


class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			canvasHeight: 300,						//default values, will be changed when this component mounts and we know how much space we have
			canvasWidth: 500,
			canvasDiv: null,							//holds a reference to the div where View is rendered so we can track its dimensions to update the above two variables
			
			sorting: false,
			unsorted: true,								//have we started sorting the data yet?
			
			numItemsToSort: 100,
			delay: 20,
			
			algorithm: 'Bubble Sort',							
			sorter: new Sorter(Bubble, 100),
			intervalID: undefined
		};
	}

	/**
	On mount we create a listener for window resizes which triggers the View to receive new dimensions, we also intialze the bootstrap popover
	that displays information about the algorithm
	**/
	componentDidMount() {
		window.onresize = () => { 
			this.setState({
				canvasHeight: .4 * (this.state.canvasDiv.offsetWidth - 100),
				canvasWidth: this.state.canvasDiv.offsetWidth - 100
			});
		};

		$('#info-popover').popover({
			html: true,
			trigger: 'hover'
		});
	}


	componentDidUpdate() {
		$('#info-popover').attr('data-content', ALG_INFO[this.state.algorithm]);
	}

	/**
	This function is passed as a ref to the div holding View which we need access to to resize the canvas when the window resizes.
	The funky syntax allows us to have lexical this without having to define it in the constructor or bind it. Binding 
	a function inline when passing it as a ref caues it to execue on updates and not just mounts. As we setState here such a pattern would 
	cause an infinite loop of updates.
	**/
	updateCanvasDimensions = (row) => {					
		if (row) {
			this.setState({
				canvasHeight: .4 * (row.offsetWidth - 100), 
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
			let id = setInterval(() => {
				this.state.sorter.tick();

				if (this.state.sorter.sorted) {
					this.pauseSorting();
				}
				
				this.forceUpdate(); 
			}, this.state.delay);

			this.setState({
				sorting: true,
				intervalID: id,
				unsorted: false
			});  
		} else {
			this.pauseSorting();
		}
	}


	stepForward() {
		this.state.sorter.tick();
		
		this.setState({
			unsorted: false
		});
	}


	pauseSorting() {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sorting: false,
			intervalID: undefined
		});
	}
	

	reset() {
			clearInterval(this.state.intervalID);
			
			this.state.sorter.reset(ALGORITHMS[this.state.algorithm], this.state.numItemsToSort);

			this.setState({
				sorting: false,
				intervalID: undefined,
				unsorted: true
			});
		
	}


	chooseAlgorithm(alg) {
		this.state.sorter.reset(ALGORITHMS[alg], this.state.numItemsToSort);
		
		this.setState({
			algorithm: alg,
		  unsorted: true
		});
	}


	changeDelay(n) {
		if (this.state.delay + n <= 500 && this.state.delay + n >= 5) {
			this.setState({
				delay: this.state.delay + n
			});
		}
	}

	changeNum(n) {
		if (this.state.numItemsToSort + n <= 300 && this.state.numItemsToSort + n >= 10) {
			this.state.sorter.reset(ALGORITHMS[this.state.algorithm], this.state.numItemsToSort + n);

			this.setState({
				numItemsToSort: this.state.numItemsToSort + n
			});	
		}
	}


	render() {
		return (
			<div>
				<div className='page-header'>
					<h1 className='text-center' id='header'>Visual Sorter</h1>
				</div>
				<div className='panel panel-default' id='app-panel'>
					<div className='panel-heading' id='alg-info'>
						<h2 id='algorithm'>{this.state.algorithm}
							<button id='info-popover'
							        type="button"
											className="btn btn-xs btn-info"
											data-toggle="popover"
											disabled={this.state.sorting}>
								<span className='glyphicon glyphicon-info-sign'></span>
							</button>
						</h2>
						<div className='well pull-right' id='color-key-well'>
							{COLOR_KEY[this.state.algorithm]}
						</div>
					</div>
					<div className='panel-body container-fluid' id='sort-container'>
						<div className='row' ref={this.updateCanvasDimensions}>
							<View width={this.state.canvasWidth} 
										height={this.state.canvasHeight} 
										data={this.state.sorter.data}
										colors={this.state.sorter.colors}
										validHeap={this.state.sorter.sort.validHeap && !this.state.sorter.sorted ? this.state.sorter.sort.validHeap : null}/> 
						</div>
						<div className='row'>
							<div className='col-md-6 text-center'>
								<Controls algorithms={KEYS}
													currAlg={this.state.algorithm}
													chooseAlgorithm={this.chooseAlgorithm.bind(this)}
													sorting={this.state.sorting} 
													sorted={this.state.sorter.sorted}
													reset={this.reset.bind(this)} 
													stepForward={this.stepForward.bind(this)}
													toggleSorting={this.toggleSorting.bind(this)}/>
							</div>
							<div className='col-md-6 text-center'>
								<Settings delay={this.state.delay} 
													changeDelay={this.changeDelay.bind(this)} 
													numItems={this.state.numItemsToSort} 
													changeNum={this.changeNum.bind(this)} 
													sorting={this.state.sorting}/>
							</div>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
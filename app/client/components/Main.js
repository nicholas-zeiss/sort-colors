/**
 *
 *	This is our top level component which contains all subcomponents. It holds our sorting algroithm model in its state. 
 *	The subcomponents it contains are View, Controller, and Settings. View renders the data being sorted to a canvas.
 *	Controller allows the user to change algorithms, pause/play, step forward, and reset the algorithm. Settings allows the
 *	user to change the number of items to be sorted and to change the delay between the ticks of the Sorter.
 *
**/

import React from 'react';

import Controls from './Controls';
import Settings from './Settings';
import View from './View';

import Algorithms from '../sort algorithms/Algorithms';

import AlgInfo from '../utils/AlgInfo';
import ColorKeys from '../utils/ColorKeys';
import SortController from '../utils/SortController';


class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			algorithm: 'Bubble Sort',							
			canvasHeight: 300,
			canvasWidth: 500,
			delay: 5,
			intervalID: undefined,
			dataSize: 100,
			sortController: new SortController(Algorithms['Bubble Sort'], 100),
			sorting: false
		};

		this.canvasContainerRef = div => this.canvasContainer = div;
	}


	// Grab the dimensions of the div containing our canvas so that we can size the canvas in <View/> appropriately,
	// and set up a listener to handle those changes on a resize. Setup the bootstrap popover for algorithm info using jQuery.
	componentDidMount() {
		const resizeCanvas = () => this.setState({
			canvasHeight: .4 * (this.canvasContainer.clientWidth - 100),
			canvasWidth: this.canvasContainer.clientWidth - 100
		});

		window.onresize = resizeCanvas;
		$('#info-popover').popover({ html: true, trigger: 'hover' });
		resizeCanvas();
	}


	// Change text of the info popover if algorithm has changed
	componentDidUpdate(prevProps, prevState) {
		if (prevState.algorithm != this.state.algorithm) {
			$('#info-popover').attr('data-content', AlgInfo[this.state.algorithm]);
		}
	}


	changeAlgorithm = alg => {		
		this.setState({
			algorithm: alg,
			sortController: new SortController(Algorithms[alg], this.state.dataSize)
		});
	}


	changeDelay = inc => {
		if (this.state.delay + inc <= 500 && this.state.delay + inc >= 5) {
			this.setState({ delay: this.state.delay + inc });
		}
	}


	changeDataSize = inc => {
		if (this.state.dataSize + inc <= 300 && this.state.dataSize + inc >= 10) {
			this.setState({
				dataSize: this.state.dataSize + inc,
				sortController: new SortController(Algorithms[this.state.algorithm], this.state.dataSize + inc)
			});	
		}
	}


	startSorting = () => {
		return setInterval(() => {
			this.state.sortController.tick();

			if (this.state.sortController.sorted) {
				this.pauseSorting();
			} else {
				this.forceUpdate(); 
			}
		}, this.state.delay);
	}


	pauseSorting = () => {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sorting: false,
			intervalID: undefined
		});
	}


	toggleSorting = () => {
		if (!this.state.sorting) {
			this.setState({
				intervalID: this.startSorting(),
				sorting: true
			});  
		} else {
			this.pauseSorting();
		}
	}


	// move the sorting algorithm forward one swap/comparison
	stepForward = () => {
		this.state.sortController.tick();
		this.forceUpdate();
	}
	

	reset = () => {
		clearInterval(this.state.intervalID);
		
		this.setState({
			sortController: new SortController(Algorithms[this.state.algorithm], this.state.dataSize),
			sorting: false,
			intervalID: undefined
		});
	}


	render() {
		const state = this.state;

		return (
			<div>
				<div className='page-header'>
					<h1 className='text-center' id='header'>
						Visual Sorter
					</h1>
				</div>

				<div className='panel panel-default' id='app-panel'>
					<div className='panel-heading' id='alg-info'>
						<h2 id='algorithm'>
							{ state.algorithm }
							<button
								className='btn btn-xs btn-info'
								data-toggle='popover'
								disabled={ state.sorting }
								id='info-popover'
								type='button'
							>
								<span className='glyphicon glyphicon-info-sign' id='info-glyph'></span>
							</button>
						</h2>
						
						<div className='well pull-right' id='color-key-well'>
							{ ColorKeys[state.algorithm] }
						</div>
					</div>
					
					<div className='panel-body container-fluid' id='sort-container'>
						<div
							className='row'
							id='canvas-container'
							ref={ this.canvasContainerRef }
						>
							<View
								canvasHeight={ state.canvasHeight }
								canvasWidth={ state.canvasWidth }
								sortController={ state.sortController }
							/> 
						</div>
						
						<div className='row'>
							<div className='col-md-6 text-center'>
								<Controls
									changeAlgorithm={ this.changeAlgorithm }
									currAlgorithm={ state.algorithm }
									reset={ this.reset } 
									sorted={ state.sortController.sorted }
									sorting={ state.sorting } 
									stepForward={ this.stepForward }
									toggleSorting={ this.toggleSorting }
								/>
							</div>
							
							<div className='col-md-6 text-center'>
								<Settings
									changeDataSize={ this.changeDataSize } 
									changeDelay={ this.changeDelay }
									delay={ state.delay } 
									numItems={ state.dataSize } 
									sorting={ state.sorting }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Main;


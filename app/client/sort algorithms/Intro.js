/**
Here we have the class responsible for implementing introsort, a hybrid between quicksort and heapsort
**/

import Heap from './Heap';
import Quick from './Quick';

import COLORS from '../utils/Colors';


class Intro {
	constructor(data) {
		this.data = data;
		
		this.maxDepth = 2 * Math.floor(Math.log(data.length));		//max level of recursion before switching to heapsort
		
		this.sorter = null;																				//holds an instance of either Heap or Quick
	
		this.sections = [];														//much like in our implementation of quicksort we store subsections in an array
		this.currSection = [0, data.length - 1, 0];		//start, end, depth

		this.sorted = false;
	}

	//moves introsort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		let colors = []; 
		
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		
		} else if (this.sorter) {
			colors = colors.concat(this.tickSorter());
		
		} else if (this.currSection) {
			if (this.currSection[2] == this.maxDepth) {
				this.sorter = new Heap(this.data.slice(this.currSection[0], this.currSection[1] + 1));
			} else {
				this.sorter = new Quick(this.data.slice(this.currSection[0], this.currSection[1] + 1));
			} 

		} else if (this.sections.length) {
			this.currSection = this.sections.pop();

			if (this.currSection[0] >= this.currSection[1]) {
				this.currSection = null;
			}

		} else {
			this.sorted = true;
		} 

		//the color scheme is the one created in this.tickSorter with everything not in that scheme being green, for partially sorted
		return [
			this.data,
			this.sorted,
			colors.concat([[0, this.data.length - 1, COLORS.green]])
		];
	}

	//performs a tick on the quick or heap instance we are using, detects if they are finished, returns the color scheme
	tickSorter() {
		//if we're using quicksort we don't want it to finish sorting we only want it to finish a single partition
		if ((this.sorter instanceof Quick && !this.sorter.partitioning) || this.sorter.sorted) {
			if (this.sorter instanceof Quick) {
				this.addSections();
			}
			
			this.currSection = this.sorter = null;

			return [];

		} else {
			let tick = this.sorter.tick();			//holds [sorter.data, sorter.sorted, sorter.colors]
			
			this.data.splice(this.currSection[0], this.sorter.data.length, ...tick[0]);
			
			//return quick's own color scheme mapped to our indices, or just the active item in red and orange everything else for heap
			if (this.sorter instanceof Quick) {
				return tick[2].map(color => [color[0] + this.currSection[0], color[1] + this.currSection[0], color[2]]);			
			} else {
				return [
					[
						this.currSection[0] + tick[2][0][0],
						this.currSection[0] + tick[2][0][0],
						COLORS.red
					],
					[
						this.currSection[0],
						this.currSection[1],
						COLORS.orange
					]
				];
			}
		}			
	}

	//quick has completed a partition, we must add the below pivot and above pivot sections to our section stack
	addSections() {
		let pivot = this.sorter.i;
		
		this.sections.push([this.currSection[0] + pivot + 1, this.currSection[1], this.currSection[2] + 1]);
		this.sections.push([this.currSection[0], this.currSection[0] + pivot - 1,  this.currSection[2] + 1]);		
	}
}

export default Intro;
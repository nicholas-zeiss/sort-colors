/**
Here we have the class responsible for implementing introsort, a hybrid between quicksort and heapsort
**/

import Heap from './Heap';
import Quick from './Quick';

class Intro {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		
		this.maxDepth = 2 * Math.floor(Math.log(data.length));
	
		this.sections = [];
		this.currSection = [0, data.length - 1, 0];		//start, end, depth

		this.quick = null;
		this.heap = null;

		this.pivot = -1;
	}

	tick() {
		let colors = [[]]; 
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, 'green']]];
		
		} else if (this.quick) {
			if (!this.quick.partitioning) {
				this.pivot = this.quick.i;
				this.sections.unshift([this.currSection[0] + this.pivot + 1, this.currSection[1], this.currSection[2] + 1]);
				this.sections.unshift([this.currSection[0], this.currSection[0] + this.pivot - 1,  this.currSection[2] + 1]);
				this.quick = null;
				this.currSection = null;

			} else {
				let temp = this.quick.tick();
				this.data.splice(this.currSection[0], this.quick.data.length, ...temp[0]);
				colors = temp[2].map(color => [color[0] + this.currSection[0], color[1] + this.currSection[0], color[2]]);
			
			}			
		} else if (this.heap) {
			if (this.heap.sorted) {
				this.heap = null;
				this.currSection = null;
			
			} else {
				let temp = this.heap.tick();
				this.data.splice(this.currSection[0], this.heap.data.length, ...temp[0]);
				colors = temp[2].map(color => [color[0] + this.currSection[0], color[1] + this.currSection[0], color[2]]);
			
			}
		} else if (this.currSection) {
			console.log('new currSection', ...this.currSection)
			console.log('sections', ...this.sections)
		  if (this.currSection[2] == this.maxDepth) {
		  	console.log('new heap');
				this.heap = new Heap(this.data.slice(this.currSection[0], this.currSection[1] + 1));
			
			} else {
				console.log('new quick');
				this.quick = new Quick(this.data.slice(this.currSection[0], this.currSection[1] + 1));
			
			} 
		} else if (this.sections.length) {
			console.log('finding new section', ...this.sections)
			this.currSection = this.sections.shift();

			if (this.currSection[0] >= this.currSection[1]) {
				this.currSection = null;
			}
		} else {
			this.sorted = true;
		} 

		return [this.data,
						this.sorted,
						colors
					 ];
	}

}

export default Intro;
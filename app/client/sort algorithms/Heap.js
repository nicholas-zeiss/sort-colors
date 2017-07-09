/**
Here we have the class responsible for implementing gnome sort. Almost identical to insertion sort but once an element is swapped into place
it proceeds through all the sorted elements greater to reach the unsorted section, whereas insertion sort simply jumps to the unsorted section.
**/

import siftHeap from '../utils/siftHeap.js';

class Heap {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		
		this.builtHeap = false;
		this.buildStart = Math.floor((this.data.length - 2) / 2);		//parent index of last element of array
		
		this.sifting = false;
		this.siftStart = this.buildStart;
		
		this.inSwap = false;

		this.heapEnd = this.data.length - 1;
		this.i = this.data.length - 1;
	}

	tick() {
		let active = -5;				//the index of the active piece of data to be highlighted when the data is rendered

		if (this.sorted) {
			return [this.data, this.sorted, 0];

		} else if (this.sifting) {										//heap is being sifted
			if (this.inSwap) {
				[this.siftingStart, this.sifting] = siftHeap(this.data, this.siftingStart, this.heapEnd);
				active = this.siftingStart, this.inSwap = false;
			} else {
				active = this.siftingStart, this.inSwap = true;
			}

		} else if (!this.builtHeap) {
			[this.siftingStart, this.sifting] = siftHeap(this.data, this.buildStart--, this.heapEnd);
			this.builtHeap = this.buildStart == -1;
			active = this.siftingStart;

		} else if (this.heapEnd > 0) {
			if (this.inSwap) {

				[this.data[0], this.data[this.heapEnd]] = [this.data[this.heapEnd], this.data[0]];
				this.siftingStart = 0, this.sifting = true, active = this.heapEnd--;
			} else {
				active = 0, this.inSwap = true;
			}

		} else {
			this.sorted = true;
		}

		return [this.data, this.sorted, active];
	}

}

export default Heap;
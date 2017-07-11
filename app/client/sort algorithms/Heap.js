/**
Here we have the class responsible for implementing heapsort. We have a helper function siftHeap which when used in a loop will rebuild a binary max heap.
We first build said heap out of the whole array, then swap the first (greatest) element of the heap with the last, no longer considering that last position part
of the heap. We then rebuild the heap and repeat the swap/rebuild steps until the heap no longer contains any elements.
**/

import {siftHeap, leftChild, rightChild, allChildren} from '../utils/heapUtils';


class Heap {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		this.active = -1;
		
		this.builtHeap = false;
		this.buildStart = Math.floor((this.data.length - 2) / 2);		//parent index of last element of array
		this.heapEnd = this.data.length - 1;
		
		this.sifting = false;
		this.siftStart = this.buildStart;
		
		this.inSwap = false;									//used to spread a swap over two ticks so it is displayed graphically
		
		this.toSwap = [];						//When we call siftHeap several steps occur that must be shown graphically so we store those here to be displayed.
																		//It is an array of arrays, where each inner array is the index to become active and then, if a swap should be made,
																		//the index to swap to.
		
		this.validHeap = new Set();			//holds what part of the heap is currently valid for the purpose of displaying it in a specific color
	}


	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, 'green']]];
		
		} else if (this.sifting && !this.toSwap) {										//heap is being sifted either in initial build or after a value was swapped to the sorted section
			this.sift();
		
		} else if (this.toSwap) {				//there are moves to be rendered
			this.displaySwap();
		
		} else if (!this.builtHeap) {												//we are at the first step in heapsort and must turn the entire array into a heap
			this.buildHeap();
		
		} else if (this.heapEnd > 0) {
			this.sortSwap();
		
		} else {
			this.sorted = true;
		}
		
		return [this.data,
						this.sorted,
						[[this.active, this.active, 'red'],
						 [0, this.heapEnd, 'yellow'],
						 [this.heapEnd + 1, this.data.length - 1, 'green']]
					 ];
	}


	sift() {
		this.validHeap.add(this.siftingStart);
		let left = leftChild(this.siftingStart), right = rightChild(this.siftingStart);

		this.active = this.siftingStart;
		
		[this.siftingStart, this.toSwap] = siftHeap(this.data, this.siftingStart, this.heapEnd);
		
		this.sifting = this.active != this.siftingStart;				//if there was no swap we are no longer sifting

		this.updateHeap(left);			//these calls add/delete left and right and their children from this.validHeap as appropriate
		this.updateHeap(right);
	}


	updateHeap(child) {
		if (child <= this.heapEnd) {			  
		  if (this.siftingStart != child) {	  
		  	allChildren(child, this.heapEnd).forEach(i => this.validHeap.add(i));
		  } else {
		  	allChildren(child, this.heapEnd).forEach(i => this.validHeap.delete(i));
		  }
		}
	}


	displaySwap() {
		this.active = this.toSwap[1];
		this.validHeap.add(this.active);

		[this.data[this.toSwap[0]], this.data[this.toSwap[1]]] = [this.data[this.toSwap[1]], this.data[this.toSwap[0]]];

		this.toSwap = null;
	}


	buildHeap() {
		this.active = this.buildStart;
		
		let temp = siftHeap(this.data, this.buildStart--, this.heapEnd)[0];
		
		if (temp[0] != this.active) {
			this.sifting = true;
			this.siftingStart = this.active;
		}
		
		this.builtHeap = this.buildStart == -1;
	}


	sortSwap() {
		if (this.inSwap) {
			this.validHeap.clear();
			[this.data[0], this.data[this.heapEnd]] = [this.data[this.heapEnd], this.data[0]];
			this.siftingStart = 0, this.sifting = true, this.active = this.heapEnd--;	
		} else {
			this.active = 0, this.inSwap = true;
		}
	}

}

export default Heap;
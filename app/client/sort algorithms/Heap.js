/**
Here we have the class responsible for implementing heapsort. We have a helper function siftHeap to build/rebuild the heap from the bottom up.
**/

import COLORS from '../utils/Colors';
import { siftHeap, parentNode, leftChild, rightChild, allChildren } from '../utils/heapUtils';


class Heap {
	constructor(data) {
		this.data = data;
		
		this.index = data.length - 1;
		
		this.builtHeap = false;
		this.buildStart = parentNode(data.length - 1);
		this.heapEnd = data.length - 1;
		
		this.sifting = false;
		this.siftStart = data.length - 1;
		
		this.sorted = false;
				
		this.toSwap = null;
		
		this.validHeap = new Set(); //holds the indices of the heap that are valid, used to render them blue in View component
	}

	//moves heapsort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		} else if (this.toSwap) {
			this.makeSwap();
		} else if (this.sifting) {
			this.sift();
		} else if (!this.builtHeap) {
			this.buildHeap();
		} else if (this.heapEnd > 0) {
			this.swapFirstLast();
		} else {
			this.sorted = true;
		}
		
		//red for active, yellow for valid parts of heap, green for sorted
		//invalid parts of heap will be rendered cyan in the View component by use of this.validHeap
		return [
			this.data,
			this.sorted,
			[
				[this.index, this.index, COLORS.red],
				[0, this.heapEnd, COLORS.yellow],
				[this.heapEnd + 1, this.data.length - 1, COLORS.green]
			]
		];
	}


	sift() {		
		this.validHeap.add(this.siftingStart);
		this.index = this.siftingStart;
		
		this.siftingStart = siftHeap(this.data, this.siftingStart, this.heapEnd);

		this.sifting = this.index != this.siftingStart;
		this.toSwap = this.sifting ? [this.index, this.siftingStart] : null;

		this.updateValidHeap(leftChild(this.index));
		this.updateValidHeap(rightChild(this.index));
	}


	updateValidHeap(child) {
		if (child <= this.heapEnd) {			  
			if (this.siftingStart == child) {
				//if siftingStart, root of the section of the heap we must rebuild, is equal to child
				//we must mark all the children of child as invalid	  
				allChildren(child, this.heapEnd).forEach(i => this.validHeap.delete(i));
			} else {
				//if not, all children of child are valid and we mark them as such
				allChildren(child, this.heapEnd).forEach(i => this.validHeap.add(i));
			}
		}
	}


	buildHeap() {
		this.index = this.buildStart;
				
		if (this.buildStart != siftHeap(this.data, this.buildStart, this.heapEnd)) {
			this.sifting = true;
			this.siftingStart = this.buildStart;
		}
		
		this.builtHeap = --this.buildStart == -1;
	}
	
	makeSwap() {
		this.index = this.toSwap[1], this.validHeap.add(this.index);

		[this.data[this.toSwap[0]], this.data[this.toSwap[1]]] = [this.data[this.toSwap[1]], this.data[this.toSwap[0]]];

		//the only time toSwap holds a third item is when it is created by swapFirstLast,
		//in which case we need to rebuild the heap on the next tick
		if (this.toSwap[2]) {
			this.validHeap.clear();
			this.siftingStart = 0, this.sifting = true, this.index = this.heapEnd--;	
		}

		this.toSwap = null;
	}


	swapFirstLast() {
		this.index = 0;
		this.toSwap = [0, this.heapEnd, true];
	}
}

export default Heap;
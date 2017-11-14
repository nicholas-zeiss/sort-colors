/**
 *
 *	Here we have the class responsible for implementing heapsort. We implement this with a binary max heap. The general structure is that we first
 *	build the heap from the bottom up. Then swap the root (largest item) with the last item in the heap, now considering the heap to be one node smaller
 *	and all items after the heap to be sorted, and rebuild the heap from the top down. We then repeat swapping and rebuilding until the heap is exhausted.
 *
**/

import Algorithm from './Algorithm';

import { genColorMap, genColorRange, genColorSet } from '../utils/Colors';
import { allChildren, leftChild, parentNode, rightChild, siftHeap } from '../utils/heapUtils';


class Heap extends Algorithm {
	constructor(data) {
		super(data);
		
		this.active = data.length - 1;									// item we are currently examining for color map
		this.builtHeap = false;													// whether we completed inital build of heap
		this.buildStart = parentNode(data.length - 1);
		this.heapEnd = data.length - 1;									// heap is contained in this.data from index 0 to this index
		this.sifting = false;
		this.siftStart = data.length - 1;	
		this.toSwap = null;															// [ i, j, bool rebuild ] swap i and j, and rebuild the heap from bottom up if needed
		this.validHeap = new Set();											// track which nodes in the heap are known to be valid for our color map
	}


	* tick() {
		let finished = false;

		while (!finished) {
			if (this.toSwap) {
				this.active = this.toSwap[1];
				this.validHeap.add(this.active);
				this.makeSwap();

			} else if (this.sifting) {
				this.active = this.siftingStart;
				this.validHeap.add(this.active);
				this.sifting = this.sift();

				if (this.sifting) {
					this.toSwap = [ this.active, this.siftingStart ];
				}

			} else if (!this.builtHeap) {
				this.active = this.buildStart;
				this.builtHeap = this.buildHeap();

			} else if (this.heapEnd > 0) {
				this.active = 0;
				this.toSwap = [ 0, this.heapEnd, true ];

			} else {
				finished = true;
			}

			yield({ colors: this.genColors(), data: this.data });
		}

		return this.finish();
	}

	
	// swap two items, if this.toSwap[2] is true that means we just swapped the root and last
	// item of the heap, and must rebuild the heap from the top down
	makeSwap() {
		this.swap(this.toSwap[0], this.toSwap[1]);

		if (this.toSwap[2]) {
			this.heapEnd--;	
			this.sifting = true;
			this.siftingStart = 0;
			this.validHeap.clear();
		}

		this.toSwap = null;
	}


	// Rebuilds the heap from the top down. Returns true if heap needs to be sifted again or false if done sifting.
	sift() {		
		this.siftingStart = siftHeap(this.data, this.siftingStart, this.heapEnd);

		this.updateValidHeap(leftChild(this.active));
		this.updateValidHeap(rightChild(this.active));

		return this.active != this.siftingStart;
	}


	// Responsible for the beginning portion of the algorithm where we turn the unsorted array into a binary max heap.
	// Returns false if not yet done, true if done.
	buildHeap() {				
		if (this.buildStart != siftHeap(this.data, this.buildStart, this.heapEnd)) {
			this.sifting = true;
			this.siftingStart = this.buildStart;
		}
		
		return --this.buildStart == -1;
	}


	// If siftingStart, root of the section of the heap we must rebuild, is equal to child all children are invalid.
	// If not, all children are valid.
	updateValidHeap(child) {
		if (child <= this.heapEnd) {			  
			if (this.siftingStart == child) {
				allChildren(child, this.heapEnd).forEach(i => this.validHeap.delete(i));
			} else {
				allChildren(child, this.heapEnd).forEach(i => this.validHeap.add(i));
			}
		}
	}


	genColors() {
		return genColorMap(this.data.length, [
			genColorRange(0, this.heapEnd + 1, 'yellow'),
			genColorRange(this.heapEnd + 1, this.data.length, 'green'),
			genColorSet(this.validHeap, 'cyan'),
			genColorSet(new Set([ this.active ]), 'red')
		]);
	}
}


export default Heap;


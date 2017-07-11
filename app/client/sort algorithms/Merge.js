/**
Here we have the class for implementing merge sort. As we have to proceed tick by tick this implementation is quite different than the normal recursive top down approach.
First, we generate an array of indices with getIndices. As we proceed through it it gives us the subsections to sort and merge in an order that is identical
to the recursive top down approach.
**/

import COLORS from '../utils/colors';
import getIndices from '../utils/getIndices';

class Merge {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		
		this.i = 0;							//data index
		this.endSorted = 0;			//end of subsection that has been processed by merge sort (though not yet in its final position)
		
		this.indices = getIndices(this.data.length);			//gives us subsections we need to merge in the same order as a conventional recursive quicksort
		this.indIdx = 0;																	//indices index

		this.left = [];
		this.right = [];
		this.merging = false;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, COLORS.green]]];
		
		} else if (this.merging) {											//normal merging procedure
			this.merge();
		
		} else if (this.indIdx < this.indices.length) {				//here we prepare ourselves for a new merge
			this.populateLeftRight();
		
		} else {
			this.sorted = true;
		}

		let indices = this.indices[this.indIdx - 1], colors = [[this.i, this.i, COLORS.red]];

		if (indices.length > 2) {																																						//if our current merging section is not a single datum
			colors.push([indices[1][0], indices[1][1] - 1, COLORS.cyan], [indices[2][0], indices[2][1] - 1, COLORS.yellow]);
		} else {																																																								//if it is a single datum
			colors.push([indices[1][1], indices[1][1], COLORS.cyan]);
		}

		colors.push([0, this.endSorted, COLORS.green]);
		
		return [this.data,
						this.sorted,
						colors
					 ];
	}


	merge() {
		if (this.left.length && this.right.length) {
			this.data[this.i] = this.left[0] < this.right[0] ? this.left.shift() : this.right.shift();
		} else if (this.left.length) {
			this.data[this.i] = this.left.shift();		
		} else {
			this.data[this.i] = this.right.shift();
		}			
		
		this.merging = this.left.length || this.right.length;
		
		this.i += this.merging ? 1 : 0;
		this.endSorted = Math.max(this.i, this.endSorted);
	}


	populateLeftRight() {
		let indices = this.indices[this.indIdx++];

		if (indices[0] != 'single') {																		//if the current section is not a single piece of data we must merge
			this.left = this.data.slice(indices[1][0], indices[1][1]);
			this.right = this.data.slice(indices[2][0], indices[2][1]);
			this.merging = true;
		}
		
		this.i = indices[1][0];
		this.endSorted = Math.max(this.i, this.endSorted);


	}
}

export default Merge;
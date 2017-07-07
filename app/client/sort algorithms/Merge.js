/**
Here we have the class for implementing merge sort. This is a bottom up implementation as the normal recursive top down approach is more difficult
to render tick by tick
**/

import getIndices from '../utils/getIndices';

class Merge {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		this.i = 0;							//data index
		this.j = this.data.length;
		this.left = [];
		this.right = [];
		this.merging = false;
	}

	tick() {
		if (this.sorted) {
			return [this.data, this.sorted, this.i]
		} else if (this.merging) {
			this.merge(this.i);
		} else {
			this.mergeSort(this.i, this.j);
		}
		

		return [this.data, this.sorted, this.i];
	}

	mergeSort(i, j) {
		if (i == j) {
			return;
		}
		if (i + 1 == j) {
			if (this.data[i] > this.data[j]) {
				[this.data[i], this.data[j]] = [this.data[j], this.data[i]];
			}
			return;
		}

		this.left = this.data.slice(i, i + Math.ceil((j - i) / 2));
		this.right = this.data.slice(i + Math.ceil(j - i), j);

		mergeSort(this.left);
		mergeSort(this.right);

		this.merge(i);
	}

	merge(i) {
		this.i = i;
		
		if (this.left.length && this.right.length) {
			
			this.data[this.i++] = this.left[0] < this.right[0] ? this.left.shift() : this.right.shift();
		
		} else if (this.left.length) {
			
			this.data[this.i++] = this.left.shift();
		
		} else if (this.right.length) {
			
			this.data[this.i++] = this.right.shift();

		} else {
			this.merging = false;
		}
	}
}

export default Merge;
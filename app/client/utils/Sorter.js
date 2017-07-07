/**
This class serves as middleware between the sorting algorithm and the app rendering it
**/

import shuffle from './shuffle';

class Sorter {
	constructor(sort, numItems) {
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));				//randomized array
		this.sort = new sort(this.data);																						//sort is the actual sorting object
		this.active = -5;																														//index of the datum currently being manipulated by the sort
		this.sorted = false;
	}

	reset(newSort, numItems) {
		numItems = numItems || this.data.length;
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));
		this.active = -5;
		this.sorted = false;

		if (newSort) {
			this.sort = new newSort(this.data);
		}
	}

	tick() {																															//progresses the sort forward by one comparison or swap
		[this.data, this.sorted, this.active] = this.sort.tick();
		if (this.sorted) {
			this.active = -5;
		}
	}
}

export default Sorter;
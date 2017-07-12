/**
This class serves as the controller for the sort model it holds
**/

import COLORS from './colors';


class Sorter {
	constructor(sort, numItems) {
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));				//randomized array
		this.sort = new sort(this.data);																						//sort is the actual sorting object
		this.sorted = false;
		this.colors = [];
	}

	reset(newSort, numItems) {
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));
		this.sorted = false;
		this.colors = [];
		this.sort = new newSort(this.data);
	}

	tick() {																															//progresses the sort forward by one comparison or swap
		[this.data, this.sorted, this.colors] = this.sort.tick();
		
		if (this.sorted) {
			this.colors = [[0, this.data.length - 1, COLORS.green]];
		}
	}
}

function shuffle(arr) {
	let currIndex = arr.length;

	while (currIndex > 0) {
		let rand = Math.floor(currIndex-- * Math.random());
		[arr[currIndex], arr[rand]] = [arr[rand], arr[currIndex]];
	}

	return arr;
}

export default Sorter;
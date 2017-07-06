
import shuffle from './shuffle';

class Sorter {
	constructor(sort, numItems) {
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));
		this.sort = new sort(this.data);
		this.active = -5;
		this.sorted = false;
	}

	reset(newSort, numItems) {
		numItems = numItems || this.data.length;
		this.data = shuffle(new Array(numItems).fill(1).map((n,i) => i + 1));

		if (newSort) {
			this.sort = new newSort(this.data);
		}
	}

	tick() {
		[this.data, this.sorted, this.active] = this.sort.tick();
		if (this.sorted) {
			this.active = -5;
		}
	}
}

export default Sorter;
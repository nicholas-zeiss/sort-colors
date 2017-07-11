/**
Here we have the class responsible for implementing insertion sort
**/


class Insertion {
	constructor(data) {
		this.data = data;
		this.i = 0;
		this.unsorted = 0;
		this.sorted = false;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, 'green']]];

		} else if (this.i > 0 && this.data[this.i] < this.data[this.i - 1]) {
			[this.data[this.i], this.data[this.i - 1]] = [this.data[this.i - 1], this.data[this.i]];

			// this.unsorted = this.unsorted < this.i ? this.i + 1 : this.unsorted;
			this.unsorted = Math.max(this.i + 1, this.unsorted);
			// this.unsorted = this.data.length == this.unsorted ? this.data.length - 1 : this.unsorted;
			
			this.i--;
		} else if (this.i >= this.data.length - 1) {
			this.sorted = true;

		} else if (this.i < this.unsorted) {
			this.i = this.unsorted;

		} else {
			this.i++;
		}

		return [this.data, this.sorted, [[this.i, this.i, 'red'], [0, this.unsorted - 1, 'green']]];
	}
}

export default Insertion;
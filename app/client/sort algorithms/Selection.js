/**
Here we have the class responsible for implementing selection sort
**/

class Selection {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		this.i = 1;
		this.unsorted = 0;				  //beginning of unsorted section
		this.min = [0, data[0]];		//minimum we find each traversal of the unsorted section
		this.inSwap = false;				//used to split swaps across multiple ticks
		this.firstLoop = true;
	}

	tick() {
		let active = -1;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, 'green']]];

		} else if (this.inSwap) {
			this.inSwap = false;
			active = this.min[0];
			[this.data[this.unsorted], this.data[this.min[0]]] = [this.data[this.min[0]], this.data[this.unsorted]];
			this.i = ++this.unsorted;
			this.min = [this.i, this.data[this.i]];

		} else if (this.i < this.data.length) {
			this.min = this.min[1] < this.data[this.i] ? this.min : [this.i, this.data[this.i]];
			active = this.i++;

		} else if (this.unsorted == this.data.length) {
			this.sorted = true;
			this.min[0] = -1;			//don't want it to be highlighted when rendered

		} else if (this.i == this.data.length) {
			this.inSwap = true;
			active = this.unsorted;
			this.firstLoop = false;

		} else {
			active = this.i++;
		}

		return [this.data, this.sorted, [[active, active, 'red'], [this.min[0], this.min[0], 'orange'], [this.unsorted, this.firstLoop ? this.i : this.data.length, 'cyan'], [0, this.unsorted - 1, 'green']]];
	}
}

export default Selection;
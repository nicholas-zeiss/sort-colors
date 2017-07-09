/**
Here we have the class responsible for implementing selection sort, the worst of all sorts at O(n^2) best case
**/

class Selection {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		this.i = 0;
		this.unsorted = 0;				  //beginning of unsorted section
		this.min = [0, data[0]];		//minimum we find each traversal of the unsorted section
	}

	tick() {
		if (this.sorted) {
			return [this.data, this.sorted, this.i];
		} else if (this.i < this.data.length) {
			this.min = this.min[1] < this.data[this.i] ? this.min : [this.i, this.data[this.i]];
			this.i++;
		} else if (this.unsorted == this.data.length) {
			this.sorted = true;
		} else if (this.i == this.data.length) {
			[this.data[this.unsorted], this.data[this.min[0]]] = [this.data[this.min[0]], this.data[this.unsorted]];
			this.i = ++this.unsorted;
			this.min = [this.i, this.data[this.i]];
		} else {
			this.i++;
		}

		return [this.data, this.sorted, this.i];
	}
}

export default Selection;
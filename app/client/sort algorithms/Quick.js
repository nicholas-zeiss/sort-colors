/**
Here we have the class responsible for implementing quicksort
**/

class Quick {
	constructor(data) {
		this.data = data;
		this.sorted = false;

		this.active = 0;										//active piece of data
		this.i = 0;
		this.currSection = [0, data.length - 1];	//subsection being sorted
		this.pivot = data[data.length - 1];

		this.partitioning = true;

		this.swapping = false;
		this.swap = -1;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, -5, [0, this.data.length]];
		
		} else if (this.swapping) {
			[this.data[this.i], this.data[this.swap]] = [this.data[this.swap], this.data[this.i]];
			this.active = swap;
			this.swapping = false;
		
		} else if (this.partitioning) {

		}

		return [this.data, this.sorted, this.active, this.currSection]
	}
}

export default Quick;
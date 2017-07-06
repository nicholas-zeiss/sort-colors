/**
Here we have the class responsible for implementing bubble sort
**/

class Bubble {
	constructor(data) {
		this.data = data;
		this.last = data.length - 1;
		this.index = 0;
		this.swap = false;
		this.sorted = false;
	}

	//moves bubble sort forward by one comparison or swap
	tick() {
		if (this.sorted) {
			return [this.data, true, -5];
		}

		if (this.data[this.index] > this.data[this.index + 1]) {
			[this.data[this.index], this.data[this.index + 1]] = [this.data[this.index + 1], this.data[this.index]];
			this.swap = true;
		}

		if (this.index + 1 == this.last) {
			this.index = 0;
			this.sorted = this.last == 1 ? true : !this.swap;
			this.swap = false;
			this.last--;
		} else {
			this.index++;
		}

		return [this.data, this.sorted, this.index];
	}
}

export default Bubble;
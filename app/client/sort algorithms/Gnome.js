/**
Here we have the class responsible for implementing gnome sort. Almost identical to insertion sort but once an element is swapped into place
it proceeds through all the sorted elements greater to reach the unsorted section, whereas insertion sort simply jumps to the unsorted section.
**/


class Gnome {
	constructor(data) {
		this.data = data;
		this.i = 0;
		this.sorted = false;
	}

	tick() {
		if (this.sorted) {
			return [this.data, this.sorted, this.i];
		} else if (this.i > 0 && this.data[this.i] < this.data[this.i - 1]) {
			[this.data[this.i], this.data[this.i - 1]] = [this.data[this.i - 1], this.data[this.i]];
			this.i--;
		} else if (this.i == this.data.length - 1) {
			this.sorted = true;
		} else {
			this.i++;
		}

		return [this.data, this.sorted, this.i];
	}
}

export default Gnome;
/**
Here we have the class responsible for implementing bubble sort
**/

import COLORS from '../utils/colors';

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
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		}

		if (this.data[this.index] > this.data[this.index + 1]) {
			[this.data[this.index], this.data[this.index + 1]] = [this.data[this.index + 1], this.data[this.index]];
			this.swap = true;
		}

		if (this.index + 1 == this.last) {
			this.index = 0;
			this.sorted = !this.swap;
			this.swap = false;
			this.last--;		
			
		} else {
			this.index++;
		}

		return [this.data,
					  this.sorted,
					  [[this.index, this.index, COLORS.red],
					   [this.last + 1, this.data.length - 1, COLORS.green]]
					 ];
	}
}

export default Bubble;
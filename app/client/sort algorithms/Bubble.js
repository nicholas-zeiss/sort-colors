/**
Here we have the class responsible for implementing bubble sort
**/

import COLORS from '../utils/colors';


class Bubble {
	constructor(data) {
		this.data = data;
		
		this.index = 0;
		this.last = data.length - 1;
		
		this.swapThisLoop = false;
		this.sorted = false;

		this.inSwap = false;
	}

	//moves bubble sort forward by one comparison or swap
	//returns [array data, bool sorted, arr colorScheme]
	tick() {
		let active = this.index;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		
		} else if (this.index == this.last) {
			this.index = 0;
			this.last--;		
			
			this.sorted = !this.swapThisLoop;
			this.swapThisLoop = false;
		
		} else if (this.inSwap) {
	  	[this.data[this.index], this.data[this.index + 1]] = [this.data[this.index + 1], this.data[this.index]];
	  	
	  	this.inSwap = false;
	  	active = ++this.index;

	  } else if (this.data[this.index] > this.data[this.index + 1]) {
			this.swapThisLoop = this.inSwap = true;
			
		} else {
			this.index++;
		}

		return [this.data,
					  this.sorted,
					  [[active, active, COLORS.red],
					   [this.last + 1, this.data.length - 1, COLORS.green]]
					 ];
	}
}

export default Bubble;
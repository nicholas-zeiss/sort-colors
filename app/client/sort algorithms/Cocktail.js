/**
Here we implement cocktail shaker sort, which is like a bubble sort that goes both ways
**/

import COLORS from '../utils/colors';


class Cocktail {
	constructor(data) {
		this.data = data;
		
		this.index = 0;
		this.inc = 1;			//increment for index each tick, -1 or 1
		
		this.first = 0;
		this.last = data.length - 1;
		
		this.swapThisLoop = false;
		this.sorted = false;
		
		this.inSwap = false;
	}

  //moves cocktail sort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		let active = this.index;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		
		} else if (this.index + this.inc == this.last + 1 || this.index + this.inc == this.first - 1) {
			this.inc == 1 ? this.last-- : this.first++;
			this.inc *= -1;
			
			this.sorted = !this.swapThisLoop;
			this.swapThisLoop = false;
					
		} else if (this.inSwap) {
			[this.data[this.index], this.data[this.index + 1]] = [this.data[this.index + 1], this.data[this.index]];		

			this.inSwap = false;
			active = this.index += this.inc;

		} else if (this.data[this.index] > this.data[this.index + 1]) {
			this.swapThisLoop = this.inSwap = true;
		
		} else {
			this.index += this.inc;
		}

		return [this.data,
					  this.sorted,
					  [[active, active, COLORS.red],
					   [0, this.first - 1, COLORS.green],
					   [this.last + 1, this.data.length - 1, COLORS.green]]
					 ];
	}
}

export default Cocktail;
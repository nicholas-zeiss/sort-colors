/**
Here we have the class responsible for implementing selection sort
**/

import COLORS from '../utils/Colors';


class Selection {
	constructor(data) {
		this.data = data;

		this.index = 0;
		this.unsorted = 0;				  				//beginning of unsorted section
		
		this.min = [0, data[0]];						//minimum we find each traversal of the unsorted section
		
		this.inSwap = false;				        //used to split swaps across multiple ticks
		
		this.sorted = false;
	}

	//moves selection sort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		let active = this.index;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];

		} else if (this.inSwap) {
			this.inSwap = false, active = this.unsorted;
			
			[this.data[this.unsorted], this.data[this.min[0]]] = [this.data[this.min[0]], this.data[this.unsorted]];
			
			this.index = ++this.unsorted;	
			this.min = [this.index, this.data[this.index]];

		} else if (this.index < this.data.length) {
			this.min = this.min[1] < this.data[this.index] ? this.min : [this.index, this.data[this.index]];
			this.index++;

		} else if (this.unsorted == this.data.length) {
			this.sorted = true;

		} else if (this.index == this.data.length) {
			this.inSwap = true, active = this.min[0];

		} else {
			active = this.index++;
		}

		//red for active, orange for smallest item found so far in unsorted section, green for sorted
		return [
			this.data,
			this.sorted,
			[
				[active, active, COLORS.red],
				[this.min[0], this.min[0], COLORS.orange],
				[0, this.unsorted - 1, COLORS.green]
			]
		];
	}
}

export default Selection;
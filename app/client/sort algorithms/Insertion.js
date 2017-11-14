/**
Here we have the class responsible for implementing insertion sort
**/

import COLORS from '../utils/Colors';


class Insertion {
	constructor(data) {
		this.data = data;
		
		this.index = 0;
		this.endSorted = 0;
		
		this.sorted = false;
	
		this.inSwap = false;
	}

	//moves insertion sort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		let active = this.index;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, COLORS.green]]];

		} else if (this.inSwap) {
			[this.data[this.index], this.data[this.index - 1]] = [this.data[this.index - 1], this.data[this.index]];

			this.endSorted = Math.max(this.index--, this.endSorted);
			active = this.index;
			this.inSwap = false;

		} else if (this.index > 0 && this.data[this.index] < this.data[this.index - 1]) {
			this.inSwap = true;
			
		} else if (this.index >= this.data.length - 1) {
			this.sorted = true;

		} else if (this.index < this.endSorted) {
			this.index = this.endSorted + 1;

		} else {
			this.endSorted = Math.max(this.index++, this.endSorted);
		}

		//red for active, green for partially sorted
		return [
			this.data,
			this.sorted,
			[
				[active, active, COLORS.red],
				[0, this.endSorted, COLORS.green]
			]
		];
	}
}

export default Insertion;
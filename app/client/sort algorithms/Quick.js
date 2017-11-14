/**
Here we have the class responsible for implementing quicksort. The pivot is always chosen as the last item in the section being partitioned.
As we must proceed tick by tick this algorithm is not actually recursive but instead stores the sections it must sort in an array
stored in this.sections, which is used as a stack.
**/

import COLORS from '../utils/Colors';


class Quick {
	constructor(data) {
		this.data = data;

		this.active = 0;

		this.sections = [];
		this.currSection = [0, data.length - 1];
		
		this.partitioning = true;
		this.i = -1;							//tracks where an item less than or equal to the pivot should be placed
		this.j = 0;								//index that traverses over the section being partitioned

		this.inSwap = false;			//used to split swaps over two ticks
		this.toSwap = null;
		
		this.sorted = false;
	}

	//moves quicksort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, COLORS.green]]];
		} else if (this.inSwap) {
			this.makeSwap();
		} else if (this.partitioning) {
			this.partition();	
		} else if (this.sections.length) {
			this.setUpPartition();
		} else {
			this.sorted = true;
		}

		//red for active, purple for pivot, cyan for <= pivot, yellow for > pivot, 
		//lightGreen for not yet partitioned, green for not part of current section
		return [
			this.data,
			this.sorted,
			[
				[this.active, this.active, COLORS.red],
				[this.currSection[1], this.currSection[1], COLORS.purple],
				[this.currSection[0], this.i - (this.inSwap ? 1 : 0), COLORS.cyan],
				[this.i + (this.inSwap ? 0 : 1), this.j - 1, COLORS.yellow],
				[this.j, this.currSection[1], COLORS.lightGreen],
				[0, this.data.length - 1, COLORS.green]
			]
		];
	}


	makeSwap() {
		[this.data[this.toSwap[0]], this.data[this.toSwap[1]]] = [this.data[this.toSwap[1]], this.data[this.toSwap[0]]];
		
		this.active = this.toSwap[0];
		this.toSwap = null;
		this.inSwap = false;
	}


	partition() {
		if (this.j <= this.currSection[1]) {
			if (this.data[this.j] <= this.data[this.currSection[1]]) {		//currSection[1] being the pivot
				this.i++;
				
				if (this.i != this.j) {
					this.toSwap = [this.i, this.j];
					this.inSwap = true;
				}
			}
			
			this.active = this.j++;

		} else {
			this.partitioning = false;			
			this.active = this.currSection[1];
			
			this.sections.push([this.i + 1, this.currSection[1]], [this.currSection[0], this.i - 1]);				//this.i holds pivot index
		}
	}


	setUpPartition() {
		this.currSection = this.sections.pop();
			
		if (this.currSection[0] < this.currSection[1]) {			//if currSection is valid, otherwise we just move to next one	
			this.partitioning = true;
			
			this.i = this.currSection[0] - 1;
			this.j = this.currSection[0];
			
			this.active = this.j;
		}
	}
}

export default Quick;
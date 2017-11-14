/**
 *
 *	Here we have the class responsible for implementing quicksort. The pivot is always chosen as the last item in the section being partitioned.
 *	As we must proceed tick by tick this algorithm is not actually recursive but instead stores the sections it must sort in an array
 *	stored in this.sections, which is used as a stack.
 *
**/

import Algorithm from './Algorithm';

import Colors, { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Quick extends Algorithm {
	constructor(data) {
		super(data);
		
		this.active = 0;
		this.currSection = [ 0, data.length - 1 ];
		this.i = -1;															// tracks where an item less than or equal to the pivot should be placed
		this.inSwap = false;											// used to split swaps over two ticks
		this.j = 0;																// index that traverses over the section being partitioned
		this.partitioning = true;
		this.pivotIndex = data.length - 1;
		this.pivotValue = data[data.length - 1];
		this.sections = [];
	}


	* tick() {
		let finished = false;
		
		while (!finished) {
			if (this.inSwap) {
				this.swap(this.i, this.j - 1);		
				this.active = this.i;
				this.inSwap = false;

			} else if (this.partitioning) {
				this.partition();	
			
			} else if (this.sections.length) {
				this.setUpPartition();
			
			} else {
				finished = true;
			}

			yield({ colors: this.genColors(), data: this.data });
		}

		return this.finish();
	}


	partition() {
		if (this.j <= this.pivotIndex) {
			if (this.data[this.j] <= this.pivotValue) {
				this.i++;	
				this.inSwap = this.i != this.j;
			}
			
			this.active = this.j++;

		} else {
			this.partitioning = false;			
			this.active = this.pivotIndex;

			this.sections.push(
				[ this.i + 1, this.pivotIndex ],
				[ this.currSection[0], this.i - 1 ]
			);
		}
	}


	setUpPartition() {
		this.currSection = this.sections.pop();
			
		if (this.currSection[0] < this.currSection[1]) {			// if currSection is valid, otherwise we just move to next one	
			this.partitioning = true;
			this.i = this.currSection[0] - 1;
			this.j = this.currSection[0];
			
			this.active = this.j;
			
			this.pivotIndex = this.currSection[1];
			this.pivotValue = this.data[this.pivotIndex];
		}
	}


	genColors() {
		const lessThanPivot = this.i + (this.inSwap ? 0 : 1);

		return genColorMap(this.data.length, [
			genColorRange(0, this.data.length, Colors.green),
			genColorRange(this.currSection[0], lessThanPivot, Colors.cyan),
			genColorRange(lessThanPivot, this.j, Colors.yellow),
			genColorRange(this.j, this.pivotIndex, Colors.lightGreen),
			genColorSet(new Set([ this.pivotIndex ]), Colors.purple),
			genColorSet(new Set([ this.active ]), Colors.red)
		]);
	}
}


export default Quick;


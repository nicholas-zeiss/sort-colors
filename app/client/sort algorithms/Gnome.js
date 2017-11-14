/**
 *
 *	Here we have the class responsible for implementing gnome sort. Almost identical to insertion sort but once an element is swapped into place
 *	it proceeds through all the sorted elements greater to reach the unsorted section, whereas insertion sort simply jumps to the unsorted section.
 *
**/

import Algorithm from './Algorithm';

import Colors, { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Gnome extends Algorithm {
	constructor(data) {
		super(data);

		this.endSorted = 0;
		this.index = 0;
		this.inSwap = false;
	}


	* tick() {
		while (this.index != this.data.length) {
			if (this.inSwap) {
				this.swap(this.index, this.index - 1);			
				this.endSorted = Math.max(this.index--, this.endSorted);
				this.inSwap = false;
			
			} else if (this.index > 0 && this.data[this.index] < this.data[this.index - 1]) {
				this.inSwap = true;
			
			} else {
				this.endSorted = Math.max(this.index++, this.endSorted);
			}

			yield({ colors: this.genColors(), data: this.data });
		}

		return this.finish();
	}


	genColors() {
		return genColorMap(this.data.length, [
			genColorRange(0, this.endSorted + 1, Colors.green),
			genColorSet(new Set([ this.index ]), Colors.red)
		]);
	}
}


export default Gnome;


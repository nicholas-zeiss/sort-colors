/**
 *
 *	Here we have the class responsible for implementing bubble sort
 *
**/

import Algorithm from './Algorithm';

import { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Bubble extends Algorithm {
	constructor(data) {
		super(data);

		this.index = 0;
		this.inSwap = false;
		this.last = data.length;
		this.swapThisLoop = false;
	}


	* tick() {
		while (this.index != this.last || this.swapThisLoop) {
			if (this.index == this.last) {			
				this.index = 0;
				this.last--;
				this.swapThisLoop = false;

			} else if (this.inSwap) {
				this.swap(this.index - 1, this.index);
				this.inSwap = false;

			} else if (this.data[this.index] > this.data[this.index + 1]) {
				this.swapThisLoop = true;
				this.inSwap = true;
				this.index++;
				
			} else {
				this.index++;
			}

			yield({ colors: this.genColors(), data: this.data });
		}

		return this.finish();
	}


	genColors() {
		return genColorMap(this.data.length, [
			genColorRange(0, this.last, 'white'),
			genColorRange(this.last, this.data.length, 'green'),
			genColorSet(new Set([ this.index ]), 'red')
		]);
	}
}


export default Bubble;


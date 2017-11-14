/**
 *
 *	Here we implement cocktail shaker sort, which is like a bubble sort that goes both ways
 *
**/

import Algorithm from './Algorithm';

import { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Cocktail extends Algorithm {
	constructor(data) {
		super(data);

		this.first = -1;
		this.inc = 1;
		this.index = 0;
		this.inSwap = false;
		this.last = data.length;
		this.swapThisLoop = false;
	}


	* tick() {
		while ((this.index + this.inc != this.last && this.index + this.inc != this.first) || this.swapThisLoop) {			
			if (this.index + this.inc == this.last || this.index + this.inc == this.first) {
				this.inc == 1 ? this.last-- : this.first++;
				this.inc *= -1;
				this.swapThisLoop = false;
						
			} else if (this.inSwap) {
				this.swap(this.index, this.index + 1);
				this.inSwap = false;
				this.index += this.inc;

			} else if (this.data[this.index] > this.data[this.index + 1]) {
				this.swapThisLoop = true;
				this.inSwap = true;
			
			} else {
				this.index += this.inc;
			}

			yield({ colors: this.genColors(), data: this.data });
		}

		return this.finish();
	}


	genColors() {
		return genColorMap(this.data.length, [
			genColorRange(0, this.first + 1, 'green'),
			genColorRange(this.first + 1, this.last, 'white'),
			genColorRange(this.last, this.data.length, 'green'),
			genColorSet(new Set([ this.inc == -1 ? this.index + 1 : this.index ]), 'red')
		]);
	}
}


export default Cocktail;


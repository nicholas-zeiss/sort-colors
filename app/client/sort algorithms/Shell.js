/**
 *
 * Here we have the class responsible for implementing shellsort
 *
**/

import Algorithm from './Algorithm';

import Colors, { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Shell extends Algorithm {
	constructor(data) {
		super(data);
		
		this.runs = [132, 57, 23, 10, 4, 1];
		this.gap = 301;
		
		while(this.gap >= data.length) {
			this.gap = this.runs.shift();
		}
		
		this.inSwap = false;
		this.i = this.gap;										// index of where we are in our overall loop through the data
		this.j = this.gap;										// index we use to jump backwards by gap lengths when we swap items
	}


	* tick() {
		let finished = false;

		while (!finished) {
			if (this.inSwap) {
				this.swap(this.j - this.gap, this.j);
				this.j -= this.gap;
				this.inSwap = false;

			} else if (this.j >= this.gap && this.data[this.j - this.gap] > this.data[this.j]) {
				this.inSwap = true;

			} else if (this.i < this.data.length) {
				this.j = ++this.i;	

			} else if (this.runs.length) {
				this.j = this.i = this.gap = this.runs.shift();

			} else {
				finished = true;
			}

			yield({ colors: this.genColors(), data: this.data });
		}
		
		return this.finish();
	}


	genColors() {
		// number of runs of length this.gap from 0 to this.i
		const numRuns = Math.floor(this.i / this.gap);
		const runColors = [];

		for (let i = this.gap * numRuns, lum = 50; i >= 0; i -= this.gap, lum *= .7) {
			runColors.push(genColorRange(i, i + this.gap, `hsl(235, 60%, ${Math.floor(100 - lum)}%)`));
		}

		return genColorMap(this.data.length, [
			genColorRange(this.last, this.data.length, Colors.green),
			...runColors,
			genColorSet(new Set([ this.j ]), Colors.red)
		]);
	}
}


export default Shell;


/**
 *
 *	Here we have the class responsible for implementing selection sort
 *
**/

import Algorithm from './Algorithm';

import Colors, { genColorMap, genColorRange, genColorSet } from '../utils/Colors';


class Selection extends Algorithm {
	constructor(data) {
		super(data);

		this.index = 0;
		this.inSwap = false;
		this.minIndex = 0;
		this.minValue = data[0];
		this.unsorted = 0;	
	}


	* tick() {
		while (this.unsorted != this.data.length) {
			if (this.inSwap) {
				this.swap(this.unsorted, this.minIndex);
				this.inSwap = false;			
				this.index = ++this.unsorted;
				this.minIndex = this.index;
				this.minValue = this.data[this.index];

			} else if (this.index < this.data.length) {
				if (this.minValue > this.data[this.index]) {
					this.minIndex = this.index;
					this.minValue = this.data[this.index];
				}
				
				this.index++;

			} else if (this.index == this.data.length) {
				this.inSwap = true;

			} else {
				this.index++;
			}

			yield({ colors: this.genColors(), data: [ ...this.data ] });
		}

		return this.finish();
	}


	genColors() {
		return genColorMap(this.data.length, [
			genColorRange(0, this.unsorted, Colors.green),
			genColorSet(new Set([ this.minIndex ]), Colors.orange),
			genColorSet(new Set([ this.index ]), Colors.red)
		]);
	}
}


export default Selection;


/**
Here we have the class responsible for implementing shellsort
**/

import COLORS from '../utils/colors';

class Shell {
	constructor(data) {
		this.data = data;
		
		this.i = this.gap;								//index of where we are in our overall loop through the data
		this.j = this.gap;								//index we use to jump backwards by gap lengths when we swap items
		
		this.temp = this.data[this.i];		//holds the data at this.i, as this it is overwritten when swapping backwards
				
		this.runs = [132, 57, 23, 10, 4, 1];
		this.gap = 301;
		
		while(this.gap >= data.length) {
			this.gap = this.runs.shift();
		}

		this.sorted = false;
	}

	//moves shellsort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		let active = this.j;

		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, COLORS.green]]];

		} else if (this.j >= this.gap && this.data[this.j - this.gap] > this.temp) {		//make swap between data[j] and data[j-gap], continue backwards
			this.data[this.j] = this.data[this.j -= this.gap];

		} else if (this.i < this.data.length) {
			if (this.temp) {				
				if (this.i != this.j) {										    //if i and j differ then temp was overwritten by swapping and must be put back in place
					this.data[this.j] = this.temp;
				}
				
				this.j = 0, this.temp = null, this.i++;				//j set to 0 only for the purpose of bypassing the first else if statement next tick

			} else {
				this.temp = this.data[this.i];
				this.j = this.i;	
			}
		} else if (this.runs.length) {
			active = this.i = this.gap = this.runs.shift();

		} else {
			this.sorted = true;
		}

		let colors = [[active, active, COLORS.red]];
		
		//this loop sets every run of items to a shade of blue that becomes more and more white the farther back from this.i you are
		for (let i = this.gap * Math.floor(this.i / this.gap), l = 50; i >= 0; i -= this.gap, l *= .7) {
			colors = colors.concat([[i, i + this.gap - 1, `hsl(235, 60%, ${Math.floor(100 - l)}%)`]]);
		}

		return [
			this.data,
			this.sorted,
			colors
		];
	}
}

export default Shell;
/**
Here we have the class responsible for implementing shellsort
**/

import COLORS from '../utils/colors';

class Shell {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		
		this.runs = [132, 57, 23, 10, 4, 1];
		this.gap = 301;
		
		while(this.gap >= data.length) {
			this.gap = this.runs.shift();
		}

		this.i = this.gap;
		this.j = this.gap;
		this.temp = this.data[this.i];

		this.active = this.j;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, COLORS.green]]];

		} else if (this.j >= this.gap && this.data[this.j - this.gap] > this.temp) {
			this.active = this.j;
			this.data[this.j] = this.data[this.j - this.gap];
			this.j -= this.gap;

		} else if (this.i < this.data.length) {
			if (this.temp) {
				this.active = this.j;
				
				if (this.i != this.j) {
					this.data[this.j] = this.temp;
				}
				
				this.j = 0, this.temp = null, this.i++;
			
			} else {
				this.temp = this.data[this.i];
				this.active = this.j = this.i;
			
			}
		} else if (this.runs.length) {
			this.active = this.i = this.gap = this.runs.shift();

		} else {
			this.sorted = true;
		}

		let colors = [[this.active, this.active, COLORS.red]];
		
		for (let i = this.gap * Math.floor(this.i / this.gap), l = 50; i >= 0; i -= this.gap, l *= .7) {
			colors = colors.concat([[i, i + this.gap - 1, `hsl(235, 100%, ${100 - l}%)`]]);
		}

		return [this.data,
						this.sorted,
						colors
					 ];
	}
}

export default Shell;
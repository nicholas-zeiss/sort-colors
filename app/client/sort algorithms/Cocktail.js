/**
Here we implement cocktail shaker sort, which is like a bubble sort that goes both ways
**/

class Cocktail {
	constructor(data) {
		this.data = data;
		this.last = this.data.length - 1;
		this.sorted = false;
		this.first = 0;
		this.i = 0;
		this.inc = 1;
		this.swap = false;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length, 'green']]];
		}

		if (this.data[this.i] > this.data[this.i + 1]) {
			[this.data[this.i], this.data[this.i + 1]] = [this.data[this.i + 1], this.data[this.i]];
			this.swap = true;
		}

		if ((this.i + 1 == this.last && this.inc == 1) || (this.i == this.first && this.inc == -1)) {
			this.inc == 1 ? this.last-- : this.first++;
			this.inc *= -1;
			this.sorted = !this.swap;
			this.swap = false;
					
		} else {
			this.i += this.inc;
		}

		return [this.data,
					  this.sorted,
					  [[this.i, this.i, 'red'],
					   [0, this.first - 1, 'green'],
					   [this.last + 1, this.data.length - 1, 'green']]
					 ];
	}
};

export default Cocktail;
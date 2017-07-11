/**
Here we have the class responsible for implementing shellsort
**/

class Shell {
	constructor(data) {
		this.data = data;
		this.sorted = false;
		
		this.runs = [57, 23, 10, 4, 1];
		this.gap = 132;
		
		while(this.gap >= this.data.length) {
			this.gap = this.runs.shift();
		}

		this.i = this.gap;
		this.j = this.gap;
		this.temp = this.data[this.i];

		this.active = this.j;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, 'green']]];
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
				this.j = 0;
				this.temp = null;
				this.i++;
			} else {
				this.temp = this.data[this.i];
				this.j = this.i;
				this.active = this.j;
			}
		} else if (this.runs.length) {
			this.gap = this.runs.shift();
			this.i = this.gap;
			this.active = this.i;
		} else {
			this.sorted = true;
		}

		return [this.data,
						this.sorted,
						[[this.active, this.active, 'red']]
					 ];
	}
}

export default Shell;
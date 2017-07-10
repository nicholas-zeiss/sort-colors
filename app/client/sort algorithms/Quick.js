/**
Here we have the class responsible for implementing quicksort. The pivot is always chosen as the last item in the section being partitioned.
**/

class Quick {
	constructor(data) {
		this.data = data;
		this.sorted = false;

		this.active = -1;										//active piece of data
		this.currSection = [0, data.length - 1];	//section being sorted
		this.sections = [];											//as we can't use recursion we hold the sections to be sorted in order here
		
		this.partitioning = true;
		this.i = -1;							//tracks the index of where an item less than or equal to the pivot should be placed
		this.j = 0;								//index that traverses over the section to be sorted

		this.swapping = false;
		this.swap = -1;
	}

	tick() {
		if (this.sorted) {
			return [this.data, true, -5, [0, this.data.length]];
		
		} else if (this.swapping) {
			[this.data[this.i], this.data[this.swap]] = [this.data[this.swap], this.data[this.i]];
			this.active = this.swap;
			this.swapping = false;
		
		} else if (this.partitioning) {
			if (this.j <= this.currSection[1]) {																	//if we aren't done with the section to partition
				if (this.data[this.j] <= this.data[this.currSection[1]]) {					//if current datum is less than pivot
					this.i++;
					
					if (this.i != this.j) {							//swap it into place if needed
						this.swap = this.j;
						this.swapping = true;
					}
				}
				
				this.active = this.swapping ? this.i : this.j;
				this.j++;
			} else {																	//if we are done with the section to partition
				this.partitioning = false;
				
				this.sections.unshift([this.currSection[0], this.i - 1], [this.i + 1, this.currSection[1]]);				//this.i holds pivot
				
				this.active = this.currSection[1];
			}
		} else if (this.sections.length) {							//if there are more sections to partition we setup tick to begin a partition
			this.currSection = this.sections.shift();
			
			if (this.currSection[0] < this.currSection[1]) {			//if currSection is valid, otherwise we just move to next one
				this.partitioning = true;
				this.i = this.currSection[0] - 1;
				this.j = this.currSection[0];
			}
		} else {																			//if we aren't swapping, partitioning, and no sections to partition remain we are done
			this.sorted = true;
		}

		return [this.data, this.sorted, this.active, this.currSection]
	}
}

export default Quick;
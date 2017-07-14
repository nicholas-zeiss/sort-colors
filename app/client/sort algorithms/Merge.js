/**
Here we have the class for implementing merge sort. As we have to proceed tick by tick this implementation
is not actually recursive. Instead, when the object is being constructed we use the recursive generateSubsections
helper function which gives us the sections to sort and merge in an order that is identical to a true recursive top down approach.
**/

import COLORS from '../utils/colors';
import generateSections from '../utils/generateSections';
import Queue from '../utils/queue';


class Merge {
	constructor(data) {
		this.data = data;
		
		this.index = 0;
		this.endSorted = 0;		//the data from 0 to endSorted has been at least partially sorted and must be displayed as such
		
		this.merging = false;
		this.left = null;
		this.right = null;
		
		this.sections = generateSections(data.length);
		this.currSection = null;

		this.sorted = false;
	}

	//moves merge sort forward by one comparison or swap
	//returns [array data, bool sorted, array colorScheme]
	tick() {
		if (this.sorted) {
			return [this.data, true, [[0, this.data.length - 1, COLORS.green]]];
		} else if (this.merging) {
			this.merge();
		} else if (this.sections.peek()) {
			this.populateLeftRight();
		} else {
			this.sorted = true;
		}

		//red for active, cyan for left section, yellow for right section, green for partially sorted
		let colors = [[this.index, this.index, COLORS.red]];

		if (this.currSection.length > 2) {																																						//if our current merging currSection is not a single datum
			colors.push([this.currSection[0], this.currSection[1] - 1, COLORS.cyan]);
			colors.push([this.currSection[1], this.currSection[2] - 1, COLORS.yellow]);
		} else {																																																								//if it is a single datum
			colors.push([this.currSection[0], this.currSection[0], COLORS.cyan]);
		}

		colors.push([0, this.endSorted, COLORS.green]);
		
		return [
			this.data,
			this.sorted,
			colors
		];
	}


	merge() {
		if (this.left.peek() && this.right.peek()) {
			this.data[this.index] = this.left.peek() < this.right.peek() ? this.left.pop() : this.right.pop();
		
		} else if (this.left.peek()) {
			this.data[this.index] = this.left.pop();		
		
		} else {
			this.data[this.index] = this.right.pop();
		}			
		
		this.merging = this.left.peek() || this.right.peek();
		
		this.index += this.merging ? 1 : 0;
		
		this.endSorted = Math.max(this.index, this.endSorted);
	}


	populateLeftRight() {
		this.currSection = this.sections.pop();

		if (this.currSection.length > 1) {
			this.left = new Queue(...this.data.slice(this.currSection[0], this.currSection[1]));
			this.right = new Queue(...this.data.slice(this.currSection[1], this.currSection[2]));
			this.merging = true;
		}
		
		this.index = this.currSection[0];
		this.endSorted = Math.max(this.index, this.endSorted);
	}
}

export default Merge;
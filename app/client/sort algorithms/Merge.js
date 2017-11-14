/**
 *
 *	Here we have the class for implementing merge sort. As we have to proceed tick by tick this implementation
 *	is not actually recursive. Instead, when the object is being constructed we use the recursive generateSubsections
 *	helper function which gives us the sections to sort and merge in an order that is identical to a true recursive top down approach.
 *
**/

import Algorithm from './Algorithm';

import Colors, { genColorMap, genColorRange, genColorSet } from '../utils/Colors';
import generateSections from '../utils/generateSections';
import Queue from '../utils/Queue';


class Merge extends Algorithm {
	constructor(data) {
		super(data);

		this.currSection = null;
		this.endSorted = 0;		// the data from 0 to endSorted has been at least partially sorted and must be displayed as such
		this.left = null;
		this.index = 0;
		this.merging = false;
		this.right = null;
		this.sections = generateSections(0, data.length - 1);
	}


	* tick() {
		let finished = false;

		while (!finished) {
			if (this.merging) {
				this.merge();
			} else if (this.sections.peek()) {
				this.populateLeftRight();
			} else {
				finished = true;
			}

			yield({ colors: this.genColors(), data: [ ...this.data ] });
		}

		return this.finish();
	}


	merge() {
		if (this.left.peek() && this.right.peek()) {
			this.data[this.index] = this.left.peek() < this.right.peek() ? this.left.pop() : this.right.pop();
		} else if (this.left.peek()) {
			this.data[this.index] = this.left.pop();		
		} else {
			this.data[this.index] = this.right.pop();
		}			
		
		this.merging = !!(this.left.peek() || this.right.peek());
		this.index += this.merging ? 1 : 0;
		this.endSorted = Math.max(this.index, this.endSorted);
	}


	populateLeftRight() {
		this.currSection = this.sections.pop();

		// if current section is more than a single item
		if (!this.currSection.single) {
			this.left = new Queue(this.data.slice(this.currSection.start, this.currSection.middle));
			this.right = new Queue(this.data.slice(this.currSection.middle, this.currSection.end + 1));
			this.merging = true;
		}
		
		this.index = this.currSection.start;
		this.endSorted = Math.max(this.index, this.endSorted);
	}


	genColors() {
		let leftRightColors;

		if (!this.currSection.single) {
			leftRightColors = [
				genColorRange(this.currSection.start, this.currSection.middle, Colors.cyan),
				genColorRange(this.currSection.middle, this.currSection.end + 1, Colors.yellow),
			];
		} else {	
			leftRightColors = [ genColorSet(new Set([ this.currSection.start ]), Colors.cyan) ];
		}

		return genColorMap(this.data.length, [
			genColorRange(0, this.endSorted, Colors.green),
			...leftRightColors,
			genColorSet(new Set([ this.index ]), Colors.red)
		]);
	}
}


export default Merge;


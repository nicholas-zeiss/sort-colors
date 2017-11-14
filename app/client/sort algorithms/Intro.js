/**
 *
 *	Here we have the class responsible for implementing introsort, a hybrid between quicksort and heapsort.
 *
**/

import Algorithm from './Algorithm';
import Heap from './Heap';
import Quick from './Quick';

import Colors, { genColorMap, genColorRange } from '../utils/Colors';
import SortController from '../utils/SortController';


class Intro extends Algorithm {
	constructor(data) {
		super(data);
		
		// max level of recursion before switching to heapsort
		this.maxDepth = 2 * Math.floor(Math.log(data.length));

		this.sorter = new SortController(Quick, data.length, data);
		this.sections = [];																				
		this.currSection = {
			start: 0,
			end: data.length - 1,
			depth: 0
		};
	}


	* tick() {
		let colors;
		let finished = false;

		while (!finished) {			
			if (!this.sorterFinished()) {
				colors = this.tickSorter();
			} else {
				colors = this.clearSorter();
				this.loadSection();
				this.currSection ? this.initializeSorter() : finished = true;
			}

			yield({ colors: this.genColors(colors), data: [ ...this.data ] });
		}

		return this.finish();
	}


	// if we're using quicksort we only want it to finish a single partition
	sorterFinished() {
		const alg = this.sorter.sortInstance;
		return this.sorter.sorted || alg instanceof Quick && !alg.partitioning;
	}


	// Advance our sorter by one step, return the color map it generates. If we are done with the sorter
	// clear this.sorter and this.currSection, and add new sections to recurse on if not yet at max depth
	tickSorter() {
		this.sorter.tick();
		this.data.splice(this.currSection.start, this.sorter.data.length, ...this.sorter.data);

		if (this.sorter.sortInstance instanceof Heap) {
			return this.sorter.colors
				.map(color => color != Colors.red ? Colors.orange : Colors.red);
		} else {
			return this.sorter.colors;
		}		
	}


	clearSorter() {
		const section = this.currSection;

		if (section.depth != this.maxDepth) {
			this.addSections();
		}
		
		this.sorter = null;
		return new Array(section.end - section.start + 1).fill(Colors.green);
	}


	// quick has completed a partition, we must add the below pivot and above pivot sections to our section stack
	addSections() {
		const { start, end, depth } = this.currSection;
		const pivot = this.sorter.sortInstance.i + start;

		this.sections.push(
			{
				start: pivot,
				end: end,
				depth: depth + 1
			},
			{
				start: start,
				end: pivot - 1,
				depth: depth + 1
			}
		);		
	}


	// load first valid section from our stack
	loadSection() {
		this.currSection = null;

		while (this.sections.length) {
			const section = this.sections.pop();

			if (section.start < section.end) {
				this.currSection = section;
				break;
			}
		}
	}


	initializeSorter() {
		const subsection = this.data.slice(this.currSection.start, this.currSection.end + 1);
		const sorter = this.currSection.depth == this.maxDepth ? Heap : Quick;

		this.sorter = new SortController(sorter, subsection.length, subsection);
	}


	genColors(active) {
		const inactive = genColorMap(
			this.data.length, 
			[ genColorRange(0, this.data.length, Colors.green) ],
		);

		if (this.currSection) {
			return [
				...inactive.slice(0, this.currSection.start),
				...active,
				...inactive.slice(this.currSection.end + 1)
			];
		} else {
			return inactive;
		}
	}
}


export default Intro;


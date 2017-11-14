/**
 *
 *	A superclass for our sorting algorithms that contains a few common methods
 *
**/ 

import Colors, { genColorMap, genColorRange } from '../utils/Colors';


class Algorithm {
	constructor(data) {
		this.data = data;
	}

	swap(i, j) {
		[ this.data[i], this.data[j] ] = [ this.data[j], this.data[i] ];
	}

	finish() {
		return {
			data: this.data,
			colors: genColorMap(
				this.data.length,
				[ genColorRange(0, this.data.length, Colors.green) ]
			)
		};
	}
}


export default Algorithm;


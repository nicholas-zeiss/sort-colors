/**
 *
 *	This class serves as the controller for a sorting model, where the sorting model is an instance of one of our
 *	sorting algorithm classes holding an array of data to sort.
 *
**/

import { genColorMap } from './colors';


// Creates an array of given length with values from 1 to length
// in psuedorandom positions and returns it
const shuffle = length => {
	const arr = new Array(length)
		.fill(1)
		.map((n, i) => i + 1);

	for (let i = arr.length - 1; i > 0; i--) {
		const rand = Math.floor(i * Math.random());
		[ arr[i], arr[rand] ] = [ arr[rand], arr[i] ];
	}

	return arr;
};


class SortController {
	constructor(algorithm, numItems, data = shuffle(numItems)) {
		this.data = data;
		this.sorted = false;
		this.colors = genColorMap(numItems, [{ 
			type: 'range',
			start: 0,
			size: this.data.length,
			color: 'white'
		}]);

		// In rare cases you may need to access the actual algorithm instance this class wraps (eg introsort), and it can be accessed
		// as the sortInstance property. However, this should be avoided whenever possible to avoid accidental mutation of the algorithm
		// instance. Instead rely on the tick method.
		this.sortInstance = new algorithm([ ...this.data ]);
		this.sortModel = this.sortInstance.tick();
	}

	// moves algorithm forward by one comparison or swap
	tick() {
		if (this.sorted) {
			return;
		}

		const tick = this.sortModel.next();
			
		this.colors = tick.value.colors.slice();
		this.data = tick.value.data.slice();
		this.sorted = tick.done;
	}
}


export default SortController;


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
	constructor(sortModel, numItems) {		
		this.data = shuffle(numItems);
		this.sortModel = new sortModel(this.data).tick();
		this.sorted = false;
		this.colors = genColorMap(numItems, [{ 
			type: 'range',
			start: 0,
			size: this.data.length,
			color: 'white'
		}]);
	}

	// moves algorithm forward by one comparison or swap
	tick() {
		if (this.sorted) return;
		const tick = this.sortModel.next();
		console.log(tick);
		const values = { 
			colors: tick.value.colors,
			data: tick.value.data,
			sorted: tick.done
		};

		Object.assign(this, values);
	}
}


export default SortController;


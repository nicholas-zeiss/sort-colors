

import Colors, { genColorMap } from '../utils/Colors';


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
			colors: genColorMap(this.data.length, [{
				type: 'range',
				start: 0,
				size: this.data.length,
				color: 'green' 
			}])
		};
	}
}


export default Algorithm;


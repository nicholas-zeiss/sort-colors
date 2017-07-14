/**
This is a helper function for merge sort. Given the length of an array it recursively generates a queue which holds the subsections of 
the array that should be sorted (in that order). These subsections are produced in the order that a conventional top down recursive merge sort would visit them.

Each item in the queue is an array of one of two possible forms: [i] and [i, j, k].

An [i] means that section is the single piece of data at index i.

An [i, j, k] means that the section is composed of a left subsection from i to j - 1, and a right subsection from j to k - 1.
	
e.g. generateSections(5) returns a queue with internal storage 
	[	[ 0, 1, 2 ],
		2,
		[ 0, 2, 3 ],
		[3, 4, 5 ],
		[0, 3, 5 ] ]
**/

import Queue from './queue';


function generateSections(length) {
	let res = new Queue();

	recurse(0, length - 1);

	return res;

	function recurse(i, j) {
		if (i == j) {
			res.push([i]);
		
		} else if (i + 1 == j) {
			res.push([i, j, j + 1]);
		
		} else {
			let middle = i + Math.floor((j - i) / 2);

			recurse(i, middle);
			recurse(middle + 1, j);
			
			res.push([i, middle + 1, j + 1]);
		}
	}
}

export default generateSections;
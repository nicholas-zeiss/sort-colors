/**
 *
 *	This is a helper function for merge sort. Given the length of an array it recursively generates a queue which holds the subsections of 
 *	the array to be sorted. These subsections are produced in the order that a conventional top down recursive merge sort would visit them.
 *	
 *	Each item in the queue is an array of one of two possible forms: [i] and [i, j, k].
 *	
 *	An [i] means that section is the single piece of data at index i.
 *	
 *	An [i, j, k] means that the section is composed of a left subsection from i to j - 1, and a right subsection from j to k - 1.
 *	
 *	e.g. generateSections(5) returns a queue with internal storage 
 *		[	[ 0, 1, 2 ],
 *			[ 2 ],
 *			[ 0, 2, 3 ],
 *			[ 3, 4, 5 ],
 *			[ 0, 3, 5 ] ]
 *
**/

import Queue from './Queue';


export default function genSections(start, end, sections = new Queue()) {
	if (start == end) {
		sections.push([ start ]);
	
	} else if (start + 1 == end) {
		sections.push([ start, end, end + 1 ]);
	
	} else {
		const middle = start + Math.floor((end - start) / 2);

		genSections(start, middle, sections);
		genSections(middle + 1, end, sections);
		
		sections.push([ start, middle + 1, end + 1 ]);
	}

	return sections;
}


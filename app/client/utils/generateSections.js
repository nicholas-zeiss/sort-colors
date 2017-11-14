/**
 *
 *	This is a helper function for merge sort. Given the length of an array it recursively generates a queue which holds the subsections of 
 *	the array to be sorted. These subsections are produced in the order that a conventional top down recursive merge sort would visit them.
 *
**/

import Queue from './Queue';


export default function genSections(start, end, sections = new Queue()) {
	if (start == end) {
		sections.push({ single: true, start: start});
	
	} else if (start + 1 == end) {
		sections.push({ 
			single: false,
			start: start,
			middle: end,
			end: end
		});
	
	} else {
		const middle = start + Math.ceil((end - start) / 2);

		genSections(start, middle - 1, sections);
		genSections(middle, end, sections);
		
		sections.push({ 
			single: false,
			start: start,
			middle: middle,
			end: end
		});
	}

	return sections;
}


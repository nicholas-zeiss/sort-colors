/**
This is a helper function for merge sort. Given the length of an array it returns an array of arrays, with each inner array representing a subsection of 
the data array that should be merged. These subsections are produced in the order that a conventional top down recursive merge sort would visit them.

	There are two possibilities for the subsections:

		['single', [i]]	 ---  this subsection is a single piece of data at index i that requires no sorting

		['merge', [i, j], [k, l]]		--- the subsection from i up to but not including l must be merged. Left is from i up to but not including j,
																	  right is from k up to but not including l. The end indices are exclusive as we feed them into a slice call
																	  in the actual merge procedure.

	
	e.g. getIndices(5) => [ [ 'merge', [ 0, 1 ], [ 1, 2 ] ],
												  [ 'single', [ 2 ] ],
												  [ 'merge', [ 0, 2 ], [ 2, 3 ] ],
												  [ 'merge', [ 3, 4 ], [ 4, 5 ] ],
												  [ 'merge', [ 0, 3 ], [ 3, 5 ] ] ]

**/

function getIndices(length) {
	let res = [];

	recurse(0, length - 1);

	return res;

	function recurse(i, j) {
		if (i == j) {
			res.push(['single', [i]]);
		} else if (i + 1 == j) {
			res.push(['merge', [i, j], [j, j + 1]]);
		} else {
			recurse(i, i + Math.floor((j - i) / 2));
			recurse(i + Math.floor((j - i) / 2) + 1, j);
			res.push(['merge', [i, i + Math.floor((j - i) / 2) + 1], [i + Math.floor((j - i) / 2) + 1, j + 1]]);
		}
	}
}

export default getIndices;
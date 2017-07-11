/**
Descriptions of the colors used in displaying each sort
**/

import React from 'react';			//so we can use jsx

const ALG_INFO = {
	'Bubble Sort': 'Green: sorted',
	'Cocktail Shaker Sort': 'Green: sorted',
	'Gnome Sort': 'Green: sorted  White: unmodified',
	'Heapsort': 'Cyan: verified portion of heap  Yellow: unverified portion of heap  Green: sorted',
	'Insertion Sort': 'Green: sorted  White: unmodified',
	'Introsort': '',
	'Merge Sort': 'Green: partially sorted  Cyan: current left  Yellow: current right  White: unmodified',
	'Quicksort': 'Cyan: section less than pivot  Yellow: section above pivot  Light Green: in section being partitioned, but not yet reached  Purple: pivot  Green: partially sorted',
	'Selection Sort': 'Cyan: unsorted but modified  Orange: current min  White: unmodified  Green: sorted',
	'Shellsort': ''
};


export default ALG_INFO;
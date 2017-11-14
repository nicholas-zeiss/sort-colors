/**
 *
 *	Exports a convenient wrapper that holds all the different sorting algorithm classes.
 *
**/

import Bubble from './Bubble';
import Cocktail from './Cocktail';
import Gnome from './Gnome';
import Heap from './Heap';
import Insertion from './Insertion';
import Intro from './Intro';
import Merge from './Merge';
import Quick from './Quick';
import Selection from './Selection';
import Shell from './Shell';


export default {
	'Bubble Sort': Bubble,
	'Cocktail Shaker Sort': Cocktail,
	'Gnome Sort': Gnome,
	'Heapsort': Heap,
	'Insertion Sort': Insertion,
	'Introsort': Intro,
	'Merge Sort': Merge,
	'Quicksort': Quick,
	'Selection Sort': Selection,
	'Shellsort': Shell
};


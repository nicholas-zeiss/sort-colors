/**
 *
 *	Descriptions of the colors used in displaying each sort
 *
**/

import React from 'react';

import COLORS from './colors';


const expandKey = colors => (
	<h4 className='pull-right' id='color-key'>
		<span style={{ color: COLORS.white }}> Color key:&nbsp;&nbsp; </span>
		<span style={{ color: COLORS.red }}> active </span>
		{ 
			colors.map(key => (
				<span key={ key.color }>
					<span style={{ fontSize: '18px', color: COLORS.white }}> &nbsp;|&nbsp; </span>
					<span style={{ color: COLORS[key.color] }}>{ key.description }</span>
				</span>
			))
		}
	</h4>
);


const colorKeys = {
	'Bubble Sort': [ 
		{ color: 'green', description: 'sorted' }
	],
	'Cocktail Shaker Sort': [
		{ color: 'green', description: 'sorted' }
	],
	'Gnome Sort': [
		{ color: 'green', description: 'partially sorted' }
	],
	'Heapsort': [
		{ color: 'cyan', description: 'valid heap space' },
		{ color: 'yellow', description: 'invalid heap space' },
		{ color: 'green', description: 'sorted' }
	],
	'Insertion Sort': [
		{ color: 'green', description: 'partially sorted' }
	],
	'Introsort': [
		{ color: 'cyan', description: ' <= pivot' },
		{ color: 'yellow', description: '> pivot' },
		{ color: 'lightGreen', description: 'to be partitioned' },
		{ color: 'purple', description: 'pivot' },
		{ color: 'orange', description: 'heapsort' },
		{ color: 'green', description: 'partially sorted' }
	],
	'Merge Sort': [
		{ color: 'cyan', description: 'left section' },
		{ color: 'yellow', description: 'right section' },
		{ color: 'green', description: 'partially sorted' }
	],
	'Quicksort': [
		{ color: 'cyan', description: '<= pivot' },
		{ color: 'yellow', description: '> pivot' },
		{ color: 'lightGreen', description: 'to be partitioned' },
		{ color: 'purple', description: 'pivot' },
		{ color: 'green', description: 'partially sorted' }
	],
	'Selection Sort': [
		{ color: 'orange', description: 'current min' },
		{ color: 'green', description: 'sorted' }
	],
	'Shellsort': [
		{ color: 'blue', description: 'current run' },
		{ color: 'lighterBlue', description: 'run before current' },
		{ color: 'lightestBlue', description: 'run before that etc...' }
	]
};


for (let key in colorKeys) {
	colorKeys[key] = expandKey(colorKeys[key]);
}


export default colorKeys;


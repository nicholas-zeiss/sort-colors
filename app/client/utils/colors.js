/**
 *
 *	Appwide settings of the various colors we use and a function used by sort algorithms to generate a map
 *	of their data points to their displayed color.
 *
**/


const Colors = {
	background: '#1c1e22',
	blue: '#3340cc',
	lighterBlue: '#7079db',
	lightestBlue: '#9da3e7',
	cyan: '#2de5e5',
	green: '#00a500',
	lightGreen: '#00ff7f',
	orange: '#ffa500',
	purple: '#e263e2',
	red: '#ff3535',
	white: '#f9f9f9',
	yellow: '#f2f22b'
};


// generates a range subsection of color for genColorMap, covering the section from index start (inclusive)
// up to index end (exclusive)
export const genColorRange = (start, end, color) => ({
	type: 'range',
	start: start,
	size: end - start,
	color: color
});


export const genColorSet = (points, color) => ({
	type: 'set',
	points: points,
	color: color
});


// sections is an array of subsections either of form { type: 'range' start: startIndex, size: int, color: str }
// or { type: 'set', points: Set, color: str }.
// Later subsections overwrite previous ones.
export const genColorMap = (length, sections) => {
	let map = new Array(length).fill(Colors.white);

	sections.forEach(section => {
		if (section.type == 'range' && section.size > 0) {
			const subsection = new Array(section.size).fill(section.color);
			map = [ ...map.slice(0, section.start), ...subsection, ...map.slice(section.start + section.size) ];
			
		} else if (section.type == 'set') {
			section.points.forEach(point => map[point] = section.color);
		}
	});

	return map;
};


export default Colors;


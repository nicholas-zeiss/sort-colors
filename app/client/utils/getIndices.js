

function getIndices(length) {
	let res = [];

	recurse(length);

	return res;

	function recurse(length, prefix = 0) {
		if (length == 1) {
			res.push([prefix, prefix]);
		} else if (length == 2) {
			res.push([prefix, prefix + 1]);
		} else {
			recurse(Math.floor(length / 2), prefix);
			recurse(length - Math.floor(length / 2), prefix + Math.floor(length / 2));
		}
	}
}

export default getIndices;
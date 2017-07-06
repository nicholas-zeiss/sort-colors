/**
A utility to randomize an array, used by Sorter to initialize data
**/

function shuffle(arr) {
	let currIndex = arr.length;

	while (currIndex > 0) {
		let rand = Math.floor(currIndex-- * Math.random());

		[arr[currIndex], arr[rand]] = [arr[rand], arr[currIndex]];
	}

	return arr;
}

export default shuffle;
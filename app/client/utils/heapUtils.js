/**
 *
 *	Here we have helper functions for the Heap class which are useful for manipulating the heap portion of our array.
 *
**/


// These three functions help us find the indices of connected nodes in the heap
export const leftChild = i => 2 * i + 1;

export const parentNode = i => Math.floor((i - 1) / 2);

export const rightChild = i => 2 * i + 2;


// siftHeap helps rebuild the heap stored in array arr between indices root and end (inclusive).
// If the root is greater than its children siftHeap returns the index of the smaller child
// with which the root will be swapped. Otherwise, it returns the index of the root.
export const siftHeap = (arr, root, end) => {
	let swap = root;
	const left = leftChild(root);
	const right = rightChild(root);
	
	if (left > end) {
		return root;
	}

	if (arr[root] < arr[left]) {
		swap = left;
	}

	if (right <= end && arr[swap] < arr[right]) {
		swap = right;
	}

	return swap;
};


// Returns an array of all children, grandchildren, etc of node i (including i)
// where the last node in the heap is at index end.
export const allChildren = (i, end) => {
	const res = [ i ];
	const stack = [ i ];

	while (stack.length) {
		i = stack.pop();

		const left = leftChild(i);
		const right = rightChild(i);

		if (left <= end) {
			stack.push(left);
			res.push(left);
		}

		if (right <= end) {
			stack.push(right);
			res.push(right);
		}
	}

	return res;
};


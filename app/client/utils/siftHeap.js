/**
Helpers function for heap sort
**/

/**
Everytime heap sort swaps the max element of the heap (to it's final position) with the last item in the heap, 
we rebuild the heap using this function. We also use it to build the initial heap. It rebuilds the heap with root from the bottom up.
end is the end index of the heap in the array, inclusive.
**/
function siftHeap(arr, root, end) {
	if (leftChild(root) > end) {
		return [root, false];
	}

	let swap = root;
	
	if (arr[root] < arr[leftChild(root)]) {
		swap = leftChild(root)
	}

	if (rightChild(root) <= end && arr[swap] < arr[rightChild(root)]) {
		swap = rightChild(root);
	}

	if (swap == root) {
		return [root, false];
	} else {
		[arr[root], arr[swap]] = [arr[swap], arr[root]];
		return [swap, true];
	}
}


/**
Helpers for the above function
**/

//given index i in heap return index of the parent node
function parent(i) {
	return Math.floor((i - 1) / 2);
}

//returns index of the left child of the node at i
function leftChild(i) {
	return 2*i + 1;
}

//returns index of the right child of the node at i
function rightChild(i) {
	return 2*i + 2;
}


/**
Helpers for the above two functions
**/

//given index i in heap return index of the parent node
function parent(i) {
	return Math.floor((i - 1) / 2);
}

//returns index of the left child of the node at i
function leftChild(i) {
	return 2*i + 1;
}

//returns index of the right child of the node at i
function rightChild(i) {
	return 2*i + 2;
}

export default siftHeap;
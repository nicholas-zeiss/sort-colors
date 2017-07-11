/**
Everytime heap sort swaps the max element of the heap (to it's final position) with the last item in the heap, 
we rebuild the heap using this function. We also use it to build the initial heap. It rebuilds the heap starting at root from the bottom up.
end is the end index of the heap in the array, inclusive. Each call either finds that the root is in the appropriate place in the heap,
or if not, the root must be swapped with its greatest child and siftHeap should continue onto that child.

Note: this function does not actually alter the array it is passed in anyway. Instead it returns the information needed to rebuild the heap
so that those steps can be taken and displayed graphically by the Heap instance using this function.

It returns an array with two item: 1. the root index (if there was no swap) or the index of where the root was swapped
																	 2. an array of arrays which becomes toBeActived in the Heap instance and is documented there
**/
function siftHeap(arr, root, end) {
	if (leftChild(root) > end) {
		return [root, []];
	}

	let swap = root, left = leftChild(root), right = rightChild(root) <= end ? rightChild(root) : null;
	
	if (arr[root] < arr[left]) {
		swap = left;
	}

	if (right && arr[swap] < arr[right]) {
		swap = right;
	}

	return [swap, swap != root ? [root, swap] : null];//[[left]].concat(right ? [[right]] : [], swap != root ? [[root, swap]] : [])];
}


/**
Utility heap functions
**/

//returns index of the left child of the node at i
function leftChild(i) {
	return 2*i + 1;
}

//returns index of the right child of the node at i
function rightChild(i) {
	return 2*i + 2;
}

//returns an array of all children less than end of the node at i
function allChildren(i, end) {
	let res = [i], stack = [i];

	while (stack.length) {
		i = stack.pop();

		if (leftChild(i) <= end) {
			stack.push(leftChild(i));
			res.push(leftChild(i));
		}

		if (rightChild(i) <= end) {
			stack.push(rightChild(i));
			res.push(rightChild(i));
		}
	}

	return res;
}


export {siftHeap, leftChild, rightChild, allChildren};
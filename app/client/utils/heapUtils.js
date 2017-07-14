/**
Here we have helper functions for the Heap class.
**/

// siftHeap helps rebuild the heap starting at root. Each call either finds that the root is in 
// the appropriate place in the heap, or if not, that the root must be swapped with its greatest child.
// In the latter case we must move onto the portion of the heap starting at that child.
//
// siftHeap takes an array with a heap from indices start to end, inclusive. It returns either the root index if 
// no swap is needed or the index to swap to otherwise.
// 
// n.b. this function does not actually alter the array it is passed. Those changes are made in Heap.
function siftHeap(arr, root, end) {
	let swap = root, left = leftChild(root), right = rightChild(root);
	
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
}


function parentNode(i) {
	return Math.floor((i - 1) / 2);
}


function leftChild(i) {
	return 2 * i + 1;
}


function rightChild(i) {
	return 2 * i + 2;
}

//returns an array of the indices of all nodes below the node at i, including i itself
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


export {siftHeap, parentNode, leftChild, rightChild, allChildren};
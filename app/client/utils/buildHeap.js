/**
Helpers function for heap sort
**/


/**
Run once at the start of heap sort, this takes an unsorted array and turns into a binary max heap
**/
function buildHeap(arr) {		





}


/**
Everytime heap sort swaps the max element of the heap (to it's final position) with the last item in the heap, 
we rebuild the heap using this function. We also use it in build heap. It rebuilds the heap with root from the bottom up.
end is the end index of the heap in the array, inclusive.
**/
function siftHeap(arr, root, end) {
	while(root <= end) {

	}
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
function leftChild(i) {
	2*i + 2;
}

export {buildHeap, siftHeap};
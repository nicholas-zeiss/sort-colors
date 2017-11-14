
/**
 *
 *	Here we create a class for a standard queue. We use queues to hold the sections of the data
 *	that need to be sorted in merge sort and quicksort.
 *
**/


class Queue {
	constructor(data = []) {
		this.storage = data;
		this.first = 0;
		this.end = this.storage.length ? this.storage.length - 1 : -1;
	}

	peek() {
		return this.storage[this.first];
	}

	push(item) {
		this.end = this.storage.push(item) - 1;
	}

	pop() {
		let item = null;

		if (this.first <= this.end) {
			item = this.storage[this.first];
			delete this.storage[this.first++];
		}

		return item;
	}

	clear() {
		this.storage = [];
		this.first = 0;
		this.end = -1;
	}
}


export default Queue;


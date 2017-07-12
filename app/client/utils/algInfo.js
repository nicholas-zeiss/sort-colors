
const ALG_INFO = {
	'Bubble Sort': `<p>One of the most elementary sorts, bubble sorts loops forward through the data swapping adjacent items if out of order.
		                At the end of each loop the largest item in the unsorted portion is brought to the end of the list. It is rarely
		                used in practice due to it's O(n<sup>2</sup>) worst case time complexity which makes it inefficient for large lists. For smaller lists
		                where O(n<sup>2</sup>) algorithms are more commonly used it is outperformed by insertion sort.<br><br>
		                Time complexity:<br>
		                Worst - O(n<sup>2</sup>)<br>
		                Average - O(n<sup>2</sup>)<br>
		                Best - O(n)<br><br>
		                Space complexity (auxiliary):<br>
		                O(1)<br><br>
		                Stable - yes
		              </p>`,



	'Cocktail Shaker Sort':  `<p>An improved version of bubble sort. Instead of just looping forward and bubbling large items toward the end of the list,
															it also loops backwards after each forward loop and brings small items to the beginning of the list. It has only marginally better performance than
															bubble sort, and like bubble sort, is rarely used in practice.
							                <br><br>
							                Time complexity:<br>
							                Worst - O(n<sup>2</sup>)<br>
							                Average - O(n<sup>2</sup>)<br>
							                Best - O(n)<br><br>
							                Space complexity (auxiliary):<br>
							                O(1)<br><br>
							                Stable - yes
							              </p>`,



	'Gnome Sort':  `<p>This is essentially a worse performing version of insertion sort. While insertion sort will jump back to
										the beginning of the unsorted portion of the list after it finishes placing an item, gnome will loop back 
										through the sorted data instead. Its only purpose is educational.
		                <br><br>
		                Time complexity:<br>
		                Worst - O(n<sup>2</sup>)<br>
		                Average - O(n<sup>2</sup>)<br>
		                Best - O(n)<br><br>
		                Space complexity (auxiliary):<br>
		                O(1)<br><br>
		                Stable - yes
		              </p>`,



	'Heapsort':  `<p>Heapsort is an O(<i>n</i> log <i>n</i>) algorithm. It is on average slower than quicksort but has a worst case
									run time of O(<i>n</i> log <i>n</i>) vs. quicksort's O(n<sup>2</sup>). It works by using a binary max heap, a type
									of data structure similar to a tree. In a binary max hap ach node has two children and is guaranteed to have a larger value than them.
									Heap sort first turns the data into such a heap in place. Knowing that the first element is the largest it swaps this with the last element
									and no longer considers that last position part of the heap. It rebuilds the heap, swaps, and rebuilds until the heap is empty and all items
									are sorted.
	                <br><br>
	                Time complexity:<br>
	                Worst - O(<i>n</i> log <i>n</i>)<br>
	                Average - O(<i>n</i> log <i>n</i>)<br>
	                Best - O(<i>n</i> log <i>n</i>)<br><br>
	                Space complexity (auxiliary):<br>
	                O(1)<br><br>
	                Stable - no
	              </p>`,



	'Insertion Sort':  `<p>Insertion sort works by moving forward through the set of data until it finds an item that is less than it's predecessor.
												When this happens it swaps the out of place item backwards until it is in place. It then skips ahead to where it originally
												found the out of place item.
												<br><br>
												While all O(n<sup>2</sup>) algorithms, such as insertion, bubble, selection, and their variations are slower than 
												the more advanced O(<i>n</i> log <i>n</i>) algorithms for large sets of data, insertion sort is commonly used on small 
												sets. On such small sets the lower overhead and fewer operations of O(n<sup>2</sup>)
												algorithms can make them more desirable than the O(<i>n</i> log <i>n</i>) algorithms.
					              <br><br>
					              Time complexity:<br>
					              Worst - O(n<sup>2</sup>)<br>
					              Average - O(n<sup>2</sup>)<br>
					              Best - O(n)<br><br>
					              Space complexity (auxiliary):<br>
					              O(1)<br><br>
					              Stable - yes
			                </p>`,



	'Introsort': `<p>Introsort is an algorithm that mixes heapsort and quicksort. It first applies quicksort, but upon reaching a
									deep enough level of recursion it switches over to heapsort. This combines the strongest aspects of both algorithms
									and allows introsort to avoid the O(n<sup>2</sup>) worst case of quicksort.
									run time of quicksort.
	                <br><br>
	                Time complexity:<br>
	                Worst - O(<i>n</i> log <i>n</i>)<br>
	                Average - O(<i>n</i> log <i>n</i>)<br>
	                Best - O(<i>n</i> log <i>n</i>)<br><br>
	                Space complexity (auxiliary):<br>
	                O(1)<br><br>
	                Stable - no
	              </p>`,


	'Merge Sort':  `<p>Merge sort is an O(<i>n</i> log <i>n</i>), recursive algorithm. It (in its top-down implementation such as this) splits
										the data in half into a left and right sections and then recurses on each. Eventually the sections will be either a length of
										1 or 2 and are trivial to sort. It then goes back up the recursion tree merging the two sorted sections on that level together.
										It is not used very often; it is usually slower than quicksort, and although comparable in speed to heapsort, merge sort has
										a space requirement of O(n) vs. O(1) for heapsort. However, it is stable which is uncommon for an O(<i>n</i> log <i>n</i>) algorithm
										and may be used if swapping data is especially difficult.
		                <br><br>
		                Time complexity:<br>
		                Worst - O(<i>n</i> log <i>n</i>)<br>
		                Average - O(<i>n</i> log <i>n</i>)<br>
		                Best - O(<i>n</i> log <i>n</i>)<br><br>
		                Space complexity (auxiliary):<br>
		                O(n)<br><br>
		                Stable - usually yes, depends on implementation
	                </p>`,



	'Quicksort': `<p>De facto king of the sorts, quicksort is (on average) an O(<i>n</i> log <i>n</i>) algorithm. While it can reach 
	                O(n<sup>2</sup>) behavior in the worst case this is very uncommon, and quicksort is generally always faster than
	                merge sort and heapsort. It works by picking a piece of data to be a pivot, items less than the pivot are sorted to
	                the left of the data set while objects that are greater are sorted to the right. The pivot is then placed in the middle,
	                and quick sort recursively calls itself on either side.
	                <br><br>
	                Time complexity:<br>
		              Worst - O(n<sup>2</sup>)<br>
		              Average - O(<i>n</i> log <i>n</i>)<br>
		              Best - O(<i>n</i> log <i>n</i>)<br><br>
		              Space complexity (auxiliary):<br>
		              O(1)<br><br>
		              Stable - no
	              </p>`,



	'Selection Sort':  `<p>Selection sort is a very simple O(n<sup>2</sup>) algorithm which loops forward through the unsorted
												portion of the data and keeps track of the smallest item it finds. Once the loop is complete it swaps the
												smallest item with the first item of the unsorted portion and repeats. Unlike the other O(n<sup>2</sup>) algorithms
												it cannot acheive O(n) best case behavior.
				                <br><br>
				                Time complexity:<br>
				                Worst - O(n<sup>2</sup>)<br>
				                Average - O(n<sup>2</sup>)<br>
				                Best - O(n<sup>2</sup>)<br><br>
				                Space complexity (auxiliary):<br>
				                O(1)<br><br>
				                Stable - yes
				              </p>`,



	'Shellsort': `<p>Shellsort can be thought of as a generalization of insertion sort that, instead of comparing items
									with the preceding item, compares them to an item that is a "gap" length before. These gap lengths
									start large and then decrease every loop until they reach 1, at which point shellsort becomes insertion
									sort. Performance is dependent on the choice of gap lengths.
	                <br><br>
	                Time complexity:<br>
	                Worst - O(<i>n</i> log<sub>2</sub><sup>2</sup> <i>n</i>)<br>
	                Average - dependent on gap sequence<br>
	                Best - O(<i>n</i> log <i>n</i>)<br><br>
	                Space complexity (auxiliary):<br>
	                All cases - O(1)`
}

export default ALG_INFO;
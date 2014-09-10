'use strict';

/**
 * A Heap is basically an array visualized as a
 * nearly complete binary tree.
 *
 * For example, having the keys: 1 2 3 4 5 6 7:
 *                 1
 *             2       3
 *           4   5   6   7
 *
 * Having, then, the invariant:
 * -  root: i = 0
 * -  left(i) = (2i + 1)
 * -  right(i) = 2i + 2
 */

module.exports = {
  MaxHeap: require('./heap').MaxHeap
};

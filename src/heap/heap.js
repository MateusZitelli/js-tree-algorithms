'use strict';

/**
 * Invariants:
 *
 * Max Heap: the data of a given node is >= the
 * data of its children.
 *
 * Min Heap: the data of a given node is <= the
 * data of its children.
 */

function MaxHeap (arr) {
  this._array = arr;
}

MaxHeap.prototype.get = function () {
  return this._array;
};

MaxHeap.prototype._left = function (i) {
  return 2*i + 1;
};

MaxHeap.prototype._right = function (i) {
  return 2*i + 2;
};

MaxHeap.prototype._swap = function (i, j) {
  var temp = this._array[i];
  this._array[i] = this._array[j];
  this._array[j] = temp;

  return this;
}

/**
 * Corrects a single violation of the heap
 * property in a subtree's root.
 *
 * Assumes that subtrees rooted at left(i) and
 * right(i) are max-heaps. Remember that leafs
 * are, by definition, max-heaps.
 *
 * @param  {Array} arr
 */
MaxHeap.prototype.correct = function (i) {
  var iLeft = this._left(i);
  var iRight = this._right(i);
  var N = this._array.length;

  if (i >= N || iLeft >= N || iRight >= N)
    return;

  var bigger = this._array[iLeft] > this._array[iRight] ?
    iLeft :
    iRight;

  this._swap(i, bigger);
  this.correct(bigger);
};


/**
 * Builds a maxheap from an array. Here we start
 * to apply our `correct` method from N/2
 * because all of our leafs are already maxHeaps
 * by definition.
 * @param  {array} arr
 */
MaxHeap.prototype.build = function () {
  for (var i = (this._array.length/2|0) - 1; i >= 0; i--) {
    this.correct(i);
  }
};

module.exports = {
  MaxHeap: MaxHeap
};

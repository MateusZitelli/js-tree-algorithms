'use strict';

/**
 * XOR LL takes adjvantage of XOR bitwise ops to
 * decrese storage requirements for doubly
 * linked lists. As we gonna use XOR ops on
 * references, we'll be using this with the
 * ArrayBased (so t hat this is possible to do
 * with JavaScript). It decreases the storage
 * requirements because we now only need one
 * address field which contains de XOR of the
 * previous and next addresses.
 *
 * Let's assume [A]->[B]->[C], recs = function
 * that gives us the index of a given node in
 * the records array so that recs(A) = 0, recs(B)
 * = 1 and recs(C) = 2.
 *
 * -  A.addr = 1 (i.e, recs(B) ^ 0)
 * -  B.addr = 2 (i.e, recs(A) ^ recs(C))
 * -  C.addr = 1 (i.e, 0 ^ recs(B)).
 *
 */

function Node (data) {
  this.data = data;
  // will contain the XOR of prev and next.
  this.addr = 0;
}

function LinkedList (node) {
  this.records = [];
  this.currentAddr = 0;

  if (node)
    (this.records.push(node), this.iHead = 0);
  else
    this.iHead = -1;
}

LinkedList.prototype.get = function (index) {
  return this.records.length >= index ? this.records[index] : null;
};

LinkedList.prototype.push = function (node) {
  var newIndex = this.records.push(node) - 1;

  this.get(this.currentAddr).addr = this.currentAddr ^ newIndex;
  this.currentAddr = newIndex;

  node.addr = this.currentAddr ^ 0;
};

module.exports = {
  LinkedList: LinkedList,
  Node: Node
};

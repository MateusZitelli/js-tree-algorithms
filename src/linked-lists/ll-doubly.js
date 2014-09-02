'use strict';

/**
 * Differently from the SimpleLinkedList, doubly
 * linked list's nodes containg one more field,
 * the 'prev', which keeps a reference to the
 * previous node in the list. This is useful as
 * we are now able to move backwards in the
 * list, having more control w/ insertion but we
 * augment the data size (onde more field per
 * node).
 */

function Node (data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function LinkedList (node) {
  this.fNode = node;
}

LinkedList.prototype.insertBefore = function (node, newNode) {
  if (node.prev)
    node.prev.next = newNode;

  newNode.prev = node.prev;
  newNode.next = node;
  node.prev = newNode;
};

LinkedList.prototype.insertAfter = function (node, newNode) {
  newNode.prev = node;

  if (node.next)
    node.next.prev = newNode;

  newNode.next = node.next;
  node.next = newNode;
};

LinkedList.prototype.removeAfter = function (node0) {
  var node1 = node0.next;

  if (!node1.next) {
    node0.next = node1 = null;
    return;
  }

  var node2 = node1.next;

  node0.next = node2;
  node2.prev = node0;
  node1 = null
};


module.exports = {
  LinkedList: LinkedList,
  Node: Node
};

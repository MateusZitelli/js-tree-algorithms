'use strict';

/**
 * In this approach to implementing linked lists
 * we do not keep a real reference to something,
 * but use an Array to keep the indices (which
 * is what is going to be the analogous to
 * 'references') and then we perform the ops
 * regarding that. This is cool because, when
 * talking about Arrays we are able to
 * explicitly 'delete' stuff in javascript ;)
 */

/**
 * A node that stores info
 * @param {Object}   data any kind of object
 * containing data
 * @param {number} next the index that
 * represents the next node in the mem array
 * @param {number}   prev the index that
 * represents the previous node in the mem array
 */
function Node (data, next, prev) {
  this.data = data;
  this.next = -1;
  this.prev = -1;
}

/**
 * The linked list
 * @param {Node} node the head node
 */
function LinkedList (node) {
  this.records = [];
  if (node)
    (this.records.push(node), this.iHead = 0);
  else
    this.iHead = -1;
}

LinkedList.prototype.get = function (index) {
  return this.records.length >= index ? this.records[index] : null;
};

LinkedList.prototype.insertAfter = function (node, newNode) {
  var nodeIndex = -1;
  var newIndex = -1;

  newNode.next = node.next;

  if (!~node.next)
    if (!~node.prev)
      nodeIndex = this.iHead;
    else
      nodeIndex = this.get(node.prev).next;
  else
    nodeIndex = this.get(node.next).prev;

  newNode.prev = nodeIndex;
  newIndex = this.records.push(newNode) - 1;

  if (node.next > -1)
    this.get(node.next).prev = newIndex;
  node.next = newIndex;
};


module.exports = {
  LinkedList: LinkedList,
  Node: Node
};

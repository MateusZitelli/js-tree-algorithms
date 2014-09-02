var SimpleLinkedList = require('./ll-simple').LinkedList;
var util = require('util');

function Node (data, prev, next) {
  this.data = data;
  this.next = next || null;
  this.prev = prev || null;
}

function LinkedList (node) {
  this.fNode = node;
}

util.inherits(LinkedList, SimpleLinkedList);

LinkedList.prototype.insertBefore = function(node, newNode) {
  if (node.prev)
    node.prev.next = newNode;

  newNode.prev = node.prev;
  newNode.next = node;
  node.prev = newNode;
};

LinkedList.prototype.insertAfter = function(node, newNode) {
  newNode.prev = node;

  if (node.next)
    node.next.prev = newNode;

  newNode.next = node.next;
  node.next = newNode;
};

module.exports = {
  LinkedList: LinkedList,
  Node: Node
};

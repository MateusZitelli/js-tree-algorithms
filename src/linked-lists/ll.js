/**
 * Linked Lists consists in a
 * group of nodes which together represents a
 * sequence, each node being composed of data
 * and a reference to another node inde the
 * sequence.
 */


/**
 * Represents a node in the list.
 * @param {Object}   data anything that
 * represents data
 * @param {Node|null} The next node in the list
 * or null.
 */
function Node (data, next) {
  this.data = data;
  this.next = next || null;
}

/**
 * Represents the LinkedList, which can be
 * simplified to 'just the first node in the
 * list'
 */
function LinkedList (node) {
  this.fNode = node;
}

LinkedList.prototype.insertAfter = function(node, newNode) {
  newNode.next = node.next;
  node.next = newNode;
};

LinkedList.prototype.insertBeginning = function(newNode) {
  newNode.next = this.fNode;
  this.fNode = newNode;
};

LinkedList.prototype.removeAfter = function(node) {
  node.next = node.next.next;
  // here we get an interesting problem regarding
  // javascript: there's no way of clearly
  // cleaning the garbage.
  //
  // see https://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript
  // see http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
  // see http://buildnewgames.com/garbage-collector-friendly-code/
  node = null;
};

LinkedList.prototype.removeBeginning = function() {
  this.fNode = this.fNode.next;
};

/**
 * Executes a function for each node it passes
 * @param  {Function} fn    callback function to
 * be called with the current node as argument
 */
LinkedList.prototype.traverse = function (fn) {
  var node = this.fNode ? this.fNode : null;

  while (node)
    node = (fn(this), node.next);
};


module.exports = {
  LinkedList: LinkedList,
  Node: Node
};

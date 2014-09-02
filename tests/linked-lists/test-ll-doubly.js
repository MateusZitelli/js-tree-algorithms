'use strict';

var assert = require('assert')
  , LL = require('../../src/linked-lists/ll').Doubly
  , LinkedList = LL.LinkedList
  , Node = LL.Node;

describe('LinkedListDouble', function() {
  it('should be defined', function() {
    assert(!!LinkedList);
  });

  it('should be instantiable if a is passed or not', function() {
    assert.doesNotThrow(function () {
      new LinkedList();
    });
    assert.doesNotThrow(function () {
      new LinkedList(new Node());
    });
  });

  it('should be able to initiate a LL with a node at the beginning', function() {
    var node = new Node('data');
    var ll = new LinkedList(node);

    assert.deepEqual(ll.fNode, node);
  });

  describe('.insertAfter', function() {
    it('should insert after the first node', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);

      // now we have node0, node1

      assert.deepEqual(node0.next, node1);
    });

    it('should insert after the first node and set prev of new to first', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);

      // now we have node0, node1

      assert.deepEqual(node1.prev, node0);
    });

    it('should insert after the first node before the second', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.insertAfter(node0, node2);

      // now we have node0, node2, node1

      assert.deepEqual(node0.next, node2);
      assert.deepEqual(node2.next, node1);
    });

    it('should insert after the first node before the second and keep the prev refs', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.insertAfter(node0, node2);

      // now we have node0, node2, node1

      assert(!node1.next);
      assert(!node0.prev);
      assert.deepEqual(node2.prev, node0);
      assert.deepEqual(node1.prev, node2);
    });
  });

  describe('.insertBefore', function() {
    it('should insert after the first and before the last', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.insertBefore(node1, node2);

      // now we have node0, node2, node1

      assert(!node1.next);
      assert(!node0.prev);
      assert.deepEqual(node2.prev, node0);
      assert.deepEqual(node1.prev, node2);
    });

    it('should insert before the first, making it now the first', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertBefore(node0, node1);

      // now we have node1, node0

      assert(!node1.prev);
      assert(!node0.next);
      assert.deepEqual(node0.prev, node1);
      assert.deepEqual(node1.next, node0);
    });
  });
});

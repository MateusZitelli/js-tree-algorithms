'use strict';

var assert = require('assert')
  , LL = require('../../src/linked-lists/ll').ArrayBased
  , LinkedList = LL.LinkedList
  , Node = LL.Node;


describe('LinkedListArrayBased', function() {
  it('should be defined', function() {
    assert(!!LinkedList);
  });

  var ll;

  describe('constructor', function() {
    it('should maintain records empty if no node passed', function() {
      ll = new LinkedList();
      assert(!ll.records.length);
    });

    it('should have head\'s index equal to -1 if no node passed', function() {
      ll = new LinkedList();
      assert(~!ll.iHead); // verifying iHead === -1
    });

    it('should have head\'s index equal different of -1 if node passed', function() {
      var node = new Node();
      ll = new LinkedList(node);

      assert(ll.iHead >= 0);
    });
  });

  describe('.get', function() {
    ll;

    it('should get the first element', function() {
      var node = new Node();
      ll = new LinkedList(node);

      assert.deepEqual(ll.get(0), node);
    });

    it('should return null if no element in an index position', function() {
      ll = new LinkedList();

      assert(!ll.get(0))
    });

    it('should return null if trying to get null equivalent', function() {
      ll = new LinkedList();
      assert(!ll.get(-1));
    });
  });

  describe('.getIndex', function() {
    it('should get the proper head index ', function() {
      var node0 = new Node();

      ll = new LinkedList(node0);

      assert.equal(ll.getIndex(node0), ll.iHead);
    });

    it('should correctly get the index of the next node', function() {
      var node0 = new Node();
      var node1 = new Node();

      ll = new LinkedList(node0);
      ll.insertAfter(node0, node1);

      assert.equal(ll.getIndex(node1), node0.next);
    });
  });

  describe('.insertAfter', function() {
    it('should insert after the first node', function() {
      var node0 = new Node();
      var node1 = new Node();
      ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);

      assert.deepEqual(ll.get(node0.next), node1);
    });

    it('should insert after the 1st node and set prev of new to 1st', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');

      ll = new LinkedList(node0);
      ll.insertAfter(node0, node1);

      // now we have node0, node1

      assert.deepEqual(ll.get(node1.prev), node0);
    });

    it('should insert after the first node before the second', function() {
      var node0 = new Node();
      var node1 = new Node();
      var node2 = new Node();

      ll = new LinkedList(node0);
      ll.insertAfter(node0, node1);
      ll.insertAfter(node0, node2);

      assert.deepEqual(ll.get(node0.next), node2);
      assert.deepEqual(ll.get(node2.next), node1);
    });

    it('should insert after the first node before the second and keep the prev refs', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');

      ll = new LinkedList(node0);
      ll.insertAfter(node0, node1);
      ll.insertAfter(node0, node2);

      // now we have node0, node2, node1

      assert(!~node1.next);
      assert(!~node0.prev);

      assert.deepEqual(ll.get(node2.prev), node0);
      assert.deepEqual(ll.get(node1.prev), node2);
    });
  });

  describe('.remove', function() {
    it('should remove the first element in a list, making it empty', function() {
      var node0 = new Node();

      ll = new LinkedList(node0);
      ll.remove(node0);

      assert(!~ll.iHead);
    });

    it('should remove the first element in a list, making it empty', function() {
      var node0 = new Node();
      var node1 = new Node();

      ll = new LinkedList(node0);
      ll.insertAfter(node0, node1);
      ll.remove(node1);

      assert(!~node0.next);
    });
  });
});

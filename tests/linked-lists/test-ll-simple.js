'use strict';

var assert = require('assert')
  , LL = require('../../src/linked-lists/ll').Simple
  , LinkedList = LL.LinkedList
  , Node = LL.Node;


describe('LinkedList', function() {
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

  describe('.insertBeginning', function () {
    it('should insert a node into an empty list', function() {
      var ll = new LinkedList();
      var node = new Node('data');

      ll.insertBeginning(node);

      assert.deepEqual(ll.fNode, node);
    });

    it('should insert a node into the beginning of a non-empty list', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertBeginning(node1);

      assert.deepEqual(ll.fNode, node1);
      assert.deepEqual(ll.fNode.next, node0);
    });
  });

  describe('.insertAfter', function() {
    it('should insert after the first node', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);

      assert.deepEqual(node0.next, node1);
    });

    it('should insert after the first node before the second', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.insertAfter(node0, node2);

      assert.deepEqual(node0.next, node2);
      assert.deepEqual(node2.next, node1);
    });

    //TODO(ciro) should we consider
    //ll.insertAfter(null) equal to
    //ll.insertBeginning in an empty list?
  });

  describe('.removeAfter', function() {
    it('should remove after the first node', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.removeAfter(node0);

      assert(!node0.next);
    });

    it('should remove after the first node while having a third', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data1');
      var node2 = new Node('data2');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.insertAfter(node1, node2);
      ll.removeAfter(node0);

      assert.deepEqual(node0.next, node2);
    });
  });

  describe('.removeBeginning', function() {
    it('should remove the first in an 1-elem LL', function() {
      var node0 = new Node('data0');
      var ll = new LinkedList(node0);

      ll.removeBeginning();

      assert(!ll.fNode);
    });

    it('should remove the first in an n-elem LL, w/ n > 1', function() {
      var node0 = new Node('data0');
      var node1 = new Node('data0');
      var ll = new LinkedList(node0);

      ll.insertAfter(node0, node1);
      ll.removeBeginning();

      assert.deepEqual(ll.fNode, node1);
    });
  });

  describe('.traverse', function() {
    var counter;

    beforeEach(function () {
      counter = (function () {
        var called = 0;

        return function () {
          return called++;
        };
      })();
    });

    it('should never execute the callback in an empty LL', function() {
      var ll = new LinkedList();

      ll.traverse(counter);

      assert.equal(counter(), 0);
    });

    it('should execute the callback one time in a 1-elem LL', function() {
      var node0 = new Node('data0');
      var ll = new LinkedList(node0);

      ll.traverse(counter);

      assert.equal(counter(), 1);
    });
  });
});


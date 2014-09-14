'use strict';

var assert = require('assert');
var AvlModule = require('../../src/avl/avl');
var Avl = AvlModule.Avl;
describe('Avl tree', function(){
  it('Avl should be defined', function(){
    assert(!!Avl);
  });

  it('should be instantiable', function(){
    assert.doesNotThrow(function(){
      new Avl(); 
    });
  });

  it('should create a empty tree when nothing is passed', function(){
    var avl = new Avl();
    assert.equal(avl.right, null);
    assert.equal(avl.left, null);
    assert.equal(avl.value, null);
  });

  it('should accept a value for the root when it is intanciated', function(){
    var avl = new Avl(42);
    assert.equal(avl.right, null);
    assert.equal(avl.left, null);
    assert.equal(avl.value, 42);
  });

  describe('.rotateRR', function(){
    it('sould rotate the tree properly', function(){
      var rr, rl;
      var avl = new Avl(42);
      var r = avl.insert(44);
      var l = avl.insert(41);
      // Make right and left sub-trees and save them
      rl = r.insert(43);
      rr = r.insert(45);

      // Finaly rotate it;
      avl.rotateRR();
      assert.equal(avl.value, 44);
      assert.equal(avl.left.value, 42);
      assert.equal(avl.left.left.value, 41);
      assert.deepEqual(avl.right, rr);
      assert.deepEqual(avl.left.right, rl);
    });
  });
  
  describe('.rotateLL', function(){
    it('sould rotate the tree properly', function(){
      var ll, lr;
      var avl = new Avl(42);
      var r = avl.insert(43);
      var l = avl.insert(40);
      // Make right and left sub-trees and save them
      lr = l.insert(42);
      ll = l.insert(39);

      // Finaly rotate it;
      avl.rotateLL();
      assert.equal(avl.value, 40);
      assert.equal(avl.right.value, 42);
      assert.equal(avl.right.right.value, 43);
      assert.deepEqual(avl.left, ll);
      assert.deepEqual(avl.right.left, lr);
    });
  });

  describe('.insert', function(){
    it('should define root value when insert a number in an empty tree',
      function(){
        var avl = new Avl();
        avl.insert(42);
        assert.equal(avl.value, 42);
    });

    it('should insert bigger numbers in right node', function(){
      var avl = new Avl(42);
      avl.insert(43);
      assert.equal(avl.right.value, 43);
    });
    
    it('should insert smaller numbers in left node', function(){
      var avl = new Avl(42);
      avl.insert(41);
      assert.equal(avl.left.value, 41);
    });
  });

});

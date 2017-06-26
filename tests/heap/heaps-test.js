'use strict';

var assert = require('assert');
var heaps = require('../../src/heap/heaps');

describe('Heaps', function() {
  describe('MaxHeap', function () {
    it('should be defined', function() {
      assert(!!heaps.MaxHeap);
    });

    describe('correct', function() {
      it('sould correct a heap with one invalidation', function() {
        var heap = new heaps.MaxHeap([16,18,10]);
        var expected = [18,16,10];

        heap.correct(0);

        assert.deepEqual(heap.get(), expected);
      });

      it('sould correct a heap with two invalidations', function() {
        var heap = new heaps.MaxHeap([16, 4, 10, 14, 7, 9, 3, 2, 8, 1]);
        var expected = [16, 14, 10, 8, 7, 9, 3, 2, 4,1];

        heap.correct(1);

        assert.deepEqual(heap.get(), expected);
      });
    });

    describe('build', function () {
      it('should build a maxheap from a small array', function() {
        var heap = new heaps.MaxHeap([16,18,10]);
        var expected = [18,16,10];

        heap.build();

        assert.deepEqual(heap.get(), expected);
      });

      it('should build a maxheap from a small array', function() {
        var heap = new heaps.MaxHeap([16,18,10, 20]);
        var expected = [20, 18,16,10];

        heap.build();

        assert.deepEqual(heap.get(), expected);
      });

      it('should build a maxheap from a big', function() {
        var heap = new heaps.MaxHeap([16, 4, 10, 14, 7, 9, 3, 2, 8, 1]);
        var expected = [16, 14, 10, 8, 7, 9, 3, 2, 4,1];

        heap.build();

        assert.deepEqual(heap.get(), expected);
      });
    });
  });
});

'use strict';

var assert = require('assert');
var Huffman = require('../../src/huffman/naive-huffman');

function plucker (field) {
  return function (obj) {
    return obj && obj[field];
  }
}

describe('Huffman', function() {
  it('Node and Huffman should be defined', function() {
    assert(!!Huffman.Huffman);
    assert(!!Huffman.Node);
  });

  describe('Node', function () {
    describe('merge', function () {
      it('generates the right frequency', function() {
        var node1 = new Huffman.Node([['b', '']], 1);
        var node2 = new Huffman.Node([['a', '']], 1);
        var node3 =  node1.merge(node2);

        assert.equal(node3.freq, 2);
      });

      it('generates the right bit representation', function() {
        var node1 = new Huffman.Node([['b', '']], 1);
        var node2 = new Huffman.Node([['a', '']], 1);
        var node3 =  node1.merge(node2);

        assert.deepEqual(node3.pairs[0], ['b', '1'],
                         'right should receive 1');
        assert.deepEqual(node3.pairs[1], ['a', '0'],
                         'left should receive 0');
      });
    });
  });

  describe('Huffman', function () {
    var huff;
    var STRING = 'Lorem ipsum dolor sit amet';

    beforeEach(function () {
      huff = new Huffman.Huffman(STRING);
      huff.process();
    });

    it('assign to those who are more frequent less bits', function() {
      var freqs = huff._getFreqTable(STRING);
      var mostFreq = ['', -1];
      var lessFreq = ['', Number.MAX_VALUE];

      for (var key in freqs) {
        if (freqs[key] > mostFreq[1])
          mostFreq = [key, freqs[key]];

        if (freqs[key] < lessFreq[1])
          lessFreq = [key, freqs[key]];
      }

      var bitLengths = huff._tree.pairs.reduce(function (mem, curr) {
        if (curr[1].length < mem.min)
          mem.min = curr[1].length;

        if (curr[1].length > mem.max)
          mem.max = curr[1].length;

        return mem;
      }, {max: -1, min: Number.MAX_VALUE});

      assert.equal(huff.tree[mostFreq[0]].length, bitLengths.min);
      assert.equal(huff.tree[lessFreq[0]].length, bitLengths.max);
    });

    it('produce the right huffman code', function() {
      var actual = huff.toString();
      var expected = '11111011100101100011010101000011100110001000011000100000';

      assert.equal(actual, expected);
    });
  });
});

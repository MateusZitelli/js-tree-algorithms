'use strict';

/**
 * The idea behind Huffman coding is that those
 * letters that appear more should have fewer
 * bits to represent them.
 *
 * In a naive approach we reduce the algorithm
 * to:
 *
 * 1. count the frequency of each character in
 * the sequence.
 *
 * 2. Sort it by the frequency of occurence.
 *
 * 3. recursively look for those two nodes with
 * the lowest frequency. Merge them and then
 * repeat this untill the tree is complete (we
 * get into the root).
 *
 * 4. cmoplete the construction of the tree by
 * assingnaling to the left of a node 0, to the
 * right, 1 (recursively).
 *
 * 5. get the encoding of each leaf.
 */



/**
 * Comparison function generator
 */
function compare (field) {
  return function (a, b) {
    if (a[field] < b[field])
      return -1;
    else if (a[field] > b[field])
      return 1;
    else
      return 0;
  };
};


/**
 * A node in the Huffman Tree
 * @param {Array} pairs
 * @param {number} freq
 */
function Node (pairs, freq) {
  this.pairs = pairs;
  this.freq = freq;
}

/**
 * Creates a new Node based on the node itself
 * and another one.
 * @param  {Node}
 * @return {Node}
 */
Node.prototype.merge = function(other) {
  var totalFrequency = this.freq + other.freq;

  this.pairs.forEach(function (elem) {
    elem[1] = "1" + elem[1];
  });

  other.pairs.forEach(function (elem) {
    elem[1] = "0" + elem[1];
  });

  return new Node(other.pairs.reduce(function (coll, elem) {
    return (coll.push(elem), coll);
  }, this.pairs), totalFrequency);
};


/**
 * Generates the huffman coding representation
 * for a given string.
 * @param  {string} str
 */
function Huffman (str) {
  if (!(this instanceof Huffman))
    return new Huffman(str);

  this.str = str;
  this._tree = {};
}

/**
 * Defines getter and setter for the internal
 * 'tree'. Note that we add some validation to
 * the 'setting' operation. This is for keeping
 * a minimum consistency with what we are using
 * in our toString. Maybe this is not very
 * necessary (i - ciro - wanted to use this
 * somewhere :D).
 */
Object.defineProperty(Huffman.prototype, "tree", {
  get: function () {
    return this._tree.pairs.reduce(function (mem, curr) {
      return (mem[curr[0]] = curr[1], mem);
    }, {});
  },

  set: function (tree) {
    if (!(tree.pairs && tree.freq))
      throw new Error('Your tree must have \'pairs\' and \'freq\' property');

    this._tree = tree;
  }
});

/**
 * Constructs a frequency table from a string
 * @param  {string} str
 */
Huffman.prototype._getFreqTable = function (str) {
  return str.split('').reduce(function (table, letter) {
    if (!table[letter])
      table[letter] = 0;
    table[letter]++;

      return table;
    }, {});
};

/**
 * Process the string to generate the internal
 * representation of it.
 */
Huffman.prototype.process = function () {
  var initial = [];
  var finalTable = [];
  var freqTable = this._getFreqTable(this.str);

  for (var key in freqTable)
    initial.push([key, freqTable[key]]);

  // TODO(ciro) with a heapqueue we could get
  // better
  initial.sort(compare('1'));

  initial.forEach(function (entry) {
    finalTable.push(new Node([[entry[0], ""]], entry[1]));
  });

  while (finalTable.length > 1) {
    // get the least frequent and then merge with
    // the other least frequent.
    var node = finalTable
                  .shift()
                  .merge(finalTable.shift());

    finalTable.push(node);
    finalTable.sort(compare('freq'));
  }

  if (finalTable.length)
    this._tree = finalTable[0];

  return this;
};

/**
 * Creates the string representation of the
 * huffman tree.
 * @return {string}
 */
Huffman.prototype.toString = function () {

  if (!this.str || !Object.keys(this._tree))
    return '';

  return this._tree.pairs.reduce(function (mem, elem) {
    return (mem.push(elem[1]), mem);
  }, []).join('');
};

module.exports = {
  Node: Node,
  Huffman: Huffman
};

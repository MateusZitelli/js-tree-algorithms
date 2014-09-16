'use strict'

var assert = require('assert')
  , TrieModule = require('../../src/tries/tries').Trie
  , Trie = TrieModule.Trie;

describe('Trie', function() {
  var trie;

  it('should be defined', function(){
    assert(!!Trie);
  });

  it('should be instantiable if nothing, a string or an array is passed', function(){
    assert.doesNotThrow(function () {
      new Trie();
    });
  });

  beforeEach(function () {
    trie = new Trie();
  });

  it("should loads empty when nothing is passed", function(){
    assert.equal(Object.keys(trie.children).length, 0);
    assert.equal(trie.value, null);
  });

  describe('.insert', function () {

    it('should insert a single character in a empty trie', function() {
      trie.insert('c');

      assert.equal(trie.children.c.value, 'c');
    });

    it('should insert a word in a empty trie', function() {
      trie.insert('text');

      var tTrie =         trie.children.t;
      var eTrie =        tTrie.children.e;
      var xTrie =        eTrie.children.x;
      var secoundTTrie = xTrie.children.t;

      console.log(JSON.stringify(trie, undefined, 1));

      assert.notEqual(trie.children.t, undefined);
      assert.notEqual(tTrie.children.e, undefined);
      assert.notEqual(eTrie.children.x, undefined);
      assert.notEqual(xTrie.children.t, undefined);
      assert.equal(secoundTTrie.value, 'text');
    });

    it('should insert words from a string', function() {
      trie.insert('text test');

      assert.notEqual(trie.children.t.children.e.children.x, undefined);
      assert.notEqual(trie.children.t.children.e.children.s, undefined);
    });

    it('should insert words from a list of them', function() {
      trie.insert(['text', 'test']);

      assert.notEqual(trie.children.t.children.e.children.x, undefined);
      assert.notEqual(trie.children.t.children.e.children.s, undefined);
    });
  });

  describe('.search', function() {
    it('should find a word', function(){
      trie.insert('oi');
      assert.equal(trie.search('oi').value, 'oi');
    });
  });

  describe('.delete', function () {
    it('should empty a trie when removing its root character', function(){
      trie.insert('a');
      trie.delete('a');

      assert.equal(trie.children.a, undefined);
    });

    it('should not delete nodes that defines more than one word', function(){
      trie.insert(['text', 'test']);
      trie.delete('text');

      assert.notEqual(trie.children.t, undefined);
      assert.notEqual(trie.children.t.children.e, undefined);
      assert.equal(trie.children.t.children.e.children.x, undefined);
    });

    it('should delete multiple words', function(){
     trie.insert(['text', 'test']);
     trie.delete(['text', 'test']);

     assert.equal(trie.children.t, undefined);
    });
  });
});

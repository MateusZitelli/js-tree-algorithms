'use strict'

var assert = require('assert')
  , TrieModule = require('../../src/tries/tries').Trie
  , Trie = TrieModule.Trie;

describe('Trie', function() {
  it('should be defined', function(){
    assert(!!Trie);
  });

  it('should be instantiable if nothing, a string or an array is passed',
     function(){
    assert.doesNotThrow(function () {
      new Trie();
    });
  });

  it("should loads empty when nothing is passed", function(){
    var trie = new Trie(); 
    assert.equal(Object.keys(trie.childs).length, 0);
    assert.equal(trie.value, null);
  });

  describe('.insert', function () {
    it('should insert a single caracter in a empty trie', function() {
      var trie = new Trie();
      trie.insert('c');
      assert.equal(trie.value, 'c');
    });
    
    it('should insert a word in a empty trie', function() {
      var trie = new Trie();
      trie.insert('text');
      assert.notEqual(trie.childs.t, undefined);
      var tTrie = trie.childs.t;
      assert.notEqual(tTrie.childs.e, undefined);
      var eTrie = tTrie.childs.e;
      assert.notEqual(eTrie.childs.x, undefined);
      var xTrie = eTrie.childs.x;
      assert.equal(xTrie.value, 'text');
    });

    it('should insert words from a string', function() {
      var trie = new Trie();
      trie.insert('text test');
      assert(trie.childs.t.childs.e.childs.x, undefined);
      assert(trie.childs.t.childs.e.childs.s, undefined);
    });

    it('should insert words from a list of them', function() {
      var trie = new Trie();
      trie.insert(['text', 'test']);
      assert(trie.childs.t.childs.e.childs.x, undefined);
      assert(trie.childs.t.childs.e.childs.s, undefined);
    });

  });

});

'use strict'

var assert = require('assert')
  , TrieModule = require('../../src/tries/trie').Trie
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

    assert.doesNotThrow(function () {
      new Trie('this is a test'); 
    });

    assert.doesNotThrow(function () {
      new Trie(['this', 'is', 'a', 'test']); 
    });
  });

  it("should loads empty when nothing is passed"){
    var trie = new Trie(); 
    assert.equal(Object.keys(trie.links).length, 0);
    assert.equal(trie.data, null);
  }

  it("should loads texts with links and no data"){
    var trie = new Trie('this is a text'); 
    assert.notEqual(Object.keys(trie.links).length, 0);
    assert.equal(trie.data, null);
  }
  
  it("should have the root with data equal the char inputed"){
    var trie = new Trie('c'); 
    assert.equal(Object.keys(trie.links).length, 0);
    assert.notEqual(trie.data, null);
  }

  describe('.insert', function () {
    it('should insert a single caracter in a empty trie', function() {
      var trie = new Trie();
      trie.insert('c');
      assert.equal(trie.data, 'c');
    });
    
    it('should insert a word in a empty trie', function() {
      var trie = new Trie();
      trie.insert('text');
      assert.notEqual(trie.link.t, undefined);
      var tTrie = trie.link.t;
      assert.notEqual(tTrie.link.e, undefined);
      var eTrie = tTrie.link.e;
      assert.notEqual(tTrie.link.e, undefined);
      var xTrie = eTrie.link.x;
      assert.equal(xTrie.data, 't');
    });
  });
});

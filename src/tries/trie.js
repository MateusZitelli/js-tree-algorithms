/*
 * Trie is a ordered tree data struct used to store mainly strings. They
 * consists in a tree where each node can have a value and the links have a
 * single character. A trie is aways travesed from the root to the child nodes.
 * A node with a non-null value means that the word represented by the chars
 * from the root to this node contained in the trie, and the value of this node
 * is aways exactly the word mentioned.
*/

var Trie = function(){
  this.value = null;
  this.childs = {};
};

Trie.prototype.insert = function(data){
  var wordIndex, word, charIndex, wordLen, node;

  if(data === null){
    return;
  }else if(toString.call(data) === '[object String]'){
    //If is a string split is in single words
    data = data.split(' ');
  }else if(toString.call(data) !== '[object Array]'){
    throw('The input must be null, a string or an array');
  }

  for(wordIndex in data){
    // For each word inserted 
    word = data[wordIndex];
    node = this;

    for(charIndex = 0, wordLen = word.length; charIndex < wordLen - 1;
        charIndex++){
      // 
      var character = word.slice(charIndex, charIndex + 1);
      var remainingString = word.slice(charIndex + 1);

      if(node.childs[character]){
        node.childs[character].insert(remainingString); 
      }else{
        node.childs[character] = new Trie(remainingString);
      }
      node = node.childs[character]; 
    }

    node.value = word;
  }
};

module.exports = {
  Trie: Trie
};
